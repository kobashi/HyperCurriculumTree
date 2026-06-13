const TERMS = [
  { id: "1前", year: 1, label: "1年前期" },
  { id: "1後", year: 1, label: "1年後期" },
  { id: "2前", year: 2, label: "2年前期" },
  { id: "2後", year: 2, label: "2年後期" },
  { id: "3前", year: 3, label: "3年前期" },
  { id: "3後", year: 3, label: "3年後期" },
  { id: "4前", year: 4, label: "4年前期" },
  { id: "4後", year: 4, label: "4年後期" }
];

const COURSES = ["情報システム", "映像メディア", "サウンド制作", "メディアデザイン"];

const aliases = new Map([
  ["Webプログラミング", "Ｗｅｂプログラミング"],
  ["Webデザイン", "Ｗｅｂデザイン"],
  ["MIDI制作演習Ⅰ", "ＭＩＤＩ制作演習Ⅰ"],
  ["MIDI制作演習Ⅱ", "ＭＩＤＩ制作演習Ⅱ"],
  ["アルゴリズムと構造", "アルゴリズムとデータ構造"],
  ["ITマネジメント", "ＩＴマネジメント"],
  ["ITストラテジ", "ＩＴストラテジ"],
  ["CG基礎", "ＣＧ基礎"]
]);

const normalizeName = (name) => {
  const compact = name.replace(/\s+/g, "").replace(/[・･]/g, "");
  const direct = aliases.get(name) || aliases.get(compact);
  if (direct) return direct;
  return name
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[・･]/g, "")
    .replace(/Web/i, "WEB")
    .replace(/MIDI/i, "MIDI")
    .replace(/IT/i, "IT")
    .replace(/CG/i, "CG");
};

const termId = (year, term) => `${year}${term}`;
const QUALIFICATION_TERM = "qualification";
const INTENSIVE_TERM = "intensive";
const RECOGNITION_METHODS = [
  { id: INTENSIVE_TERM, label: "科目履修" },
  { id: QUALIFICATION_TERM, label: "資格取得" }
];

const qualificationRecognitions = [
  ["Q-001", "ITパスポート", 2, 1, "前"],
  ["Q-002", "基本情報技術者", 2, 1, "前"]
];

const intensiveCourseNames = new Set([
  "海外事情",
  "アウトドアスポーツⅠ",
  "アウトドアスポーツⅡ",
  "ボランティア活動",
  "ITパスポート",
  "基本情報技術者"
]);

const requiredBasic = [
  ["B-REQ-01", "プラクティカル・イングリッシュⅠ", 2, 1, "前", true],
  ["B-REQ-02", "プラクティカル・イングリッシュⅡ", 2, 1, "後", false],
  ["B-REQ-03", "情報リテラシー", 2, 1, "前", true],
  ["B-REQ-04", "ＩＣＴ基礎", 2, 1, "後", false],
  ["B-REQ-05", "健康と栄養", 2, 1, "前", false],
  ["B-REQ-06", "フレッシュマンセミナーⅠ", 1, 1, "前", false],
  ["B-REQ-07", "フレッシュマンセミナーⅡ", 1, 1, "後", false],
  ["B-REQ-08", "基礎演習Ⅰ", 2, 2, "前", false],
  ["B-REQ-09", "基礎演習Ⅱ", 2, 2, "後", false],
  ["B-REQ-10", "日本語力Ⅰ", 1, 2, "前", false],
  ["B-REQ-11", "日本語力Ⅱ", 1, 2, "後", false],
  ["B-REQ-12", "数的処理Ⅰ", 1, 1, "後", false],
  ["B-REQ-13", "数的処理Ⅱ", 1, 1, "後", false],
  ["B-REQ-14", "キャリアデザインⅠ", 1, 2, "後", false],
  ["B-REQ-15", "キャリアデザインⅡ", 1, 3, "前", false]
];

const commonRequired = [
  ["C-REQ-01", "プログラミング入門", 2, 1, "前", true],
  ["C-REQ-02", "情報学概論", 2, 1, "前", true],
  ["C-REQ-03", "情報メディア論", 2, 1, "前", false],
  ["C-REQ-04", "プログラム演習Ⅰ", 2, 1, "後", false],
  ["C-REQ-05", "ＩＴマネジメント", 2, 1, "後", false],
  ["C-REQ-06", "ＩＴストラテジ", 2, 2, "前", false],
  ["C-REQ-07", "専門演習Ⅰ", 2, 3, "前", false],
  ["C-REQ-08", "専門演習Ⅱ", 2, 3, "後", false],
  ["C-REQ-09", "卒業演習Ⅰ", 2, 4, "前", false],
  ["C-REQ-10", "卒業演習Ⅱ", 2, 4, "後", false]
];

