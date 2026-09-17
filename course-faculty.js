const search = document.querySelector("#subjectSearch");
const status = document.querySelector("#searchStatus");
const sections = [...document.querySelectorAll(".course-section")];

search.addEventListener("input", () => {
  const query = search.value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
  let visible = 0;
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
  document.querySelector("#noResults").hidden = visible !== 0;
  status.textContent = query ? `${visible}科目が該当します` : "";
});
