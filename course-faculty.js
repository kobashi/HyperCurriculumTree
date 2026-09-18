const courseView = document.querySelector("#courseView");
const teacherView = document.querySelector("#teacherView");
const viewButtons = [...document.querySelectorAll(".view-switch button")];

viewButtons.forEach((button) => button.addEventListener("click", () => {
  const courseActive = button.dataset.view === "course";
  courseView.hidden = !courseActive;
  teacherView.hidden = courseActive;
  viewButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
}));

const stage = document.querySelector(".showcase-stage");
const people = [...stage.querySelectorAll(".showcase-person")];
const currentCourse = document.querySelector(".showcase-current-course");
const currentName = document.querySelector(".showcase-current-name");
const detailLink = document.querySelector(".showcase-detail");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const courseNames = {
  system: "情報システム",
  movie: "映像メディア",
  sound: "サウンド制作",
  design: "メディアデザイン"
};
let targetIndex = 0;
let shownIndex = 0;
let targetX = 0;
let shownX = 0;
let activeIndex = -1;
let frame = 0;
let pointerStart = null;
let suppressClick = false;

function setActive(index) {
  if (activeIndex === index) return;
  if (activeIndex >= 0) {
    people[activeIndex].classList.remove("is-current");
    people[activeIndex].removeAttribute("aria-current");
    people[activeIndex].tabIndex = -1;
  }
  activeIndex = index;
  const person = people[index];
  person.classList.add("is-current");
  person.setAttribute("aria-current", "true");
  person.tabIndex = 0;
  currentCourse.textContent = `${courseNames[person.dataset.course]}コース`;
  currentName.textContent = person.querySelector(".showcase-person-name").textContent;
  detailLink.href = person.getAttribute("href");
}

function draw() {
  const width = stage.clientWidth;
  const tileSize = Math.min(188, Math.max(112, width * .38));
  const edge = tileSize * .55 + 8;
  const minGap = Math.min(4, (width - edge * 2) / (people.length - 1) * .6);
  const focus = Math.round(shownIndex);
  const focusX = Math.max(edge + focus * minGap, Math.min(width - edge - (people.length - 1 - focus) * minGap, shownX));
  const centers = new Array(people.length);
  centers[focus] = focusX;

  const weight = (distance) => Math.exp(-distance / 5.5);
  if (focus > 0) {
    const leftWeights = Array.from({ length: focus }, (_, i) => weight(focus - i - .5));
    const total = leftWeights.reduce((sum, value) => sum + value, 0);
    let used = 0;
    centers[0] = edge;
    for (let i = 1; i <= focus; i += 1) {
      used += leftWeights[i - 1];
      centers[i] = edge + i * minGap + (focusX - edge - focus * minGap) * used / total;
    }
  }
  if (focus < people.length - 1) {
    const rightWeights = Array.from({ length: people.length - focus - 1 }, (_, i) => weight(i + .5));
    const total = rightWeights.reduce((sum, value) => sum + value, 0);
    let used = 0;
    for (let i = focus + 1; i < people.length; i += 1) {
      used += rightWeights[i - focus - 1];
      centers[i] = focusX + (i - focus) * minGap + (width - edge - focusX - rightWeights.length * minGap) * used / total;
    }
  }

  stage.style.setProperty("--tile-size", `${tileSize}px`);
  people.forEach((person, index) => {
    const distance = Math.abs(index - shownIndex);
    const scale = index === focus ? 1.06 : .68 + .3 * Math.exp(-distance / 3);
    person.style.transform = `translate3d(${centers[index] - tileSize / 2}px, 0, 0) scale(${scale})`;
    person.style.zIndex = String(people.length - Math.abs(index - focus));
  });
  setActive(focus);
}

function animate() {
  frame = 0;
  if (reducedMotion.matches) {
    shownIndex = targetIndex;
    shownX = targetX;
  } else {
    shownIndex += (targetIndex - shownIndex) * .2;
    shownX += (targetX - shownX) * .2;
    if (Math.abs(targetIndex - shownIndex) < .005) shownIndex = targetIndex;
    if (Math.abs(targetX - shownX) < .05) shownX = targetX;
  }
  draw();
  if (shownIndex !== targetIndex || shownX !== targetX) frame = requestAnimationFrame(animate);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(animate);
}

function pointAt(clientX) {
  const rect = stage.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  targetIndex = ratio * (people.length - 1);
  targetX = ratio * rect.width;
  schedule();
}

stage.addEventListener("pointerdown", (event) => {
  pointerStart = { id: event.pointerId, x: event.clientX, moved: false };
  pointAt(event.clientX);
});
stage.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse" && pointerStart?.id !== event.pointerId) return;
  if (pointerStart?.id === event.pointerId && Math.abs(event.clientX - pointerStart.x) > 6) {
    pointerStart.moved = true;
    if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  }
  pointAt(event.clientX);
});
function endPointer() {
  if (!pointerStart) return;
  suppressClick = pointerStart.moved;
  pointerStart = null;
  stage.classList.remove("is-dragging");
  if (suppressClick) setTimeout(() => { suppressClick = false; }, 0);
}
stage.addEventListener("pointerup", endPointer);
stage.addEventListener("pointercancel", endPointer);
stage.addEventListener("click", (event) => {
  if (!suppressClick) return;
  event.preventDefault();
  event.stopPropagation();
  suppressClick = false;
}, true);
stage.addEventListener("dragstart", (event) => event.preventDefault());
stage.addEventListener("keydown", (event) => {
  const next = event.key === "Home" ? 0 : event.key === "End" ? people.length - 1
    : event.key === "ArrowRight" ? Math.min(people.length - 1, activeIndex + 1)
      : event.key === "ArrowLeft" ? Math.max(0, activeIndex - 1) : null;
  if (next === null) return;
  event.preventDefault();
  targetIndex = next;
  targetX = stage.clientWidth * next / (people.length - 1);
  schedule();
  people[next].focus({ preventScroll: true });
});

new ResizeObserver(() => {
  targetX = stage.clientWidth * targetIndex / (people.length - 1);
  shownX = targetX;
  draw();
}).observe(stage);
stage.classList.add("is-enhanced");
draw();
