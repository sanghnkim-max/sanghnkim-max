// cmdk.jsx — command palette + tweaks + sidebar

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => [
    { kind: 'go',     label: 'Jump to top',           action: () => window.scrollTo({top:0, behavior:'smooth'}) },
    { kind: 'go',     label: 'Jump to Research',      action: () => location.hash = '#thesis' },
    { kind: 'go',     label: 'Jump to Publications',  action: () => location.hash = '#publications' },
    { kind: 'go',     label: 'Jump to Now',           action: () => location.hash = '#now' },
    { kind: 'go',     label: 'Jump to C1 — Snapshots', action: () => location.hash = '#c1' },
    { kind: 'go',     label: 'Jump to Directions',    action: () => location.hash = '#goals' },
    { kind: 'go',     label: 'Jump to News',          action: () => location.hash = '#news' },
    { kind: 'go',     label: 'Jump to Experience',    action: () => location.hash = '#experience' },
    { kind: 'go',     label: 'Jump to Education',     action: () => location.hash = '#education' },
    { kind: 'action', label: 'Toggle theme (light/dark)', action: () => toggleTheme() },
    { kind: 'action', label: 'Open Tweaks panel',     action: () => window.dispatchEvent(new CustomEvent('tweaks:open')) },
    { kind: 'open',   label: 'Email Sanghyun (personal)', action: () => location.href = `mailto:${SITE.email}` },
    { kind: 'open',   label: 'Email Sanghyun (work)',    action: () => location.href = `mailto:${SITE.emailWork}` },
    { kind: 'open',   label: 'GitHub · @nannullna',   action: () => window.open(`https://github.com/${SITE.github}`, '_blank') },
    { kind: 'open',   label: 'Google Scholar',        action: () => window.open(`https://scholar.google.com/citations?user=${SITE.scholar}`, '_blank') },
    { kind: 'open',   label: 'Design system',         action: () => location.href = 'design-system.html' },
    { kind: 'open',   label: 'Download cv.tex',       action: () => location.href = 'cv.tex' },
    ...SITE.pubs.map(p => ({
      kind: 'paper', label: `${p.title}  — ${p.venue} ${p.year}`,
      action: () => {
        document.getElementById('publications')?.scrollIntoView({behavior:'smooth', block:'start'});
        setTimeout(() => window.dispatchEvent(new CustomEvent('pub:open', { detail: p.key })), 400);
      }
    })),
  ], []);

  const filtered = useMemo(() => {
    if (!q) return commands;
    const Q = q.toLowerCase();
    return commands.filter(c => c.label.toLowerCase().includes(Q) || c.kind.includes(Q));
  }, [q, commands]);

  useEffect(() => setIdx(0), [q, open]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === '?' && document.activeElement === document.body) {
        e.preventDefault(); setOpen(true);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
    else setQ('');
  }, [open]);

  const run = (c) => { c.action(); setOpen(false); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[idx]) run(filtered[idx]); }
  };

  return (
    <div className={cls('cmdk-backdrop', open && 'is-open')} onClick={() => setOpen(false)}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk__input"
          placeholder="Type a command, search a paper, or jump to a section…"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        {filtered.length === 0 ? (
          <div className="cmdk__empty">No matches.</div>
        ) : (
          <ul className="cmdk__list" onMouseLeave={() => {}}>
            {filtered.slice(0, 40).map((c, i) => (
              <li key={i} className={cls('cmdk__item', i === idx && 'is-active')}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => run(c)}>
                <span className="kind">{c.kind}</span>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="cmdk__hint">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate · <kbd>↵</kbd> run</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

function toggleTheme() {
  const root = document.documentElement;
  const dark = root.getAttribute('data-theme') === 'dark';
  if (dark) { root.removeAttribute('data-theme'); localStorage.setItem('theme', 'light'); }
  else { root.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark'); }
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 230,
  "density": "comfortable",
  "showDots": true
}/*EDITMODE-END*/;

function Tweaks() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(() => {
    try { return { ...TWEAK_DEFAULTS, ...JSON.parse(localStorage.getItem('tweaks') || '{}') }; }
    catch { return TWEAK_DEFAULTS; }
  });

  useEffect(() => {
    const oe = (e) => {
      if (e.data && e.data.type === '__activate_edit_mode') setOpen(true);
      if (e.data && e.data.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', oe);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    window.addEventListener('tweaks:open', () => setOpen(true));
    return () => window.removeEventListener('message', oe);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const h = state.accentHue;
    root.style.setProperty('--accent', `oklch(0.58 0.22 ${h})`);
    root.style.setProperty('--accent-2', `oklch(0.50 0.22 ${h})`);
    root.style.setProperty('--accent-ink', `oklch(0.45 0.22 ${h})`);
    root.style.setProperty('--accent-soft', `oklch(0.95 0.04 ${h})`);
    localStorage.setItem('tweaks', JSON.stringify(state));
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*'); } catch {}
  }, [state]);

  const hues = [230, 200, 160, 130, 40, 20, 340, 290];

  return (
    <div className={cls('tweaks', open && 'is-open')}>
      <div className="tweaks__title">
        <span>Tweaks</span>
        <button onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="tweaks__row">
        <label>Accent hue</label>
        <div className="tweaks__hue-grid">
          {hues.map(h => (
            <button key={h}
              className={cls('tweaks__hue', state.accentHue === h && 'is-active')}
              style={{background: `oklch(0.58 0.22 ${h})`}}
              onClick={() => setState(s => ({...s, accentHue: h}))}
              aria-label={`hue ${h}`}
            />
          ))}
        </div>
      </div>
      <div className="tweaks__row">
        <label>Theme</label>
        <div style={{display:'flex', gap: 6}}>
          <button className="btn" style={{flex:1, fontSize: 11, padding:'5px 8px'}} onClick={() => { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme','light'); }}>◐ Light</button>
          <button className="btn" style={{flex:1, fontSize: 11, padding:'5px 8px'}} onClick={() => { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('theme','dark'); }}>◑ Dark</button>
        </div>
      </div>
      <div className="t-mono-xs faint" style={{marginTop: 'var(--s-3)', paddingTop: 'var(--s-3)', borderTop: '1px solid var(--border)'}}>
        Shortcuts: <kbd>⌘</kbd><kbd>K</kbd> palette · <kbd>t</kbd> theme · <kbd>/</kbd> search
      </div>
    </div>
  );
}

function Sidebar() {
  const [active, setActive] = useState('top');
  const items = [
    { id: 'top',          n: '00', label: 'Top' },
    { id: 'thesis',       n: 'Ⅰ',  label: 'Research' },
    { id: 'publications', n: 'Ⅱ',  label: 'Publications' },
    { id: 'c1',           n: '·',  label: 'C1 · snapshots' },
    { id: 'now',          n: 'Ⅲ',  label: 'Right now' },
    { id: 'goals',        n: 'Ⅳ',  label: 'Directions' },
    { id: 'news',         n: '·',  label: 'Recent' },
    { id: 'experience',   n: '·',  label: 'Experience' },
    { id: 'education',    n: '·',  label: 'Education' },
    { id: 'skills',       n: '·',  label: 'Toolkit' },
  ];

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <aside className="side">
      <div className="side__brand"><span className="dot"/> sanghyun.kim</div>
      <nav aria-label="sections">
        <ol>
          {items.map(i => (
            <li key={i.id} data-n={i.n} className={cls(active === i.id && 'is-active')}>
              <a href={`#${i.id}`}>{i.label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="side__block">
        <b>Shortcuts</b>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, lineHeight: 1.9}}>
          <div><kbd>⌘</kbd><kbd>K</kbd> palette</div>
          <div><kbd>/</kbd> search</div>
          <div><kbd>t</kbd> theme</div>
          <div><kbd>?</kbd> help</div>
        </div>
      </div>
      <div className="side__tools">
        <button className="btn btn-ghost" style={{padding:'4px 8px', fontSize:11}} onClick={toggleTheme}>◐ theme</button>
        <button className="btn btn-ghost" style={{padding:'4px 8px', fontSize:11}} onClick={() => window.dispatchEvent(new CustomEvent('tweaks:open'))}>⚙ tweaks</button>
      </div>
    </aside>
  );
}

Object.assign(window, { CommandPalette, Tweaks, Sidebar, toggleTheme });
