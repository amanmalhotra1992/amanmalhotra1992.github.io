(() => {
  const roles = {
    architect: {
      title: "Aman Malhotra — Software Architect",
      description:
        "Aman Malhotra — Software Architect specializing in Java, Spring Boot, and cloud-native Kubernetes systems for telecom platforms.",
      roleLine:
        "<strong>Software Architect</strong> — cloud-native systems for telecom platforms",
      heroLede:
        "Designing scalable microservices, Kubernetes platforms, and cloud migrations for global clients including AT&amp;T and Telstra.",
      resumeHref: "Aman_Malhotra_Architect.pdf",
      jobTitle: "Software Development Specialist",
      jobOrg: "Acting Software Architect · Amdocs",
      currentStage:
        'Sr. SWE / SDS · Acting Architect <span style="color:var(--steel-dark)">\'19–now</span>',
      skillsNote: "Architecture-first view for SA roles.",
      footerRole: "Software Architect",
      terminal: {
        focus: "Software Architect",
        lens: "solution architecture · HLD/LLD · cloud migration",
      },
    },
    specialist: {
      title: "Aman Malhotra — Software Development Specialist",
      description:
        "Aman Malhotra — Software Development Specialist and Senior Software Engineer building backend cloud-native systems for telecom.",
      roleLine:
        "<strong>Software Development Specialist</strong> — senior engineer for cloud-native backends",
      heroLede:
        "Hands-on delivery of Java/Spring microservices, Kubernetes deployments, and CI/CD for high-availability telecom platforms.",
      resumeHref: "Aman_Malhotra_SDS.pdf",
      jobTitle: "Software Development Specialist",
      jobOrg: "Senior Software Engineer · Amdocs",
      currentStage:
        'Sr. Software Engineer / SDS <span style="color:var(--steel-dark)">\'19–now</span>',
      skillsNote: "Delivery-first view for SDS / Sr. SWE roles.",
      footerRole: "Software Development Specialist",
      terminal: {
        focus: "Software Development Specialist",
        lens: "backend delivery · microservices · CI/CD",
      },
    },
  };

  const body = document.body;
  const terminal = document.getElementById("terminal");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function roleFromUrl() {
    const q = new URLSearchParams(window.location.search).get("role");
    if (!q) return null;
    const role = q.toLowerCase();
    if (role === "specialist" || role === "sds") return "specialist";
    if (role === "architect" || role === "sa") return "architect";
    return null;
  }

  function detectRole() {
    const role = roleFromUrl();
    if (role) return role;
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash === "specialist") return "specialist";
    if (hash === "architect") return "architect";
    return localStorage.getItem("portfolio-role") || "architect";
  }

  function setRole(role, { persist = true, animateTerminal = true, focused = Boolean(roleFromUrl()) } = {}) {
    const data = roles[role];
    if (!data) return;

    body.dataset.role = role;
    if (focused) body.dataset.focusedRoleLink = "true";
    else delete body.dataset.focusedRoleLink;
    if (persist) localStorage.setItem("portfolio-role", role);

    document.title = data.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.description);

    document.querySelectorAll("[data-role-btn]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.roleBtn === role));
    });

    document.querySelectorAll(".summary-block, .bullets-role").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.role === role);
    });

    const binds = {
      roleLine: data.roleLine,
      heroLede: data.heroLede,
      jobTitle: data.jobTitle,
      jobOrg: data.jobOrg,
      currentStage: data.currentStage,
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

    // Reorder skill groups: architecture first for SA, languages first for SDS
    const skillsRoot = document.querySelector(".skills-layout > div");
    if (skillsRoot) {
      const arch = skillsRoot.querySelector('[data-skill-order="architecture"]');
      const lang = skillsRoot.querySelector('[data-skill-order="languages"]');
      if (arch && lang) {
        if (role === "specialist") skillsRoot.insertBefore(lang, arch);
        else skillsRoot.insertBefore(arch, lang);
      }
    }

    const url = new URL(window.location.href);
    if (role === "specialist") url.searchParams.set("role", role);
    else url.searchParams.delete("role");
    window.history.replaceState({}, "", url);

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
        html: '<span class="key">stack</span>   <span class="val">Java · Spring Boot · Kubernetes · AWS · Azure</span>',
      },
      {
        html: `<span class="key">lens</span>    <span class="val">${data.terminal.lens}</span>`,
      },
      {
        html: '<span class="key">impact</span>  <span class="val">11+ yrs · 40% cost cut · 22 engineers led</span>',
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

  document.querySelectorAll("[data-role-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setRole(btn.dataset.roleBtn, { focused: false }));
  });

  // Scroll reveal
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

  setRole(detectRole(), { persist: true, animateTerminal: true });
})();
