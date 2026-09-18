const courseView = document.querySelector("#courseView");
const teacherView = document.querySelector("#teacherView");
const navigator = document.querySelector(".navigator");
const viewButtons = [...document.querySelectorAll(".view-switch button")];

viewButtons.forEach((button) => button.addEventListener("click", () => {
  const courseActive = button.dataset.view === "course";
  courseView.hidden = !courseActive;
  teacherView.hidden = courseActive;
  navigator.hidden = !courseActive;
  viewButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
}));
