// papers.jsx — interactive visualizations, one per paper

/* ============================================================
   C1 — A Simple Yet Powerful Deep Active Learning
        with Snapshots Ensemble (ICLR 2023)

   Combined Fig. 3 + Fig. 4 interactive demo.
   Both panels share the same 2D projected parameter space (θ₁, θ₂).

   Left — Fig. 4 (Appendix A.4):
     Background = test-accuracy contour.
     SE: one wide flat basin; the training trajectory spirals in
         then circles the optimum at high LR; red × = snapshots.
     DE: three narrow separate peaks; red × at each member.
     Caption: "SE picks snapshots weak individually but strong
     together around the wider optimum. Each member of DE falls
     into their own narrow optima."

   Right — Fig. 3 (main body):
     Background = predicted class at each (θ₁, θ₂) for one image
     (blue = dog, red = cat). Black × = snapshot predicts correctly;
     red × = incorrectly.
     Low-VR image: decision boundary is far from the cluster →
       all 5 snapshots in same color region → all agree.
     High-VR image: boundary cuts through the cluster →
       snapshots split → high disagreement → AL selects this.
   ============================================================ */

// 5 SE parameter snapshots within the wide flat basin
const C1_SE = [
  [-0.30,  0.10],
  [-0.05,  0.32],
  [ 0.28,  0.15],
  [ 0.22, -0.20],
  [-0.12, -0.25],
];

// 3 DE members, each at its own separate narrow optimum
const C1_DE = [
  [-0.50,  0.38],
  [ 0.48,  0.30],
  [-0.08, -0.55],
];

// Training trajectory for SE: inward spiral (convergence) then
// high-LR exploration looping through the snapshot positions.
function c1Traj() {
  const pts = [];
  // Phase 1 — convergence (dashed in rendering): spiral in
  for (let i = 0; i <= 90; i++) {
    const t = i / 90;
    const r = 0.82 - 0.60 * t;
    const angle = t * 4.3 * Math.PI + 1.6;
    pts.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }
  // Phase 2 — high-LR exploration (solid): loop through snapshots
  const loop = [...C1_SE, C1_SE[0]];
  for (let s = 0; s < loop.length - 1; s++) {
    const [ax, ay] = loop[s], [bx, by] = loop[s + 1];
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      const perp = Math.sin(t * Math.PI) * 0.07;
      const nx = -(by - ay), ny = bx - ax;
      const len = Math.hypot(nx, ny) || 1;
      pts.push([
        ax + (bx - ax) * t + (nx / len) * perp,
        ay + (by - ay) * t + (ny / len) * perp,
      ]);
    }
  }
  return pts;
}

// Test-accuracy value at (tx, ty) for SE or DE mode.
// SE: one wide Gaussian (wide flat optimum).
// DE: three narrow Gaussians (separate narrow optima).
function c1Acc(tx, ty, mode) {
  if (mode === 'se') {
    return 0.48 + 0.44 * Math.exp(-(tx * tx + ty * ty) / 0.32);
  }
  return C1_DE.reduce((best, [px, py]) =>
    Math.max(best, 0.28 + 0.62 * Math.exp(-((tx-px)**2 + (ty-py)**2) / 0.022))
  , 0.28);
}

// Predicted class (0=dog/blue, 1=cat/red) at parameter (tx, ty)
// for a specific test image selected by vrMode.
//
// Ground truth for both images: cat (1).
//
// low-VR:  boundary at ty = 0.46 — above all 5 SE snapshots
//          (max ty in C1_SE is 0.32) → all predict cat → all agree.
// high-VR: boundary at ty = −0.3·tx + 0.05 — cuts through cluster:
//          snaps 2 & 3 cross above → predict dog (incorrect),
//          snaps 1, 4, 5 stay below → predict cat (correct).
function c1Pred(tx, ty, vrMode) {
  const d = vrMode === 'low' ? ty - 0.46 : ty - (-0.30 * tx + 0.05);
  return d > 0 ? 0 : 1; // above boundary = dog, below = cat
}

const C1_GT = 1; // ground truth: cat

