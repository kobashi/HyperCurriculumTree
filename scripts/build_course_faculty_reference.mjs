import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const curriculum = readFileSync(join(root, "app.js"), "utf8");
const timetable = readFileSync(join(root, "docs/2026-course-instructors.md"), "utf8");
const portraitList = readFileSync(join(root, "docs/2026-faculty-portraits.md"), "utf8");
const facultyDirectory = readFileSync(join(root, "docs/2026-information-media-faculty.md"), "utf8");

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

const facultyDirectoryList = facultyDirectory.split("## 4コース科目未担当")[0];
const informationMediaFaculty = [...facultyDirectoryList.matchAll(/^- (.+)$/gm)].map((match) => match[1]);
if (informationMediaFaculty.length !== 19) {
  throw new Error(`Expected 19 information media faculty, found ${informationMediaFaculty.length}`);
}

const requiredSource = curriculum.match(/const courseRequired = \{([\s\S]*?)\n\};/);
if (!requiredSource) throw new Error("Course requirements not found");
const requiredByCourse = new Map();
for (const [, course, body] of requiredSource[1].matchAll(/^  (情報システム|映像メディア|サウンド制作|メディアデザイン): \[([\s\S]*?)^  \],?/gm)) {
  const names = [...body.matchAll(/^    \["([^"]+)",/gm)].map((match) => normalize(match[1]));
  if (names.length !== 8) throw new Error(`Expected 8 required subjects for ${course}, found ${names.length}`);
  requiredByCourse.set(course, new Set(names));
}
if (requiredByCourse.size !== courses.length) throw new Error("Course requirement sections are incomplete");

const instructorRows = new Map();
for (const line of timetable.split("\n")) {
  if (!line.startsWith("| ") || line.startsWith("| 科目名") || line.startsWith("| ---")) continue;
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  if (cells.length !== 3) throw new Error(`Invalid instructor row: ${line}`);
  instructorRows.set(normalize(cells[0]), { first: cells[1], second: cells[2] });
}

const portraits = new Map();
const listedFaculty = new Set();
for (const line of portraitList.split("\n")) {
  const match = line.match(/^\| ([^|]+) \| !\[[^\]]+\]\([^)]*\) \| \[教員紹介\]\(([^)]+)\) \| \[画像\]\(([^)]+)\) \|$/);
  if (!match) continue;
  const [, name, profileUrl, imageUrl] = match;
  if (new URL(profileUrl).hostname !== "www.nagoya-bunri.ac.jp" || new URL(imageUrl).hostname !== "www.nagoya-bunri.ac.jp") {
    throw new Error(`Unexpected portrait source for ${name}`);
  }
  portraits.set(normalize(name), { profileUrl, imageUrl });
  listedFaculty.add(normalize(name));
}
for (const [, name] of portraitList.matchAll(/^- (.+): プロフィールに顔写真の掲載なし$/gm)) {
  listedFaculty.add(normalize(name));
}

const subjects = [];
const courseNode = /^\s*\["([^"]+)", "([^"]+)", "professional", "(情報システム|映像メディア|サウンド制作|メディアデザイン)コース", "([^"]+)", "([1-4][前後])",/gm;
for (const match of curriculum.matchAll(courseNode)) {
  const [, nodeId, name, course] = match;
  const teachers = instructorRows.get(normalize(name));
  if (!teachers) throw new Error(`No timetable record for ${name} (${nodeId})`);
  subjects.push({ name, course, teachers, required: requiredByCourse.get(course).has(normalize(name)) });
}
if (subjects.length !== 65) throw new Error(`Expected 65 course nodes, found ${subjects.length}`);
for (const course of courses) {
  const found = subjects.filter((subject) => subject.course === course.name && subject.required).length;
  if (found !== 8) throw new Error(`Expected 8 required course nodes for ${course.name}, found ${found}`);
}