const courseRequired = {
  情報システム: [
    ["情報システム入門", 1, "前", false],
    ["情報基礎理論", 1, "後", false],
    ["プログラム演習Ⅱ", 2, "前", false],
    ["アルゴリズムとデータ構造", 2, "前", true],
    ["メディア情報技術", 2, "後", false],
    ["コンピュータネットワークⅠ", 2, "後", true],
    ["システム開発論", 3, "前", false],
    ["データベース", 3, "前", true]
  ],
  映像メディア: [
    ["デジタルアート入門", 1, "前", true],
    ["アニメーション", 1, "後", false],
    ["ＣＧ基礎", 2, "前", false],
    ["映像制作演習Ⅰ", 2, "前", false],
    ["映像史とアーカイブ", 2, "前", false],
    ["色彩学", 2, "前", false],
    ["映像制作演習Ⅱ", 2, "後", false],
    ["映像加工技術", 3, "前", false]
  ],
  サウンド制作: [
    ["デジタルサウンド入門", 1, "前", false],
    ["ＭＩＤＩ制作演習Ⅰ", 1, "後", false],
    ["音響実務", 2, "前", false],
    ["ＭＩＤＩ制作演習Ⅱ", 2, "前", false],
    ["音楽理論", 2, "前", false],
    ["音響学", 2, "後", false],
    ["聴能・音感演習", 2, "後", false],
    ["サウンドクリエーション", 2, "後", false]
  ],
  メディアデザイン: [
    ["メディアデザイン入門", 1, "前", false],
    ["グラフィックデザイン", 1, "後", false],
    ["メディアデザイン演習Ⅰ", 2, "前", false],
    ["色彩学", 2, "前", false],
    ["Ｗｅｂプログラミング", 2, "前", false],
    ["メディアデザイン演習Ⅱ", 2, "後", false],
    ["Ｗｅｂデザイン", 2, "後", true],
    ["マルチメディア", 3, "前", true]
  ]
};

const specializedElectives = [
  ["SE-001", "情報社会の倫理と職業", 2, 1, "後", true],
  ["SE-002", "情報処理演習", 2, 1, "後", true],
  ["SE-003", "ソフトウェア基礎", 2, 2, "前", true],
  ["SE-004", "プログラム演習Ⅲ", 2, 3, "前"],
  ["SE-005", "プログラム演習Ⅳ", 2, 3, "後"],
  ["SE-006", "コンピュータネットワークⅡ", 2, 3, "前"],
  ["SE-007", "メディアアート", 2, 3, "後"],
  ["SE-008", "ＣＧ演習", 2, 3, "後"],
  ["SE-009", "レコーディング演習", 2, 3, "前"],
  ["SE-010", "暮しとデザイン", 2, 3, "前"],
  ["SE-011", "Ｗｅｂ解析", 2, 3, "前"]
];

const basicElectives = [
  ["BE-001", "哲学", 2, "前"],
  ["BE-002", "心理学", 2, "前"],
  ["BE-003", "海外事情", 2, "前"],
  ["BE-004", "芸術", 2, "後"],
  ["BE-005", "人間関係論", 2, "後"],
  ["BE-006", "現代日本史", 2, "後"],
  ["BE-007", "日本国憲法", 2, "前", true],
  ["BE-008", "経営学", 2, "前"],
  ["BE-009", "社会学", 2, "前"],
  ["BE-010", "法学", 2, "後"],
  ["BE-011", "経済学", 2, "後"],
  ["BE-012", "自然科学Ⅰ", 2, "前"],
  ["BE-013", "統計学", 2, "前"],
  ["BE-014", "自然科学Ⅱ", 2, "後"],
  ["BE-015", "フランス語Ⅰ", 2, "前"],
  ["BE-016", "フランス語Ⅱ", 2, "後"],
  ["BE-017", "中国語Ⅰ", 2, "前"],
  ["BE-018", "中国語Ⅱ", 2, "後"],
  ["BE-019", "韓国語Ⅰ", 2, "前"],
  ["BE-020", "韓国語Ⅱ", 2, "後"],
  ["BE-021", "スポーツⅠ", 1, "前", true],
  ["BE-022", "スポーツⅡ", 1, "後", true],
  ["BE-023", "アウトドアスポーツⅠ", 1, "前"],
  ["BE-024", "アウトドアスポーツⅡ", 1, "後"],
  ["BE-025", "スポーツ科学", 2, "後"],
  ["BE-026", "地域の課題", 2, "後"],
  ["BE-027", "ボランティア活動", 2, "後"]
];

