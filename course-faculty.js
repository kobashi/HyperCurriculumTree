const search = document.querySelector("#subjectSearch");
const status = document.querySelector("#searchStatus");
const sections = [...document.querySelectorAll(".course-section")];
const facultyCards = [...document.querySelectorAll(".faculty-card")];
const courseView = document.querySelector("#courseView");
const teacherView = document.querySelector("#teacherView");
const courseNav = document.querySelector(".course-nav");
const viewButtons = [...document.querySelectorAll(".view-switch button")];
let currentView = "course";

function updateResults() {
  const query = search.value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
  let visible = 0;

  if (currentView === "course") {
    sections.forEach((section) => {
      let sectionVisible = 0;
      section.querySelectorAll(".subject-card").forEach((card) => {
        const haystack = card.dataset.search.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
        card.hidden = !haystack.includes(query);
        if (!card.hidden) sectionVisible += 1;
      });
      section.hidden = sectionVisible === 0;
      visible += sectionVisible;
    });
  } else {
    facultyCards.forEach((card) => {
      const haystack = card.dataset.search.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
      card.hidden = !haystack.includes(query);
      if (!card.hidden) visible += 1;
    });
  }

  document.querySelector("#noResults").hidden = visible !== 0;
  status.textContent = query ? `${visible}${currentView === "course" ? "科目" : "名の担当者"}が該当します` : "";
}

viewButtons.forEach((button) => button.addEventListener("click", () => {
  currentView = button.dataset.view;
  courseView.hidden = currentView !== "course";
  teacherView.hidden = currentView !== "teacher";
  courseNav.hidden = currentView !== "course";
  viewButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  updateResults();
}));

search.addEventListener("input", updateResults);
