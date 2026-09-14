(() => {
  const roles = {
    architect: {
      title: "Aman Malhotra — Software Architect · AI Agent Reliability Lead",
      description:
        "Aman Malhotra — Software Architect and AI Agent Reliability Lead specializing in Java, Spring Boot, Kubernetes, and production-ready LLM/MCP agent workflows.",
      roleLine:
        "<strong>Software Architect / Solution Architect</strong> — AI Agent Reliability Lead",
      heroLede:
        "Designing cloud-native telecom platforms, currently serving as AI Agent Reliability Lead for AI agents, personas, and LLM/MCP workflows.",
      resumeHref: "Aman_Malhotra_Architect.pdf",
      jobTitle: "Software Development Specialist",
      jobOrg: "AI Agent Reliability Lead · Acting Software Architect · Amdocs",
      currentStage:
        'SDS / SSE · Acting Architect <span style="color:var(--steel-dark)">\'19–now</span>',
      tenureNote: "Career progression to SDS / SSE, currently functioning as Acting Software Architect.",
      skillsNote: "Architecture-first view, with current AI-agent work highlighted.",
      footerRole: "Software Architect · AI Agent Reliability Lead",
      terminal: {
        focus: "Software Architect · AI Agent Reliability Lead",
        lens: "solution architecture · agent reliability · personas · MCP",
        stack: "Java · Spring Boot · Kubernetes · Helm · PostgreSQL",
        ai: "Cursor · LLM workflows · MCP · AI agents",
      },
    },
    specialist: {
      title: "Aman Malhotra — SDS / SSE · AI Agent Reliability Lead",
      description:
        "Aman Malhotra — Software Development Specialist / Senior Software Engineer and AI Agent Reliability Lead building cloud-native backends and production-ready AI agents.",
      roleLine:
        "<strong>Software Development Specialist / Senior Software Engineer</strong> — AI Agent Reliability Lead",
      heroLede:
        "Designing and delivering Java/Spring cloud-native platforms for telecom, currently serving as AI Agent Reliability Lead for agents, personas, and LLM/MCP workflows.",
      resumeHref: "Aman_Malhotra_SDS.pdf",
      jobTitle: "Software Development Specialist / Senior Software Engineer",
      jobOrg: "AI Agent Reliability Lead · Amdocs",
      currentStage:
        'SDS / SSE · AI Agent Reliability Lead <span style="color:var(--steel-dark)">\'19–now</span>',
      tenureNote: "One tenure, progressive ownership — from engineer to SDS / SSE.",
      skillsNote: "Delivery-first view, with current AI-agent work highlighted.",
      footerRole: "SDS / SSE · AI Agent Reliability Lead",
      terminal: {
        focus: "SDS / SSE · AI Agent Reliability Lead",
        lens: "agent reliability · personas · MCP · backend delivery",
        stack: "Java · Spring Boot · Kubernetes · Helm · PostgreSQL",
        ai: "Cursor · LLM workflows · MCP · AI agents",
      },
    },
  };

  const body = document.body;
  const terminal = document.getElementById("terminal");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function roleFromPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.includes("architect")) return "architect";
    if (parts.includes("specialist")) return "specialist";
    return null;
  }

  function roleFromUrl() {
    const q = new URLSearchParams(window.location.search).get("role");
    if (!q) return null;
    const role = q.toLowerCase();
    if (role === "specialist" || role === "sds") return "specialist";
    if (role === "architect" || role === "sa") return "architect";
    return null;
  }

  function detectRole() {
    return roleFromPath() || roleFromUrl() || "specialist";
  }

  function setRole(role, { animateTerminal = true } = {}) {
    const data = roles[role];
    if (!data) return;

    body.dataset.role = role;

    document.title = data.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.description);

    document.querySelectorAll(".summary-block, .bullets-role").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.role === role);
    });

    const binds = {
      roleLine: data.roleLine,
      heroLede: data.heroLede,
      jobTitle: data.jobTitle,
      jobOrg: data.jobOrg,
      currentStage: data.currentStage,
      tenureNote: data.tenureNote,
      skillsNote: data.skillsNote,
      footerRole: data.footerRole,
    };

    Object.entries(binds).forEach(([key, value]) => {
      document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
        el.innerHTML = value;
      });
    });

    document.querySelectorAll('[data-bind="resumeHref"]').forEach((el) => {
      el.setAttribute("href", data.resumeHref);
    });

    const skillsRoot = document.querySelector(".skills-layout > div");
    if (skillsRoot) {
      const arch = skillsRoot.querySelector('[data-skill-order="architecture"]');
      const lang = skillsRoot.querySelector('[data-skill-order="languages"]');
      if (arch && lang) {
        if (role === "specialist") skillsRoot.insertBefore(lang, arch);
        else skillsRoot.insertBefore(arch, lang);
      }
    }

    if (animateTerminal) runTerminal(data);
  }

  function runTerminal(data) {
    if (!terminal) return;
    const lines = [
      { html: '<span class="prompt">$</span> whoami' },
      { html: '<span class="val">aman malhotra</span>' },
      { html: '<span class="prompt">$</span> profile --load' },
      {
        html: `<span class="key">focus</span>   <span class="accent">${data.terminal.focus}</span>`,
      },
      {
        html: `<span class="key">stack</span>   <span class="val">${data.terminal.stack}</span>`,
      },
      {
        html: `<span class="key">lens</span>    <span class="val">${data.terminal.lens}</span>`,
      },
      {
        html: `<span class="key">AI</span>      <span class="val">${data.terminal.ai}</span>`,
      },
      {
        html: '<span class="key">impact</span>  <span class="val">ODO · Telstra · EKS→AKS · −40% cost</span>',
      },
    ];

    if (reduced) {
      terminal.innerHTML = lines.map((l) => l.html).join("<br>");
      return;
    }

    terminal.innerHTML = '<span class="prompt">$</span> <span class="cursor"></span>';
    let i = 0;

    const step = () => {
      if (i >= lines.length) return;
      terminal.innerHTML =
        lines
          .slice(0, i + 1)
          .map((l) => l.html)
          .join("<br>") +
        (i < lines.length - 1 ? '<br><span class="cursor"></span>' : "");
      i += 1;
      if (i < lines.length) setTimeout(step, i === 1 || i === 3 ? 380 : 220);
    };
    setTimeout(step, 280);
  }

  const tabs = Array.from(document.querySelectorAll(".project-tab"));
  const panels = Array.from(document.querySelectorAll(".project-panels .project"));
  function showProject(id) {
    tabs.forEach((tab) => {
      const on = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(on));
    });
    panels.forEach((panel) => {
      const on = panel.id === id;
      panel.toggleAttribute("hidden", !on);
      panel.classList.toggle("is-active", on);
    });
  }
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showProject(tab.getAttribute("aria-controls")));
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  setRole(detectRole(), { animateTerminal: true });
})();