const otherDeptNames = [
  "デザイン基礎", "フードサイエンス基礎", "食品流通論", "簿記", "パッケージデザイン",
  "商学", "食品学Ⅱ", "食とデザインⅠ", "カフェ・レストランプロデュース", "食文化論",
  "社会調査入門", "ホスピタリティ論", "食品表示制度", "食と環境", "フードスペシャリスト論",
  "食品衛生学", "フードサービス論", "フードビジネス・イングリッシュⅠ", "消費行動論",
  "フードプランニング", "アグリビジネス", "質的調査法", "フードビジネス特別講義Ⅰ",
  "カメラ基礎", "調理学", "食品学Ⅰ", "ヒューマンリソースマネジメント",
  "フードビジネス・イングリッシュⅡ", "食社会学", "統計処理", "加工食品学",
  "食品貿易論", "国際会計", "企業会計", "フードサービス論Ⅱ",
  "フードビジネス特別講義Ⅱ", "商品開発Ⅰ", "チェーンストアシステム",
  "フードコーディネート論", "リテールマーケティング", "国際商取引", "栄養学",
  "食品安全学", "食品産業論", "応用フードコーディネート論"
];

const teacherCourses = [
  ["T-001", "教育原理", 2, 1, "前"],
  ["T-002", "教師論", 2, 1, "後"],
  ["T-003", "教育課程論", 2, 2, "前"],
  ["T-004", "教育の制度と経営", 2, 2, "後"],
  ["T-005", "情報科教育法Ⅰ", 2, 3, "前"],
  ["T-006", "情報科教育法Ⅱ", 2, 3, "後"],
  ["T-007", "教育実習", 2, 4, "前"],
  ["T-008", "教職実践演習", 2, 4, "後"]
];

const prereqs = {
  "プラクティカル・イングリッシュⅡ": ["プラクティカル・イングリッシュⅠ"],
  "ＩＣＴ基礎": ["情報リテラシー"],
  "フレッシュマンセミナーⅡ": ["フレッシュマンセミナーⅠ"],
  "基礎演習Ⅰ": ["フレッシュマンセミナーⅡ"],
  "基礎演習Ⅱ": ["基礎演習Ⅰ"],
  "日本語力Ⅱ": ["日本語力Ⅰ"],
  "数的処理Ⅱ": ["数的処理Ⅰ"],
  "キャリアデザインⅡ": ["キャリアデザインⅠ"],
  "プログラム演習Ⅰ": ["プログラミング入門"],
  "ＩＴストラテジ": ["ＩＴマネジメント"],
  "専門演習Ⅱ": ["専門演習Ⅰ"],
  "卒業演習Ⅰ": ["専門演習Ⅱ"],
  "卒業演習Ⅱ": ["卒業演習Ⅰ"],
  "フランス語Ⅱ": ["フランス語Ⅰ"],
  "中国語Ⅱ": ["中国語Ⅰ"],
  "韓国語Ⅱ": ["韓国語Ⅰ"]
};

const state = {
  course: "情報システム",
  teacher: false,
  gpa: 1,
  secondYearGpa: 1,
  manualOther: 0,
  openCourseId: null,
  planned: new Map()
};

const standardTermOverrides = {
  "数的処理Ⅱ": "2後",
  "日本国憲法": "1前",
  "経営学": "2前",
  "スポーツⅠ": "1前",
  "スポーツⅡ": "1後",
  "哲学": "2前",
  "心理学": "2後",
  "統計学": "2前",
  "地域の課題": "2後"
};

function validTermsForCourse(course) {
  if (course.qualificationEligible) return TERMS;
  if (!course.year) return TERMS.filter((term) => term.id.endsWith(course.term));
  return TERMS.filter((term) => term.year >= course.year && term.id.endsWith(course.term));
}

function openingTermForCourse(course) {
  const preferred = standardTermOverrides[course.name] || course.defaultTerm;
  const valid = validTermsForCourse(course);
  if (valid.some((term) => term.id === preferred)) return preferred;
  return valid[0]?.id || course.defaultTerm;
}

function recognitionValue(method, term) {
  return `${method}:${term}`;
}

function parseRecognitionValue(value) {
  if (typeof value !== "string" || !value.includes(":")) return null;
  const [method, term] = value.split(":");
  if (!RECOGNITION_METHODS.some((item) => item.id === method)) return null;
  if (!TERMS.some((item) => item.id === term)) return null;
  return { method, term };
}

function recognitionTermsForMethod(course, method) {
  return validTermsForCourse(course);
}

const categoryLabels = {
  basicRequired: "基礎必修",
  basicElective: "基礎選択",
  commonRequired: "専門共通",
  courseRequired: "コース必修",
  specializedElective: "専門選択",
  otherDept: "他学科",
  teacher: "教職"
};

const capExcludedCourseNames = new Set([
  "アウトドアスポーツⅠ",
  "アウトドアスポーツⅡ",
  "インターンシップ",
  "ボランティア活動",
  "情報メディア特別演習Ⅰ",
  "情報メディア特別演習Ⅱ"
]);

function isCapExcludedCourse({ name, category, qualificationEligible = false }) {
  return category === "teacher" || qualificationEligible || capExcludedCourseNames.has(name) || intensiveCourseNames.has(name);
}