function namesFor(value) {
  if (value === "—" || value === "記載なし") return [];
  const matches = [...value.matchAll(/([^\s（）/、]+)\s+([^\s（）/、]+)/gu)];
  return [...new Map(matches.map((match) => {
    const name = `${match[1]} ${match[2]}`;
    return [normalize(name), { name }];
  })).values()];
}

function teachersFor(subject) {
  return [
    ...namesFor(subject.teachers.first),
    ...namesFor(subject.teachers.second)
  ];
}

function groupByTeacher(entries) {
  const groups = new Map();
  for (const subject of entries) {
    const assigned = teachersFor(subject);
    for (const teacher of assigned.length ? assigned : [{ name: "担当者未記載" }]) {
      const key = normalize(teacher.name);
      if (!groups.has(key)) groups.set(key, { name: teacher.name, subjects: new Map() });
      const group = groups.get(key);
      const subjectKey = normalize(subject.name);
      if (!group.subjects.has(subjectKey)) {
        group.subjects.set(subjectKey, { name: subject.name, courses: new Set(), requiredCourses: new Set() });
      }
      const entry = group.subjects.get(subjectKey);
      entry.courses.add(subject.course);
      if (subject.required) entry.requiredCourses.add(subject.course);
    }
  }
  for (const group of groups.values()) {
    group.requiredCount = [...group.subjects.values()].filter((entry) => entry.requiredCourses.size > 0).length;
    group.employment = group.name === "担当者未記載" ? "unlisted" : listedFaculty.has(normalize(group.name)) ? "regular" : "adjunct";
  }
  return groups;
}
const employmentRank = { regular: 0, adjunct: 1, unlisted: 2 };
function compareTeacherGroups(a, b) {
  return employmentRank[a.employment] - employmentRank[b.employment]
    || Number(b.requiredCount > 0) - Number(a.requiredCount > 0)
    || b.subjects.size - a.subjects.size
    || b.requiredCount - a.requiredCount
    || a.name.localeCompare(b.name, "ja");
}
const teacherGroups = groupByTeacher(subjects);
const unassignedTeachers = informationMediaFaculty
  .filter((name) => !teacherGroups.has(normalize(name)))
  .map((name) => ({
    name,
    subjects: new Map(),
    requiredCount: 0,
    employment: "regular"
  }));
const sortedTeachers = [...teacherGroups.values(), ...unassignedTeachers].sort(compareTeacherGroups);
const teachersByCourse = new Map(courses.map((course) => [
  course.id,
  [...groupByTeacher(subjects.filter((subject) => subject.course === course.name)).values()].sort(compareTeacherGroups)
]));
const unassignedGroup = {
  name: "コース科目未担当",
  id: "unassigned",
  number: "05"
};
const showcaseGroups = [...courses, unassignedGroup];
const showcasePeople = courses.flatMap((course) => teachersByCourse.get(course.id).map((group, index) => ({
  course,
  group,
  targetId: `faculty-${course.id}-${index + 1}`
}))).concat(unassignedTeachers.map((group, index) => ({
  course: unassignedGroup,
  group,
  targetId: `faculty-unassigned-${index + 1}`
})));

function courseMarkup(course) {
  const entries = subjects.filter((subject) => subject.course === course.name);
  const grouped = teachersByCourse.get(course.id);
  return `<section class="course-section" id="${course.id}" data-course="${escapeHtml(course.name)}">
    <header class="section-head">
      <span class="section-number">${course.number} / 04</span>
      <div><p class="section-english">${course.english}</p><h2>${course.name}<span>コース</span></h2></div>
      <strong class="section-count">${entries.length}<small>科目</small></strong>
    </header>
    <div class="faculty-grid course-faculty-grid">${grouped.map((group, index) => groupedTeacherMarkup(group, { courseScoped: true, id: `faculty-${course.id}-${index + 1}` })).join("\n")}</div>
  </section>`;
}

