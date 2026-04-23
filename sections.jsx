// sections.jsx — larger composite sections

function Masthead() {
  const s = window.SITE;
  return (
    <header className="masthead" id="top" data-screen-label="01 masthead">
      <div className="masthead__top">
        <span className="status">available for research collaboration</span>
        <span>Seoul · Apr 2026</span>
      </div>
      <h1>
        Sanghyun Kim
        <span className="ko">김상현</span>
      </h1>
      <div className="masthead__role">{s.role}</div>
      <p className="masthead__tagline">{s.tagline}</p>
      <p className="masthead__blurb">
        Currently leading <b>Bixby Next</b> at Samsung Research.
        Previously technically led <i>Gauss-Image</i>, the on-device T2I foundation model shipped in the Galaxy S26 series.
        M.S. from <b>KAIST</b> under Juho Lee & Jinwoo Shin, with a focus on safety alignment for diffusion models.
      </p>

      <dl className="masthead__meta">
        <div><dt>Based in</dt><dd>{s.location}</dd></div>
        <div><dt>Email</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a></dd></div>
        <div><dt>Email (work)</dt><dd><a href={`mailto:${s.emailWork}`}>{s.emailWork}</a></dd></div>
        <div><dt>GitHub</dt><dd><a href={`https://github.com/${s.github}`} target="_blank" rel="noreferrer">@{s.github}</a></dd></div>
        <div><dt>Scholar</dt><dd><a href={`https://scholar.google.com/citations?user=${s.scholar}`} target="_blank" rel="noreferrer">↗ profile</a></dd></div>
        <div><dt>CV</dt><dd><a href="cv.tex">cv.tex</a></dd></div>
      </dl>

      <div className="interests">
        {s.interests.map(t => <span key={t} className="chip">{t}</span>)}
      </div>
    </header>
  );
}

function News() {
  const s = window.SITE;
  const [limit, setLimit] = useState(4);
  const items = s.news.slice(0, limit);
  return (
    <section className="block" id="news" data-screen-label="02 news">
      <SecHead num="01" title="Recent" aside="last update · apr 2026"/>
      {items.map((n, i) => (
        <div className="news-ticker" key={i}>
          <div className="news-ticker__date">{n.date}</div>
          <div className="news-ticker__tag">{n.tag}</div>
          <div className="news-ticker__text">{n.text}</div>
        </div>
      ))}
      {limit < s.news.length ? (
        <button className="btn btn-ghost" style={{marginTop:'var(--s-4)'}} onClick={() => setLimit(99)}>
          Show {s.news.length - limit} older →
        </button>
      ) : s.news.length > 4 ? (
        <button className="btn btn-ghost" style={{marginTop:'var(--s-4)'}} onClick={() => setLimit(4)}>
          ↑ Collapse
        </button>
      ) : null}
    </section>
  );
}

