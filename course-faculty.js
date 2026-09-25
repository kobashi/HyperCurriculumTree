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
  design: "メディアデザイン",
  unassigned: "コース科目未担当"
};
let targetIndex = 0;
let shownIndex = 0;
let targetX = 0;
let shownX = 0;
let targetFocus = 0;
let shownFocus = 0;
let activeIndex = people.findIndex((person) => person.classList.contains("is-current"));
let frame = 0;
let pointerStart = null;
let suppressClick = false;
let audioContext = null;
let lastSoundAt = 0;
let soundCount = 0;

async function unlockSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioContext) audioContext = new AudioContextClass({ latencyHint: "interactive" });
  if (audioContext.state === "suspended") await audioContext.resume();
  stage.dataset.soundState = audioContext.state;
}

function playSelectionSound(index) {
  if (!audioContext || audioContext.state !== "running") return;
  const now = audioContext.currentTime;
  if (now - lastSoundAt < .045) return;
  lastSoundAt = now;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const courseStep = ["system", "movie", "sound", "design", "unassigned"].indexOf(people[index].dataset.course);
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(620 + courseStep * 45, now);
  oscillator.frequency.exponentialRampToValueAtTime(900 + courseStep * 55, now + .055);
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(.026, now + .006);
  gain.gain.exponentialRampToValueAtTime(.0001, now + .065);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + .07);
  soundCount += 1;
  stage.dataset.soundCount = String(soundCount);
}

function setActive(index) {
  if (activeIndex === index) return;
  const previousIndex = activeIndex;
  if (activeIndex >= 0) {
    people[activeIndex].classList.remove("is-current");
    people[activeIndex].removeAttribute("aria-current");
    people[activeIndex].tabIndex = -1;
  }
  activeIndex = index;
  if (index < 0) return;
  const person = people[index];
  person.classList.add("is-current");
  person.setAttribute("aria-current", "true");
  person.tabIndex = 0;
  currentCourse.textContent = person.dataset.course === "unassigned"
    ? courseNames.unassigned
    : `${courseNames[person.dataset.course]}コース`;
  currentName.textContent = person.querySelector(".showcase-person-name").textContent;
  detailLink.href = person.getAttribute("href");
  detailLink.firstChild.textContent = person.dataset.course === "unassigned" ? "教員情報を見る " : "担当科目を見る ";
  if (previousIndex >= 0) playSelectionSound(index);
}

function draw() {
  const width = stage.clientWidth;
  const tileSize = Math.min(196, Math.max(112, width * .38));
  const configuredPhotoSize = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--faculty-photo-size")) || 296;
  const focusWidth = Math.min(configuredPhotoSize * 2, width - 16, stage.clientHeight - 16);
  const focusScale = focusWidth / tileSize;
  const focus = Math.round(shownIndex);
  const sigma = width < 520 ? 1.8 : 2.35;
  const expandedScales = people.map((_, index) => {
    const distance = Math.abs(index - shownIndex);
    const bell = Math.exp(-(distance ** 2) / (2 * sigma ** 2));
    return 1 + (focusScale - 1) * bell;
  });
  const leftEdge = tileSize * expandedScales[0] / 2 + 8;
  const rightEdge = width - tileSize * expandedScales[expandedScales.length - 1] / 2 - 8;
  const minGap = Math.max(0, Math.min(4, (rightEdge - leftEdge) / (people.length - 1) * .6));
  const focusX = Math.max(
    leftEdge + focus * minGap,
    Math.min(rightEdge - (people.length - 1 - focus) * minGap, shownX)
  );
  const focusedCenters = new Array(people.length);
  focusedCenters[focus] = focusX;

  const weight = (distance) => Math.exp(-distance / 5.5);
  if (focus > 0) {
    const leftWeights = Array.from({ length: focus }, (_, i) => weight(focus - i - .5));
    const total = leftWeights.reduce((sum, value) => sum + value, 0);
    let used = 0;
    focusedCenters[0] = leftEdge;
    for (let i = 1; i <= focus; i += 1) {
      used += leftWeights[i - 1];
      focusedCenters[i] = leftEdge + i * minGap + (focusX - leftEdge - focus * minGap) * used / total;
    }
  }
  if (focus < people.length - 1) {
    const rightWeights = Array.from({ length: people.length - focus - 1 }, (_, i) => weight(i + .5));
    const total = rightWeights.reduce((sum, value) => sum + value, 0);
    let used = 0;
    for (let i = focus + 1; i < people.length; i += 1) {
      used += rightWeights[i - focus - 1];
      focusedCenters[i] = focusX + (i - focus) * minGap + (rightEdge - focusX - rightWeights.length * minGap) * used / total;
    }
  }

  stage.style.setProperty("--tile-size", `${tileSize}px`);
  people.forEach((person, index) => {
    const scale = 1 + shownFocus * (expandedScales[index] - 1);
    const normalEdge = tileSize / 2 + 8;
    const normalCenter = normalEdge + (width - normalEdge * 2) * index / (people.length - 1);
    const center = normalCenter + (focusedCenters[index] - normalCenter) * shownFocus;
    person.style.transform = `translate3d(${center - tileSize / 2}px, 0, 0) scale(${scale})`;
    person.style.zIndex = String(shownFocus > .01
      ? people.length - Math.abs(index - focus)
      : people.length - index);
  });
  setActive(targetFocus ? focus : -1);
}