function showcaseMarkup() {
  return `<div class="showcase" aria-label="情報メディア学科の教員アトラス">
    <div class="showcase-heading"><p class="showcase-kicker">FACULTY ATLAS / 2026</p><p>マウス移動・ドラッグ・スワイプで教員をたどる。写真を選ぶと教員情報へ。</p></div>
    <div class="showcase-stage" tabindex="0" aria-label="情報メディア学科の教員。マウスを動かすか、ドラッグ・スワイプで教員を選べます">${showcasePeople.map(({ course, group, targetId }, index) => {
      const source = portraits.get(normalize(group.name));
      const name = escapeHtml(group.name);
      const avatar = source
        ? `<img src="${escapeHtml(source.imageUrl)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" draggable="false">`
        : `<span class="showcase-fallback" aria-hidden="true">${escapeHtml(group.name[0])}</span>`;
      const ariaLabel = course.id === "unassigned"
        ? `${name}の教員情報へ（コース科目未担当）`
        : `${escapeHtml(course.name)}コース・${name}の担当科目へ`;
      return `<a class="showcase-person${index === 0 ? " is-current" : ""}" data-course="${course.id}" href="#${targetId}" aria-label="${ariaLabel}" tabindex="${index === 0 ? "0" : "-1"}"${index === 0 ? ' aria-current="true"' : ""}><span class="showcase-portrait">${avatar}</span><span class="showcase-person-name">${name}</span><span class="showcase-person-course">${escapeHtml(course.name)}</span></a>`;
    }).join("\n")}</div>
    <div class="showcase-caption"><div><span class="showcase-current-course">${courses[0].name}コース</span><strong class="showcase-current-name">${escapeHtml(showcasePeople[0].group.name)}</strong></div><a class="showcase-detail" href="#${showcasePeople[0].targetId}">担当科目を見る <span aria-hidden="true">↗</span></a></div>
    <div class="showcase-course-legend" aria-label="教員の並び順">${showcaseGroups.map((course) => `<span data-course="${course.id}"><b>${course.number}</b>${course.name}</span>`).join("")}</div>
  </div>`;
}

function groupedTeacherMarkup(group, { courseScoped = false, id = "" } = {}) {
  const source = portraits.get(normalize(group.name));
  const name = escapeHtml(group.name);
  const avatar = source
    ? `<img src="${escapeHtml(source.imageUrl)}" alt="${name}の顔写真" loading="lazy" decoding="async" referrerpolicy="no-referrer">`
    : `<span class="teacher-fallback" aria-hidden="true">${escapeHtml(group.name[0])}</span>`;
  const profile = source
    ? `<a href="${escapeHtml(source.profileUrl)}" target="_blank" rel="noopener noreferrer">大学公式プロフィール <span aria-hidden="true">↗</span></a>`
    : "";
  const entries = [...group.subjects.values()];
  const heading = courseScoped ? "h3" : "h2";
  const employmentLabel = group.employment === "regular" ? "常勤" : group.employment === "adjunct" ? "非常勤" : "";
  return `<article class="faculty-card${courseScoped ? " course-faculty-card" : ""}"${id ? ` id="${id}"` : ""}>
    <header class="faculty-head">${avatar}<div class="faculty-identity"><div class="faculty-heading"><${heading}>${name}</${heading}>${employmentLabel ? `<span class="employment-badge ${group.employment}">${employmentLabel}</span>` : ""}</div>${profile}</div></header>
    ${entries.length ? `<ul class="faculty-subjects">${entries.map((entry) => `<li class="${entry.requiredCourses.size ? "is-required" : ""}">
      <div class="faculty-subject-title"><div class="subject-name"><strong>${escapeHtml(entry.name)}</strong>${entry.requiredCourses.size ? `<span class="required-badge">必修</span>` : ""}</div></div>${courseScoped ? "" : `
      <div class="faculty-tags">${courses.filter((course) => entry.courses.has(course.name)).map((course) => `<span class="${entry.requiredCourses.has(course.name) ? "required-course" : ""}">${escapeHtml(course.name)}${entry.requiredCourses.has(course.name) ? "・必修" : ""}</span>`).join("")}</div>`}
    </li>`).join("\n")}</ul>` : `<p class="faculty-unassigned-note">2026年度の4コース科目には担当記載がありません。</p>`}
  </article>`;
}

