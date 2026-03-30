import { Link } from 'react-router-dom'

function HomePage({ extraPosts, siteConfig, writeups }) {
  const stats = [
    {
      label: 'Tracked writeups',
      value: String(writeups.length).padStart(2, '0'),
    },
    {
      label: 'Research notes',
      value: String(extraPosts.length).padStart(2, '0'),
    },
    {
      label: 'Achievements',
      value: String(siteConfig.achievements.length).padStart(2, '0'),
    },
  ]

  return (
    <div className="page-stack">
      <section className="hero-grid panel">
        <div className="hero-copy-block">
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h1>{siteConfig.intro.headline}</h1>
          <p className="lead-copy">{siteConfig.intro.description}</p>
          <p className="support-copy">{siteConfig.intro.supporting}</p>
          <div className="social-row">
            {siteConfig.links.map((link) => (
              <a
                className="social-link"
                href={link.url}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{link.label}</span>
                <span className="social-arrow">-&gt;</span>
              </a>
            ))}
          </div>
        </div>
        <div className="terminal-panel">
          <div className="terminal-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-content">
            <p className="terminal-line terminal-muted">w4rr1or@notebook:~$ ./focus.sh</p>
            {siteConfig.focusTracks.map((track) => (
              <p className="terminal-line" key={track}>
                <span className="terminal-prompt">&gt;</span> {track}
              </p>
            ))}
            <p className="terminal-line terminal-muted">status: building, breaking, learning</p>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="panel stat-card" key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="content-grid content-grid-wide">
        <div className="panel section-panel">
          <p className="section-kicker">About Me</p>
          <h2>Hands on learner exploring systems at a deeper level.</h2>
          <p className="section-copy">{siteConfig.about}</p>
          <div className="cta-row">
            <Link className="inline-cta" to="/writeups">
              Browse writeups
            </Link>
            <Link className="inline-cta" to="/extra">
              Read extra notes
            </Link>
          </div>
        </div>

        <div className="panel section-panel">
          <p className="section-kicker">Experience</p>
          <h2>Communities & teams.</h2>
          <div className="timeline-list">
            {siteConfig.experience.map((entry) => (
              <div className="timeline-item" key={`${entry.organization}-${entry.role}`}>
                <div>
                  <p className="timeline-title">{entry.organization}</p>
                  <p className="timeline-role">{entry.role}</p>
                </div>
                <span className="timeline-period">{entry.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel section-panel">
          <p className="section-kicker">Languages</p>
          <h2>Technical stack.</h2>
          <div className="chip-grid">
            {siteConfig.skills.languages.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="panel section-panel">
          <p className="section-kicker">Core Skills</p>
          <h2>Core Areas.</h2>
          <div className="chip-grid">
            {siteConfig.skills.core.map((skill) => (
              <span className="chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel section-panel">
        <p className="section-kicker">Tools</p>
        <h2>My Toolkit.</h2>
        <div className="tool-grid">
          {siteConfig.tools.map((tool) => (
            <span className="tool-pill" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="panel section-panel">
        <p className="section-kicker">Achievements</p>
        <h2>Recent CTF results and placements.</h2>
        <div className="achievement-list">
          {siteConfig.achievements.map((achievement, index) => (
            <div className="achievement-item" key={`${achievement.title}-${achievement.rank}`}>
              <span className="achievement-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="achievement-copy">
                <p className="achievement-title">{achievement.title}</p>
                <p className="achievement-meta">{achievement.organization}</p>
              </div>
              <div className="achievement-rank-block">
                <span className="achievement-rank">Rank {achievement.rank}</span>
                <span className="achievement-date">{achievement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