function isQualificationPlanned(course) {
  return course.qualificationEligible && plannedMethod(course) === QUALIFICATION_TERM;
}

function isRecognitionPlanned(course) {
  return course.qualificationEligible && RECOGNITION_METHODS.some((item) => item.id === plannedMethod(course));
}

function recognitionMethodLabel(course) {
  const method = RECOGNITION_METHODS.find((item) => item.id === plannedMethod(course));
  if (method) return method.label;
  return "単位認定";
}

function plannedLabel(course) {
  const term = TERMS.find((item) => item.id === plannedTerm(course));
  if (!term) return "";
  return isRecognitionPlanned(course) ? `${recognitionMethodLabel(course)} ${term.label}` : term.label;
}

function plannedButtonLabel(course) {
  const term = TERMS.find((item) => item.id === plannedTerm(course));
  if (!term) return "履修";
  if (!isRecognitionPlanned(course)) return term.id;
  return `${plannedMethod(course) === QUALIFICATION_TERM ? "資格" : "履修"} ${term.id}`;
}

function isCapExcludedInPlan(course) {
  return course.capExcluded || isQualificationPlanned(course);
}

function makeCourse({ id, name, credits, year, term, category, teacherRequired = false, course = null, qualificationEligible = false }) {
  return {
    id,
    name,
    key: normalizeName(name),
    credits,
    year,
    term,
    defaultTerm: year ? termId(year, term) : null,
    category,
    teacherRequired,
    qualificationEligible,
    intensive: intensiveCourseNames.has(name),
    capExcluded: isCapExcludedCourse({ name, category, qualificationEligible }),
    course
  };
}

function buildCourses() {
  const courses = [];
  requiredBasic.forEach(([id, name, credits, year, term, teacherRequired]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "basicRequired", teacherRequired }));
  });
  commonRequired.forEach(([id, name, credits, year, term, teacherRequired]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "commonRequired", teacherRequired }));
  });
  Object.entries(courseRequired).forEach(([course, rows]) => {
    rows.forEach(([name, year, term, teacherRequired], index) => {
      courses.push(makeCourse({
        id: `CR-${course}-${index + 1}`,
        name,
        credits: 2,
        year,
        term,
        category: "courseRequired",
        teacherRequired,
        course
      }));
      courses.push(makeCourse({
        id: `SE-${course}-${index + 1}`,
        name,
        credits: 2,
        year,
        term,
        category: "specializedElective",
        teacherRequired,
        course
      }));
    });
  });
  specializedElectives.forEach(([id, name, credits, year, term, teacherRequired = false]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "specializedElective", teacherRequired }));
  });
  basicElectives.forEach(([id, name, credits, term, teacherRequired = false]) => {
    courses.push(makeCourse({ id, name, credits, year: null, term, category: "basicElective", teacherRequired }));
  });
  otherDeptNames.forEach((name, index) => {
    courses.push(makeCourse({
      id: `OD-${String(index + 1).padStart(3, "0")}`,
      name,
      credits: name.includes("カメラ") ? 1 : 2,
      year: 1,
      term: index % 2 === 0 ? "前" : "後",
      category: "otherDept"
    }));
  });
  teacherCourses.forEach(([id, name, credits, year, term]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "teacher", teacherRequired: true }));
  });
  qualificationRecognitions.forEach(([id, name, credits, year, term]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "specializedElective", qualificationEligible: true }));
  });
  return dedupeCourses(courses);
}

function dedupeCourses(courses) {
  const seen = new Map();
  courses.forEach((course) => {
    const scope = course.category === "courseRequired" ? course.course : course.category;
    const key = `${scope}:${course.key}`;
    if (!seen.has(key)) {
      seen.set(key, course);
      return;
    }
    const existing = seen.get(key);
    existing.teacherRequired = existing.teacherRequired || course.teacherRequired;
    existing.qualificationEligible = existing.qualificationEligible || course.qualificationEligible;
    existing.capExcluded = existing.capExcluded || course.capExcluded;
  });
  return [...seen.values()];
}

const allCourses = buildCourses();

function currentCourseRequiredKeys() {
  return new Set(allCourses
    .filter((course) => course.category === "courseRequired" && course.course === state.course)
    .map((course) => course.key));
}

function visibleCourses() {
  const filter = document.querySelector("#categoryFilter").value;
  const years = new Set([...document.querySelectorAll(".year-filter:checked")].map((input) => Number(input.value)));
  const terms = new Set([...document.querySelectorAll(".term-filter:checked")].map((input) => input.value));
  const currentRequired = currentCourseRequiredKeys();
  return allCourses.filter((course) => {
    if (course.category === "courseRequired" && course.course !== state.course) return false;
    if (course.category === "specializedElective" && currentRequired.has(course.key)) return false;
    if (course.category === "teacher" && !state.teacher) return false;
    if (filter !== "all" && course.category !== filter) return false;
    if (course.qualificationEligible) return years.size > 0 && terms.size > 0;
    if (!course.year) return terms.has(course.term);
    return years.has(course.year) && terms.has(course.term);
  });
}

