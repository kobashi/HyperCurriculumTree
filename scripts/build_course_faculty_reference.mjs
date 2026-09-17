import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const curriculum = readFileSync(join(root, "app.js"), "utf8");
const timetable = readFileSync(join(root, "docs/2026-course-instructors.md"), "utf8");
const portraitList = readFileSync(join(root, "docs/2026-faculty-portraits.md"), "utf8");

const courses = [
  { name: "情報システム", id: "system", english: "Information Systems", number: "01" },
  { name: "映像メディア", id: "movie", english: "Visual Media", number: "02" },
  { name: "サウンド制作", id: "sound", english: "Sound Production", number: "03" },
  { name: "メディアデザイン", id: "design", english: "Media Design", number: "04" }
];
const normalize = (value) => value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);

const instructorRows = new Map();
for (const line of timetable.split("\n")) {
  if (!line.startsWith("| ") || line.startsWith("| 科目名") || line.startsWith("| ---")) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  if (cells.length !== 3) throw new Error(`Invalid instructor row: ${line}`);
  instructorRows.set(normalize(cells[0]), { first: cells[1], second: cells[2] });
}

const portraits = new Map();
for (const line of portraitList.split("\n")) {
  const match = line.match(/^\| ([^|]+) \| !\[[^\]]+\]\([^)]*\) \| \[教員紹介\]\(([^)]+)\) \| \[画像\]\(([^)]+)\) \|$/);
  if (!match) continue;
  const [, name, profileUrl, imageUrl] = match;
  if (new URL(profileUrl).hostname !== "www.nagoya-bunri.ac.jp" || new URL(imageUrl).hostname !== "www.nagoya-bunri.ac.jp") {
    throw new Error(`Unexpected portrait source for ${name}`);
  }
  portraits.set(normalize(name), { profileUrl, imageUrl });
}

const subjects = [];
const courseNode = /^\s*\["([^"]+)", "([^"]+)", "professional", "(情報システム|映像メディア|サウンド制作|メディアデザイン)コース", "([^"]+)", "([1-4][前後])",/gm;
for (const match of curriculum.matchAll(courseNode)) {
  const [, nodeId, name, course, lane] = match;
  const teachers = instructorRows.get(normalize(name));
  if (!teachers) throw new Error(`No timetable record for ${name} (${nodeId})`);
  subjects.push({ nodeId, name, course, lane, teachers });
}
if (subjects.length !== 65) throw new Error(`Expected 65 course nodes, found ${subjects.length}`);

function namesFor(value, semester) {
  if (value === "—" || value === "記載なし") return [];
  const matches = [...value.matchAll(/([^\s（）/、]+)\s+([^\s（）/、]+)/gu)];
  return [...new Map(matches.map((match) => {
    const name = `${match[1]} ${match[2]}`;
    return [normalize(name), { name, semester }];
  })).values()];
}

function teachersFor(subject) {
  return [
    ...namesFor(subject.teachers.first, "前期"),
    ...namesFor(subject.teachers.second, "後期")
  ];
}

const uniqueTeachers = new Set(subjects.flatMap((subject) => teachersFor(subject).map((teacher) => normalize(teacher.name))));
const picturedTeachers = new Set([...uniqueTeachers].filter((name) => portraits.has(name)));
const teacherGroups = new Map();
for (const subject of subjects) {
  for (const teacher of teachersFor(subject)) {
    const key = normalize(teacher.name);
    if (!teacherGroups.has(key)) teacherGroups.set(key, { name: teacher.name, subjects: new Map() });
    const group = teacherGroups.get(key);
    const subjectKey = normalize(subject.name);
    if (!group.subjects.has(subjectKey)) {
      group.subjects.set(subjectKey, { name: subject.name, lanes: new Set(), courses: new Set(), semesters: new Set() });
    }
    const entry = group.subjects.get(subjectKey);
    entry.lanes.add(subject.lane);
    entry.courses.add(subject.course);
    entry.semesters.add(teacher.semester);
  }
}
const sortedTeachers = [...teacherGroups.values()].sort((a, b) => a.name.localeCompare(b.name, "ja"));