function unassignedMarkup() {
  return `<section class="course-section unassigned-section" id="unassigned" data-course="コース科目未担当">
    <header class="section-head">
      <span class="section-number">05 / REF</span>
      <div><p class="section-english">NOT ASSIGNED TO FOUR COURSES</p><h2>コース科目未担当</h2></div>
      <strong class="section-count">${unassignedTeachers.length}<small>教員</small></strong>
    </header>
    <p class="unassigned-description">大学公式の情報メディア学科所属一覧には掲載され、2026年度の4コース科目担当者一覧には現れない教員です。</p>
    <div class="faculty-grid course-faculty-grid">${unassignedTeachers.map((group, index) => groupedTeacherMarkup(group, { courseScoped: true, id: `faculty-unassigned-${index + 1}` })).join("\n")}</div>
  </section>`;
}

const output = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="名古屋文理大学情報メディア学科4コースの科目・担当教員と、4コース科目未担当の所属教員をまとめた2026年度参考一覧。">
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
        <h1>教員を知る<span>。</span></h1>
        <p class="intro">4つのコースと未担当枠を横断して、教員をたどる。</p>
      </div>
      ${showcaseMarkup()}
    </header>

    <main id="main-content">
      <div class="view-switch" role="group" aria-label="一覧の表示方法">
        <button type="button" class="is-active" data-view="course" aria-pressed="true">コース別</button>
        <button type="button" data-view="teacher" aria-pressed="false">担当者別</button>
      </div>
      <div id="courseView">${courses.map(courseMarkup).join("\n")}${unassignedMarkup()}</div>
      <div id="teacherView" hidden>
        <div class="faculty-intro"><p class="section-english">BY INSTRUCTOR / 2026</p><h2>担当者別一覧</h2><p>同じ科目が複数コースにある場合は、担当者の下で一つにまとめています。4コース科目の担当記載がない情報メディア学科所属教員も掲載しています。</p></div>
        <div class="faculty-grid">${sortedTeachers.map((group) => groupedTeacherMarkup(group)).join("\n")}</div>
      </div>
    </main>

    <footer class="source-note">
      <div><p class="eyebrow">SOURCE &amp; NOTES</p><h2>コース科目と担当教員</h2></div>
      <div class="source-body">
        <p class="source-summary">4つのコースで学ぶ科目・担当者と、4コース科目未担当の情報メディア学科所属教員の一覧です。写真は大学公式サイトに掲載されている場合のみ表示しています。</p>
        <div class="source-facts"><span><strong>04</strong> コース</span><span><strong>${subjects.length}</strong> 科目掲載</span><span><strong>${sortedTeachers.length}</strong> 教員掲載</span><span><strong>${new Set(showcasePeople.filter(({ group }) => portraits.has(normalize(group.name))).map(({ group }) => normalize(group.name))).size}</strong> 写真あり</span></div>
        <p>科目の掲載範囲は本アプリの公式カリキュラムツリーにおける4コースの科目群です。コース共通、基礎教育、教職、他学科の科目は含みません。必修表示は本アプリのコース必修定義に基づきます。同一科目が複数コースにある場合、担当者別ではコース名を併記して一つにまとめています。</p>
        <p>大学公式の情報メディア学科所属一覧に掲載され、4コース科目の担当者一覧に現れない教員は「コース科目未担当」に掲載しています（2026年9月25日確認）。</p>
        <p>担当者は大学の教育スタッフ紹介への掲載有無で常勤・非常勤を区分しています（2026年9月17日確認）。未掲載の担当者は非常勤として扱い、常勤を先に、その中で必修担当の有無、担当科目数の順に並べています。これは一覧用の分類であり、正式な雇用区分を証明するものではありません。</p>
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
console.log(`${subjects.length} subjects, ${sortedTeachers.length} listed faculty, ${unassignedTeachers.length} without four-course assignments`);