function selectedCourses() {
  return allCourses.filter((course) => state.planned.has(course.id));
}

function plannedTerm(course) {
  const raw = state.planned.get(course.id);
  return parseRecognitionValue(raw)?.term || raw;
}

function plannedMethod(course) {
  return parseRecognitionValue(state.planned.get(course.id))?.method || null;
}

function isValidPlannedValue(course, value) {
  const recognition = parseRecognitionValue(value);
  if (recognition) {
    return course.qualificationEligible && recognitionTermsForMethod(course, recognition.method).some((term) => term.id === recognition.term);
  }
  return validTermsForCourse(course).some((term) => term.id === value) && !course.qualificationEligible;
}

function setPlanned(courseId, term) {
  const course = allCourses.find((item) => item.id === courseId);
  if (term === "none") {
    state.planned.delete(courseId);
  } else if (parseRecognitionValue(term)) {
    const recognition = parseRecognitionValue(term);
    const valid = course?.qualificationEligible && recognitionTermsForMethod(course, recognition.method).some((item) => item.id === recognition.term);
    if (valid) state.planned.set(courseId, term);
  } else {
    if (course && isValidPlannedValue(course, term)) state.planned.set(courseId, term);
  }
  state.openCourseId = null;
  render();
}

function resetCatalogFilters() {
  const categoryFilter = document.querySelector("#categoryFilter");
  if (categoryFilter) categoryFilter.value = "all";
  document.querySelectorAll(".year-filter, .term-filter").forEach((input) => {
    input.checked = true;
  });
}

function autoFill() {
  state.planned.clear();
  state.openCourseId = null;
  resetCatalogFilters();
  allCourses.forEach((course) => {
    if (course.category === "courseRequired" && course.course !== state.course) return;
    if (course.category === "teacher" && !state.teacher) return;
    if (["basicRequired", "commonRequired", "courseRequired"].includes(course.category)) {
      state.planned.set(course.id, openingTermForCourse(course));
    }
  });
  const basicElectiveTargets = allCourses.filter((course) =>
    course.category === "basicElective" && ["日本国憲法", "経営学", "スポーツⅠ", "スポーツⅡ", "哲学", "心理学", "統計学", "地域の課題"].includes(course.name)
  );
  basicElectiveTargets.forEach((course) => {
    state.planned.set(course.id, openingTermForCourse(course));
  });
  if (state.teacher) {
    allCourses.filter((course) => course.category === "teacher").forEach((course) => state.planned.set(course.id, openingTermForCourse(course)));
  }
  render();
}

function totals() {
  const selected = selectedCourses();
  const sum = (predicate) => selected.filter(predicate).reduce((total, course) => total + course.credits, 0);
  const basicRequiredCredits = sum((course) => course.category === "basicRequired");
  const basicElectiveRaw = sum((course) => course.category === "basicElective");
  const basicElectiveCredits = Math.min(basicElectiveRaw, 14);
  const basicElectiveTransfer = Math.min(Math.max(0, basicElectiveRaw - 14), 10);
  const basicElectiveOutside = Math.max(0, basicElectiveRaw - 24);
  const basic = basicRequiredCredits + basicElectiveCredits;
  const common = sum((course) => course.category === "commonRequired");
  const courseSpecific = sum((course) => course.category === "courseRequired" && course.course === state.course);
  const specialized = sum((course) => course.category === "specializedElective");
  const otherDeptRaw = sum((course) => course.category === "otherDept");
  const otherDeptCounted = Math.min(otherDeptRaw, 12);
  const otherDeptOutside = Math.max(0, otherDeptRaw - otherDeptCounted);
  const qualification = sum((course) => isRecognitionPlanned(course));
  const teacher = sum((course) => course.category === "teacher");
  const professional = common + courseSpecific;
  const other = Number(state.manualOther) + basicElectiveTransfer + otherDeptCounted + specialized;
  const requirementOutside = teacher + otherDeptOutside + basicElectiveOutside;
  const attemptedTotal = basic + professional + other + requirementOutside;
  const total = basic + professional + other;
  return {
    selected,
    basic,
    basicRequiredCredits,
    basicElectiveCredits,
    basicElectiveRaw,
    basicElectiveTransfer,
    basicElectiveOutside,
    common,
    courseSpecific,
    specialized,
    professional,
    otherDeptRaw,
    otherDeptCounted,
    otherDeptOutside,
    qualification,
    teacher,
    other,
    requirementOutside,
    attemptedTotal,
    total
  };
}

function hasCourseByName(name) {
  const key = normalizeName(name);
  return selectedCourses().some((course) => course.key === key);
}

