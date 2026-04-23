// data.js — content for Sanghyun Kim's personal page
window.SITE = {
  name: "Sanghyun Kim",
  name_ko: "김상현",
  role: "AI Research Scientist · Project Leader",
  tagline: "I work on generative models — making them safer, more controllable, and more useful on-device.",
  blurb: "Currently leading an on-device agent project at Samsung Research. Previously technically led the Gauss-Image on-device T2I foundation model, shipped in the Galaxy S26 series. M.S. from KAIST under Juho Lee & Jinwoo Shin, where I worked on safety alignment for diffusion models.",
  location: "Seoul, Republic of Korea",
  email: "sanghn.kim.sr@gmail.com",
  emailWork: "sanghn.kim@samsung.com",
  github: "nannullna",
  scholar: "BBQXZhkAAAAJ",
  interests: ["diffusion models", "safety alignment", "on-device generative AI", "Bayesian inference", "active learning", "agentic frameworks"],

  // Research statement — the thesis that connects everything.
  thesis: {
    lede: "My work focuses on generative models under real constraints — safety, size, and reliability.",
    body: "Most of my research asks: when do generative models fail to behave — when we ask them to stay safe, stay small, or acknowledge uncertainty? I tend to treat these as statistical problems. Alignment training can inadvertently re-surface suppressed behaviors. Attention maps carry more signal than is typically used. There is often useful information already inside the model, if you look carefully.",
    pillars: [
      { key: "01", title: "Alignment and its failure modes", body: "Safety training can re-surface the very behaviors it was meant to remove. I try to understand when and why this happens, and design training that prevents it." },
      { key: "02", title: "On-device generation", body: "Models that ship in phones have hard size budgets. I work on pre-training and inference strategies that keep generative quality within those budgets." },
      { key: "03", title: "Inference-time signals", body: "Rather than training auxiliary heads, I look at information already in the model — posteriors approximated from attention, snapshot ensembles, and feedback inversions." },
    ]
  },

  // Journey — the dots to connect.
  journey: [
    { year: "2017", dot: "enlisted", title: "KATUSA sergeant", place: "USFK Yongsan", text: "Two years of Army logistics taught me what a well-specified pipeline is worth. Shipped the first digital WHNS submission flow." },
    { year: "2020", dot: "pivot",     title: "Business → Statistics → CS", place: "Yonsei", text: "Started in BBA. Fell in love with Bayesian inference through applied statistics coursework; double-minored in CS to close the loop." },
    { year: "2022", dot: "first paper", title: "First workshop paper", place: "AAAI Workshop", text: "Uplift modeling on observational time-series. First taste of writing an ML paper end-to-end — and realizing I wanted to do this full-time." },
    { year: "2022", dot: "kaist",     title: "KAIST M.S. — SIML Lab", place: "Daejeon · Seoul", text: "Advisor: Juho Lee. Co-advisor: Jinwoo Shin. Worked across active learning, Bayesian deep learning, and then diffusion safety." },
    { year: "2023", dot: "iclr-1",    title: "First ICLR", place: "ICLR 2023", text: "\"Snapshots ensemble\" — showing SGD trajectories are a surprisingly good posterior approximation for active learning." },
    { year: "2024", dot: "eccv",      title: "ECCV & thesis", place: "KAIST", text: "Safeguard T2I: invert from human feedback, steer at inference. Graduated with the same idea as my M.S. thesis." },
    { year: "2024", dot: "samsung",   title: "Samsung Research — Gauss-Image", place: "Seoul", text: "Technically led pre-training & fine-tuning of Gauss-Image, an on-device T2I foundation model." },
    { year: "2026", dot: "ship",      title: "Galaxy S26", place: "shipped", text: "Gauss-Image-powered generative wallpaper, image eraser, and harmonization launched on the Galaxy S26 series." },
    { year: "2026", dot: "iclr-2",    title: "Second ICLR", place: "ICLR 2026", text: "\"Model already knows the best noise\" — Bayesian active noise selection via attention. Video diffusion without retraining." },
    { year: "2026", dot: "argo",      title: "Leading on-device agents", place: "Samsung Research", text: "Took on leadership of an on-device agentic framework for proactive, perception-triggered device-use assistance." },
  ],

  // Right now — ongoing projects that aren't papers yet.
  now: [
    {
      name: "On-device Agent",
      kind: "Project · lead",
      status: "ongoing",
      year: "2026 —",
      tldr: "On-device agentic framework for proactive device-use assistance. Perception triggers → multimodal context → orchestrator → generative UI.",
      role: "Overall project lead; setting the research agenda across perception, planning, and UI generation."
    },
    {
      name: "Generative UI",
      kind: "Framework · Agents",
      status: "developing",
      year: "2025 —",
      tldr: "Platform-agnostic generative-UI framework and a suite of agents that use it — perception, planning, and on-the-fly UI composition for Samsung One UI.",
      role: "Architect & tech lead of the framework; leading the agent team building on top of it."
    },
    {
      name: "Gauss-Image",
      kind: "Foundation model",
      status: "released",
      year: "2024 — 2026",
      tldr: "On-device T2I foundation model powering generative wallpaper, image eraser, and harmonization on the Galaxy S26 series.",
      role: "Technical lead — pre-training, fine-tuning, downstream fine-tuning."
    },
  ],

  // Goals — what's next, in human language.
  goals: [
    { tag: "near", text: "Make on-device agents actually proactive — context-aware, privacy-preserving, and honest about uncertainty.", k: "proactive · private · honest" },
    { tag: "mid",  text: "Keep pushing safety methods that work without sacrificing capability. Alignment shouldn't be a tax.",              k: "safety · capability" },
    { tag: "far",  text: "A generative system that can reliably introspect — that can tell you what it's confident about and why. The 'model knows itself' line, taken seriously.", k: "introspection · foundations" },
  ],

  news: [
    { date: "Jan 2026", text: "Took on leadership of an on-device agentic framework for proactive device-use assistance.", tag: "role" },
    { date: "Jan 2026", text: "Launched generative wallpaper, image eraser, and harmonization features in Galaxy S26.", tag: "ship" },
    { date: "Nov 2025", text: "\"Model already knows the best noise\" accepted to ICLR 2026 (poster).", tag: "paper" },
    { date: "Aug 2025", text: "Filed patent: Method and apparatus for generating images (No. 10-2025-0209827).", tag: "patent" },
    { date: "Jul 2024", text: "\"Safeguard T2I with human feedback inversion\" accepted to ECCV 2024.", tag: "paper" },
    { date: "Aug 2024", text: "Graduated M.S. from KAIST. Thesis: Safeguard Text-to-Image Diffusion Models with Human Feedback Inversion.", tag: "milestone" },
  ],

  pubs: [
    {
      key: "C3", year: 2026, venue: "ICLR", venueClass: "top", kind: "conf", tag: "poster",
      title: "Model already knows the best noise: Bayesian active noise selection via attention in video diffusion models",
      authors: [["Kwanyoung Kim"], ["Sanghyun Kim", true]],
      topics: ["diffusion", "Bayesian", "video"],
      tldr: "We propose ANSE, a training-free framework that selects high-quality initial noise for video diffusion by measuring uncertainty across stochastic attention samples (BANSA acquisition function). Improves video quality and temporal coherence across diverse text-to-video backbones with marginal inference overhead.",
      bibtex: "@inproceedings{kim2026noise,\n  title={Model already knows the best noise: Bayesian active noise selection via attention in video diffusion models},\n  author={Kim, Kwanyoung and Kim, Sanghyun},\n  booktitle={ICLR},\n  year={2026}\n}",
      links: [ {label:"openreview", href:"https://openreview.net/forum?id=11dzFZ2UM1"} ],
    },
    {
      key: "P2", year: 2024, venue: "arXiv", venueClass: "arxiv", kind: "preprint", tag: "preprint",
      title: "Safety alignment backfires: preventing the re-emergence of suppressed concepts in fine-tuned text-to-image diffusion models",
      authors: [["Sanghyun Kim", true], ["Moonseok Choi"], ["Jinwoo Shin"], ["Juho Lee"]],
      topics: ["diffusion", "safety"],
      tldr: "Fine-tuning on benign data can revive harmful concepts that safety alignment suppressed — a vulnerability we call fine-tuning jailbreaking. We characterize when it happens and propose Modular LoRA: train Safety LoRA and Fine-Tuning LoRA separately, merge at inference.",
      bibtex: "@article{kim2024backfires,\n  title={Safety alignment backfires},\n  author={Kim, Sanghyun and Choi, Moonseok and Shin, Jinwoo and Lee, Juho},\n  journal={arXiv},\n  year={2024}\n}",
      links: [],
    },
    {
      key: "C2", year: 2024, venue: "ECCV", venueClass: "top", kind: "conf", tag: "poster",
      title: "Safeguard text-to-image diffusion models with human feedback inversion",
      authors: [["Sanghyun Kim", true], ["Seohyeon Jung"], ["Balhae Kim"], ["Moonseok Choi"], ["Jinwoo Shin"], ["Juho Lee"]],
      topics: ["diffusion", "safety", "RLHF"],
      tldr: "We propose HFI (Human Feedback Inversion), which condenses human feedback on objectionable images into textual tokens and uses self-distillation to suppress the corresponding concepts — without labeled unsafe data and without degrading generation quality.",
      bibtex: "@inproceedings{kim2024safeguard,\n  title={Safeguard text-to-image diffusion models with human feedback inversion},\n  author={Kim, Sanghyun and others},\n  booktitle={ECCV},\n  year={2024}\n}",
      links: [],
    },
    {
      key: "P1", year: 2024, venue: "arXiv", venueClass: "arxiv", kind: "preprint", tag: "preprint",
      title: "Slot-mixup with subsampling: a simple regularization for WSI classification",
      authors: [["Seongho Keum"], ["Sanghyun Kim", true]],
      topics: ["medical imaging", "regularization"],
      tldr: "A tiny, nearly-free regularization that substantially improves whole-slide image classifiers by mixing slot-level features under subsampling.",
      bibtex: "@article{keum2024slotmixup,\n  title={Slot-mixup with subsampling},\n  author={Keum, Seongho and Kim, Sanghyun},\n  journal={arXiv},\n  year={2024}\n}",
      links: [],
    },
    {
      key: "W2", year: 2023, venue: "ICML 2023", venueClass: "wshop", kind: "workshop", tag: "workshop",
      title: "Towards safe self-distillation of internet-scale text-to-image diffusion models",
      authors: [["Sanghyun Kim", true], ["Seohyeon Jung"], ["Balhae Kim"], ["Moonseok Choi"], ["Jinwoo Shin"], ["Juho Lee"]],
      topics: ["diffusion", "safety", "distillation"],
      tldr: "Self-distillation with a safety-aware teacher transfers safety behavior without labeled unsafe data. The precursor to our ECCV work.",
      bibtex: "@inproceedings{kim2023safeselfdistill,\n  title={Towards safe self-distillation of internet-scale T2I diffusion},\n  author={Kim, Sanghyun and others},\n  booktitle={ICML Workshop},\n  year={2023}\n}",
      links: [],
    },
    {
      key: "C1", year: 2023, venue: "ICLR", venueClass: "top", kind: "conf", tag: "poster",
      title: "A simple yet powerful deep active learning with snapshots ensemble",
      authors: [["Seohyeon Jung", false, true], ["Sanghyun Kim", true, true]],
      topics: ["active learning", "Bayesian"],
      tldr: "Using SGD snapshot ensembles as a posterior approximation yields active-learning gains comparable to much heavier Bayesian methods — almost for free.",
      bibtex: "@inproceedings{jung2023snapshots,\n  title={A simple yet powerful deep active learning with snapshots ensemble},\n  author={Jung, Seohyeon and Kim, Sanghyun},\n  booktitle={ICLR},\n  year={2023}\n}",
      links: [],
    },
    {
      key: "W1", year: 2023, venue: "AAAI-23 Bridge", venueClass: "wshop", kind: "workshop", tag: "oral",
      title: "Modeling uplift from observational time-series in continual scenarios",
      authors: [["Sanghyun Kim", true], ["Jungwon Choi"], ["Namhee Kim"], ["Jaesung Ryu"], ["Juho Lee"]],
      topics: ["causal", "time-series"],
      tldr: "An uplift model for observational time-series that continues to adapt as distribution drifts — evaluated on marketing and healthcare-style data.",
      bibtex: "@inproceedings{kim2023uplift,\n  title={Modeling uplift from observational time-series in continual scenarios},\n  author={Kim, Sanghyun and Choi, Jungwon and Kim, Namhee and Ryu, Jaesung and Lee, Juho},\n  booktitle={The First AAAI Bridge Program on Continual Causality},\n  series={Proceedings of Machine Learning Research},\n  volume={208},\n  publisher={PMLR},\n  year={2023}\n}",
      links: [ {label:"PMLR", href:"https://proceedings.mlr.press/v208/kim23a.html"} ],
    },
  ],

  experience: [
    {
      when: "Jan 2026 — Present", role: "Project Leader",
      org: "Head of Agent Model for Device Part · AI Core Team, Samsung Research",
      place: "Seoul",
      notes: [
        "Leading an on-device agentic framework for proactive device-use assistance.",
        "Developing multimodal context generator & orchestrator models for a perception-triggered agentic framework.",
        "Developed a platform-agnostic generative-UI framework/renderer for Samsung One UI.",
      ]
    },
    {
      when: "Sep 2024 — Dec 2025", role: "AI Research Scientist",
      org: "Large Vision Model Part · AI Model Team, Samsung Research", place: "Seoul",
      notes: [
        "Technically led pre-training & fine-tuning of Gauss-Image — the on-device foundation model for text-to-image generation.",
        "Launched generative wallpaper, image eraser, and harmonization features in the Galaxy S26 series.",
      ]
    },
    {
      when: "May 2024 — Aug 2024", role: "AI Research Intern",
      org: "Advanced ML Lab · LG AI Research", place: "Seoul",
      notes: ["Time-series diffusion models for stock and healthcare data (advisors: Moontae Lee, Sungwoo Park)."]
    },
    {
      when: "Mar 2022 — Dec 2022", role: "Teaching Assistant",
      org: "Government-funded AI Bootcamp · Likelion Inc.", place: "Seoul", notes: []
    },
    {
      when: "Jan 2022 — Feb 2022", role: "Research Intern",
      org: "Statistical Inference & ML Lab · KAIST", place: "Daejeon",
      notes: ["Self-supervised and active learning (advisor: Juho Lee)."]
    },
    {
      when: "May 2017 — Feb 2019", role: "Sergeant · Admin Specialist (KATUSA)",
      org: "Multinational Logistics Division J4 · USFK HQ", place: "Yongsan · Humphreys",
      notes: ["Streamlined the Wartime Host Nation Support (WHNS) submission & review process."]
    },
  ],

  education: [
    {
      when: "Aug 2022 — Aug 2024", degree: "M.S. Artificial Intelligence",
      school: "KAIST", place: "Seoul",
      notes: ["Statistical Inference & ML Lab — advisor Juho Lee; co-advisor Jinwoo Shin.", "Thesis: Safeguard Text-to-Image Diffusion Models with Human Feedback Inversion."]
    },
    {
      when: "Mar 2015 — Aug 2022", degree: "B.B.A.",
      school: "Yonsei University", place: "Seoul",
      notes: ["GPA 4.02 / 4.3 (97.8/100).", "Double minors — Computer Science and Applied Statistics."]
    },
  ],

  awards: [
    { when: "Jul 2022", what: "Minister of Science & Technology Award — 2022 National AI Challenge, 2nd/54 (MRC track)" },
    { when: "Dec 2021", what: "Best Mentoring Team — Yonsei Eagle's Mentoring (R/Python & Statistics)" },
  ],

  skills: {
    languages: [
      ["Korean", "native"], ["English", "high · TOEIC 990 · TEPS 510"]
    ],
    programming: ["Python", "R", "C++", "CUDA / C++", "PyTorch", "TensorFlow", "JAX"],
    certs: ["ADsP (Data Analysis)", "SQLD (SQL)", "PADI Open Water", "Emergency First Response"]
  },
};
