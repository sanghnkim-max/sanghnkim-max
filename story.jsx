// story.jsx — narrative sections: Hero, Thesis, Now, Goals

/* ------------------------------------------------------------------
 * HERO — split: static portrait + bio (no bg animation)
 * ---------------------------------------------------------------- */
function Hero() {
  const s = window.SITE;
  return (
    <header className="hero" id="top" data-screen-label="01 hero">
      <div className="hero__top">
        <span className="status">available for research collaboration</span>
        <span className="t-mono-xs">Seoul · Apr 2026</span>
      </div>

      <div className="hero__grid">
        <div className="hero__portrait" aria-hidden="true">
          <div className="hero__portrait-frame">
            <div className="hero__portrait-inner">
              <div className="hero__portrait-placeholder">
                <span className="t-mono-xs faint">portrait</span>
                <span className="hero__portrait-initials">SK</span>
                <span className="t-mono-xs faint">drop a 1:1 image here</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__body">
          <div className="hero__eyebrow t-mono-xs">
            <span>AI research · generative models</span>
            <span className="hero__eyebrow-sep">/</span>
            <span>Samsung Research</span>
          </div>
          <h1 className="hero__title">
            <span className="hero__name">{s.name}</span>
            <span className="hero__name-ko">{s.name_ko}</span>
          </h1>
          <p className="hero__blurb">
            AI Research Scientist at <b>Samsung Research</b>, currently leading on-device agent research for proactive device assistance.
            Previously technically led <i>Gauss-Image</i>, the on-device text-to-image foundation model that shipped in the Galaxy S26.
            M.S. from <b>KAIST</b> under <i>Juho Lee</i> &amp; <i>Jinwoo Shin</i>, working on safety alignment for diffusion models.
          </p>

          <div className="hero__actions">
            <a className="btn" href={`mailto:${s.email}`}>email</a>
            <a className="btn btn-ghost" href={`mailto:${s.emailWork}`}>email (work)</a>
            <a className="btn btn-ghost" href={`https://scholar.google.com/citations?user=${s.scholar}`} target="_blank" rel="noreferrer">scholar ↗</a>
            <a className="btn btn-ghost" href={`https://github.com/${s.github}`} target="_blank" rel="noreferrer">github ↗</a>
          </div>

          <dl className="hero__meta">
            <div><dt>based in</dt><dd>{s.location}</dd></div>
            <div><dt>role</dt><dd>{s.role}</dd></div>
            <div><dt>reach</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a> · <a href={`mailto:${s.emailWork}`}>{s.emailWork}</a></dd></div>
          </dl>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
 * THESIS — research statement, as 3 pillars
 * ---------------------------------------------------------------- */
function Thesis() {
  const s = window.SITE.thesis;
  return (
    <section className="block thesis" id="thesis" data-screen-label="02 thesis">
      <SecHead num="Ⅰ" title="Research" aside="interests &amp; approach"/>
      <p className="thesis__lede">{s.lede}</p>
      <p className="thesis__body">{s.body}</p>

      <div className="thesis__pillars">
        {s.pillars.map(p => (
          <article key={p.key} className="pillar">
            <div className="pillar__k t-mono-xs">{p.key}</div>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__body">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * NOW — ongoing projects
 * ---------------------------------------------------------------- */
function Now() {
  const items = window.SITE.now;
  return (
    <section className="block" id="now" data-screen-label="05 now">
      <SecHead num="Ⅲ" title="Right now" aside="ongoing — not yet papers"/>
      <p className="t-lead" style={{marginTop:0, marginBottom:'var(--s-5)', maxWidth:'var(--measure)'}}>
        Three things have most of my attention today.
      </p>
      <div className="now-grid">
        {items.map(n => (
          <article key={n.name} className="now-card">
            <div className="now-card__head">
              <div className="now-card__kind t-caps">{n.kind}</div>
              <span className={cls('now-card__status', n.status === 'released' && 'is-shipped')}>
                <span className="dot"/>{n.status}
              </span>
            </div>
            <h3 className="now-card__title">{n.name}</h3>
            <div className="now-card__year t-mono-xs faint">{n.year}</div>
            <p className="now-card__tldr">{n.tldr}</p>
            <div className="now-card__role"><span className="t-caps">role</span> {n.role}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * GOALS — where it's going
 * ---------------------------------------------------------------- */
function Goals() {
  const items = window.SITE.goals;
  return (
    <section className="block goals" id="goals" data-screen-label="06 goals">
      <SecHead num="Ⅳ" title="Current directions" aside="what I'm working toward"/>
      <ol className="goals__list">
        {items.map((g, i) => (
          <li key={i} className={cls('goal', `goal--${g.tag}`)}>
            <div className="goal__rail">
              <span className="goal__tag t-caps">{g.tag}</span>
              <span className="goal__line"/>
            </div>
            <div className="goal__body">
              <p className="goal__text">{g.text}</p>
              <div className="goal__k t-mono-xs faint">{g.k}</div>
            </div>
          </li>
        ))}
      </ol>
      <p className="goals__close">
        If any of this is close to what you're working on, feel free to <a href={`mailto:${window.SITE.email}`}>reach out</a>.
      </p>
    </section>
  );
}

Object.assign(window, { Hero, Thesis, Now, Goals });