function termIndex(term) {
  return TERMS.findIndex((item) => item.id === term);
}

function validatePrereqs() {
  const selected = selectedCourses();
  const problems = [];
  selected.forEach((course) => {
    if (isQualificationPlanned(course)) return;
    const required = prereqs[course.name] || [];
    required.forEach((requiredName) => {
      if (!hasCourseByName(requiredName)) {
        problems.push(`${course.name}: ${requiredName} が未配置`);
        return;
      }
      const prereqCourse = selected.find((item) => item.key === normalizeName(requiredName));
      if (prereqCourse && termIndex(plannedTerm(prereqCourse)) >= termIndex(plannedTerm(course))) {
        problems.push(`${course.name}: ${requiredName} を前の学期に配置`);
      }
    });
  });
  return problems;
}

function capProblems() {
  const cap = state.gpa >= 3.7 ? 26 : 24;
  return TERMS.map((term) => ({ term: term.label, ...termCredits(term.id), cap }))
    .filter((item) => item.capCounted > item.cap);
}

function termCredits(termIdValue) {
  const courses = selectedCourses().filter((course) => plannedTerm(course) === termIdValue);
  return courses.reduce((summary, course) => {
    summary.total += course.credits;
    if (isCapExcludedInPlan(course)) {
      summary.capExcluded += course.credits;
    } else {
      summary.capCounted += course.credits;
    }
    return summary;
  }, { total: 0, capCounted: 0, capExcluded: 0 });
}

function promotionStatus(stats) {
  const bySecondYear = selectedCourses()
    .filter((course) => termIndex(plannedTerm(course)) <= termIndex("2後"))
    .filter((course) => course.category !== "teacher");
  const basicElective = bySecondYear
    .filter((course) => course.category === "basicElective")
    .reduce((total, course) => total + course.credits, 0);
  const basicElectiveOutside = Math.max(0, basicElective - 24);
  const otherDept = bySecondYear
    .filter((course) => course.category === "otherDept")
    .reduce((total, course) => total + course.credits, 0);
  const earnedBySecondYear = bySecondYear
    .filter((course) => course.category !== "otherDept")
    .reduce((total, course) => total + course.credits, 0) - basicElectiveOutside + Math.min(otherDept, 12);
  const gpaOk = state.gpa >= 1 || state.secondYearGpa >= 1;
  return { credits: earnedBySecondYear, ok: earnedBySecondYear >= 50 && gpaOk, gpaOk };
}

function renderCatalog() {
  const catalog = document.querySelector("#catalogList");
  catalog.innerHTML = "";
  visibleCourses().forEach((course) => {
    const card = document.createElement("article");
    card.className = `course-card${state.planned.has(course.id) ? " is-planned" : ""}`;

    const main = document.createElement("div");
    main.className = "course-main";

    const info = document.createElement("div");
    info.className = "course-info";

    const title = document.createElement("div");
    title.className = "course-title";
    title.innerHTML = `<span>${course.name}</span><small>${course.credits}単位</small>`;

    const validTerms = validTermsForCourse(course);
    const currentValue = state.planned.get(course.id);
    if (currentValue && !isValidPlannedValue(course, currentValue)) {
      state.planned.delete(course.id);
    }

    const tags = document.createElement("div");
    tags.className = "tags";
    const termTag = course.qualificationEligible ? "履修/資格" : `${course.year ? `${course.year}年` : "年次なし"}${course.term}`;
    const tagTexts = [categoryLabels[course.category], course.course, termTag].filter(Boolean);
    tagTexts.forEach((text) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = text;
      tags.appendChild(tag);
    });
    if (course.teacherRequired) {
      const tag = document.createElement("span");
      tag.className = "tag teacher";
      tag.textContent = "教職必修";
      tags.appendChild(tag);
    }
    if (course.intensive) {
      const tag = document.createElement("span");
      tag.className = "tag qualification";
      tag.textContent = "集中講義";
      tags.appendChild(tag);
    }
    if (course.qualificationEligible) {
      const tag = document.createElement("span");
      tag.className = "tag qualification";
      tag.textContent = "上限外";
      tags.appendChild(tag);
    }
    const actions = document.createElement("div");
    actions.className = "course-actions";
    const select = document.createElement("select");
    select.setAttribute("aria-label", `${course.name}の配置`);
    const termOptions = course.qualificationEligible
      ? RECOGNITION_METHODS.flatMap((method) =>
        recognitionTermsForMethod(course, method.id).map((term) => `<option value="${recognitionValue(method.id, term.id)}">${method.label} ${term.label}</option>`)
      ).join("")
      : validTerms.map((term) => `<option value="${term.id}">${term.label}</option>`).join("");
    select.innerHTML = `<option value="none">未配置</option>${termOptions}`;
    select.value = state.planned.get(course.id) || "none";
    select.addEventListener("change", (event) => setPlanned(course.id, event.target.value));

    const opening = document.createElement("button");
    opening.type = "button";
    opening.textContent = state.planned.has(course.id) ? plannedButtonLabel(course) : "履修";
    opening.className = "plan-button";
    opening.setAttribute("aria-expanded", state.openCourseId === course.id ? "true" : "false");
    opening.setAttribute("aria-label", `${course.name}の履修時期を選択${state.planned.has(course.id) ? `: ${plannedLabel(course)}` : ""}`);
    opening.addEventListener("click", () => {
      state.openCourseId = state.openCourseId === course.id ? null : course.id;
      render();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `${course.name}を外す`);
    remove.addEventListener("click", () => setPlanned(course.id, "none"));

    actions.append(opening, remove);
    info.append(title, tags);
    main.append(info, actions);
    card.append(main);
    if (state.openCourseId === course.id) {
      const menu = document.createElement("div");
      menu.className = "course-menu";
      menu.appendChild(select);
      card.append(menu);
    }
    catalog.appendChild(card);
  });
}

