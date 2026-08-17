const GITHUB_USER = 'Ayushma0208';
const CACHE_KEY = 'portfolio-github-stats-v3';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// Last-known-good snapshot so the UI never goes blank if APIs flake
const FALLBACK_STATS = {
  username: GITHUB_USER,
  publicRepos: 25,
  followers: 4,
  following: 2,
  stars: 0,
  forks: 2,
  languages: [
    { name: 'JavaScript', count: 10, percent: 53 },
    { name: 'TypeScript', count: 7, percent: 37 },
    { name: 'Python', count: 2, percent: 11 },
  ],
  streak: {
    total: 1418,
    current: 44,
    longest: 44,
    currentStart: null,
    currentEnd: null,
    longestStart: null,
    longestEnd: null,
  },
  yearContributions: 1418,
};

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readCache({ allowStale = false } = {}) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached?.data) return null;
    const isFresh =
      cached.timestamp && Date.now() - cached.timestamp <= CACHE_TTL_MS;
    if (isFresh || allowStale) return cached.data;
    return null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignore quota / private-mode failures
  }
}

function computeStreak(contributions) {
  const empty = {
    total: 0,
    current: 0,
    longest: 0,
    currentStart: null,
    currentEnd: null,
    longestStart: null,
    longestEnd: null,
  };

  if (!Array.isArray(contributions) || contributions.length === 0) {
    return empty;
  }

  const byDate = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const total = byDate.reduce((sum, day) => sum + (day.count || 0), 0);

  let longest = 0;
  let longestStart = null;
  let longestEnd = null;
  let run = 0;
  let runStart = null;

  for (const day of byDate) {
    if (day.count > 0) {
      if (run === 0) runStart = day.date;
      run += 1;
      // Prefer the most recent streak when lengths tie
      if (run >= longest) {
        longest = run;
        longestStart = runStart;
        longestEnd = day.date;
      }
    } else {
      run = 0;
      runStart = null;
    }
  }

  const todayKey = toDateKey(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  let idx = byDate.length - 1;
  if (byDate[idx]?.date === todayKey && byDate[idx].count === 0) {
    idx -= 1;
  }

  const tip = byDate[idx];
  if (
    !tip ||
    tip.count === 0 ||
    (tip.date !== todayKey && tip.date !== yesterdayKey)
  ) {
    return {
      total,
      current: 0,
      longest,
      currentStart: null,
      currentEnd: null,
      longestStart,
      longestEnd,
    };
  }

  let current = 0;
  let currentEnd = tip.date;
  let currentStart = tip.date;
  for (let i = idx; i >= 0; i -= 1) {
    if (byDate[i].count > 0) {
      current += 1;
      currentStart = byDate[i].date;
    } else {
      break;
    }
  }

  return {
    total,
    current,
    longest,
    currentStart,
    currentEnd,
    longestStart,
    longestEnd,
  };
}

function aggregateLanguages(repos) {
  const counts = {};
  for (const repo of repos) {
    if (repo.fork || !repo.language) continue;
    counts[repo.language] = (counts[repo.language] || 0) + 1;
  }

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0) || 1;
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

async function fetchJson(url) {
  // No custom headers — avoids CORS preflight failures in the browser
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

async function safeFetch(url) {
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

function buildStats({ user, repos, contributionPayload, base }) {
  const owned = Array.isArray(repos) ? repos : null;
  const contributions = contributionPayload?.contributions;
  const streak = contributions
    ? computeStreak(contributions)
    : base.streak;

  return {
    username: user?.login || base.username || GITHUB_USER,
    publicRepos: user?.public_repos ?? base.publicRepos ?? 0,
    followers: user?.followers ?? base.followers ?? 0,
    following: user?.following ?? base.following ?? 0,
    stars: owned
      ? owned.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
      : (base.stars ?? 0),
    forks: owned
      ? owned.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
      : (base.forks ?? 0),
    languages: owned ? aggregateLanguages(owned) : base.languages || [],
    streak,
    yearContributions:
      contributionPayload?.total?.lastYear ??
      streak.total ??
      base.yearContributions ??
      0,
  };
}

export async function loadGitHubStats() {
  const fresh = readCache({ allowStale: false });
  if (fresh) {
    return { ...fresh, fromCache: true };
  }

  const base = readCache({ allowStale: true }) || FALLBACK_STATS;

  const [user, repos, contributionPayload] = await Promise.all([
    safeFetch(`https://api.github.com/users/${GITHUB_USER}`),
    safeFetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
    ),
    safeFetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
    ),
  ]);

  // If every live source failed, still render last-known / fallback data
  if (!user && !repos && !contributionPayload) {
    return { ...base, fromCache: true };
  }

  const data = buildStats({ user, repos, contributionPayload, base });
  writeCache(data);
  return { ...data, fromCache: false };
}

export { GITHUB_USER };