function Publications() {
  const s = window.SITE;
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault(); inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const filters = [
    { id: 'all',       label: 'all' },
    { id: 'conf',      label: 'conference' },
    { id: 'workshop',  label: 'workshop' },
    { id: 'preprint',  label: 'preprint' },
    { id: 'safety',    label: 'safety' },
    { id: 'diffusion', label: 'diffusion' },
    { id: 'active learning', label: 'active learning' },
  ];

  const list = useMemo(() => {
    let xs = s.pubs.slice();
    if (['conf','workshop','preprint'].includes(filter)) xs = xs.filter(p => p.kind === filter);
    else if (filter !== 'all') xs = xs.filter(p => p.topics.includes(filter));
    if (q) {
      const Q = q.toLowerCase();
      xs = xs.filter(p =>
        p.title.toLowerCase().includes(Q)
        || p.authors.some(([n]) => n.toLowerCase().includes(Q))
        || p.venue.toLowerCase().includes(Q)
        || p.topics.some(t => t.toLowerCase().includes(Q))
        || (p.tldr || '').toLowerCase().includes(Q)
      );
    }
    xs.sort((a,b) => b.year - a.year);
    return xs;
  }, [q, filter]);

  const grouped = useMemo(() => {
    const g = {};
    list.forEach(p => { (g[p.year] ||= []).push(p); });
    return Object.entries(g).sort((a,b) => b[0] - a[0]);
  }, [list]);

  return (
    <section className="block" id="publications" data-screen-label="03 publications">
      <SecHead num="Ⅱ" title="Publications" aside="* equal contribution">
        <span className="faint"> · {s.pubs.length} total</span>
      </SecHead>

      <div className="pub-tools">
        <div className="pub-search">
          <span className="prefix">/</span>
          <input ref={inputRef} type="text" placeholder="filter by title, author, venue, topic…" value={q} onChange={e => setQ(e.target.value)} aria-label="search publications"/>
          {!q ? <span className="t-mono-xs faint"><kbd>/</kbd></span>
               : <button className="btn btn-ghost" style={{padding:'2px 8px', fontSize:11}} onClick={() => setQ('')}>clear</button>}
        </div>
        <div className="pub-filters">
          {filters.map(f => (
            <button key={f.id} className={cls('chip', filter === f.id && 'is-active')} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="pub-count">{list.length} / {s.pubs.length}</div>
      </div>

      {list.length === 0 ? (
        <div className="t-mono-sm muted" style={{padding:'var(--s-5) 0'}}>nothing matches — try clearing filters.</div>
      ) : (
        grouped.map(([year, items]) => (
          <div key={year} className="year-group">
            <div className="year-label">{year}</div>
            <ul className="pub-list">
              {items.map(p => (
                <PubRow key={p.key} pub={p} open={open === p.key} onToggle={() => setOpen(open === p.key ? null : p.key)} match={q}/>
              ))}
            </ul>
          </div>
        ))
      )}

      <p className="t-mono-xs faint" style={{marginTop:'var(--s-4)'}}>
        Tip: press <kbd>/</kbd> to focus search · click a row to expand the TL;DR & BibTeX.
      </p>
    </section>
  );
}

function Experience() {
  const s = window.SITE;
  return (
    <section className="block" id="experience" data-screen-label="05 experience">
      <SecHead num="04" title="Experience"/>
      <ul className="tl-list">
        {s.experience.map((e, i) => <TlEntry key={i} {...e}/>)}
      </ul>
    </section>
  );
}

function EducationAwards() {
  const s = window.SITE;
  return (
    <section className="block" id="education" data-screen-label="06 education">
      <SecHead num="05" title="Education & honors"/>
      <ul className="tl-list">
        {s.education.map((e, i) => (
          <TlEntry key={i} when={e.when} role={e.degree} org={e.school} place={e.place} notes={e.notes}/>
        ))}
      </ul>
      <div className="t-caps" style={{marginTop:'var(--s-5)', marginBottom:'var(--s-3)'}}>Selected awards</div>
      {s.awards.map((a, i) => (
        <div className="news-ticker" key={i}>
          <div className="news-ticker__date">{a.when}</div>
          <div className="news-ticker__tag">award</div>
          <div className="news-ticker__text">{a.what}</div>
        </div>
      ))}
    </section>
  );
}

function Skills() {
  const s = window.SITE;
  return (
    <section className="block" id="skills" data-screen-label="07 toolkit">
      <SecHead num="06" title="Toolkit"/>
      <div className="skills-grid">
        <div>
          <div className="t-caps" style={{marginBottom:'var(--s-3)'}}>Languages</div>
          <dl className="kv">
            {s.skills.languages.map(([l, level], i) => (
              <React.Fragment key={i}>
                <dt>{l.toLowerCase()}</dt><dd>{level}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
        <div>
          <div className="t-caps" style={{marginBottom:'var(--s-3)'}}>Programming</div>
          <div style={{display:'flex', flexWrap:'wrap', gap: 6}}>
            {s.skills.programming.map(p => <span key={p} className="chip">{p}</span>)}
          </div>
        </div>
        <div>
          <div className="t-caps" style={{marginBottom:'var(--s-3)'}}>Certificates</div>
          <ul style={{margin:0, padding:0, listStyle:'none', fontSize:'var(--fs-sm)', color:'var(--fg-2)', lineHeight: 1.7}}>
            {s.skills.certs.map(c => <li key={c}>— {c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Masthead, News, Publications, Experience, EducationAwards, Skills });
