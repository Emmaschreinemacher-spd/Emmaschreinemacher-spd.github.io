import React, { useEffect, useMemo, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Emma",
    subtitle: "Portrait / personal image",
    image: "/emma-foto.png",
    bg: "#d7d7d2",
    rotate: -18,
    w: 360,
    h: 460,
  },
  {
    id: "02",
    title: "FICQ Partners",
    subtitle: "Project placeholder / visual identity",
    image: "/ficq-partners.jpg",
    bg: "#111111",
    rotate: 27,
    w: 440,
    h: 300,
  },
  {
    id: "03",
    title: "Groenteboer",
    subtitle: "Project placeholder / visual research",
    image: "/groenteboer.jpg",
    bg: "#f7f7f5",
    rotate: 14,
    w: 420,
    h: 320,
  },
  {
    id: "04",
    title: "Japan 2024",
    subtitle: "Photography / travel archive",
    image: "/japan-2024.jpg",
    bg: "#073d24",
    rotate: -9,
    w: 390,
    h: 330,
  },
  {
    id: "05",
    title: "Juul",
    subtitle: "Personal archive / image placeholder",
    image: "/juul1.jpg",
    bg: "#ffffff",
    rotate: 8,
    w: 470,
    h: 320,
  },
  {
    id: "06",
    title: "Postkaartje 1",
    subtitle: "Graphic experiment / visual archive",
    image: "/postkaartje1.png",
    bg: "#fa4b1f",
    rotate: -5,
    w: 540,
    h: 360,
  },
  {
    id: "07",
    title: "Postkaartje 2",
    subtitle: "Graphic experiment / visual archive",
    image: "/postkaartje2.png",
    bg: "#161616",
    rotate: 22,
    w: 310,
    h: 450,
  },
  {
    id: "08",
    title: "Postkaartje 3",
    subtitle: "Graphic experiment / visual archive",
    image: "/postkaartje3.png",
    bg: "#efefef",
    rotate: -30,
    w: 350,
    h: 350,
  },
  {
    id: "09",
    title: "Song 1",
    subtitle: "Music visual / archive image",
    image: "/song1.jpg",
    audio: "/song1.mp3",
    bg: "#242424",
    rotate: 5,
    w: 280,
    h: 420,
  },
  {
    id: "10",
    title: "Song 2",
    subtitle: "Music visual / archive image",
    image: "/song2.jpg",
    audio: "/song2.mp3",
    bg: "#ffffff",
    rotate: 17,
    w: 420,
    h: 300,
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * { box-sizing: border-box; }
      html, body, #root {
        margin: 0;
        min-height: 100%;
        font-family: Arial, Helvetica, sans-serif;
        background: #d9d9d7;
        color: #0a0a0a;
      }
      body { overflow-x: hidden; }
      a, button { color: inherit; font: inherit; }
      button { border: 0; background: none; cursor: pointer; }
      .site-shell {
        position: relative;
        min-height: 100vh;
        background: radial-gradient(circle at 50% 35%, #f1f1ef 0%, #d7d7d5 42%, #bdbdb9 100%);
      }
      .scroll-space { height: 430vh; pointer-events: none; }
      .topbar {
        position: fixed;
        left: 16px;
        bottom: 16px;
        z-index: 2000;
        display: flex;
        gap: 5px;
      }
      .nav-button, .contact-button {
        background: rgba(80, 80, 80, 0.78);
        color: white;
        border-radius: 5px;
        padding: 5px 11px 6px;
        font-size: 18px;
        line-height: 1;
        letter-spacing: -0.045em;
        text-decoration: none;
        backdrop-filter: blur(14px);
      }
      .nav-button:hover, .contact-button:hover, .nav-button.is-active { background: rgba(20, 20, 20, 0.88); }
      .intro-copy {
        position: fixed;
        left: 112px;
        top: 16px;
        z-index: 1800;
        font-size: 20px;
        line-height: 0.9;
        letter-spacing: -0.065em;
      }
      .top-right-copy {
        position: fixed;
        right: 20px;
        top: 16px;
        z-index: 1800;
        font-size: 18px;
        line-height: 0.9;
        letter-spacing: -0.055em;
        text-align: right;
      }
      .brand-mark {
        position: fixed;
        top: 8px;
        left: 50%;
        z-index: 1800;
        width: 130px;
        height: 54px;
        transform: translateX(-50%);
        border-radius: 999px;
        background: #000;
        overflow: hidden;
      }
      .brand-mark::after {
        content: "";
        position: absolute;
        right: 20px;
        top: 0;
        width: 52px;
        height: 54px;
        border-radius: 999px;
        background: #d9d9d7;
      }
      .visual-world {
        position: fixed;
        inset: 0;
        z-index: 1;
        overflow: hidden;
        perspective: 1200px;
      }
      .floating-card {
        position: absolute;
        display: block;
        padding: 0;
        overflow: hidden;
        transform-origin: center center;
        transition: transform 0.16s ease-out, opacity 0.16s ease-out, filter 0.16s ease-out;
        will-change: transform;
      }
      .floating-card:hover { filter: contrast(1.08) saturate(1.08); }
      .floating-card img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        background:
          linear-gradient(90deg, transparent 47%, rgba(0, 0, 0, 0.05) 50%, transparent 53%),
          linear-gradient(0deg, transparent 47%, rgba(0, 0, 0, 0.05) 50%, transparent 53%);
        background-size: 44px 44px;
        color: #111;
      }
      .placeholder span {
        position: absolute;
        left: 15px;
        top: 13px;
        font-size: 15px;
        line-height: 1;
        letter-spacing: -0.05em;
      }
      .placeholder strong {
        max-width: 72%;
        font-size: 30px;
        line-height: 0.88;
        letter-spacing: -0.08em;
        text-align: center;
      }
      .card-caption {
        position: absolute;
        right: 10px;
        bottom: 10px;
        max-width: 190px;
        color: white;
        background: rgba(0, 0, 0, 0.72);
        border-radius: 4px;
        padding: 5px 7px;
        font-size: 12px;
        line-height: 0.95;
        text-align: left;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      .floating-card:hover .card-caption { opacity: 1; }
      .control-panel {
        position: fixed;
        left: 50%;
        bottom: 54px;
        z-index: 1600;
        width: 560px;
        min-height: 230px;
        display: grid;
        grid-template-columns: 1.8fr 1fr 1fr;
        gap: 22px;
        padding: 15px;
        transform: translateX(-50%);
        color: white;
        background: rgba(84, 84, 84, 0.78);
        border-radius: 6px;
        backdrop-filter: blur(16px);
      }
      .statement {
        font-size: 30px;
        line-height: 0.91;
        letter-spacing: -0.08em;
      }
      .panel-list {
        font-size: 16px;
        line-height: 0.93;
        letter-spacing: -0.055em;
      }
      .panel-list p { margin: 0; }
      .panel-title {
        margin-bottom: 8px !important;
        font-size: 12px;
        opacity: 0.65;
        letter-spacing: -0.03em;
      }
      .ticker {
        position: fixed;
        left: calc(50% + 122px);
        bottom: 16px;
        z-index: 1700;
        width: 390px;
        overflow: hidden;
        color: white;
        background: rgba(86, 86, 86, 0.72);
        border-radius: 5px;
        padding: 5px 0 6px;
        font-size: 18px;
        line-height: 1;
        white-space: nowrap;
        letter-spacing: -0.05em;
        backdrop-filter: blur(16px);
      }
      .ticker div {
        display: inline-block;
        padding-left: 100%;
        animation: ticker 18s linear infinite;
      }
      @keyframes ticker {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
      .hover-card {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 2100;
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 170px;
        color: white;
        background: rgba(0, 0, 0, 0.78);
        border-radius: 6px;
        padding: 10px 12px;
        pointer-events: none;
        transition: opacity 0.12s ease;
      }
      .hover-card span, .hover-card em {
        font-size: 12px;
        font-style: normal;
        opacity: 0.65;
      }
      .hover-card strong {
        font-size: 18px;
        line-height: 0.9;
        letter-spacing: -0.055em;
      }
      .overlay-page {
        position: fixed;
        inset: 0;
        z-index: 1400;
        display: none;
        padding: 95px 20px 90px;
        overflow-y: auto;
        background: rgba(216, 216, 212, 0.88);
        backdrop-filter: blur(18px);
      }
      .overlay-page.is-open { display: block; }
      .page-inner { max-width: 1180px; margin: 0 auto; }
      .page-title {
        margin: 0 0 36px;
        font-size: clamp(58px, 9vw, 150px);
        line-height: 0.78;
        letter-spacing: -0.1em;
        font-weight: 700;
      }
      .work-list { display: grid; gap: 8px; }
      .work-row {
        display: grid;
        grid-template-columns: 70px 1fr 1fr;
        gap: 18px;
        padding: 10px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.22);
        font-size: 28px;
        line-height: 0.92;
        letter-spacing: -0.065em;
        text-align: left;
      }
      .work-row:hover { background: rgba(255, 255, 255, 0.28); }
      .index-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .index-item {
        aspect-ratio: 1 / 1;
        position: relative;
        overflow: hidden;
        background: #eeeeea;
      }
      .index-item img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .index-item div {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 20px;
        font-size: 24px;
        line-height: 0.9;
        letter-spacing: -0.07em;
        text-align: center;
      }
      .studio-text {
        max-width: 850px;
        font-size: clamp(34px, 5vw, 76px);
        line-height: 0.88;
        letter-spacing: -0.09em;
      }
      .studio-columns {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
        margin-top: 52px;
        font-size: 22px;
        line-height: 0.95;
        letter-spacing: -0.055em;
      }
      .studio-columns h3 {
        margin: 0 0 12px;
        font-size: 14px;
        opacity: 0.55;
        letter-spacing: -0.03em;
      }
      .studio-columns p { margin: 0; }
      .audio-player {
        position: fixed;
        left: 16px;
        top: 16px;
        z-index: 2200;
        width: 265px;
        color: white;
        background: rgba(20, 20, 20, 0.72);
        border-radius: 6px;
        padding: 8px;
        backdrop-filter: blur(14px);
      }
      .audio-player audio { width: 100%; height: 32px; }
      .audio-player p {
        margin: 0 0 5px;
        font-size: 12px;
        opacity: 0.75;
      }
      @media (max-width: 850px) {
        .intro-copy { left: 14px; top: 62px; }
        .top-right-copy { display: none; }
        .brand-mark { width: 84px; height: 36px; }
        .brand-mark::after { width: 35px; height: 36px; right: 12px; }
        .control-panel {
          width: calc(100vw - 24px);
          bottom: 68px;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .statement { font-size: 27px; }
        .panel-list { display: none; }
        .ticker { display: none; }
        .floating-card { max-width: 80vw; }
        .work-row { grid-template-columns: 45px 1fr; font-size: 24px; }
        .work-row span:last-child { grid-column: 2; opacity: 0.65; }
        .index-grid { grid-template-columns: repeat(2, 1fr); }
        .studio-columns { grid-template-columns: 1fr; }
        .audio-player { display: none; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      setMouse({ x, y });
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cards = useMemo(() => {
    const radiusX = 770;
    const radiusY = 430;
    const centerX = 50;
    const centerY = 43;
    const orbit = scrollProgress * Math.PI * 2.55;

    return projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2 + orbit;
      const depth = Math.sin(angle);
      const x = centerX + (Math.cos(angle) * radiusX) / 16;
      const y = centerY + (Math.sin(angle) * radiusY) / 9;
      const scale = 0.72 + (depth + 1) * 0.25;
      const zIndex = Math.round((depth + 1) * 100);
      const parallaxX = mouse.x * (25 + index * 3) * (depth + 1);
      const parallaxY = mouse.y * (18 + index * 2) * (depth + 1);
      const opacity = clamp(0.48 + scale * 0.58, 0.45, 1);
      return { ...project, x, y, scale, zIndex, parallaxX, parallaxY, opacity };
    });
  }, [mouse, scrollProgress]);

  const openView = (nextView) => {
    setView((current) => (current === nextView ? "home" : nextView));
  };

  return (
    <main className="site-shell">
      <div className="scroll-space" />

      <div className="intro-copy">
        Strategic designer rooted in people,
        <br />
        technology, and future thinking
      </div>

      <div className="brand-mark" />

      <div className="top-right-copy">
        Rotterdam + Delft
        <br />
        your@email.com, @yourhandle
      </div>

      <section className="visual-world" aria-label="interactive project archive">
        {cards.map((card) => (
          <button
            key={card.id}
            className="floating-card"
            onMouseEnter={() => setActive(card)}
            onMouseLeave={() => setActive(null)}
            onClick={() => openView("work")}
            style={{
              width: card.w,
              height: card.h,
              left: `${card.x}%`,
              top: `${card.y}%`,
              zIndex: card.zIndex,
              opacity: card.opacity,
              backgroundColor: card.bg,
              transform: `translate(-50%, -50%) translate3d(${card.parallaxX}px, ${card.parallaxY}px, 0) rotate(${card.rotate + mouse.x * 7}deg) scale(${card.scale})`,
            }}
          >
            <img
              src={card.image}
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="placeholder">
              <span>{card.id}</span>
              <strong>{card.title}</strong>
            </div>
            <div className="card-caption">
              {card.title}
              <br />
              {card.subtitle}
            </div>
          </button>
        ))}
      </section>

      {active?.audio && (
        <div className="audio-player">
          <p>{active.title}</p>
          <audio src={active.audio} controls />
        </div>
      )}

      <section className="control-panel">
        <div className="statement">
          I am a strategic product designer exploring how design, AI and human
          behaviour can shape digital experiences that feel personal, useful and
          meaningful over time.
        </div>

        <div className="panel-list">
          <p className="panel-title">FOCUS</p>
          <p>Strategic design</p>
          <p>UX research</p>
          <p>AI interfaces</p>
          <p>Future visioning</p>
          <p>System mapping</p>
          <p>Prototyping</p>
        </div>

        <div className="panel-list">
          <p className="panel-title">SELECTED</p>
          <p>Disinformation Mirror</p>
          <p>NWT Roadmap</p>
          <p>UPskillz</p>
          <p>Portfolio Project</p>
          <p>More</p>
        </div>
      </section>

      <nav className="topbar">
        <button className={`nav-button ${view === "work" ? "is-active" : ""}`} onClick={() => openView("work")}>
          Work
        </button>
        <button className={`nav-button ${view === "index" ? "is-active" : ""}`} onClick={() => openView("index")}>
          Index
        </button>
        <button className={`nav-button ${view === "studio" ? "is-active" : ""}`} onClick={() => openView("studio")}>
          Studio
        </button>
        <a className="contact-button" href="mailto:your@email.com">
          Contact
        </a>
      </nav>

      <section className="ticker">
        <div>
          selected work, design, strategy, technology, behaviour, futures,
          systems, prototypes, selected work, design, strategy, technology,
          behaviour, futures, systems, prototypes
        </div>
      </section>

      <section className="hover-card" style={{ opacity: active ? 1 : 0 }}>
        {active && (
          <>
            <span>{active.id}</span>
            <strong>{active.title}</strong>
            <em>{active.subtitle}</em>
          </>
        )}
      </section>

      <section className={`overlay-page ${view === "work" ? "is-open" : ""}`}>
        <div className="page-inner">
          <h1 className="page-title">Work</h1>
          <div className="work-list">
            {projects.map((project) => (
              <button
                key={project.id}
                className="work-row"
                onMouseEnter={() => setActive(project)}
                onMouseLeave={() => setActive(null)}
              >
                <span>{project.id}</span>
                <span>{project.title}</span>
                <span>{project.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`overlay-page ${view === "index" ? "is-open" : ""}`}>
        <div className="page-inner">
          <h1 className="page-title">Index</h1>
          <div className="index-grid">
            {projects.map((project) => (
              <div key={project.id} className="index-item" style={{ backgroundColor: project.bg }}>
                <img
                  src={project.image}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div>{project.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`overlay-page ${view === "studio" ? "is-open" : ""}`}>
        <div className="page-inner">
          <h1 className="page-title">Studio</h1>
          <div className="studio-text">
            Hi there, I am Emma. I work at the intersection of design, strategy
            and technology, translating complex questions into clear concepts,
            future directions and tangible digital experiences.
          </div>
          <div className="studio-columns">
            <div>
              <h3>APPROACH</h3>
              <p>Research, system thinking, concept development, prototyping and strategic storytelling.</p>
            </div>
            <div>
              <h3>INTERESTS</h3>
              <p>AI, malleable software, behavioural change, sustainability and meaningful digital tools.</p>
            </div>
            <div>
              <h3>CONTACT</h3>
              <p>
                your@email.com
                <br />
                @yourhandle
                <br />
                Rotterdam / Delft
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