function animate() {
  frame = 0;
  if (reducedMotion.matches) {
    shownIndex = targetIndex;
    shownX = targetX;
    shownFocus = targetFocus;
  } else {
    shownIndex += (targetIndex - shownIndex) * .2;
    shownX += (targetX - shownX) * .2;
    shownFocus += (targetFocus - shownFocus) * .18;
    if (Math.abs(targetIndex - shownIndex) < .005) shownIndex = targetIndex;
    if (Math.abs(targetX - shownX) < .05) shownX = targetX;
    if (Math.abs(targetFocus - shownFocus) < .005) shownFocus = targetFocus;
  }
  draw();
  if (shownIndex !== targetIndex || shownX !== targetX || shownFocus !== targetFocus) frame = requestAnimationFrame(animate);
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

function showFocus(clientX) {
  targetFocus = 1;
  pointAt(clientX);
}

function hideFocus() {
  targetFocus = 0;
  schedule();
}

stage.addEventListener("pointerdown", (event) => {
  unlockSound().then(() => playSelectionSound(Math.round(targetIndex))).catch(() => {});
  pointerStart = { id: event.pointerId, x: event.clientX, moved: false };
  showFocus(event.clientX);
});
stage.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse" && pointerStart?.id !== event.pointerId) return;
  if (pointerStart?.id === event.pointerId && Math.abs(event.clientX - pointerStart.x) > 6) {
    pointerStart.moved = true;
    if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
    stage.classList.add("is-dragging");
  }
  showFocus(event.clientX);
});
stage.addEventListener("pointerleave", (event) => {
  if (event.pointerType === "mouse" && !pointerStart && !stage.contains(document.activeElement)) hideFocus();
});
function endPointer(event) {
  if (!pointerStart) return;
  suppressClick = pointerStart.moved;
  pointerStart = null;
  stage.classList.remove("is-dragging");
  if (event.pointerType === "mouse" && !stage.matches(":hover") && !stage.contains(document.activeElement)) hideFocus();
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
  unlockSound().then(() => playSelectionSound(next)).catch(() => {});
  targetFocus = 1;
  targetIndex = next;
  targetX = stage.clientWidth * next / (people.length - 1);
  schedule();
  people[next].focus({ preventScroll: true });
});
stage.addEventListener("focusout", (event) => {
  if (!stage.contains(event.relatedTarget) && !stage.matches(":hover")) hideFocus();
});

new ResizeObserver(() => {
  targetX = stage.clientWidth * targetIndex / (people.length - 1);
  shownX = targetX;
  draw();
}).observe(stage);
stage.classList.add("is-enhanced");
draw();