function teacherMarkup(teacher) {
  const source = portraits.get(normalize(teacher.name));
  const name = escapeHtml(teacher.name);
  const avatar = source
    ? `<img src="${escapeHtml(source.imageUrl)}" alt="${name}の顔写真" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
    : `<span class="teacher-fallback" aria-hidden="true">${escapeHtml(teacher.name[0])}</span>`;
  const content = `${avatar}<span class="teacher-copy"><strong>${name}</strong><small>2026 ${teacher.semester}</small></span>`;
  return source
    ? `<a class="teacher" href="${escapeHtml(source.profileUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${name}の大学公式プロフィール">${content}<span class="teacher-arrow" aria-hidden="true">↗</span></a>`
    : `<div class="teacher">${content}</div>`;
}

function subjectMarkup(subject) {
  const teachers = teachersFor(subject);
  const searchText = [subject.name, subject.lane, subject.course, ...teachers.map((teacher) => teacher.name)].join(" ");
  const listed = teachers.length
    ? teachers.map(teacherMarkup).join("\n")
    : `<p class="unlisted">2026年度時間割に担当者の記載なし</p>`;
  return `<article class="subject-card" data-search="${escapeHtml(searchText)}">
    <div class="subject-meta">${escapeHtml(subject.lane)}</div>
    <h3>${escapeHtml(subject.name)}</h3>
    <div class="teacher-list">${listed}</div>
  </article>`;
}

function courseMarkup(course) {
  const entries = subjects.filter((subject) => subject.course === course.name);
  return `<section class="course-section" id="${course.id}" data-course="${escapeHtml(course.name)}">
    <header class="section-head">
      <span class="section-number">${course.number} / 04</span>
      <div><p class="section-english">${course.english}</p><h2>${course.name}<span>コース</span></h2></div>
      <strong class="section-count">${entries.length}<small>科目</small></strong>
    </header>
    <div class="subject-grid">${entries.map(subjectMarkup).join("\n")}</div>
  </section>`;
}

function groupedTeacherMarkup(group) {
  const source = portraits.get(normalize(group.name));
  const name = escapeHtml(group.name);
  const avatar = source
    ? `<img src="${escapeHtml(source.imageUrl)}" alt="${name}の顔写真" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
    : `<span class="teacher-fallback" aria-hidden="true">${escapeHtml(group.name[0])}</span>`;
  const profile = source
    ? `<a href="${escapeHtml(source.profileUrl)}" target="_blank" rel="noopener noreferrer">大学公式プロフィール <span aria-hidden="true">↗</span></a>`
    : "";
  const entries = [...group.subjects.values()];
  const searchText = [group.name, ...entries.flatMap((entry) => [entry.name, ...entry.lanes, ...entry.courses])].join(" ");
  return `<article class="faculty-card" data-search="${escapeHtml(searchText)}">
    <header class="faculty-head">${avatar}<div><h2>${name}</h2><p>${entries.length}科目を担当</p>${profile}</div></header>
    <ul class="faculty-subjects">${entries.map((entry) => `<li>
      <div class="faculty-subject-title"><strong>${escapeHtml(entry.name)}</strong><span>${escapeHtml([...entry.semesters].join("・"))}</span></div>
      <div class="faculty-tags">${courses.filter((course) => entry.courses.has(course.name)).map((course) => `<span>${escapeHtml(course.name)}</span>`).join("")}</div>
    </li>`).join("\n")}</ul>
  </article>`;
}

const output = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="名古屋文理大学情報メディア学科4コースの科目と、2026年度時間割に記載された担当教員の参考一覧。">
  <title>2026 コース科目と担当教員 | 超履修計画2026</title>
  <link rel="stylesheet" href="course-faculty.css">
  <script src="course-faculty.js" defer></script>
</head>
<body>
  <div class="page-shell">
    <header class="masthead">
      <div class="masthead-top"><a class="project-link" href="./">超履修計画2026</a><span>参考資料 / 2026年度</span></div>
      <div class="masthead-main">
        <p class="eyebrow">NAGOYA BUNRI UNIVERSITY <span>・</span> INFORMATION MEDIA</p>
        <h1>コース科目と<br><em>担当教員</em></h1>
        <p class="intro">4つのコースで学ぶ科目と、2026年度の時間割に記載された担当者を一覧にしました。写真は大学公式サイトに掲載されている場合のみ表示しています。</p>
      </div>
      <div class="facts"><div><strong>04</strong><span>コース</span></div><div><strong>${subjects.length}</strong><span>科目掲載</span></div><div><strong>${uniqueTeachers.size}</strong><span>担当者</span></div><div><strong>${picturedTeachers.size}</strong><span>写真あり</span></div></div>
    </header>

    <main id="main-content">
      <div class="view-switch" role="group" aria-label="一覧の表示方法">
        <button type="button" class="is-active" data-view="course" aria-pressed="true">コース別</button>
        <button type="button" data-view="teacher" aria-pressed="false">担当者別</button>
      </div>
      <div class="navigator">
        <nav class="course-nav" aria-label="コースへ移動">${courses.map((course) => `<a href="#${course.id}">${course.name}</a>`).join("")}</nav>
        <label class="search"><span>科目・教員を探す</span><input id="subjectSearch" type="search" placeholder="科目名、担当者名、系列名" autocomplete="off"></label>
      </div>
      <p id="searchStatus" class="search-status" role="status" aria-live="polite"></p>
      <div id="courseView">${courses.map(courseMarkup).join("\n")}</div>
      <div id="teacherView" hidden>
        <div class="faculty-intro"><p class="section-english">BY INSTRUCTOR / 2026</p><h2>担当者から探す</h2><p>同じ科目が複数コースにある場合は、担当者の下で一つにまとめています。</p></div>
        <div class="faculty-grid">${sortedTeachers.map(groupedTeacherMarkup).join("\n")}</div>
      </div>
      <p id="noResults" class="no-results" hidden>該当する科目が見つかりませんでした。</p>
    </main>

    <footer class="source-note">
      <div><p class="eyebrow">SOURCE &amp; NOTES</p><h2>この一覧について</h2></div>
      <div class="source-body">
        <p>掲載範囲は本アプリの公式カリキュラムツリーにおける4コースの科目群です。コース共通、基礎教育、教職、他学科の科目は含みません。同一科目が複数コースにある場合、コース別ではそれぞれに掲載し、担当者別ではコース名を併記して一つにまとめています。</p>
        <p>担当者は<a href="2026前期情報メディア学科-1.pdf">2026年度前期時間割</a>と<a href="2026-2media4.pdf">2026年度後期時間割</a>に基づきます。複数クラスや共同担当の教員は併記しています。氏名・開講情報は年度中に変わることがあります。</p>
        <p>顔写真は<a href="https://www.nagoya-bunri.ac.jp/faculty/" target="_blank" rel="noopener noreferrer">名古屋文理大学の教育スタッフ紹介</a>の画像URLを直接表示しています。写真の掲載がない教員は文字アイコンで示します。画像の著作権は掲載元に帰属します。</p>
      </div>
      <a class="return-link" href="./">履修計画に戻る <span aria-hidden="true">↗</span></a>
    </footer>
  </div>
</body>
</html>
`;

writeFileSync(join(root, "course-faculty.html"), output);
console.log(`${subjects.length} subjects, ${uniqueTeachers.size} teachers, ${picturedTeachers.size} official portraits`);
