document.addEventListener("DOMContentLoaded", () => {
  // Login/Register popup (demo only; requires a backend for real accounts)
  const modal = document.querySelector("#auth-modal");
  const title = document.querySelector("#auth-title");
  const submit = document.querySelector(".auth-submit");
  const switchText = document.querySelector("#auth-switch-text");
  const switchButton = document.querySelector("#auth-switch");
  const username = document.querySelector("#auth-username");
  const password = document.querySelector("#auth-password");
  const form = document.querySelector("#auth-form");
  let mode = "login";

  function setMode(nextMode) {
    mode = nextMode;
    const login = mode === "login";
    title.textContent = login ? "Login" : "Create an account";
    submit.textContent = login ? "Login" : "Register";
    switchText.textContent = login ? "Don't have an account?" : "Already registered?";
    switchButton.textContent = login ? "Register" : "Login";
    password.autocomplete = login ? "current-password" : "new-password";
  }
  function openModal(nextMode) {
    setMode(nextMode);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    username.focus();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".btn-login").forEach(b => b.addEventListener("click", () => openModal("login")));
  document.querySelectorAll(".btn-register").forEach(b => b.addEventListener("click", () => openModal("register")));
  document.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
  switchButton.addEventListener("click", () => setMode(mode === "login" ? "register" : "login"));
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    alert(mode === "login" ? "Demo only: connect a backend to enable login." : "Demo only: connect a backend to create accounts.");
    closeModal();
    form.reset();
  });

  // Navigation scroll targets; Leaderboard and Support are not present in this sample page.
  const targets = { home: "#home", games: "#games", "live casino": "#casino-games", promotions: "#promotions", sports: "#sports-games" };
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const label = link.textContent.trim().toLowerCase();
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      if (targets[label]) document.querySelector(targets[label])?.scrollIntoView({ behavior: "smooth", block: "start" });
      else alert(`${label} section is not included in this demo yet.`);
    });
  });

  document.querySelector(".btn-outline")?.addEventListener("click", () => {
    document.querySelector("#slots")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Play buttons give brief feedback; actual gameplay needs a game provider.
  document.querySelectorAll(".btn-primary, .banner-btn, .slot-play").forEach(button => {
    button.addEventListener("click", () => {
      button.animate([{ transform: "scale(1)" }, { transform: "scale(.94)" }, { transform: "scale(1)" }],
        { duration: 220, easing: "ease-out" });
      alert("Front-end demo: connect a game provider to enable gameplay.");
    });
  });
  document.querySelector(".bonus-card button")?.addEventListener("click", () => {
    alert("Demo only: bonus claiming is not connected to an account system.");
  });

  // Search sample games by title.
  const search = document.querySelector(".search-box input");
  const cards = [...document.querySelectorAll(".slot-card")];
  search?.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    cards.forEach(card => { card.hidden = !(card.querySelector("h4")?.textContent.toLowerCase() || "").includes(q); });
  });

  // Highlight category selection; only Slots has sample cards in this page.
  document.querySelectorAll(".cat-box").forEach(box => {
    box.addEventListener("click", () => {
      document.querySelectorAll(".cat-box").forEach(x => x.classList.remove("is-selected"));
      box.classList.add("is-selected");
      const category = box.querySelector("span")?.textContent.trim() || "Category";
      const key = category.toLowerCase();
      const target = key === "slots" ? "#slots"
        : key === "sports" ? "#sports-games"
        : key === "live casino" || key === "table games" ? "#casino-games"
        : null;
      if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else alert(`${category} is a category placeholder in this demo.`);
    });
  });

  document.querySelectorAll(".sidebar ul li").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
      item.classList.add("active");
      const label = item.textContent.trim().toLowerCase();
      if (label.includes("all games")) {
        cards.forEach(card => { card.hidden = false; });
        if (search) search.value = "";
        document.querySelector("#slots")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (label.includes("slots")) {
        cards.forEach(card => { card.hidden = card.closest("#slots") === null; });
        if (search) search.value = "";
        document.querySelector("#slots")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (label.includes("sports")) {
        cards.forEach(card => { card.hidden = card.dataset.category !== "sports"; });
        if (search) search.value = "";
        document.querySelector("#sports-games")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (label.includes("live casino") || label.includes("table games")) {
        cards.forEach(card => { card.hidden = card.dataset.category !== "casino"; });
        if (search) search.value = "";
        document.querySelector("#casino-games")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        alert("This category has no sample games in the current demo.");
      }
    });
  });

  cards.forEach(card => card.addEventListener("click", e => {
    if (e.target.closest("button")) return;
    cards.forEach(x => x.classList.remove("is-selected"));
    card.classList.add("is-selected");
  }));
});