function C1Demo() {
  const canvasRef = useRef(null);
  const [canvasKey, setCanvasKey] = useState(0);
  const [ensMode, setEnsMode] = useState('se');
  const [vrMode, setVrMode]   = useState('high');
  const traj = useMemo(() => c1Traj(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => setCanvasKey(k => k + 1));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const g = canvas.getContext('2d');
    g.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';

    const DIVW = 1;
    const PAD  = 10;
    const LBLH = 20; // bottom label height
    const PW   = (W - DIVW) / 2;
    const PH   = H - LBLH;

    // World → canvas coords for each panel
    const toX = (tx, ox) => ox + PAD + (tx + 1) / 2 * (PW - 2 * PAD);
    const toY = ty => PAD + (1 - (ty + 1) / 2) * (PH - 2 * PAD);

    // Draw a pixel-level heatmap into [ox, 0] of width PW, height PH
    function drawHeatmap(ox, getColor) {
      const RES = 3;
      const cols = Math.max(1, Math.floor((PW - 2 * PAD) / RES));
      const rows = Math.max(1, Math.floor((PH - 2 * PAD) / RES));
      const oc = document.createElement('canvas');
      oc.width = cols * RES; oc.height = rows * RES;
      const og = oc.getContext('2d');
      const img = og.createImageData(cols * RES, rows * RES);
      for (let py = 0; py < rows; py++) {
        for (let px = 0; px < cols; px++) {
          const tx = -1 + (px + 0.5) / cols * 2;
          const ty =  1 - (py + 0.5) / rows * 2;
          const [r, gv, b, a] = getColor(tx, ty);
          for (let dy = 0; dy < RES; dy++) for (let dx = 0; dx < RES; dx++) {
            const idx = ((py*RES+dy)*(cols*RES) + (px*RES+dx)) * 4;
            img.data[idx]=r; img.data[idx+1]=gv; img.data[idx+2]=b; img.data[idx+3]=a;
          }
        }
      }
      og.putImageData(img, 0, 0);
      g.drawImage(oc, ox + PAD, PAD, cols * RES, rows * RES);
    }

    // --- LEFT: Fig. 4 — test-accuracy contour ---
    g.fillStyle = dark ? '#0e0f10' : '#f0f1f3';
    g.fillRect(0, 0, PW, H);

    drawHeatmap(0, (tx, ty) => {
      const v = Math.pow(Math.max(0, c1Acc(tx, ty, ensMode)), 0.65);
      if (dark) return [
        Math.round(18 + v * 52), Math.round(22 + v * 178), Math.round(38 + v * 182), 255];
      return [
        Math.round(55 + v * 165), Math.round(75 + v * 165), Math.round(95 + v * 150), 255];
    });

    // SE: convergence (dashed) then exploration (solid)
    if (ensMode === 'se') {
      g.lineWidth = 1.2;
      g.setLineDash([3, 4]);
      g.strokeStyle = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)';
      g.beginPath();
      traj.slice(0, 91).forEach(([tx, ty], i) => {
        const x = toX(tx, 0), y = toY(ty);
        i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      });
      g.stroke();

      g.lineWidth = 1.5;
      g.setLineDash([]);
      g.strokeStyle = dark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.40)';
      g.beginPath();
      traj.slice(91).forEach(([tx, ty], i) => {
        const x = toX(tx, 0), y = toY(ty);
        i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      });
      g.stroke();
    }
    g.setLineDash([]);

    // Red × marks for snapshot / member locations
    const leftSnaps = ensMode === 'se' ? C1_SE : C1_DE;
    leftSnaps.forEach(([tx, ty]) => {
      const x = toX(tx, 0), y = toY(ty), s = 5.5;
      g.strokeStyle = '#ef4444';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(x-s, y-s); g.lineTo(x+s, y+s);
      g.moveTo(x+s, y-s); g.lineTo(x-s, y+s);
      g.stroke();
    });

    // Left panel bottom label
    g.font = '10px monospace'; g.textAlign = 'center';
    g.fillStyle = dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.40)';
    g.fillText(
      ensMode === 'se' ? 'Fig. 4  ·  SE: one wide optimum'
                       : 'Fig. 4  ·  DE: three separate optima',
      PW / 2, H - 5);

    // --- DIVIDER ---
    g.fillStyle = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)';
    g.fillRect(PW, 0, DIVW, H);

    // --- RIGHT: Fig. 3 — prediction map for one test image ---
    const OX = PW + DIVW;
    g.fillStyle = dark ? '#0e0f10' : '#f0f1f3';
    g.fillRect(OX, 0, PW, H);

    drawHeatmap(OX, (tx, ty) => {
      const cls = c1Pred(tx, ty, vrMode);
      if (cls === 0) // dog → blue
        return dark ? [45, 90, 210, 150] : [37, 90, 230, 130];
      else           // cat → red
        return dark ? [210, 50, 50, 150] : [220, 40, 40, 130];
    });

    // Draw the decision boundary line
    g.lineWidth = 1.5;
    g.strokeStyle = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.40)';
    g.setLineDash([5, 4]);
    g.beginPath();
    const bx0 = toX(-1, OX), bx1 = toX(1, OX);
    const bLine = (tx) => vrMode === 'low' ? 0.46 : -0.30 * tx + 0.05;
    g.moveTo(bx0, toY(bLine(-1)));
    g.lineTo(bx1, toY(bLine( 1)));
    g.stroke();
    g.setLineDash([]);

    // SE snapshot crosses: black = correct, red = incorrect
    C1_SE.forEach(([tx, ty]) => {
      const correct = c1Pred(tx, ty, vrMode) === C1_GT;
      const x = toX(tx, OX), y = toY(ty), s = 5.5;
      g.strokeStyle = correct
        ? (dark ? 'rgba(240,240,245,0.90)' : 'rgba(0,0,0,0.82)')
        : '#ef4444';
      g.lineWidth = 2.2;
      g.beginPath();
      g.moveTo(x-s, y-s); g.lineTo(x+s, y+s);
      g.moveTo(x+s, y-s); g.lineTo(x-s, y+s);
      g.stroke();
    });

    // Mini legend (right panel, top-left)
    const lx = OX + PAD + 4, ly = PAD + 5;
    g.font = '9.5px monospace'; g.textAlign = 'left';
    [ [dark?'#3b5ed0':'#2350cc', 'dog (class 0)'],
      [dark?'#c83030':'#b82222', 'cat (class 1)'] ].forEach(([col, lbl], i) => {
      g.fillStyle = col;
      g.fillRect(lx, ly + i * 14, 8, 8);
      g.fillStyle = dark ? 'rgba(255,255,255,0.42)' : 'rgba(0,0,0,0.42)';
      g.fillText(lbl, lx + 12, ly + i * 14 + 7);
    });

    // Right panel bottom label
    g.font = '10px monospace'; g.textAlign = 'center';
    g.fillStyle = dark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.40)';
    g.fillText(
      vrMode === 'low' ? 'Fig. 3  ·  low-VR image: boundary far from cluster'
                       : 'Fig. 3  ·  high-VR image: boundary cuts cluster',
      OX + PW / 2, H - 5);

  }, [ensMode, vrMode, traj, canvasKey]);

  // Stats for the side panel
  const snapPreds = C1_SE.map(([tx, ty]) => c1Pred(tx, ty, vrMode));
  const nCat      = snapPreds.filter(p => p === C1_GT).length;
  const nMode     = Math.max(nCat, C1_SE.length - nCat);
  const vr        = (1 - nMode / C1_SE.length).toFixed(2);

  return (
    <section className="block" id="c1" data-screen-label="C1">
      <SecHead num="C1" title="Snapshots ensemble · active learning" aside="ICLR 2023"/>
      <p style={{ maxWidth:'var(--measure)', marginBottom:'var(--s-5)', fontSize:'var(--fs-md)', color:'var(--fg-2)', lineHeight:1.65 }}>
        Both panels show the same 2D projected parameter space (θ₁, θ₂).
        <b> Left (Fig. 4)</b>: test-accuracy contour — toggle SE vs DE to see one wide flat optimum against three narrow separate ones.
        <b> Right (Fig. 3)</b>: for a specific test image, each pixel is colored by the class predicted at that parameter location (blue = dog, red = cat).
        Black × = snapshot predicts correctly; red × = incorrectly.
        Toggle the image to move the decision boundary relative to the cluster.
      </p>

      <div className="paper-demo">
        <canvas ref={canvasRef} className="paper-demo__canvas" style={{ aspectRatio:'5/3' }} />

        <div className="paper-demo__panel">
          <div className="paper-demo__group">
            <div className="t-caps" style={{ marginBottom:'var(--s-2)' }}>Left — ensemble type</div>
            <div style={{ display:'flex', gap:6 }}>
              {[['se','SE (1 run)'],['de','DE (3 models)']].map(([m, label]) => (
                <button key={m} className={cls('chip', ensMode===m && 'is-active')} onClick={() => setEnsMode(m)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="paper-demo__group">
            <div className="t-caps" style={{ marginBottom:'var(--s-2)' }}>Right — test image</div>
            <div style={{ display:'flex', gap:6 }}>
              {[['low','low VR (easy)'],['high','high VR (hard)']].map(([m, label]) => (
                <button key={m} className={cls('chip', vrMode===m && 'is-active')} onClick={() => setVrMode(m)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, display:'grid', gridTemplateColumns:'auto 1fr', columnGap:10, rowGap:4, color:'var(--fg-2)' }}>
            <span style={{ color:'var(--fg-mute)' }}>ground truth</span>
            <span>cat</span>
            <span style={{ color:'var(--fg-mute)' }}>correct / total</span>
            <span>{nCat} / {C1_SE.length} snapshots</span>
            <span style={{ color:'var(--fg-mute)' }}>VR score</span>
            <span style={{ color: vr === '0.00' ? '#22c55e' : '#f59e0b' }}>{vr}</span>
          </div>

          <p className="paper-demo__note">
            {vrMode === 'low'
              ? 'Decision boundary (dashed) is above the whole cluster. All 5 snapshots land in the cat region and agree — VR = 0. SE correctly scores this as not worth querying.'
              : `Boundary cuts through the cluster: ${nCat} snapshots predict cat (correct, black ×), ${C1_SE.length-nCat} predict dog (incorrect, red ×). Disagreement drives a high VR — SE flags this for labeling.`}
          </p>

          <p className="paper-demo__note" style={{ borderTop:'none', paddingTop:0, color:'var(--fg-mute)' }}>
            {ensMode === 'se'
              ? 'SE: dashed = convergence phase; solid = high-LR snapshot collection. All 5 snapshots stay within one wide basin.'
              : 'DE: each × is an independently trained model. Each fell into its own narrow optimum — no shared trajectory.'}
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { C1Demo });
