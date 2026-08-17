const GITHUB_USER = 'Ayushma0208';
const CACHE_KEY = 'portfolio-github-stats-v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached?.timestamp || Date.now() - cached.timestamp > CACHE_TTL_MS) {
      return null;
    }
    return cached.data;
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
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return { total: 0, current: 0, longest: 0 };
  }

  const byDate = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const total = byDate.reduce((sum, day) => sum + (day.count || 0), 0);

  let longest = 0;
  let run = 0;
  for (const day of byDate) {
    if (day.count > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
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
    return { total, current: 0, longest };
  }

  let current = 0;
  for (let i = idx; i >= 0; i -= 1) {
    if (byDate[i].count > 0) current += 1;
    else break;
  }

  return { total, current, longest };
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
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

export async function loadGitHubStats() {
  const cached = readCache();
  if (cached) {
    return { ...cached, fromCache: true };
  }

  const [user, repos, contributionPayload] = await Promise.all([
    fetchJson(`https://api.github.com/users/${GITHUB_USER}`),
    fetchJson(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=updated`
    ),
    fetchJson(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
    ),
  ]);

  const owned = Array.isArray(repos) ? repos : [];
  const stars = owned.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );
  const forks = owned.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  const contributions = contributionPayload?.contributions || [];
  const streak = computeStreak(contributions);

  const data = {
    username: user.login || GITHUB_USER,
    publicRepos: user.public_repos || 0,
    followers: user.followers || 0,
    following: user.following || 0,
    stars,
    forks,
    languages: aggregateLanguages(owned),
    streak,
    yearContributions:
      contributionPayload?.total?.lastYear ?? streak.total ?? 0,
  };

  writeCache(data);
  return { ...data, fromCache: false };
}

export { GITHUB_USER };
