 

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------
  // 1) FILTERS (task-card)
  // -----------------------------------------
  (function taskCardsFilters() {
    const cards = Array.from(document.querySelectorAll(".task-card"));
    const buttons = Array.from(document.querySelectorAll(".filter-btn"));

  
    if (!cards.length || !buttons.length) return;

    const state = { category: "all", status: "all" };

    function setActive(filter, value) {
      buttons
        .filter((btn) => btn.dataset.filter === filter)
        .forEach((btn) => {
          const isActive = btn.dataset.value === value;

          // Active
          btn.classList.toggle("bg-[#0B2E6B]", isActive);
          btn.classList.toggle("text-white", isActive);
          btn.classList.toggle("border-[#0B2E6B]", isActive);

          // Inactive
          btn.classList.toggle("bg-white", !isActive);
          btn.classList.toggle("text-slate-700", !isActive);
          btn.classList.toggle("border", !isActive);
          btn.classList.toggle("border-slate-200", !isActive);
        });
    }

    function applyFilters() {
      cards.forEach((card) => {
        const c = (card.dataset.category || "").toLowerCase();
        const s = (card.dataset.status || "").toLowerCase();

        const categoryOk = state.category === "all" || c === state.category;
        const statusOk = state.status === "all" || s === state.status;

        card.classList.toggle("hidden", !(categoryOk && statusOk));
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = (btn.dataset.filter || "").toLowerCase();
        const value = (btn.dataset.value || "").toLowerCase();
        if (!filter || !value) return;

       
        if (!(filter in state)) return;

        state[filter] = value;
        setActive(filter, value);
        applyFilters();
      });
    });

    // initial
    setActive("category", state.category);
    setActive("status", state.status);
    applyFilters();
  })();

  // 
  // 2) TABS (task-row)
  // 
  (function tasksTabs() {
    const tabButtons = Array.from(document.querySelectorAll(".tasks-tab"));
    const rows = Array.from(document.querySelectorAll(".task-row"));

    // Page may not have tabs/rows
    if (!tabButtons.length || !rows.length) return;

    function setActiveTab(btn) {
      tabButtons.forEach((b) => {
        b.classList.remove("bg-white", "text-[#1D4ED8]", "shadow-sm");
        b.classList.add("text-slate-600");
      });

      btn.classList.add("bg-white", "text-[#1D4ED8]", "shadow-sm");
      btn.classList.remove("text-slate-600");
    }

    function applyTab(tabName) {
      const active = (tabName || "today").toLowerCase();
      rows.forEach((row) => {
        const rowTab = (row.getAttribute("data-tab") || "").toLowerCase();
        row.classList.toggle("hidden", rowTab !== active);
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = (btn.getAttribute("data-tab") || "today").toLowerCase();
        setActiveTab(btn);
        applyTab(tab);
      });
    });

 
    const defaultBtn =
      tabButtons.find(
        (b) => (b.getAttribute("data-tab") || "").toLowerCase() === "today"
      ) || tabButtons[0];

    setActiveTab(defaultBtn);
    applyTab(defaultBtn.getAttribute("data-tab") || "today");
  })();

  // 
  // 3) MODAL (Add New Task)
  // 
  (function taskModal() {
    const openBtn = document.getElementById("openTaskModal");
    const modal = document.getElementById("taskModal");
    const backdrop = document.getElementById("taskModalBackdrop");
    const closeBtn = document.getElementById("closeTaskModal");
    const cancelBtn = document.getElementById("cancelTaskModal");

   
    if (!modal) return;

    function openModal() {
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }

    openBtn?.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    backdrop?.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    
    const form = modal.querySelector("form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      closeModal();
    });
  })();
});
