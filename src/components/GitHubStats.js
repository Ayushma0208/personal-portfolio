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

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value ?? 0);
}

function SkeletonCard({ title }) {
  return (
    <div className="gh-card" aria-hidden="true">
      <h3 className="gh-card-title">{title}</h3>
      <div className="gh-skeleton-lines">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    loadGitHubStats()
      .then((data) => {
        if (!cancelled) {
          setStats(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load GitHub stats');
        }
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
      <div className="github-stats-grid gh-stats-native">
        <SkeletonCard title="Top Languages" />
        <SkeletonCard title="Contribution Streak" />
        <SkeletonCard title="GitHub Stats" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="gh-error" role="alert">
        <p>Couldn&apos;t load live GitHub stats right now.</p>
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

  const maxLangPercent = Math.max(
    ...stats.languages.map((lang) => lang.percent),
    1
  );

  return (
    <div className="github-stats-grid gh-stats-native">
      <article className="gh-card">
        <h3 className="gh-card-title">Top Languages</h3>
        {stats.languages.length === 0 ? (
          <p className="gh-empty">No public language data yet.</p>
        ) : (
          <ul className="gh-lang-list">
            {stats.languages.map((lang) => (
              <li key={lang.name} className="gh-lang-row">
                <div className="gh-lang-meta">
                  <span
                    className="gh-lang-dot"
                    style={{
                      backgroundColor: LANG_COLORS[lang.name] || '#667eea',
                    }}
                  />
                  <span className="gh-lang-name">{lang.name}</span>
                  <span className="gh-lang-pct">{lang.percent}%</span>
                </div>
                <div className="gh-lang-track" aria-hidden="true">
                  <div
                    className="gh-lang-fill"
                    style={{
                      width: `${(lang.percent / maxLangPercent) * 100}%`,
                      backgroundColor: LANG_COLORS[lang.name] || '#667eea',
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>

      <article className="gh-card gh-card-streak">
        <h3 className="gh-card-title">Contribution Streak</h3>
        <div className="gh-streak-current">
          <span className="gh-streak-value">
            {formatNumber(stats.streak.current)}
          </span>
          <span className="gh-streak-label">Current streak (days)</span>
        </div>
        <div className="gh-streak-meta">
          <div>
            <strong>{formatNumber(stats.yearContributions)}</strong>
            <span>Total contributions</span>
          </div>
          <div>
            <strong>{formatNumber(stats.streak.longest)}</strong>
            <span>Longest streak</span>
          </div>
        </div>
      </article>

      <article className="gh-card">
        <h3 className="gh-card-title">GitHub Stats</h3>
        <dl className="gh-stat-list">
          <div>
            <dt>Total Stars</dt>
            <dd>{formatNumber(stats.stars)}</dd>
          </div>
          <div>
            <dt>Public Repos</dt>
            <dd>{formatNumber(stats.publicRepos)}</dd>
          </div>
          <div>
            <dt>Followers</dt>
            <dd>{formatNumber(stats.followers)}</dd>
          </div>
          <div>
            <dt>Contributions (year)</dt>
            <dd>{formatNumber(stats.yearContributions)}</dd>
          </div>
        </dl>
        <a
          className="gh-profile-link"
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{stats.username}
        </a>
      </article>
    </div>
  );
};

export default GitHubStats;