function renderPlan() {
  const grid = document.querySelector("#planGrid");
  grid.innerHTML = "";
  const termLimit = state.gpa >= 3.7 ? 26 : 24;
  for (let year = 1; year <= 4; year += 1) {
    const column = document.createElement("div");
    column.className = "year-column";
    column.innerHTML = `<div class="year-title">${year}年</div>`;
    ["前", "後"].forEach((term) => {
      const id = termId(year, term);
      const courses = selectedCourses().filter((course) => plannedTerm(course) === id);
      const credits = termCredits(id);
      const box = document.createElement("section");
      box.className = `term-box${credits.capCounted > termLimit ? " limit-exceeded" : ""}`;
      box.innerHTML = `
        <div class="term-head">
          <span>${term}期</span>
          <strong>${credits.total}単位</strong>
        </div>
        <div class="term-credit-breakdown">
          <span class="limit-counted"><b>${credits.capCounted}</b><small>上限内</small></span>
          <span><b>${credits.capExcluded}</b><small>上限外</small></span>
        </div>
        <div class="planned-list">
          ${courses.map((course) => `
            <div class="planned-course${isCapExcludedInPlan(course) ? " cap-excluded" : ""}">
              <span>${course.name}</span>
              <small>${categoryLabels[course.category]} / ${course.credits}単位${isRecognitionPlanned(course) ? ` / ${recognitionMethodLabel(course)}` : ""}${course.category === "teacher" ? " / 要件外" : ""}${isCapExcludedInPlan(course) ? " / 上限外" : ""}</small>
            </div>
          `).join("")}
        </div>`;
      column.appendChild(box);
    });
    grid.appendChild(column);
  }
}

function setMeter(id, value, target) {
  document.querySelector(`#${id}`).style.width = `${Math.min(100, Math.round((value / target) * 100))}%`;
}

function renderSummary(stats) {
  document.querySelector("#totalCredits").textContent = `${stats.total} / 124`;
  document.querySelector("#totalDetail").textContent = `要件外 ${stats.requirementOutside}単位 / 履修計 ${stats.attemptedTotal}単位`;
  document.querySelector("#basicCredits").textContent = `${stats.basic} / 36`;
  document.querySelector("#professionalCredits").textContent = `${stats.professional} / 36`;
  document.querySelector("#otherCredits").textContent = `${stats.other} / 52`;
  setMeter("totalMeter", stats.total, 124);
  setMeter("basicMeter", stats.basic, 36);
  setMeter("professionalMeter", stats.professional, 36);
  setMeter("otherMeter", stats.other, 52);
}

function requirement(title, ok, detail) {
  return `<article class="requirement ${ok ? "ok" : "missing"}"><strong><span>${title}</span><span class="status">${ok ? "達成" : "未達"}</span></strong><p>${detail}</p></article>`;
}

function infoRequirement(title, detail) {
  return `<article class="requirement info"><strong><span>${title}</span><span class="status">情報</span></strong><p>${detail}</p></article>`;
}

