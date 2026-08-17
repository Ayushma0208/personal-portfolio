import React, { useEffect, useState } from 'react';
import { GITHUB_USER, loadGitHubStats } from '../utils/githubStats';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  Go: '#00add8',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
};

const THEMES = {
  dark: {
    bg: '#1a1b27',
    border: 'rgba(255,255,255,0.12)',
    title: '#70a5fd',
    text: '#38bdae',
    muted: '#a9b1d6',
    icon: '#bf91f3',
    ring: '#667eea',
    fire: '#764ba2',
    track: '#2a2b3d',
  },
  light: {
    bg: '#fffefe',
    border: '#e4e2e2',
    title: '#2f80ed',
    text: '#434d58',
    muted: '#64748b',
    icon: '#4c71f2',
    ring: '#2f80ed',
    fire: '#fb8c00',
    track: '#e4e2e2',
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value ?? 0);
}

function formatStreakRange(start, end) {
  if (!start || !end) return null;

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null;
  }

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const startLabel = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
  const endLabel = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${startLabel} - ${endLabel}`;
}

function TopLanguagesCard({ username, languages, colors }) {
  const rows = (languages || []).slice(0, 5);

  return (
    <article
      className="github-panel github-panel--langs"
      style={{ background: colors.bg, borderColor: colors.border }}
    >
      <h3 className="github-panel-title" style={{ color: colors.title }}>
        {username}&apos;s Top Languages
      </h3>
      {rows.length === 0 ? (
        <p className="github-langs-empty" style={{ color: colors.muted }}>
          No language data yet
        </p>
      ) : (
        <ul className="github-langs-list">
          {rows.map((lang) => (
            <li key={lang.name} className="github-lang-row">
              <div className="github-lang-meta">
                <span
                  className="github-lang-dot"
                  style={{
                    backgroundColor: LANG_COLORS[lang.name] || colors.icon,
                  }}
                />
                <span style={{ color: colors.muted }}>{lang.name}</span>
                <strong style={{ color: colors.text }}>{lang.percent}%</strong>
              </div>
              <div
                className="github-lang-track"
                style={{ backgroundColor: colors.track }}
              >
                <div
                  className="github-lang-fill"
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: LANG_COLORS[lang.name] || colors.icon,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function StatsCard({ stats, colors }) {
  const streak = stats.streak || {};
  const currentRange = formatStreakRange(streak.currentStart, streak.currentEnd);
  const longestRange = formatStreakRange(streak.longestStart, streak.longestEnd);

  const detailStats = [
    { label: 'Stars', value: stats.stars },
    { label: 'Commits', value: stats.yearContributions },
    { label: 'Repos', value: stats.publicRepos },
    { label: 'Followers', value: stats.followers },
    { label: 'Forks', value: stats.forks },
  ];

  return (
    <article
      className="github-panel github-panel--stats"
      style={{ background: colors.bg, borderColor: colors.border }}
    >
      <h3 className="github-panel-title" style={{ color: colors.title }}>
        {stats.username}&apos;s GitHub Stats
      </h3>

      <div className="github-combined-streaks">
        <div className="github-combined-metric">
          <strong style={{ color: colors.title }}>
            {formatNumber(stats.yearContributions)}
          </strong>
          <span style={{ color: colors.muted }}>Total Contributions</span>
        </div>

        <div className="github-combined-metric github-combined-metric--current">
          <div
            className="github-streak-ring"
            style={{ borderColor: colors.ring }}
          >
            <span className="github-streak-flame" style={{ color: colors.fire }}>
              ▲
            </span>
            <strong style={{ color: colors.title }}>
              {formatNumber(streak.current || 0)}
            </strong>
          </div>
          <span style={{ color: colors.ring }}>Current Streak</span>
          {currentRange && (
            <small style={{ color: colors.muted }}>{currentRange}</small>
          )}
        </div>

        <div className="github-combined-metric">
          <strong style={{ color: colors.title }}>
            {formatNumber(streak.longest || 0)}
          </strong>
          <span style={{ color: colors.muted }}>Longest Streak</span>
          {longestRange && (
            <small style={{ color: colors.ring }}>{longestRange}</small>
          )}
        </div>
      </div>

      <ul className="github-combined-details">
        {detailStats.map((item) => (
          <li key={item.label}>
            <span style={{ color: colors.muted }}>{item.label}</span>
            <strong style={{ color: colors.text }}>
              {formatNumber(item.value)}
            </strong>
          </li>
        ))}
      </ul>
    </article>
  );
}

const GitHubStats = ({ theme = 'dark' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const colors = THEMES[theme === 'light' ? 'light' : 'dark'];

  useEffect(() => {
    let cancelled = false;

    loadGitHubStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="github-stats-layout">
        <div className="github-stats-grid">
          <div className="github-stat-card github-stat-card--loading" />
          <div className="github-stat-card github-stat-card--loading" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="github-stat-error" role="alert">
        <p>Couldn&apos;t load GitHub stats right now.</p>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View profile on GitHub →
        </a>
      </div>
    );
  }

  return (
    <div className="github-stats-layout">
      <div className="github-stats-grid">
        <div className="github-stat-card github-stat-card--langs">
          <TopLanguagesCard
            username={stats.username}
            languages={stats.languages}
            colors={colors}
          />
        </div>
        <div className="github-stat-card github-stat-card--stats">
          <StatsCard stats={stats} colors={colors} />
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
