// components.jsx — shared UI components
const { useState, useEffect, useRef, useMemo, useCallback } = React;

function cls(...xs) { return xs.filter(Boolean).join(' '); }

function Venue({ kind, children }) {
  const c = kind === 'top' ? 'venue venue--top'
          : kind === 'arxiv' ? 'venue venue--arxiv'
          : kind === 'wshop' ? 'venue venue--wshop'
          : kind === 'accent' ? 'venue venue--accent'
          : 'venue';
  return <span className={c}>{children}</span>;
}

function SecHead({ num, title, aside, children }) {
  return (
    <div className="sec-head">
      <span className="num">{num}</span>
      <h2>{title}</h2>
      {(aside || children) && <span className="aside">{aside}{children}</span>}
    </div>
  );
}

function Authors({ authors }) {
  return (
    <span>
      {authors.map(([name, isMe, eq], i) => (
        <React.Fragment key={i}>
          {isMe ? <b>{name}</b> : name}
          {eq ? <sup>*</sup> : null}
          {i < authors.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </span>
  );
}

function highlight(s, match) {
  if (!match) return s;
  const re = new RegExp(`(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const parts = s.split(re);
  return parts.map((p, i) => re.test(p)
    ? <mark key={i} className="hl">{p}</mark>
    : <React.Fragment key={i}>{p}</React.Fragment>);
}

function PubRow({ pub, open, onToggle, match }) {
  return (
    <li>
      <div className={cls('pub', open && 'is-open')} onClick={onToggle}>
        <div className="pub__key">[{pub.key}]</div>
        <div>
          <p className="pub__title">{highlight(pub.title, match)}</p>
          <div className="pub__authors"><Authors authors={pub.authors}/></div>
        </div>
        <div className="pub__meta">
          <Venue kind={pub.venueClass}>{pub.venue}{pub.venueClass === 'top' ? ' ' + pub.year : ''}</Venue>
          <span className="t-mono-xs muted">{pub.tag}</span>
        </div>
        {open && (
          <div className="pub__details" onClick={(e)=>e.stopPropagation()}>
            <p className="pub__tldr">{pub.tldr}</p>
            <div className="pub__topics">
              {pub.topics.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
            <div className="pub__details-actions">
              {pub.links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn">{l.label} ↗</a>)}
              <BibButton bibtex={pub.bibtex}/>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

function BibButton({ bibtex }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e.stopPropagation();
    try { await navigator.clipboard.writeText(bibtex); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <>
      <button className="btn" onClick={() => setShow(s=>!s)}>
        {show ? '▾ bibtex' : '▸ bibtex'}
      </button>
      {show && (
        <div style={{width:'100%'}}>
          <pre className="bibtex">{bibtex}</pre>
          <button className="btn btn-ghost" onClick={copy} style={{marginTop:'var(--s-2)'}}>
            {copied ? '✓ copied' : 'copy'}
          </button>
        </div>
      )}
    </>
  );
}

function TlEntry({ when, role, org, notes, place }) {
  return (
    <li className="tl">
      <div className="tl__when">{when}</div>
      <div>
        <p className="tl__role">{role}</p>
        <div className="tl__org">{org}{place ? ` · ${place}` : ''}</div>
        {notes && notes.length > 0 && (
          <ul className="tl__notes">{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
        )}
      </div>
    </li>
  );
}

Object.assign(window, { Venue, SecHead, Authors, PubRow, BibButton, TlEntry, cls, highlight });