function renderRequirements(stats) {
  const promotion = promotionStatus(stats);
  const teacherRequired = allCourses.filter((course) =>
    course.teacherRequired &&
    (course.category !== "courseRequired" || course.course === state.course) &&
    (course.category !== "teacher" || state.teacher)
  );
  const teacherMissing = teacherRequired.filter((course) => !state.planned.has(course.id));
  const html = [
    requirement("卒業要件単位", stats.total >= 124, `${stats.total}単位 / 124単位以上、要件外 ${stats.requirementOutside}単位`),
    requirement("基礎教育必修", stats.basicRequiredCredits >= 22, `${stats.basicRequiredCredits}単位 / 22単位`),
    requirement("基礎教育選択", stats.basicElectiveCredits >= 14, `${stats.basicElectiveCredits}単位 / 14単位、振替 ${stats.basicElectiveTransfer}単位、要件外 ${stats.basicElectiveOutside}単位`),
    requirement("基礎教育計", stats.basic >= 36, `${stats.basic}単位 / 36単位以上`),
    requirement("専門共通必修", stats.common >= 20, `${stats.common}単位 / 20単位`),
    requirement("コース必修", stats.courseSpecific >= 16, `${stats.courseSpecific}単位 / 16単位`),
    requirement("専門教育計", stats.professional >= 36, `${stats.professional}単位 / 36単位以上`),
    requirement("その他", stats.other >= 52, `${stats.other}単位 / 52単位以上、専門選択 ${stats.specialized}単位、基礎振替 ${stats.basicElectiveTransfer}単位、他学科 ${stats.otherDeptCounted}単位、単位認定 ${stats.qualification}単位`),
    infoRequirement("要件外", `教職 ${stats.teacher}単位、基礎選択超過 ${stats.basicElectiveOutside}単位、他学科超過 ${stats.otherDeptOutside}単位`),
    requirement("3年次進級", promotion.ok, `${promotion.credits}単位 / 50単位、GPA条件 ${promotion.gpaOk ? "達成" : "未達"}`)
  ];
  if (state.teacher) {
    html.push(requirement("教職必修", teacherMissing.length === 0, teacherMissing.length ? `${teacherMissing.length}科目が未配置` : "対象科目を配置済み"));
  }
  document.querySelector("#requirementsList").innerHTML = html.join("");
}

function renderAlerts(stats) {
  const alerts = [];
  const prereqProblems = validatePrereqs();
  const caps = capProblems();
  if (stats.otherDeptRaw > 12) {
    alerts.push(["warn", `他学科履修は${stats.otherDeptRaw}単位中、卒業算入は12単位までです。`]);
  }
  if (stats.basicElectiveOutside > 0) {
    alerts.push(["warn", `基礎教育選択は14単位超過分のうち10単位までその他枠へ振替、残り${stats.basicElectiveOutside}単位は卒業要件外です。`]);
  }
  prereqProblems.forEach((problem) => alerts.push(["bad", problem]));
  caps.forEach((item) => alerts.push(["bad", `${item.term}: 履修上限内の${item.capCounted}単位が上限${item.cap}単位を超えています。上限外は${item.capExcluded}単位です。`]));
  if (alerts.length === 0) alerts.push(["ok", "現在の配置で主要な論理エラーはありません。"]);
  document.querySelector("#alertsList").innerHTML = alerts
    .map(([level, text]) => `<div class="alert ${level}">${text}</div>`)
    .join("");
}

function render() {
  const stats = totals();
  renderCatalog();
  renderPlan();
  renderSummary(stats);
  renderRequirements(stats);
  renderAlerts(stats);
}

function init() {
  const courseSelect = document.querySelector("#courseSelect");
  courseSelect.innerHTML = COURSES.map((course) => `<option value="${course}">${course}</option>`).join("");
  courseSelect.value = state.course;
  courseSelect.addEventListener("change", (event) => {
    const hadCoursePlan = selectedCourses().some((course) => course.category === "courseRequired");
    state.course = event.target.value;
    [...state.planned.keys()].forEach((id) => {
      const course = allCourses.find((item) => item.id === id);
      if (course?.category === "courseRequired" && course.course !== state.course) state.planned.delete(id);
    });
    if (hadCoursePlan) {
      allCourses
        .filter((course) => course.category === "courseRequired" && course.course === state.course)
        .forEach((course) => state.planned.set(course.id, openingTermForCourse(course)));
    }
    render();
  });

  document.querySelector("#teacherToggle").addEventListener("change", (event) => {
    state.teacher = event.target.checked;
    if (state.teacher) {
      allCourses
        .filter((course) => course.category === "teacher")
        .forEach((course) => state.planned.set(course.id, openingTermForCourse(course)));
    } else {
      allCourses.filter((course) => course.category === "teacher").forEach((course) => state.planned.delete(course.id));
    }
    render();
  });
  document.querySelector("#gpaInput").addEventListener("change", (event) => {
    state.gpa = Number(event.target.value || 0);
    render();
  });
  document.querySelector("#secondYearGpaInput").addEventListener("change", (event) => {
    state.secondYearGpa = Number(event.target.value || 0);
    render();
  });
  document.querySelector("#manualOtherInput").addEventListener("input", (event) => {
    state.manualOther = Number(event.target.value || 0);
    render();
  });
  document.querySelector("#categoryFilter").addEventListener("change", render);
  document.querySelectorAll(".year-filter, .term-filter").forEach((input) => {
    input.addEventListener("change", render);
  });
  document.querySelector("#autoFillButton").addEventListener("click", autoFill);
  document.querySelector("#clearButton").addEventListener("click", () => {
    state.planned.clear();
    render();
  });
  autoFill();
}

init();
