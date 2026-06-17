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
const TERM_IDS = TERMS.map((term) => term.id);
const TREE_UNASSIGNED_TERM = "none";

const NO_COURSE = "未選択";
const COURSES = [NO_COURSE, "情報システム", "映像メディア", "サウンド制作", "メディアデザイン"];

const aliases = new Map([
  ["Webプログラミング", "Ｗｅｂプログラミング"],
  ["Webデザイン", "Ｗｅｂデザイン"],
  ["MIDI制作演習Ⅰ", "ＭＩＤＩ制作演習Ⅰ"],
  ["MIDI制作演習Ⅱ", "ＭＩＤＩ制作演習Ⅱ"],
  ["アルゴリズムと構造", "アルゴリズムとデータ構造"],
  ["ITマネジメント", "ＩＴマネジメント"],
  ["ITストラテジ", "ＩＴストラテジ"],
  ["CG基礎", "ＣＧ基礎"],
  ["基本情報技術者", "基本情報技術"]
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
  ["Q-002", "基本情報技術", 2, 1, "前"]
];

const intensiveCourseNames = new Set([
  "海外事情",
  "アウトドアスポーツⅠ",
  "アウトドアスポーツⅡ",
  "ボランティア活動",
  "ITパスポート",
  "基本情報技術"
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
  ["B-REQ-11", "日本語力Ⅱ", 1, 2, "前", false],
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
  ["SE-011", "Ｗｅｂ解析", 2, 3, "前"],
  ["SE-012", "データサイエンス", 2, 2, "後"],
  ["SE-013", "人工知能", 2, 3, "前"],
  ["SE-015", "情報管理", 2, 2, "前", true],
  ["SE-016", "ゲームプログラミング", 2, 2, "後"],
  ["SE-017", "サウンドプログラミング", 2, 3, "前"],
  ["SE-018", "知識情報学", 2, 3, "後", true],
  ["SE-019", "モバイル情報論", 2, 3, "後", true],
  ["SE-020", "ドキュメンタリー・シナリオ", 2, 3, "前"],
  ["SE-021", "ＣＭ制作", 2, 3, "前"],
  ["SE-022", "ドキュメンタリー演習", 2, 3, "後"],
  ["SE-023", "放送・配信論", 2, 3, "後"],
  ["SE-024", "写真技術", 2, 2, "後"],
  ["SE-025", "照明技術", 2, 2, "後"],
  ["SE-026", "舞台制作", 2, 3, "後"],
  ["SE-027", "サウンドプロダクション", 2, 3, "後"],
  ["SE-028", "ＣＡＤ", 2, 2, "前"],
  ["SE-029", "メディア文化論", 2, 2, "後"],
  ["SE-030", "デジタルファブリケーション", 2, 3, "前"],
  ["SE-031", "インターンシップ", 2, 1, "前"],
  ["SE-032", "情報メディア特別演習Ⅰ", 2, 3, "前"],
  ["SE-033", "情報メディア特別演習Ⅱ", 2, 3, "後"],
  ["SE-034", "アート&デザイン演習", 2, 4, "前"],
  ["SE-035", "音響制作演習", 2, 3, "前"]
];

const basicElectives = [
  ["BE-000", "プラクティカル・イングリッシュⅢ", 2, 2, "前"],
  ["BE-000A", "プラクティカル・イングリッシュⅣ", 2, 2, "後"],
  ["BE-001", "哲学", 2, "前"],
  ["BE-002", "心理学", 2, "前"],
  ["BE-003", "海外事情", 2, "後"],
  ["BE-004", "芸術", 2, "前"],
  ["BE-005", "人間関係論", 2, "後"],
  ["BE-006", "現代日本史", 2, "後"],
  ["BE-007", "日本国憲法", 2, "前", true],
  ["BE-008", "経営学", 2, "前"],
  ["BE-009", "社会学", 2, "前"],
  ["BE-010", "法学", 2, "前"],
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
  ["BE-027", "ボランティア活動", 2, "前"],
  ["BE-028", "海外研修Ⅰ", 2, null],
  ["BE-029", "海外研修Ⅱ", 2, null]
];

const treeMetaByName = new Map([
  ["哲学", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "9201", level: "初級" }],
  ["芸術", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "9202", level: "初級" }],
  ["心理学", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "9203", level: "初級" }],
  ["人間関係論", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "9204", level: "初級" }],
  ["現代日本史", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "9205", level: "初級" }],
  ["日本語力Ⅰ", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "3103", level: "中級" }],
  ["日本語力Ⅱ", { section: "基礎教育科目", lane: "人間と文化への理解", courseNumber: "3104", level: "中級" }],

  ["海外事情", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9206", level: "初級" }],
  ["海外研修Ⅰ", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9207", level: "初級", term: "1前" }],
  ["海外研修Ⅱ", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9208", level: "初級", term: "1前" }],
  ["日本国憲法", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9209", level: "初級" }],
  ["経済学", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9210", level: "初級" }],
  ["経営学", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9211", level: "初級" }],
  ["法学", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9212", level: "初級" }],
  ["社会学", { section: "基礎教育科目", lane: "現代社会への理解", courseNumber: "9213", level: "初級" }],

  ["自然科学Ⅰ", { section: "基礎教育科目", lane: "自然科学への理解", courseNumber: "9214", level: "初級" }],
  ["自然科学Ⅱ", { section: "基礎教育科目", lane: "自然科学への理解", courseNumber: "9215", level: "初級" }],
  ["統計学", { section: "基礎教育科目", lane: "自然科学への理解", courseNumber: "9216", level: "初級" }],
  ["数的処理Ⅰ", { section: "基礎教育科目", lane: "自然科学への理解", courseNumber: "2104", level: "初級" }],
  ["数的処理Ⅱ", { section: "基礎教育科目", lane: "自然科学への理解", courseNumber: "2105", level: "初級" }],

  ["プラクティカル・イングリッシュⅠ", { section: "基礎教育科目", lane: "外国語", courseNumber: "1101", level: "初級" }],
  ["プラクティカル・イングリッシュⅡ", { section: "基礎教育科目", lane: "外国語", courseNumber: "2101", level: "初級" }],
  ["プラクティカル・イングリッシュⅢ", { section: "基礎教育科目", lane: "外国語", courseNumber: "3201", level: "中級" }],
  ["プラクティカル・イングリッシュⅣ", { section: "基礎教育科目", lane: "外国語", courseNumber: "4201", level: "中級" }],
  ["フランス語Ⅰ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9217", level: "初級" }],
  ["フランス語Ⅱ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9218", level: "初級" }],
  ["中国語Ⅰ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9219", level: "初級" }],
  ["中国語Ⅱ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9220", level: "初級" }],
  ["韓国語Ⅰ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9221", level: "初級" }],
  ["韓国語Ⅱ", { section: "基礎教育科目", lane: "外国語", courseNumber: "9222", level: "初級" }],

  ["スポーツ科学", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "9223", level: "初級" }],
  ["スポーツⅠ", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "9224", level: "初級" }],
  ["スポーツⅡ", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "9225", level: "初級" }],
  ["アウトドアスポーツⅠ", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "9226", level: "初級" }],
  ["アウトドアスポーツⅡ", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "9227", level: "初級" }],
  ["健康と栄養", { section: "基礎教育科目", lane: "健康と運動への理解", courseNumber: "1102", level: "初級" }],

  ["情報リテラシー", { section: "基礎教育科目", lane: "情報技術への理解", courseNumber: "1103", level: "初級" }],
  ["ＩＣＴ基礎", { section: "基礎教育科目", lane: "情報技術への理解", courseNumber: "2102", level: "初級" }],

  ["フレッシュマンセミナーⅠ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "1104", level: "初級" }],
  ["フレッシュマンセミナーⅡ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "2103", level: "初級" }],
  ["基礎演習Ⅰ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "3107", level: "中級" }],
  ["基礎演習Ⅱ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "4101", level: "中級" }],
  ["キャリアデザインⅠ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "4102", level: "中級" }],
  ["キャリアデザインⅡ", { section: "基礎教育科目", lane: "総合科目", courseNumber: "5101", level: "上級" }],
  ["地域の課題", { section: "基礎教育科目", lane: "総合科目", courseNumber: "9228", level: "中級" }],
  ["ボランティア活動", { section: "基礎教育科目", lane: "総合科目", courseNumber: "9229", level: "中級" }]
]);

const treeRowByCourseName = new Map([
  ["プラクティカル・イングリッシュⅠ", 1],
  ["プラクティカル・イングリッシュⅡ", 1],
  ["プラクティカル・イングリッシュⅢ", 1],
  ["プラクティカル・イングリッシュⅣ", 1],
  ["フランス語Ⅰ", 2],
  ["フランス語Ⅱ", 2],
  ["中国語Ⅰ", 3],
  ["中国語Ⅱ", 3],
  ["韓国語Ⅰ", 4],
  ["韓国語Ⅱ", 4],
  ["スポーツⅠ", 1],
  ["スポーツⅡ", 1],
  ["アウトドアスポーツⅠ", 2],
  ["アウトドアスポーツⅡ", 2],
  ["健康と栄養", 3],
  ["スポーツ科学", 3],
  ["自然科学Ⅰ", 1],
  ["自然科学Ⅱ", 1],
  ["数的処理Ⅰ", 2],
  ["数的処理Ⅱ", 2],
  ["統計学", 2],
  ["フレッシュマンセミナーⅠ", 2],
  ["フレッシュマンセミナーⅡ", 2],
  ["基礎演習Ⅰ", 2],
  ["基礎演習Ⅱ", 2],
  ["キャリアデザインⅠ", 1],
  ["キャリアデザインⅡ", 1],
  ["地域の課題", 1],
  ["ボランティア活動", 1],
  ["哲学", 1],
  ["芸術", 2],
  ["心理学", 3],
  ["人間関係論", 2],
  ["現代日本史", 3],
  ["日本語力Ⅰ", 2],
  ["日本語力Ⅱ", 2],
  ["日本国憲法", 1],
  ["経済学", 1],
  ["経営学", 2],
  ["法学", 3],
  ["社会学", 4],
  ["海外事情", 5],
  ["海外研修Ⅰ", 5],
  ["海外研修Ⅱ", 5],
  ["情報リテラシー", 2],
  ["ＩＣＴ基礎", 2]
]);

const treeRowByNodeId = new Map([
  ["common-programming-intro", 1],
  ["common-program-exercise-1", 1],
  ["common-data-science", 1],
  ["common-ai", 1],
  ["common-info-processing", 2],
  ["common-info-concepts", 1],
  ["common-it-management", 1],
  ["common-it-strategy", 1],
  ["common-fe", 1],
  ["common-it-passport", 2],
  ["common-software-basic", 2],
  ["common-info-management", 1],
  ["common-media-theory", 1],
  ["common-ethics", 1],
  ["common-internship", 2],
  ["common-special-seminar-1", 2],
  ["common-special-seminar-2", 2],
  ["common-art-design", 2],
  ["common-seminar-1", 1],
  ["common-seminar-2", 1],
  ["common-graduation-1", 1],
  ["common-graduation-2", 1],

  ["system-program-2", 1],
  ["system-program-3", 1],
  ["system-program-4", 1],
  ["system-algorithm", 2],
  ["system-game-programming", 3],
  ["system-sound-programming", 2],
  ["system-knowledge", 2],
  ["system-web-programming", 1],
  ["system-network-1", 1],
  ["system-network-2", 1],
  ["system-mobile", 1],
  ["system-intro", 1],
  ["system-basic-theory", 1],
  ["system-media-tech", 1],
  ["system-development", 1],
  ["system-database", 2],

  ["movie-production-1", 1],
  ["movie-production-2", 1],
  ["movie-processing", 1],
  ["movie-media-art", 1],
  ["movie-history", 2],
  ["movie-scenario", 3],
  ["movie-documentary", 3],
  ["movie-cm", 2],
  ["movie-broadcast", 2],
  ["movie-digital-art", 1],
  ["movie-animation", 1],
  ["movie-cg-basic", 1],
  ["movie-cg-exercise", 1],
  ["movie-color", 1],
  ["movie-photo", 1],
  ["movie-multimedia", 1],

  ["sound-digital-intro", 1],
  ["sound-practice", 1],
  ["sound-acoustics", 1],
  ["sound-production", 1],
  ["sound-recording", 1],
  ["sound-ear-training", 2],
  ["sound-stage", 2],
  ["sound-lighting", 3],
  ["sound-broadcast", 3],
  ["sound-production-work", 4],
  ["sound-midi-1", 1],
  ["sound-music-theory", 1],
  ["sound-creation", 1],
  ["sound-midi-2", 2],
  ["sound-sound-programming", 1],
  ["sound-multimedia", 2],
  ["design-intro", 1],
  ["design-graphic", 1],
  ["design-exercise-1", 1],
  ["design-exercise-2", 1],
  ["design-multimedia", 1],
  ["design-living", 1],
  ["design-color", 2],
  ["design-digital-art-recommended", 1],
  ["design-cg-basic", 1],
  ["design-digital-fabrication", 1],
  ["design-cad", 2],
  ["design-web-programming", 1],
  ["design-web-design", 1],
  ["design-web-analysis", 1],
  ["design-media-culture", 1],
  ["design-documentary-scenario", 1],
  ["design-documentary", 1]
]);

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
  ["T-002", "教師論", 2, 1, "前"],
  ["T-003", "教育課程論", 2, 1, "後"],
  ["T-004", "教育の制度と経営", 2, 1, "後"],
  ["T-005", "教育心理学", 2, 2, "前"],
  ["T-006", "特別活動論", 2, 2, "前"],
  ["T-007", "生徒進路指導論", 2, 2, "前"],
  ["T-008", "教育相談論", 2, 2, "後"],
  ["T-009", "特別支援教育", 2, 2, "後"],
  ["T-010", "総合的な学習の時間の指導法", 2, 2, "後"],
  ["T-011", "教育の方法と技術（情報通信技術の活用含む）", 2, 3, "前"],
  ["T-012", "情報科教育法Ⅰ", 2, 3, "前"],
  ["T-013", "教育実習指導", 2, 3, "後"],
  ["T-014", "情報科教育法Ⅱ", 2, 3, "後"],
  ["T-015", "教育実習", 2, 4, "前"],
  ["T-016", "教職実践演習（高校）", 2, 4, "後"]
];

const officialTreeNodes = [
  ["common-programming-intro", "プログラミング入門", "professional", "コース共通", "情報処理系列", "1前", "初級", "1103", true],
  ["common-program-exercise-1", "プログラム演習Ⅰ", "professional", "コース共通", "情報処理系列", "1後", "初級", "2103", false],
  ["common-info-processing", "情報処理演習", "professional", "コース共通", "情報処理系列", "1後", "初級", "2104", true],
  ["common-data-science", "データサイエンス", "professional", "コース共通", "情報処理系列", "2後", "中級", "4103", false],
  ["common-ai", "人工知能", "professional", "コース共通", "情報処理系列", "3前", "中級", "5102", false],
  ["common-info-concepts", "情報学概論", "professional", "コース共通", "情報資格系列", "1前", "初級", "1104", true],
  ["common-media-theory", "情報メディア論", "professional", "コース共通", "総合・その他", "1前", "初級", "1105", false],
  ["common-ethics", "情報社会の倫理と職業", "professional", "コース共通", "総合・その他", "1後", "中級", "2106", true],
  ["common-it-management", "ＩＴマネジメント", "professional", "コース共通", "情報資格系列", "1後", "初級", "2105", false],
  ["common-it-passport", "ITパスポート", "professional", "コース共通", "情報資格系列", "1後", "初級", "9101", false],
  ["common-it-strategy", "ＩＴストラテジ", "professional", "コース共通", "情報資格系列", "2前", "初級", "3105", false],
  ["common-software-basic", "ソフトウェア基礎", "professional", "コース共通", "情報資格系列", "2前", "中級", "3106", true],
  ["common-fe", "基本情報技術", "professional", "コース共通", "情報資格系列", "2後", "中級", "9102", false],
  ["common-info-management", "情報管理", "professional", "コース共通", "総合・その他", "2前", "中級", "3109", true],
  ["common-internship", "インターンシップ", "professional", "コース共通", "総合・その他", "1前", "上級", "9103", false],
  ["common-special-seminar-1", "情報メディア特別演習Ⅰ", "professional", "コース共通", "総合・その他", "3前", "中級", "5111", false],
  ["common-special-seminar-2", "情報メディア特別演習Ⅱ", "professional", "コース共通", "総合・その他", "3後", "中級", "6111", false],
  ["common-art-design", "アート&デザイン演習", "professional", "コース共通", "総合・その他", "4前", "上級", "7101", false],
  ["common-seminar-1", "専門演習Ⅰ", "professional", "コース共通", "演習", "3前", "中級", "5101", false],
  ["common-seminar-2", "専門演習Ⅱ", "professional", "コース共通", "演習", "3後", "中級", "6101", false],
  ["common-graduation-1", "卒業演習Ⅰ", "professional", "コース共通", "演習", "4前", "上級", "7102", false],
  ["common-graduation-2", "卒業演習Ⅱ", "professional", "コース共通", "演習", "4後", "上級", "8101", false],

  ["system-intro", "情報システム入門", "professional", "情報システムコース", "システム開発系列", "1前", "初級", "1110", false],
  ["system-basic-theory", "情報基礎理論", "professional", "情報システムコース", "システム開発系列", "1後", "初級", "2111", false],
  ["system-media-tech", "メディア情報技術", "professional", "情報システムコース", "システム開発系列", "2後", "中級", "4105", false],
  ["system-development", "システム開発論", "professional", "情報システムコース", "システム開発系列", "3前", "中級", "5104", false],
  ["system-database", "データベース", "professional", "情報システムコース", "システム開発系列", "3前", "上級", "5105", true],
  ["system-program-2", "プログラム演習Ⅱ", "professional", "情報システムコース", "プログラミング系列", "2前", "中級", "3101", false],
  ["system-algorithm", "アルゴリズムとデータ構造", "professional", "情報システムコース", "プログラミング系列", "2前", "中級", "3102", true],
  ["system-game-programming", "ゲームプログラミング", "professional", "情報システムコース", "プログラミング系列", "2後", "中級", "4104", false],
  ["system-program-3", "プログラム演習Ⅲ", "professional", "情報システムコース", "プログラミング系列", "3前", "中級", "5103", false],
  ["system-program-4", "プログラム演習Ⅳ", "professional", "情報システムコース", "プログラミング系列", "3後", "上級", "6102", false],
  ["system-sound-programming", "サウンドプログラミング", "professional", "情報システムコース", "プログラミング系列", "3前", "上級", "5112", false],
  ["system-knowledge", "知識情報学", "professional", "情報システムコース", "プログラミング系列", "3後", "上級", "6103", true],
  ["system-network-1", "コンピュータネットワークⅠ", "professional", "情報システムコース", "ネットワーク系列", "2後", "中級", "4106", true],
  ["system-network-2", "コンピュータネットワークⅡ", "professional", "情報システムコース", "ネットワーク系列", "3前", "上級", "5106", false],
  ["system-mobile", "モバイル情報論", "professional", "情報システムコース", "ネットワーク系列", "3後", "上級", "6104", true],
  ["system-web-programming", "Ｗｅｂプログラミング", "professional", "情報システムコース", "ネットワーク系列", "2前", "中級", "3108", false],

  ["movie-production-1", "映像制作演習Ⅰ", "professional", "映像メディアコース", "映像制作系列", "2前", "初中級", "3201", false],
  ["movie-history", "映像史とアーカイブ", "professional", "映像メディアコース", "映像制作系列", "2前", "中級", "3202", false],
  ["movie-production-2", "映像制作演習Ⅱ", "professional", "映像メディアコース", "映像制作系列", "2後", "中級", "4201", false],
  ["movie-processing", "映像加工技術", "professional", "映像メディアコース", "映像制作系列", "3前", "中級", "5201", false],
  ["movie-scenario", "ドキュメンタリー・シナリオ", "professional", "映像メディアコース", "映像制作系列", "3前", "中級", "5202", false],
  ["movie-cm", "ＣＭ制作", "professional", "映像メディアコース", "映像制作系列", "3前", "中級", "5203", false],
  ["movie-media-art", "メディアアート", "professional", "映像メディアコース", "映像制作系列", "3後", "上級", "6201", false],
  ["movie-documentary", "ドキュメンタリー演習", "professional", "映像メディアコース", "映像制作系列", "3後", "上級", "6202", false],
  ["movie-broadcast", "放送・配信論", "professional", "映像メディアコース", "映像制作系列", "3後", "上級", "6203", false],
  ["movie-digital-art", "デジタルアート入門", "professional", "映像メディアコース", "画像処理・CG系列", "1前", "初級", "1201", true],
  ["movie-animation", "アニメーション", "professional", "映像メディアコース", "画像処理・CG系列", "1後", "初級", "2201", false],
  ["movie-cg-basic", "ＣＧ基礎", "professional", "映像メディアコース", "画像処理・CG系列", "2前", "中級", "3203", false],
  ["movie-cg-exercise", "ＣＧ演習", "professional", "映像メディアコース", "画像処理・CG系列", "2後", "上級", "4202", false],
  ["movie-color", "色彩学", "professional", "映像メディアコース", "総合・その他", "2前", "初中級", "3204", false],
  ["movie-photo", "写真技術", "professional", "映像メディアコース", "総合・その他", "2後", "中級", "4203", false],
  ["movie-multimedia", "マルチメディア", "professional", "映像メディアコース", "総合・その他", "3前", "中級", "5204", true],

  ["sound-digital-intro", "デジタルサウンド入門", "professional", "サウンド制作コース", "音響技術系列", "1前", "初級", "1301", false],
  ["sound-practice", "音響実務", "professional", "サウンド制作コース", "音響技術系列", "2前", "初中級", "3301", false],
  ["sound-acoustics", "音響学", "professional", "サウンド制作コース", "音響技術系列", "2後", "初中級", "4301", false],
  ["sound-ear-training", "聴能・音感演習", "professional", "サウンド制作コース", "音響技術系列", "2後", "初中級", "4302", false],
  ["sound-lighting", "照明技術", "professional", "サウンド制作コース", "音響技術系列", "2後", "中級", "4303", false],
  ["sound-production", "音響制作演習", "professional", "サウンド制作コース", "音響技術系列", "3前", "中上級", "5301", false],
  ["sound-recording", "レコーディング演習", "professional", "サウンド制作コース", "音響技術系列", "3後", "上級", "6301", false],
  ["sound-stage", "舞台制作", "professional", "サウンド制作コース", "音響技術系列", "3後", "上級", "6302", false],
  ["sound-broadcast", "放送・配信論", "professional", "サウンド制作コース", "音響技術系列", "3後", "上級", "6203", false],
  ["sound-production-work", "サウンドプロダクション", "professional", "サウンド制作コース", "音響技術系列", "3後", "上級", "6303", false],
  ["sound-midi-1", "ＭＩＤＩ制作演習Ⅰ", "professional", "サウンド制作コース", "楽曲制作系列", "1後", "初級", "2301", false],
  ["sound-midi-2", "ＭＩＤＩ制作演習Ⅱ", "professional", "サウンド制作コース", "楽曲制作系列", "2前", "初中級", "3303", false],
  ["sound-music-theory", "音楽理論", "professional", "サウンド制作コース", "楽曲制作系列", "2前", "初中級", "3302", false],
  ["sound-creation", "サウンドクリエーション", "professional", "サウンド制作コース", "楽曲制作系列", "2後", "中級", "4304", false],
  ["sound-sound-programming", "サウンドプログラミング", "professional", "サウンド制作コース", "総合・その他", "3前", "上級", "5112", false],
  ["sound-multimedia", "マルチメディア", "professional", "サウンド制作コース", "総合・その他", "3前", "中級", "5204", true],

  ["design-graphic", "グラフィックデザイン", "professional", "メディアデザインコース", "メディアデザイン系列", "1後", "初級", "2401", false],
  ["design-exercise-1", "メディアデザイン演習Ⅰ", "professional", "メディアデザインコース", "メディアデザイン系列", "2前", "初級", "3401", false],
  ["design-color", "色彩学", "professional", "メディアデザインコース", "メディアデザイン系列", "2前", "初中級", "3204", false],
  ["design-exercise-2", "メディアデザイン演習Ⅱ", "professional", "メディアデザインコース", "メディアデザイン系列", "2後", "初級", "4401", false],
  ["design-multimedia", "マルチメディア", "professional", "メディアデザインコース", "メディアデザイン系列", "3前", "中級", "5204", true],
  ["design-living", "暮しとデザイン", "professional", "メディアデザインコース", "メディアデザイン系列", "3後", "上級", "6401", false],
  ["design-digital-art-recommended", "デジタルアート入門", "professional", "メディアデザインコース", "プロダクトデザイン系列", "1前", "初級", "1201", false],
  ["design-cg-basic", "ＣＧ基礎", "professional", "メディアデザインコース", "プロダクトデザイン系列", "2前", "中級", "3203", false],
  ["design-cad", "ＣＡＤ", "professional", "メディアデザインコース", "プロダクトデザイン系列", "2前", "中級", "3402", false],
  ["design-digital-fabrication", "デジタルファブリケーション", "professional", "メディアデザインコース", "プロダクトデザイン系列", "3前", "上級", "5401", false],
  ["design-web-programming", "Ｗｅｂプログラミング", "professional", "メディアデザインコース", "Webデザイン系列", "2前", "中級", "3108", false],
  ["design-web-design", "Ｗｅｂデザイン", "professional", "メディアデザインコース", "Webデザイン系列", "2後", "中級", "4402", true],
  ["design-web-analysis", "Ｗｅｂ解析", "professional", "メディアデザインコース", "Webデザイン系列", "3前", "上級", "5402", false],
  ["design-media-culture", "メディア文化論", "professional", "メディアデザインコース", "総合・その他", "2後", "中級", "5403", false],
  ["design-documentary-scenario", "ドキュメンタリー・シナリオ", "professional", "メディアデザインコース", "総合・その他", "3前", "中級", "5202", false],
  ["design-documentary", "ドキュメンタリー演習", "professional", "メディアデザインコース", "総合・その他", "3後", "上級", "6202", false],
  ["design-intro", "メディアデザイン入門", "professional", "メディアデザインコース", "総合・その他", "1前", "初級", "1401", false],

  ["teacher-principles", "教育原理", "teacher", "教職課程に関する科目", "教職", "1前", "", "M5Z1201", false],
  ["teacher-role", "教師論", "teacher", "教職課程に関する科目", "教職", "1前", "", "M5Z1202", false],
  ["teacher-curriculum", "教育課程論", "teacher", "教職課程に関する科目", "教職", "1後", "", "M5Z2201", false],
  ["teacher-system", "教育の制度と経営", "teacher", "教職課程に関する科目", "教職", "1後", "", "M5Z2202", false],
  ["teacher-psychology", "教育心理学", "teacher", "教職課程に関する科目", "教職", "2前", "", "M5Z3201", false],
  ["teacher-activities", "特別活動論", "teacher", "教職課程に関する科目", "教職", "2前", "", "M5Z3202", false],
  ["teacher-guidance", "生徒進路指導論", "teacher", "教職課程に関する科目", "教職", "2前", "", "M5Z4201", false],
  ["teacher-counseling", "教育相談論", "teacher", "教職課程に関する科目", "教職", "2後", "", "M5Z4202", false],
  ["teacher-special-support", "特別支援教育", "teacher", "教職課程に関する科目", "教職", "2後", "", "M5Z4203", false],
  ["teacher-integrated-study", "総合的な学習の時間の指導法", "teacher", "教職課程に関する科目", "教職", "2後", "", "M5Z4204", false],
  ["teacher-method", "教育の方法と技術（情報通信技術の活用含む）", "teacher", "教職課程に関する科目", "教職", "3前", "", "M5Z5201", false],
  ["teacher-info-method-1", "情報科教育法Ⅰ", "teacher", "教職課程に関する科目", "教職", "3前", "", "M5Z5202", false],
  ["teacher-practice-guidance", "教育実習指導", "teacher", "教職課程に関する科目", "教職", "3後", "", "M5Z6202", false],
  ["teacher-info-method-2", "情報科教育法Ⅱ", "teacher", "教職課程に関する科目", "教職", "3後", "", "M5Z6201", false],
  ["teacher-practice", "教育実習", "teacher", "教職課程に関する科目", "教職", "4前", "", "M5Z7201", false],
  ["teacher-final", "教職実践演習（高校）", "teacher", "教職課程に関する科目", "教職", "4後", "", "M5Z8201", false]
].map(([id, courseName, page, section, lane, term, level, courseNumber, teacherRequired = false, displayName = null]) => ({
  id,
  courseName,
  displayName: displayName || courseName,
  page,
  section,
  lane,
  term,
  level,
  courseNumber,
  teacherRequired
}));

const teacherTermGroups = [
  ["teacher-principles", "teacher-role"],
  ["teacher-curriculum", "teacher-system"],
  ["teacher-psychology", "teacher-activities", "teacher-guidance"],
  ["teacher-counseling", "teacher-special-support", "teacher-integrated-study"],
  ["teacher-method", "teacher-info-method-1"],
  ["teacher-practice-guidance", "teacher-info-method-2"],
  ["teacher-practice"],
  ["teacher-final"]
];

const teacherTermEdges = teacherTermGroups.flatMap((group, index) => {
  const nextGroup = teacherTermGroups[index + 1] || [];
  return group.flatMap((from) => nextGroup.map((to) => [from, to]));
});

const officialTreeEdges = [
  ["common-programming-intro", "common-program-exercise-1"],
  ["common-program-exercise-1", "common-data-science"],
  ["common-program-exercise-1", "system-algorithm"],
  ["common-info-processing", "common-data-science"],
  ["common-info-processing", "system-program-2"],
  ["common-info-processing", "system-algorithm"],
  ["common-data-science", "common-ai"],
  ["common-info-concepts", "common-it-management"],
  ["common-it-management", "common-it-strategy"],
  ["common-it-management", "common-software-basic"],
  ["common-it-strategy", "common-fe"],
  ["common-software-basic", "common-fe"],
  ["common-special-seminar-1", "common-special-seminar-2"],
  ["common-seminar-1", "common-seminar-2"],
  ["common-seminar-2", "common-graduation-1"],
  ["common-graduation-1", "common-graduation-2"],
  ["system-program-2", "system-program-3"],
  ["system-program-2", "system-sound-programming"],
  ["system-algorithm", "system-game-programming"],
  ["system-algorithm", "system-program-3"],
  ["system-program-3", "system-program-4"],
  ["system-network-1", "system-network-2"],
  ["system-network-2", "system-mobile"],
  ["system-intro", "system-basic-theory"],
  ["system-basic-theory", "system-media-tech"],
  ["system-media-tech", "system-development"],
  ["system-media-tech", "system-database"],
  ["movie-production-1", "movie-production-2"],
  ["movie-history", "movie-production-2"],
  ["movie-production-2", "movie-processing"],
  ["movie-production-2", "movie-cm"],
  ["movie-processing", "movie-media-art"],
  ["movie-scenario", "movie-documentary"],
  ["movie-cm", "movie-broadcast"],
  ["movie-digital-art", "movie-animation"],
  ["movie-animation", "movie-cg-basic"],
  ["movie-cg-basic", "movie-cg-exercise"],
  ["sound-digital-intro", "sound-practice"],
  ["sound-digital-intro", "sound-midi-1"],
  ["sound-practice", "sound-acoustics"],
  ["sound-acoustics", "sound-production"],
  ["sound-ear-training", "sound-production"],
  ["sound-production", "sound-recording"],
  ["sound-midi-1", "sound-music-theory"],
  ["sound-midi-1", "sound-midi-2"],
  ["sound-music-theory", "sound-creation"],
  ["sound-midi-2", "sound-creation"],
  ["system-program-2", "sound-sound-programming"],
  ["design-graphic", "design-exercise-1"],
  ["design-color", "design-exercise-2"],
  ["design-exercise-1", "design-exercise-2"],
  ["design-exercise-2", "design-multimedia"],
  ["design-exercise-2", "movie-multimedia"],
  ["design-exercise-2", "sound-multimedia"],
  ["design-multimedia", "design-living"],
  ["design-intro", "design-graphic"],
  ["design-intro", "design-cg-basic"],
  ["design-intro", "design-cad"],
  ["design-intro", "system-web-programming"],
  ["design-intro", "design-web-programming"],
  ["design-cg-basic", "design-digital-fabrication"],
  ["design-cad", "design-digital-fabrication"],
  ["design-web-programming", "design-web-design"],
  ["design-web-design", "design-web-analysis"],
  ["design-digital-fabrication", "design-living"],
  ["design-web-analysis", "design-living"],
  ["design-documentary-scenario", "design-documentary"],
  ...teacherTermEdges
].map(([from, to]) => ({ from, to }));

const prereqs = {
  "プラクティカル・イングリッシュⅡ": ["プラクティカル・イングリッシュⅠ"],
  "プラクティカル・イングリッシュⅢ": ["プラクティカル・イングリッシュⅡ"],
  "プラクティカル・イングリッシュⅣ": ["プラクティカル・イングリッシュⅢ"],
  "自然科学Ⅱ": ["自然科学Ⅰ"],
  "ＩＣＴ基礎": ["情報リテラシー"],
  "フレッシュマンセミナーⅡ": ["フレッシュマンセミナーⅠ"],
  "基礎演習Ⅰ": ["フレッシュマンセミナーⅡ"],
  "基礎演習Ⅱ": ["基礎演習Ⅰ"],
  "キャリアデザインⅡ": ["キャリアデザインⅠ"],
  "スポーツⅡ": ["スポーツⅠ"],
  "プログラム演習Ⅰ": ["プログラミング入門"],
  "プログラム演習Ⅱ": ["プログラム演習Ⅰ", "情報処理演習"],
  "プログラム演習Ⅲ": ["プログラム演習Ⅱ", "アルゴリズムとデータ構造"],
  "プログラム演習Ⅳ": ["プログラム演習Ⅲ"],
  "データサイエンス": ["プログラム演習Ⅰ", "情報処理演習"],
  "人工知能": ["データサイエンス"],
  "ＩＴマネジメント": ["情報学概論"],
  "ＩＴストラテジ": ["ＩＴマネジメント"],
  "基本情報技術": ["ＩＴストラテジ", "ソフトウェア基礎"],
  "専門演習Ⅰ": ["基礎演習Ⅱ"],
  "専門演習Ⅱ": ["専門演習Ⅰ"],
  "卒業演習Ⅰ": ["専門演習Ⅱ"],
  "卒業演習Ⅱ": ["卒業演習Ⅰ"],
  "アルゴリズムとデータ構造": ["プログラム演習Ⅰ", "情報処理演習"],
  "ゲームプログラミング": ["アルゴリズムとデータ構造"],
  "サウンドプログラミング": ["プログラム演習Ⅱ"],
  "コンピュータネットワークⅡ": ["コンピュータネットワークⅠ"],
  "モバイル情報論": ["コンピュータネットワークⅡ"],
  "情報基礎理論": ["情報システム入門"],
  "メディア情報技術": ["情報基礎理論"],
  "システム開発論": ["メディア情報技術"],
  "データベース": ["メディア情報技術"],
  "映像制作演習Ⅱ": ["映像制作演習Ⅰ"],
  "映像加工技術": ["映像制作演習Ⅱ"],
  "メディアアート": ["映像加工技術"],
  "アニメーション": ["デジタルアート入門"],
  "音響実務": ["デジタルサウンド入門"],
  "音響学": ["音響実務"],
  "聴能・音感演習": ["音響実務"],
  "ＭＩＤＩ制作演習Ⅱ": ["ＭＩＤＩ制作演習Ⅰ"],
  "音楽理論": ["ＭＩＤＩ制作演習Ⅰ"],
  "音響制作演習": ["音響学", "聴能・音感演習"],
  "レコーディング演習": ["音響制作演習"],
  "サウンドクリエーション": ["音楽理論", "ＭＩＤＩ制作演習Ⅱ"],
  "ＣＧ演習": ["ＣＧ基礎"],
  "デジタルファブリケーション": ["ＣＧ基礎", "ＣＡＤ"],
  "メディアデザイン演習Ⅰ": ["グラフィックデザイン"],
  "メディアデザイン演習Ⅱ": ["メディアデザイン演習Ⅰ"],
  "マルチメディア": ["メディアデザイン演習Ⅱ"],
  "Ｗｅｂデザイン": ["Ｗｅｂプログラミング"],
  "Ｗｅｂ解析": ["Ｗｅｂデザイン"],
  "ドキュメンタリー演習": ["ドキュメンタリー・シナリオ"],
  "フランス語Ⅱ": ["フランス語Ⅰ"],
  "中国語Ⅱ": ["中国語Ⅰ"],
  "韓国語Ⅱ": ["韓国語Ⅰ"]
};

const state = {
  course: NO_COURSE,
  teacher: false,
  gpa: 1,
  secondYearGpa: 1,
  manualOther: 0,
  viewMode: "list",
  filtersOpen: false,
  courseMenuOpen: false,
  gpaMenuOpen: false,
  effectsOpen: false,
  showTreeCodes: false,
  showTreeMeta: false,
  soundFx: true,
  soundBgm: true,
  showBgmRoll: false,
  teacherNotice: "",
  openCourseId: null,
  openTreeNodeId: null,
  planned: new Map(),
  teacherAdded: new Set()
};

const arcadeAudio = {
  context: null,
  master: null,
  bgmBus: null,
  sfxBus: null,
  bgmFilter: null,
  sfxFilter: null,
  limiter: null,
  bgmTimer: null,
  bgmStep: 0,
  bgmStateKey: ""
};

const fxSequence = {
  items: new Map(),
  feedbackTimers: [],
  treeTimers: [],
  scheduled: false,
  treeReveal: false
};

const filterFx = {
  items: new Map(),
  cleanupTimer: null,
  exitTimer: null
};

const planFx = {
  transitions: new Map(),
  prevSnapshot: new Map(),
  cleanupTimer: null,
  clearTimer: null,
  queuedDelays: new Map()
};

const arcadeBgmProfiles = {
  "未選択": {
    key: "none",
    bpm: 112,
    root: 261.63,
    progression: [0, 5, 9, 7],
    scale: [0, 2, 4, 7, 9, 12],
    melody: [0, null, 1, 2, 4, 2, 1, null, 2, 4, 5, 4, 2, 1, 0, null],
    bassLine: [0, null, 0, 7, -5, null, -5, 7, -3, null, -3, 4, -5, null, -5, 7],
    chordVoicing: [0, 4, 7, 12],
    chordHits: [0, 8],
    kick: [0, 8],
    snare: [4, 12],
    hat: [0, 2, 4, 6, 8, 10, 12, 14],
    dynamics: [1.12, 0.72, 0.84, 0.76, 1.02, 0.72, 0.88, 0.76, 1.08, 0.72, 0.84, 0.78, 1, 0.72, 0.9, 0.84],
    leadType: "triangle",
    bassType: "sine",
    chordType: "triangle",
    leadOctave: 12,
    leadDuration: 0.1,
    bassDuration: 0.14,
    chordDuration: 0.22,
    leadGain: 0.015,
    bassGain: 0.014,
    chordGain: 0.008,
    drumGain: 0.018,
    detune: 0,
    filter: 3400,
    leadFilterType: "lowpass",
    bassFilterType: "lowpass",
    chordFilterType: "lowpass",
    leadQ: 0.8,
    bassQ: 0.7,
    chordQ: 0.8,
    leadLayer: 0.18,
    leadDelayMix: 0.08,
    leadDelayTime: 0.18,
    leadDelayFeedback: 0.18
  },
  情報システム: {
    key: "system",
    bpm: 138,
    root: 293.66,
    progression: [0, -5, -2, -7],
    scale: [0, 2, 3, 5, 7, 9, 10, 12],
    melody: [0, 2, 3, null, 5, 4, 3, 2, 7, null, 5, 4, 3, 2, 1, null],
    bassLine: [0, 0, 7, 0, -5, -5, 2, -5, -2, -2, 5, -2, -7, -7, 0, -7],
    chordVoicing: [0, 3, 7, 10],
    chordHits: [0, 4, 8, 12],
    kick: [0, 4, 8, 12],
    snare: [4, 12],
    hat: [0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 14],
    dynamics: [1.18, 0.66, 0.78, 0.66, 1.06, 0.68, 0.82, 0.7, 1.14, 0.66, 0.8, 0.68, 1.08, 0.72, 0.86, 0.76],
    leadType: "square",
    bassType: "sawtooth",
    chordType: "square",
    leadOctave: 12,
    leadDuration: 0.07,
    bassDuration: 0.11,
    chordDuration: 0.09,
    leadGain: 0.012,
    bassGain: 0.013,
    chordGain: 0.006,
    drumGain: 0.02,
    detune: 4,
    filter: 3000,
    leadFilterType: "bandpass",
    bassFilterType: "lowpass",
    chordFilterType: "highpass",
    leadQ: 5.5,
    bassQ: 1.2,
    chordQ: 2.8,
    leadLayer: 0.2,
    leadBitDepth: 5,
    bassBitDepth: 6,
    chordBitDepth: 7,
    leadDelayMix: 0.04,
    leadDelayTime: 0.08,
    leadDelayFeedback: 0.12
  },
  映像メディア: {
    key: "movie",
    bpm: 94,
    root: 220,
    progression: [0, -3, -7, -5],
    scale: [0, 2, 3, 5, 7, 8, 11, 12],
    melody: [0, null, null, 2, 4, null, 5, null, 6, null, 5, 4, 2, null, 1, null],
    bassLine: [0, null, null, null, -3, null, -3, null, -7, null, -7, null, -5, null, -5, null],
    chordVoicing: [0, 3, 7, 12],
    chordHits: [0, 8],
    kick: [0, 10],
    snare: [12],
    hat: [2, 6, 10, 14],
    dynamics: [1.12, 0.58, 0.64, 0.7, 0.88, 0.58, 0.72, 0.62, 1.04, 0.58, 0.68, 0.74, 0.92, 0.6, 0.76, 0.66],
    leadType: "triangle",
    bassType: "sine",
    chordType: "triangle",
    leadOctave: 12,
    leadDuration: 0.16,
    bassDuration: 0.34,
    chordDuration: 0.5,
    leadGain: 0.014,
    bassGain: 0.012,
    chordGain: 0.009,
    drumGain: 0.014,
    detune: -3,
    filter: 1750,
    leadFilterType: "lowpass",
    bassFilterType: "lowpass",
    chordFilterType: "lowpass",
    leadQ: 0.45,
    bassQ: 0.5,
    chordQ: 0.65,
    leadLayer: 0.14,
    leadDelayMix: 0.28,
    leadDelayTime: 0.34,
    leadDelayFeedback: 0.38,
    chordDelayMix: 0.18,
    chordDelayTime: 0.42,
    chordDelayFeedback: 0.3
  },
  サウンド制作: {
    key: "sound",
    bpm: 126,
    root: 196,
    progression: [0, 5, 10, 7],
    scale: [0, 2, 4, 5, 7, 9, 10, 12],
    melody: [null, 2, null, 4, 5, null, 4, 2, null, 5, 6, null, 5, 4, 2, null],
    bassLine: [0, null, 0, 7, null, -5, -3, null, -2, null, -2, 5, null, -5, -7, null],
    chordVoicing: [0, 4, 7, 10],
    chordHits: [2, 6, 10, 14],
    kick: [0, 3, 8, 11],
    snare: [4, 12],
    hat: [0, 2, 5, 6, 8, 10, 13, 14],
    dynamics: [1.08, 0.64, 0.9, 1, 1.02, 0.72, 0.92, 0.68, 1.12, 0.64, 0.94, 1, 1.06, 0.7, 0.92, 0.74],
    leadType: "sawtooth",
    bassType: "square",
    chordType: "triangle",
    leadOctave: 12,
    leadDuration: 0.08,
    bassDuration: 0.13,
    chordDuration: 0.12,
    leadGain: 0.014,
    bassGain: 0.014,
    chordGain: 0.007,
    drumGain: 0.022,
    detune: 2,
    filter: 3800,
    leadFilterType: "highpass",
    bassFilterType: "bandpass",
    chordFilterType: "bandpass",
    leadQ: 2.5,
    bassQ: 3.4,
    chordQ: 2.2,
    leadLayer: 0.34,
    leadFuzz: 0.62,
    bassFuzz: 0.38,
    leadDelayMix: 0.14,
    leadDelayTime: 0.16,
    leadDelayFeedback: 0.24
  },
  メディアデザイン: {
    key: "design",
    bpm: 108,
    root: 246.94,
    progression: [0, 6, 2, 7],
    scale: [0, 2, 4, 6, 7, 9, 11, 12],
    melody: [0, null, 2, 4, null, 6, 5, null, 4, null, 7, 6, null, 5, 3, null],
    bassLine: [0, null, 7, null, 6, null, 13, null, 2, null, 9, null, 7, null, 14, null],
    chordVoicing: [0, 4, 7, 11],
    chordHits: [0, 6, 10],
    kick: [0, 7, 12],
    snare: [4, 11],
    hat: [0, 3, 4, 6, 8, 9, 12, 15],
    dynamics: [1.08, 0.62, 0.82, 0.74, 0.96, 0.7, 0.92, 0.78, 1.1, 0.62, 0.86, 0.76, 1, 0.68, 0.9, 0.82],
    leadType: "sine",
    bassType: "triangle",
    chordType: "sawtooth",
    leadOctave: 12,
    leadDuration: 0.1,
    bassDuration: 0.14,
    chordDuration: 0.26,
    leadGain: 0.013,
    bassGain: 0.012,
    chordGain: 0.008,
    drumGain: 0.016,
    detune: -2,
    filter: 4200,
    leadFilterType: "bandpass",
    bassFilterType: "lowpass",
    chordFilterType: "highpass",
    leadQ: 1.4,
    bassQ: 0.8,
    chordQ: 1.6,
    leadLayer: 0.24,
    leadDelayMix: 0.2,
    leadDelayTime: 0.25,
    leadDelayFeedback: 0.32,
    chordBitDepth: 9
  }
};

function ensureArcadeAudio() {
  if (typeof window === "undefined") return null;
  if (!arcadeAudio.context) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    arcadeAudio.context = new AudioContext();
    arcadeAudio.master = arcadeAudio.context.createGain();
    arcadeAudio.bgmBus = arcadeAudio.context.createGain();
    arcadeAudio.sfxBus = arcadeAudio.context.createGain();
    arcadeAudio.bgmFilter = arcadeAudio.context.createBiquadFilter();
    arcadeAudio.sfxFilter = arcadeAudio.context.createBiquadFilter();
    arcadeAudio.limiter = arcadeAudio.context.createDynamicsCompressor();
    arcadeAudio.master.gain.value = 1.08;
    arcadeAudio.bgmBus.gain.value = 1.08;
    arcadeAudio.sfxBus.gain.value = 0.62;
    arcadeAudio.bgmFilter.type = "lowpass";
    arcadeAudio.bgmFilter.frequency.value = 9200;
    arcadeAudio.bgmFilter.Q.value = 0.35;
    arcadeAudio.sfxFilter.type = "lowpass";
    arcadeAudio.sfxFilter.frequency.value = 9800;
    arcadeAudio.sfxFilter.Q.value = 0.3;
    arcadeAudio.limiter.threshold.value = -8;
    arcadeAudio.limiter.knee.value = 14;
    arcadeAudio.limiter.ratio.value = 8;
    arcadeAudio.limiter.attack.value = 0.006;
    arcadeAudio.limiter.release.value = 0.18;
    arcadeAudio.bgmBus.connect(arcadeAudio.bgmFilter);
    arcadeAudio.sfxBus.connect(arcadeAudio.sfxFilter);
    arcadeAudio.bgmFilter.connect(arcadeAudio.master);
    arcadeAudio.sfxFilter.connect(arcadeAudio.master);
    arcadeAudio.master.connect(arcadeAudio.limiter);
    arcadeAudio.limiter.connect(arcadeAudio.context.destination);
  }
  return arcadeAudio.context;
}

function withArcadeAudio(run) {
  const ctx = ensureArcadeAudio();
  if (!ctx) return;
  const execute = () => run(ctx);
  if (ctx.state === "suspended") {
    void ctx.resume().then(execute).catch(execute);
  } else {
    execute();
  }
}

function stopArcadeBgm() {
  if (arcadeAudio.bgmTimer) clearTimeout(arcadeAudio.bgmTimer);
  arcadeAudio.bgmTimer = null;
}

function midiToFreq(root, semitone) {
  return root * (2 ** (semitone / 12));
}

function hashString(value) {
  let hash = 2166136261;
  [...String(value)].forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return hash >>> 0;
}

function seededUnit(seed, index) {
  let value = (seed + Math.imul(index + 1, 374761393)) >>> 0;
  value ^= value >>> 13;
  value = Math.imul(value, 1274126177) >>> 0;
  value ^= value >>> 16;
  return value / 4294967295;
}

const waveShaperCurveCache = new Map();

function waveShaperCurve({ fuzz = 0, bitDepth = 0 }) {
  const key = `${fuzz}|${bitDepth}`;
  if (waveShaperCurveCache.has(key)) return waveShaperCurveCache.get(key);
  const length = 1024;
  const curve = new Float32Array(length);
  const drive = 1 + (fuzz * 24);
  const steps = bitDepth ? Math.max(2, 2 ** bitDepth) : 0;
  for (let index = 0; index < length; index += 1) {
    const input = ((index / (length - 1)) * 2) - 1;
    let output = fuzz > 0 ? Math.tanh(input * drive) / Math.tanh(drive) : input;
    if (steps) {
      output = Math.round(output * steps) / steps;
    }
    curve[index] = output;
  }
  waveShaperCurveCache.set(key, curve);
  return curve;
}

function audioRampTimes(duration, bus) {
  const isBgm = bus === "bgm";
  const attack = Math.min(duration * 0.32, isBgm ? 0.018 : 0.012);
  const release = Math.min(duration * 0.42, isBgm ? 0.036 : 0.024);
  return {
    attack: Math.max(0.004, attack),
    release: Math.max(0.008, release)
  };
}

function tone(ctx, {
  freq,
  duration = 0.09,
  type = "square",
  gain = 0.06,
  detune = 0,
  slide = 0,
  delay = 0,
  filter = 2200,
  filterType = "lowpass",
  q = 0.8,
  fuzz = 0,
  bitDepth = 0,
  delayMix = 0,
  delayTime = 0.18,
  delayFeedback = 0.22,
  bus = "sfx"
}) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  const lp = ctx.createBiquadFilter();
  const shaper = fuzz > 0 || bitDepth ? ctx.createWaveShaper() : null;
  const destination = bus === "bgm" ? arcadeAudio.bgmBus : arcadeAudio.sfxBus;
  const start = ctx.currentTime + delay;
  const end = start + duration;
  const ramps = audioRampTimes(duration, bus);
  const peakAt = Math.min(end - 0.006, start + ramps.attack);
  const releaseAt = Math.max(peakAt + 0.004, end - ramps.release);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(42, freq + slide), end);
  osc.detune.setValueAtTime(detune, start);
  lp.type = filterType;
  lp.frequency.value = filter;
  lp.Q.value = q;
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), peakAt);
  amp.gain.setValueAtTime(Math.max(0.0001, gain), releaseAt);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  if (shaper) {
    shaper.curve = waveShaperCurve({ fuzz, bitDepth });
    shaper.oversample = "4x";
    osc.connect(shaper);
    shaper.connect(lp);
  } else {
    osc.connect(lp);
  }
  lp.connect(amp);
  amp.connect(destination);
  if (delayMix > 0) {
    const delayNode = ctx.createDelay(0.8);
    const feedback = ctx.createGain();
    const wet = ctx.createGain();
    delayNode.delayTime.setValueAtTime(delayTime, start);
    feedback.gain.setValueAtTime(Math.min(0.56, delayFeedback), start);
    wet.gain.setValueAtTime(Math.min(0.32, delayMix), start);
    amp.connect(delayNode);
    delayNode.connect(feedback);
    feedback.connect(delayNode);
    delayNode.connect(wet);
    wet.connect(destination);
  }
  osc.start(start);
  osc.stop(end + Math.max(0.05, delayMix > 0 ? delayTime * 2.4 : 0.05));
}

function noiseHit(ctx, {
  duration = 0.045,
  gain = 0.018,
  delay = 0,
  filter = 3600,
  filterType = "highpass",
  bus = "bgm",
  seed = null
}) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const fadeLength = Math.min(Math.floor(ctx.sampleRate * 0.004), Math.floor(length / 2));
  for (let index = 0; index < length; index += 1) {
    const unit = seed === null ? Math.random() : seededUnit(seed, index);
    const fadeIn = fadeLength > 0 ? Math.min(1, index / fadeLength) : 1;
    const fadeOut = fadeLength > 0 ? Math.min(1, (length - 1 - index) / fadeLength) : 1;
    data[index] = ((unit * 2) - 1) * Math.min(fadeIn, fadeOut);
  }
  const source = ctx.createBufferSource();
  const amp = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();
  const start = ctx.currentTime + delay;
  const end = start + duration;
  const ramps = audioRampTimes(duration, bus);
  const peakAt = Math.min(end - 0.004, start + ramps.attack);
  const releaseAt = Math.max(peakAt + 0.003, end - ramps.release);
  source.buffer = buffer;
  filterNode.type = filterType;
  filterNode.frequency.value = filter;
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), peakAt);
  amp.gain.setValueAtTime(Math.max(0.0001, gain), releaseAt);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  source.connect(filterNode);
  filterNode.connect(amp);
  amp.connect(bus === "bgm" ? arcadeAudio.bgmBus : arcadeAudio.sfxBus);
  source.start(start);
  source.stop(end + 0.02);
}

function patternHit(pattern = [], step) {
  return pattern.includes(step % 16);
}

function scaledTone(profile, degree) {
  if (degree === null || degree === undefined) return null;
  const scale = profile.scale || [0, 2, 4, 7, 9, 12];
  const length = scale.length;
  const octave = Math.floor(degree / length);
  const index = ((degree % length) + length) % length;
  return scale[index] + (octave * 12);
}

function bgmStepMs(profile) {
  return profile.stepMs || (60000 / ((profile.bpm || 120) * 4));
}

function bgmCompositionKey() {
  const selectedIds = selectedCourses()
    .map((course) => course.id)
    .sort((a, b) => a.localeCompare(b))
    .join(",");
  return `${state.course}|${selectedIds}`;
}

function bgmNoiseSeed(profile, arrangement, step, voice) {
  return hashString(`${profile.key}|${arrangement.key}|${step}|${voice}`);
}

function playBgmRhythm(ctx, profile, step, dynamics, arrangement) {
  const drumGain = profile.drumGain || 0.016;
  if (patternHit(profile.kick, step)) {
    tone(ctx, {
      freq: Math.max(48, profile.root / 4),
      duration: 0.075,
      type: "sine",
      gain: drumGain * 1.8 * dynamics,
      slide: -34,
      filter: 900,
      bus: "bgm"
    });
  }
  if (patternHit(profile.snare, step)) {
    noiseHit(ctx, {
      duration: 0.055,
      gain: drumGain * 1.35 * dynamics,
      filter: 1800,
      filterType: "bandpass",
      bus: "bgm",
      seed: bgmNoiseSeed(profile, arrangement, step, "snare")
    });
  }
  if (patternHit(profile.hat, step)) {
    noiseHit(ctx, {
      duration: 0.025,
      gain: drumGain * 0.75 * dynamics,
      filter: 5400,
      filterType: "highpass",
      bus: "bgm",
      seed: bgmNoiseSeed(profile, arrangement, step, "hat")
    });
  }
}

function playBgmChord(ctx, profile, chordRoot, dynamics, voicing = null) {
  (voicing || profile.chordVoicing || [0, 4, 7]).forEach((offset, index) => {
    tone(ctx, {
      freq: midiToFreq(profile.root, chordRoot + offset),
      duration: profile.chordDuration || 0.2,
      type: profile.chordType || "triangle",
      gain: (profile.chordGain || 0.008) * dynamics * (index === 0 ? 1 : 0.72),
      delay: index * 0.008,
      filter: Math.max(900, (profile.filter || 2600) * 0.72),
      filterType: profile.chordFilterType || "lowpass",
      q: profile.chordQ || 0.8,
      fuzz: profile.chordFuzz || 0,
      bitDepth: profile.chordBitDepth || 0,
      delayMix: profile.chordDelayMix || 0,
      delayTime: profile.chordDelayTime || 0.18,
      delayFeedback: profile.chordDelayFeedback || 0.22,
      bus: "bgm"
    });
  });
}

function fxLayer() {
  return document.querySelector("#fxLayer");
}

function burstAtPoint(x, y, kind = "confirm", scale = 1) {
  const layer = fxLayer();
  if (!layer) return;
  const palette = {
    confirm: [164, 176, 182, 166, 154, 142],
    cancel: [18, 10, 354, 348, 28, 22],
    remove: [8, 12, 356, 350, 22, 16],
    boost: [47, 39, 54, 63, 28, 34],
    switch: [184, 190, 196, 202, 176, 168],
    error: [0, 4, 8, 14, 18, 22]
  };
  const hues = palette[kind] || palette.confirm;
  const count = kind === "boost" ? 12 : 8;
  for (let index = 0; index < count; index += 1) {
    const spark = document.createElement("span");
    const hue = hues[index % hues.length] + (Math.random() * 12 - 6);
    const angle = (Math.PI * 2 * index) / count + (Math.random() * 0.28 - 0.14);
    const distance = (28 + Math.random() * 46) * scale * (kind === "boost" ? 1.25 : 1);
    const size = (4 + Math.random() * 6) * (kind === "boost" ? 1.15 : 1);
    spark.className = `fx-particle${kind === "boost" && index % 3 === 0 ? " fx-star" : ""}`;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    spark.style.setProperty("--size", `${size}px`);
    spark.style.setProperty("--hue", `${Math.round(hue)}`);
    layer.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }
}

function burstAtElement(el, kind = "confirm", scale = 1) {
  if (!el || typeof el.getBoundingClientRect !== "function") return;
  const rect = el.getBoundingClientRect();
  burstAtPoint(rect.left + (rect.width / 2), rect.top + (rect.height / 2), kind, scale);
}

function pulseBody(kind = "confirm") {
  const body = document.body;
  if (!body) return;
  body.classList.remove("fx-shake");
  void body.offsetWidth;
  body.classList.add("fx-shake");
  window.setTimeout(() => body.classList.remove("fx-shake"), kind === "boost" ? 280 : 220);
}

function playArcadeSfx(kind) {
  if (!state.soundFx) return;
  withArcadeAudio((ctx) => {
    const patterns = {
      confirm: [
        { freq: 523.25, duration: 0.08, type: "square", gain: 0.05, slide: 94, filter: 4200 },
        { freq: 659.25, duration: 0.10, type: "triangle", gain: 0.045, slide: 140, delay: 0.04, filter: 3600 }
      ],
      cancel: [
        { freq: 740, duration: 0.055, type: "square", gain: 0.055, slide: -110, filter: 4600 },
        { freq: 415.3, duration: 0.085, type: "triangle", gain: 0.048, slide: -72, delay: 0.035, filter: 3600 },
        { freq: 277.18, duration: 0.11, type: "square", gain: 0.032, slide: -38, delay: 0.075, filter: 2600 }
      ],
      remove: [
        { freq: 196, duration: 0.12, type: "sawtooth", gain: 0.04, slide: -60, filter: 1800 },
        { freq: 155.56, duration: 0.16, type: "square", gain: 0.03, slide: -24, delay: 0.03, filter: 1200 }
      ],
      boost: [
        { freq: 392, duration: 0.11, type: "square", gain: 0.04, slide: 196, filter: 5200 },
        { freq: 523.25, duration: 0.12, type: "triangle", gain: 0.045, slide: 262, delay: 0.04, filter: 5000 },
        { freq: 783.99, duration: 0.14, type: "square", gain: 0.05, slide: 156, delay: 0.08, filter: 4600 }
      ],
      switch: [
        { freq: 659.25, duration: 0.06, type: "square", gain: 0.03, slide: 42, filter: 3500 },
        { freq: 587.33, duration: 0.06, type: "triangle", gain: 0.025, slide: 28, delay: 0.04, filter: 3000 }
      ],
      error: [
        { freq: 164.81, duration: 0.14, type: "sawtooth", gain: 0.05, slide: -96, filter: 1500 },
        { freq: 103.83, duration: 0.18, type: "square", gain: 0.04, slide: -48, delay: 0.05, filter: 1000 }
      ]
    };
    (patterns[kind] || patterns.confirm).forEach((pattern) => tone(ctx, pattern));
  });
}

function currentArcadeBgmProfile() {
  return arcadeBgmProfiles[state.course] || arcadeBgmProfiles[NO_COURSE];
}

function isBgmRequiredCourse(course) {
  if (course.category === "basicRequired" || course.category === "commonRequired") return true;
  return course.category === "courseRequired" && state.course !== NO_COURSE && course.course === state.course;
}

function isBgmMissingRequiredCourse(course) {
  if (course.category === "basicRequired" || course.category === "commonRequired") return true;
  return course.category === "courseRequired" && state.course !== NO_COURSE && course.course === state.course;
}

function bgmArrangementState() {
  const arrangedCourses = selectedCourses()
    .filter((course) => !isBgmRequiredCourse(course))
    .filter((course) => course.category !== "teacher")
    .sort((a, b) => a.id.localeCompare(b.id));
  const missingRequired = allCourses.filter((course) => isBgmMissingRequiredCourse(course) && !state.planned.has(course.id));
  const missingPrereqs = [...prerequisiteIssuesByCourse()]
    .map((id) => allCourses.find((course) => course.id === id))
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id));
  const seed = arrangedCourses.reduce((total, course, index) => {
    const idValue = [...course.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return total + (idValue * (index + 3));
  }, arrangedCourses.length * 17 + missingPrereqs.length * 31);
  const arrangedDepth = Math.min(4, arrangedCourses.length);
  const missingDepth = Math.min(4, missingRequired.length);
  const prereqDepth = Math.min(4, missingPrereqs.length);
  const missingStack = Math.min(12, missingRequired.length);
  const radicalLayers = Math.min(4, Math.max(0, Math.ceil(missingRequired.length / 5)));
  const mutationStep = seed % 16;
  const mutationSlots = bgmMutationSlots(arrangedCourses, missingRequired, missingPrereqs, seed);
  return {
    count: arrangedCourses.length,
    intensity: Math.min(1, arrangedCourses.length / 18),
    seed,
    key: bgmCompositionKey(),
    mutationStep,
    mutationSlots,
    mutationStepCount: mutationSlots.filter((slot) => slot.depth > 0).length,
    missingRequired: missingRequired.length,
    missingPrereqs: missingPrereqs.length,
    arrangedDepth,
    missingDepth,
    prereqDepth,
    missingStack,
    radicalLayers,
    mutationDepth: Math.min(4, arrangedDepth + missingDepth + prereqDepth),
    radical: Math.min(1, missingRequired.length / 4)
  };
}

function bgmMutationSlots(arrangedCourses, missingRequired, missingPrereqs, seed) {
  const slots = Array.from({ length: 16 }, (_, step) => ({
    step,
    arranged: 0,
    missing: 0,
    prereq: 0,
    depth: 0,
    seed: hashString(`${seed}|${step}`)
  }));
  const used = new Set();
  let overflowIndex = 0;
  const assign = (kind, course, index) => {
    const preferred = hashString(`${kind}|${course.id}|${index}|${seed}`) % 16;
    let step = preferred;
    if (used.size < 16) {
      for (let offset = 0; offset < 16; offset += 1) {
        const candidate = (preferred + offset) % 16;
        if (!used.has(candidate)) {
          step = candidate;
          used.add(candidate);
          break;
        }
      }
    } else {
      step = (seed + overflowIndex) % 16;
      overflowIndex = (overflowIndex + 1) % 16;
    }
    const slot = slots[step];
    slot[kind] += 1;
    slot.depth += 1;
    slot.seed = hashString(`${slot.seed}|${course.id}|${kind}`);
  };
  arrangedCourses.forEach((course, index) => assign("arranged", course, index));
  missingRequired.forEach((course, index) => assign("missing", course, index));
  missingPrereqs.forEach((course, index) => assign("prereq", course, index));
  return slots;
}

function bgmMutationSlot(arrangement, step) {
  return arrangement.mutationSlots?.[step % 16] || { arranged: 0, missing: 0, prereq: 0, depth: 0, seed: arrangement.seed };
}

function isBgmMutationStep(arrangement, step) {
  return bgmMutationSlot(arrangement, step).depth > 0;
}

function bgmMutationDirection(slot) {
  return slot.seed % 2 === 0 ? 1 : -1;
}

function arrangedMelodyOffset(profile, melodyOffset, step, arrangement) {
  if (melodyOffset === null) return null;
  if (!isBgmMutationStep(arrangement, step) || arrangement.mutationDepth === 0) return melodyOffset;
  let offset = melodyOffset;
  const slot = bgmMutationSlot(arrangement, step);
  const direction = bgmMutationDirection(slot);
  if (slot.arranged >= 1 && slot.prereq === 0 && slot.missing === 0) {
    offset += direction > 0 ? 2 : -2;
  }
  if (slot.arranged >= 2 && slot.prereq === 0 && slot.missing === 0) {
    offset += direction > 0 ? 3 : -3;
  }
  if (slot.arranged >= 3 && slot.prereq === 0 && slot.missing === 0) {
    offset += direction > 0 ? 2 : -2;
  }
  if (slot.prereq >= 1) {
    offset += direction * 3;
  }
  if (slot.prereq >= 2) {
    offset += direction * 2;
  }
  if (slot.missing >= 1) {
    offset += slot.seed % 2 === 0 ? 6 : -5;
  }
  if (slot.missing >= 2) {
    offset += direction * 2;
  }
  if (slot.missing >= 3) {
    offset += direction * 3;
  }
  return offset;
}

function arrangedBassOffset(bassOffset, step, arrangement) {
  if (!isBgmMutationStep(arrangement, step) || arrangement.mutationDepth === 0) return bassOffset ?? null;
  const slot = bgmMutationSlot(arrangement, step);
  const direction = bgmMutationDirection(slot);
  if (bassOffset !== null && bassOffset !== undefined) {
    if (slot.prereq === 0 && slot.missing === 0) {
      return bassOffset + (direction > 0 ? 2 : -2);
    }
    return bassOffset + direction * Math.max(1, Math.min(3, slot.depth));
  }
  if (slot.arranged >= 2 && slot.prereq === 0 && slot.missing === 0) return 0;
  if (slot.prereq >= 1) return direction * -3;
  if (slot.missing >= 1) return slot.seed % 2 === 0 ? 1 : -1;
  return null;
}

function harmonyForStep(profile, arrangement, step) {
  const beatStep = step % 16;
  const barIndex = Math.floor(step / 16);
  let root = (profile.progression || [0])[barIndex % (profile.progression || [0]).length];
  let voicing = profile.chordVoicing || [0, 4, 7];
  let kind = "base";
  let label = "通常";
  const outsideTones = [];
  if (arrangement.mutationDepth > 0 && isBgmMutationStep(arrangement, step)) {
    const slot = bgmMutationSlot(arrangement, step);
    const direction = bgmMutationDirection(slot);
    if (slot.arranged >= 1 && slot.prereq === 0 && slot.missing === 0) {
      voicing = [0, 4, 7, 9];
      kind = "arrange";
      label = "履修差";
    }
    if (slot.arranged >= 2 && slot.prereq === 0 && slot.missing === 0) {
      voicing = [0, 2, 7, 9];
      kind = "arrange";
      label = "履修差";
    }
    if (slot.arranged >= 3 && slot.prereq === 0 && slot.missing === 0) {
      voicing = [0, 4, 7, 12];
      kind = "arrange";
      label = "履修差";
    }
    if (slot.prereq >= 1) {
      voicing = [0, 3, 6, 10];
      outsideTones.push(root + direction * 5);
      kind = "prereq";
      label = "前提不足";
    }
    if (slot.prereq >= 2) {
      outsideTones.push(root - direction * 2);
      kind = "prereq";
      label = "前提不足";
    }
    if (slot.missing >= 1) {
      root += direction * 2;
      outsideTones.push(root + direction * 6);
      kind = "arrange";
      label = "履修差";
    }
    if (slot.missing >= 2) {
      voicing = [0, 1, 6, 10];
      outsideTones.push(root - direction * 3);
      kind = "arrange";
      label = "履修差";
    }
    if (slot.missing >= 3) {
      outsideTones.push(root + direction * 9);
      kind = "arrange";
      label = "履修差";
    }
    if (slot.missing >= 4) {
      outsideTones.push(root - direction * 8);
      kind = "arrange";
      label = "履修差";
    }
  }
  const slot = bgmMutationSlot(arrangement, step);
  if (slot.missing > 0 && isBgmMutationStep(arrangement, step)) {
    if ([0, 8].includes(beatStep)) {
      root += 6;
      voicing = [0, 4, 10, 13];
      kind = "tritone";
      label = "TT代理";
    } else if ([4, 12].includes(beatStep)) {
      root -= 1;
      voicing = [0, 3, 6, 10];
      kind = "diminished";
      label = "減五度";
    }
    if ([3, 7, 11, 15].includes(beatStep)) {
      outsideTones.push(root + 1, root + 6);
      if (kind === "base") {
        kind = "outside";
        label = "外音";
      }
    }
  }
  return { root, voicing, kind, label, outsideTones };
}

function bgmStepAnalysis(profile, arrangement, step) {
  const beatStep = step % 16;
  const harmony = harmonyForStep(profile, arrangement, step);
  const melodyDegree = (profile.melody || [0])[step % (profile.melody || [0]).length];
  const baseMelodyOffset = scaledTone(profile, melodyDegree);
  const melodyOffset = arrangedMelodyOffset(profile, baseMelodyOffset, step, arrangement);
  const baseBassOffset = (profile.bassLine || [0])[step % (profile.bassLine || [0]).length];
  const bassOffset = arrangedBassOffset(baseBassOffset, step, arrangement);
  const baseDynamics = (profile.dynamics || [1])[beatStep] || 0.82;
  const mutationHit = isBgmMutationStep(arrangement, step);
  const slot = bgmMutationSlot(arrangement, step);
  const subtlePulse = mutationHit ? Math.min(0.24, slot.arranged * 0.07) : 0;
  const prereqPulse = mutationHit ? Math.min(0.32, slot.prereq * 0.1) : 0;
  const radicalPulse = mutationHit ? Math.min(0.48, slot.missing * 0.12) : 0;
  const dynamics = baseDynamics * (1 + subtlePulse + prereqPulse + radicalPulse + (slot.missing > 0 ? (beatStep % 4 === 0 ? 0.24 : -0.08) : 0));
  const arrangeNoise = mutationHit && slot.prereq > 0;
  const radicalNoise = mutationHit && slot.missing > 0;
  return {
    beatStep,
    mutationHit,
    mutationSlot: slot,
    harmony,
    melodyDegree,
    baseMelodyOffset,
    melodyOffset,
    melodyChanged: baseMelodyOffset !== melodyOffset,
    baseBassOffset,
    bassOffset,
    bassChanged: baseBassOffset !== bassOffset,
    dynamics,
    arrangeNoise,
    radicalNoise,
    radicalLayers: radicalNoise ? Math.min(4, slot.missing) : 0,
    chordHit: patternHit(profile.chordHits, step),
    kick: patternHit(profile.kick, step),
    snare: patternHit(profile.snare, step),
    hat: patternHit(profile.hat, step)
  };
}

function startArcadeBgm() {
  if (!state.soundBgm) return;
  withArcadeAudio((ctx) => {
    if (arcadeAudio.bgmTimer) return;
    const tick = () => {
      if (!state.soundBgm) return;
      const profile = currentArcadeBgmProfile();
      const arrangement = bgmArrangementState();
      const step = arcadeAudio.bgmStep;
      const analysis = bgmStepAnalysis(profile, arrangement, step);

      playBgmRhythm(ctx, profile, step, analysis.dynamics, arrangement);
      if (analysis.arrangeNoise) {
        noiseHit(ctx, {
          duration: 0.018,
          gain: (profile.drumGain || 0.016) * 0.42 * arrangement.intensity,
          filter: 6800,
          filterType: "highpass",
          bus: "bgm",
          seed: bgmNoiseSeed(profile, arrangement, step, "arrange-hat")
        });
      }
      if (analysis.radicalNoise) {
        Array.from({ length: analysis.radicalLayers }).forEach((_, index) => {
          noiseHit(ctx, {
            duration: 0.035 + (index * 0.006),
            gain: (profile.drumGain || 0.016) * (0.42 + (index * 0.12)) * arrangement.radical,
            filter: Math.max(900, 3000 - (index * 280)),
            filterType: index % 2 === 0 ? "bandpass" : "highpass",
            delay: index * 0.018,
            bus: "bgm",
            seed: bgmNoiseSeed(profile, arrangement, step, `radical-${index}`)
          });
        });
      }

      if (analysis.bassOffset !== null && analysis.bassOffset !== undefined) {
        tone(ctx, {
          freq: midiToFreq(profile.root / 2, analysis.harmony.root + analysis.bassOffset),
          duration: profile.bassDuration || 0.14,
          type: profile.bassType || "triangle",
          gain: (profile.bassGain || 0.012) * analysis.dynamics,
          slide: -profile.detune,
          delay: 0.006,
          filter: Math.max(800, profile.filter * 0.42),
          filterType: profile.bassFilterType || "lowpass",
          q: profile.bassQ || 0.8,
          fuzz: profile.bassFuzz || 0,
          bitDepth: profile.bassBitDepth || 0,
          delayMix: profile.bassDelayMix || 0,
          delayTime: profile.bassDelayTime || 0.16,
          delayFeedback: profile.bassDelayFeedback || 0.18,
          bus: "bgm"
        });
      }

      if (analysis.chordHit) {
        playBgmChord(ctx, profile, analysis.harmony.root, analysis.dynamics, analysis.harmony.voicing);
      }

      analysis.harmony.outsideTones.forEach((outsideTone, index) => {
        tone(ctx, {
          freq: midiToFreq(profile.root, outsideTone + (profile.leadOctave || 12)),
          duration: 0.045,
          type: "sawtooth",
          gain: (profile.leadGain || 0.012) * analysis.dynamics * 0.72,
          delay: index * 0.018,
          filter: Math.max(1100, profile.filter * 0.58),
          filterType: profile.leadFilterType || "lowpass",
          q: profile.leadQ || 0.8,
          fuzz: profile.leadFuzz || 0,
          bitDepth: profile.leadBitDepth || 0,
          delayMix: profile.leadDelayMix || 0,
          delayTime: profile.leadDelayTime || 0.18,
          delayFeedback: profile.leadDelayFeedback || 0.22,
          bus: "bgm"
        });
      });

      if (analysis.melodyOffset !== null) {
        const radicalMelody = analysis.radicalNoise && analysis.melodyChanged;
        tone(ctx, {
          freq: midiToFreq(profile.root, analysis.harmony.root + analysis.melodyOffset + (profile.leadOctave || 12)),
          duration: radicalMelody ? 0.055 : profile.leadDuration || 0.09,
          type: radicalMelody ? "sawtooth" : profile.leadType || "square",
          gain: (profile.leadGain || 0.012) * analysis.dynamics,
          slide: radicalMelody ? (analysis.melodyOffset > analysis.baseMelodyOffset ? 22 : -22) : profile.detune,
          filter: radicalMelody ? Math.max(1200, profile.filter * 0.62) : profile.filter,
          filterType: radicalMelody ? "bandpass" : profile.leadFilterType || "lowpass",
          q: radicalMelody ? 3.5 : profile.leadQ || 0.8,
          fuzz: radicalMelody ? 0.3 : profile.leadFuzz || 0,
          bitDepth: radicalMelody ? 0 : profile.leadBitDepth || 0,
          delayMix: radicalMelody ? 0.04 : profile.leadDelayMix || 0,
          delayTime: profile.leadDelayTime || 0.18,
          delayFeedback: profile.leadDelayFeedback || 0.22,
          bus: "bgm"
        });
        if (!radicalMelody && profile.leadLayer > 0) {
          tone(ctx, {
            freq: midiToFreq(profile.root, analysis.harmony.root + analysis.melodyOffset + (profile.leadOctave || 12) + 12),
            duration: (profile.leadDuration || 0.09) * 0.72,
            type: profile.chordType || "triangle",
            gain: (profile.leadGain || 0.012) * analysis.dynamics * profile.leadLayer,
            slide: profile.detune * -0.5,
            delay: 0.012,
            filter: Math.max(1200, profile.filter * 1.08),
            filterType: profile.leadFilterType || "lowpass",
            q: profile.leadQ || 0.8,
            fuzz: (profile.leadFuzz || 0) * 0.5,
            bitDepth: profile.leadBitDepth || 0,
            delayMix: (profile.leadDelayMix || 0) * 0.55,
            delayTime: profile.leadDelayTime || 0.18,
            delayFeedback: profile.leadDelayFeedback || 0.22,
            bus: "bgm"
          });
        }
      }

      arcadeAudio.bgmStep += 1;
      const swing = step % 2 === 0 ? 0.92 : 1.08;
      const mutationSwing = analysis.mutationHit ? 1 + (analysis.mutationSlot.depth * 0.03) + (analysis.mutationSlot.missing > 0 ? 0.04 : 0) : 1;
      arcadeAudio.bgmTimer = window.setTimeout(tick, bgmStepMs(profile) * swing * mutationSwing);
    };
    stopArcadeBgm();
    arcadeAudio.bgmStep = 0;
    tick();
  });
}

function syncArcadeAudio(forceRestart = false) {
  const stateKey = bgmCompositionKey();
  if (forceRestart || (arcadeAudio.bgmStateKey && arcadeAudio.bgmStateKey !== stateKey)) {
    stopArcadeBgm();
  }
  arcadeAudio.bgmStateKey = stateKey;
  if (state.soundBgm) {
    startArcadeBgm();
  } else {
    stopArcadeBgm();
  }
}

function syncArcadeToggleLabels() {
  const fxToggle = document.querySelector("#fxToggle");
  const bgmToggle = document.querySelector("#bgmToggle");
  if (fxToggle) fxToggle.checked = state.soundFx;
  if (bgmToggle) bgmToggle.checked = state.soundBgm;
}

function triggerArcadeFeedback(kind, source) {
  const element = source && source.nodeType === 1 ? source : null;
  if (element) {
    burstAtElement(element, kind);
  } else {
    burstAtPoint(window.innerWidth / 2, window.innerHeight / 5, kind, 1.05);
  }
  playArcadeSfx(kind);
  if (kind === "boost") pulseBody(kind);
}

const standardTermOverrides = {
  "日本国憲法": "1前",
  "経営学": "1前",
  "法学": "1前",
  "海外事情": "1後",
  "スポーツⅠ": "1前",
  "スポーツⅡ": "1後",
  "哲学": "1前",
  "心理学": "2後",
  "統計学": "1前",
  "地域の課題": "1後",
  "ボランティア活動": "1前"
};

function validTermsForCourse(course) {
  if (course.qualificationEligible) return TERMS;
  if (["芸術", "海外研修Ⅰ", "海外研修Ⅱ"].includes(course.name)) return TERMS;
  if (!course.year && !course.term) return TERMS;
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

const categoryFormalLabels = {
  basicRequired: "基礎教育必修",
  basicElective: "基礎教育選択",
  commonRequired: "専門教育コース共通必修",
  courseRequired: "専門教育コース必修",
  specializedElective: "専門教育選択",
  otherDept: "他学科履修",
  teacher: "教職課程に関する科目"
};

function categoryTitle(category) {
  return categoryFormalLabels[category] || categoryLabels[category] || "";
}

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

function courseTermTag(course) {
  if (course.name === "芸術") return "前期・後期";
  if (["海外研修Ⅰ", "海外研修Ⅱ"].includes(course.name)) return "履修時期任意";
  if (course.qualificationEligible) return "履修/資格";
  if (course.year) return `${course.year}年${course.term}`;
  if (course.term) return `配当年次なし・${course.term === "前" ? "前期" : "後期"}`;
  return "配当年次なし";
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
    });
  });
  specializedElectives.forEach(([id, name, credits, year, term, teacherRequired = false]) => {
    courses.push(makeCourse({ id, name, credits, year, term, category: "specializedElective", teacherRequired }));
  });
  basicElectives.forEach(([id, name, credits, yearOrTerm, termOrTeacherRequired = false, teacherRequired = false]) => {
    const hasYear = typeof yearOrTerm === "number";
    courses.push(makeCourse({
      id,
      name,
      credits,
      year: hasYear ? yearOrTerm : null,
      term: hasYear ? termOrTeacherRequired : yearOrTerm,
      category: "basicElective",
      teacherRequired: hasYear ? teacherRequired : termOrTeacherRequired
    }));
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

function courseForTreeNode(node) {
  if (node.courseId) return allCourses.find((course) => course.id === node.courseId) || null;
  const candidates = allCourses.filter((course) => course.key === normalizeName(node.courseName));
  if (node.page === "teacher") return candidates.find((course) => course.category === "teacher") || null;
  if (node.section === "コース共通") {
    return candidates.find((course) => course.category === "commonRequired") ||
      candidates.find((course) => course.category === "specializedElective") ||
      candidates[0] ||
      null;
  }
  const courseName = node.section.replace(/コース$/, "");
  const courseRequiredMatch = candidates.find((course) => course.category === "courseRequired" && course.course === courseName);
  if (courseRequiredMatch) return courseRequiredMatch;
  return candidates.find((course) => course.category === "specializedElective") || candidates[0] || null;
}

function treeSectionForCourse(course) {
  const meta = treeMetaByName.get(course.name);
  if (meta?.section) return meta.section;
  if (course.category === "basicRequired") return "基礎教育必修";
  if (course.category === "basicElective") return "基礎教育選択";
  if (course.category === "commonRequired") return "コース共通";
  if (course.category === "courseRequired") return `${course.course}コース`;
  if (course.category === "specializedElective") return "専門選択";
  if (course.category === "otherDept") return "他学科履修";
  if (course.category === "teacher") return "教職課程に関する科目";
  return categoryLabels[course.category] || "その他";
}

function emptyProfessionalSubjectBreakdown() {
  return {
    common: 0,
    情報システム: 0,
    映像メディア: 0,
    サウンド制作: 0,
    メディアデザイン: 0
  };
}

function professionalSubjectAffiliations(course) {
  if (course.category === "commonRequired") return ["common"];
  if (course.category === "courseRequired") return [course.course];
  if (course.category !== "specializedElective") return [];

  const sections = officialTreeNodes
    .filter((node) => normalizeName(node.courseName) === course.key && node.page === "professional")
    .map((node) => node.section);
  const affiliations = [...new Set(sections.map((section) => {
    if (section === "コース共通") return "common";
    const courseName = section.replace(/コース$/, "");
    return COURSES.includes(courseName) && courseName !== NO_COURSE ? courseName : null;
  }).filter(Boolean))];

  return affiliations.length ? affiliations : ["common"];
}

function professionalSubjectBreakdown(selected) {
  const breakdown = emptyProfessionalSubjectBreakdown();
  selected.forEach((course) => {
    const affiliations = professionalSubjectAffiliations(course);
    if (!affiliations.length) return;
    const creditShare = course.credits / affiliations.length;
    affiliations.forEach((affiliation) => {
      breakdown[affiliation] = (breakdown[affiliation] || 0) + creditShare;
    });
  });
  return breakdown;
}

function treeLaneForCourse(course) {
  const meta = treeMetaByName.get(course.name);
  if (meta?.lane) return meta.lane;
  return categoryLabels[course.category] || "科目";
}

function syntheticTreeNodeForCourse(course) {
  const meta = treeMetaByName.get(course.name) || {};
  return {
    id: `course-${course.id}`,
    courseId: course.id,
    courseName: course.name,
    displayName: course.name,
    page: course.category === "teacher" ? "teacher" : "catalog",
    section: meta.section || treeSectionForCourse(course),
    lane: meta.lane || treeLaneForCourse(course),
    term: meta.term || openingTermForCourse(course),
    level: meta.level || "",
    courseNumber: meta.courseNumber || course.id,
    teacherRequired: course.teacherRequired,
    row: meta.row || treeRowByCourseName.get(course.name) || 1
  };
}

function treeNodeTooltip(course, node, treeName) {
  const matchedCourseRequired = isCourseRequiredForTreeNode(course, node);
  const mismatchedCourseRequired = course.category === "courseRequired" && !matchedCourseRequired;
  const lines = [];
  if (treeName !== node.displayName) lines.push(`正式名: ${node.displayName}`);
  if (isRecommendedTreeNode(node)) lines.push("メディアデザインコース履修推奨科目");
  if (course.category === "basicRequired") lines.push("基礎教育必修");
  if (course.category === "commonRequired") lines.push("コース共通必修");
  if (matchedCourseRequired) lines.push(`${course.course}コース必修`);
  if (course.category !== "teacher" && !mismatchedCourseRequired && (course.teacherRequired || node.teacherRequired)) lines.push("教職必修");
  return lines.join("\n");
}

function isRecommendedTreeNode(node) {
  return node.id === "design-digital-art-recommended";
}

function isCourseRequiredForTreeNode(course, node) {
  return course.category === "courseRequired" && node.section === `${course.course}コース`;
}

function treeRequiredClass(course, node) {
  if (isRecommendedTreeNode(node)) return " recommended-movie";
  if (course.category === "basicRequired") return " required-basic";
  if (course.category === "commonRequired") return " required-common";
  if (isCourseRequiredForTreeNode(course, node)) {
    if (node.section === "情報システムコース") return " required-system";
    if (node.section === "映像メディアコース") return " required-movie";
    if (node.section === "サウンド制作コース") return " required-sound";
    if (node.section === "メディアデザインコース") return " required-design";
    return " required-course";
  }
  return "";
}

function treeMissingRequiredClass(course) {
  if (state.planned.has(course.id)) return "";
  if (course.category === "basicRequired" || course.category === "commonRequired") return " is-missing-required";
  if (course.category === "courseRequired" && state.course !== NO_COURSE && course.course === state.course) {
    return " is-missing-required";
  }
  return "";
}

function treePrereqMissingClass(course, prereqIssues) {
  return prereqIssues.has(course.id) ? " is-prereq-missing" : "";
}

const treeShortNameMap = new Map([
  ["フードビジネス・イングリッシュⅠ", "フードビジネス英語Ⅰ"],
  ["フードビジネス・イングリッシュⅡ", "フードビジネス英語Ⅱ"],
  ["総合的な学習の時間の指導法", "総合的な学習時間の指導法"],
  ["教育の方法と技術（情報通信技術の活用含む）", "教育の方法と技術（ICT活用）"]
]);

function treeDisplayName(name) {
  return treeShortNameMap.get(name) || name;
}

function treeNameFontSize(name) {
  const length = Array.from((name || "").normalize("NFKC")).length;
  if (/^プラクティカル・イングリッシュ[ⅠⅡⅢⅣ]$/.test(name || "")) return 7.7;
  if (length >= 16) return 8.1;
  if (length >= 13) return 8.7;
  return 10;
}

const treeSectionOrder = [
  "基礎教育科目",
  "基礎教育必修",
  "基礎教育選択",
  "コース共通",
  "情報システムコース",
  "サウンド制作コース",
  "メディアデザインコース",
  "映像メディアコース",
  "専門選択",
  "他学科履修",
  "教職課程に関する科目"
];

const treeLaneOrder = {
  "基礎教育科目": [
    "人間と文化への理解",
    "現代社会への理解",
    "自然科学への理解",
    "外国語",
    "健康と運動への理解",
    "情報技術への理解",
    "総合科目"
  ],
  "コース共通": [
    "演習",
    "情報資格系列",
    "総合・その他",
    "情報処理系列"
  ],
  "情報システムコース": [
    "プログラミング系列",
    "システム開発系列",
    "ネットワーク系列"
  ],
  "映像メディアコース": [
    "映像制作系列",
    "画像処理・CG系列",
    "総合・その他"
  ],
  "サウンド制作コース": [
    "音響技術系列",
    "楽曲制作系列",
    "総合・その他"
  ],
  "メディアデザインコース": [
    "メディアデザイン系列",
    "プロダクトデザイン系列",
    "Webデザイン系列",
    "総合・その他"
  ]
};

const centeredTreeLanes = new Set([
  "基礎教育科目::情報技術への理解",
  "コース共通::演習",
  "情報システムコース::ネットワーク系列",
  "映像メディアコース::画像処理・CG系列",
  "映像メディアコース::総合・その他",
  "メディアデザインコース::Webデザイン系列",
  "メディアデザインコース::総合・その他"
]);

const treeSectionDescriptions = {
  "基礎教育科目": "専門性を支え、広げるための基礎学力と基礎知識を修得する科目群です。",
  "基礎教育必修": "大学生としての基礎学力と教養を高めるための必修科目群です。",
  "基礎教育選択": "大学生としての基礎学力と教養を広げるための選択科目群です。",
  "コース共通": "各コース共通の専門科目を通じて、情報メディアに関する基礎的知識を修得する科目群です。",
  "情報システムコース": "モバイルアプリやゲーム、社会インフラ向け情報システムの開発・運用管理や、企画提案ができる人材を養成するコースです。",
  "映像メディアコース": "映像制作、アニメーション、CGなどを学び、映像作品制作技術、色彩の知識、プログラミング技術を備えた人材を養成するコースです。",
  "サウンド制作コース": "音響技術と楽曲制作を中心に学び、音響技術者、サウンドクリエータ、音源開発エンジニアなどを養成するコースです。",
  "メディアデザインコース": "グラフィック、Web、UI、デジタルファブリケーションを学び、情報創造とコミュニケーションのためのデザイン技法を修得するコースです。",
  "専門選択": "各コースで専門性や複合スキルを深めるために選択して修得する専門科目群です。",
  "他学科履修": "他学科で開講する科目のうち、卒業要件に算入できる科目群です。",
  "教職課程に関する科目": "高等学校教諭一種免許状取得に向けて段階的に履修する教職課程科目です。"
};

const treeLaneDescriptions = {
  "人間と文化への理解": "哲学、芸術、心理学などを通じて、人間や文化への理解を広げる領域です。",
  "現代社会への理解": "日本国憲法、経営学、社会学などを通じて、現代社会の仕組みを学ぶ領域です。",
  "自然科学への理解": "自然科学や統計学、数的処理を通じて、論理的・数量的な基礎力を養う領域です。",
  "外国語": "英語と第2外国語を通じて、言語運用力と異文化理解を深める領域です。",
  "健康と運動への理解": "スポーツ、アウトドア、健康と栄養を通じて、心身の基礎を整える領域です。",
  "情報技術への理解": "情報リテラシーやICT基礎を通じて、大学で学ぶための情報活用力を養う領域です。",
  "総合科目": "セミナー、演習、キャリア形成などを通じて、学び方と社会人基礎力を培う領域です。",
  "情報処理系列": "プログラミング入門からデータサイエンス、人工知能へつながる情報処理の系列です。",
  "情報資格系列": "情報学概論、ITマネジメント、ITストラテジなどを通じて情報資格や実務基礎へつながる系列です。",
  "プログラミング系列": "プログラム演習とアルゴリズムを軸に、ゲームや応用開発へ発展する系列です。",
  "ネットワーク系列": "ネットワーク基礎からモバイル情報論まで、ネットワークと通信技術を学ぶ系列です。",
  "システム開発系列": "情報システム入門からデータベースまで、システム開発と運用の流れを学ぶ系列です。",
  "映像制作系列": "映像制作演習から加工、ドキュメンタリー、配信へつながる映像制作の系列です。",
  "画像処理・CG系列": "デジタルアート入門、アニメーション、CG基礎・演習へつながる系列です。",
  "音響技術系列": "音響実務、音響学、音響制作演習、レコーディングへつながる音響技術の系列です。",
  "楽曲制作系列": "MIDI制作演習と音楽理論からサウンドクリエーションへつながる系列です。",
  "メディアデザイン系列": "グラフィックデザインからメディアデザイン演習、暮しとデザインへつながる系列です。",
  "プロダクトデザイン系列": "CG基礎とCADを土台に、デジタルファブリケーションへつながる系列です。",
  "Webデザイン系列": "WebプログラミングからWebデザイン、Web解析へつながる系列です。",
  "総合・その他": "各コース内で系列横断的に学ぶ補完科目や応用科目のまとまりです。",
  "教職": "教職課程の半期ごとの必修群を段階的に積み上げていくまとまりです。"
};

function treeSectionTitle(section) {
  return treeSectionDescriptions[section] || "";
}

function treeLaneTitle(lane) {
  return treeLaneDescriptions[lane] || "";
}

function sortTreeLanes(section, lanes) {
  const preferred = treeLaneOrder[section];
  if (!preferred) return lanes;
  return [...lanes].sort((a, b) => {
    const aIndex = preferred.indexOf(a);
    const bIndex = preferred.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, "ja");
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

function laneRowSequence(section, lane, laneNodes) {
  return [...new Set(laneNodes.map((node) => node.row || 1))].sort((a, b) => a - b);
}

function treeTerms(nodes) {
  if (nodes.some((node) => node.term === TREE_UNASSIGNED_TERM)) {
    return [...TERMS, { id: TREE_UNASSIGNED_TERM, year: null, label: "配当年次なし" }];
  }
  return TERMS;
}

function optionMarkupForCourse(course) {
  const validTerms = validTermsForCourse(course);
  const termOptions = course.qualificationEligible
    ? RECOGNITION_METHODS.flatMap((method) =>
      recognitionTermsForMethod(course, method.id).map((term) => `<option value="${recognitionValue(method.id, term.id)}">${method.label} ${term.label}</option>`)
    ).join("")
    : validTerms.map((term) => `<option value="${term.id}">${term.label}</option>`).join("");
  return `<option value="none">未配置</option>${termOptions}`;
}

function validatePlannedCourse(course) {
  const currentValue = state.planned.get(course.id);
  if (currentValue && !isValidPlannedValue(course, currentValue)) {
    state.planned.delete(course.id);
    state.teacherAdded.delete(course.id);
  }
}

function visibleCourses() {
  const years = new Set([...document.querySelectorAll(".year-filter:checked")].map((input) => Number(input.value)));
  const terms = new Set([...document.querySelectorAll(".term-filter:checked")].map((input) => input.value));
  const categories = new Set([...document.querySelectorAll(".category-filter:checked")].map((input) => input.value));
  return allCourses.filter((course) => {
    if (course.category === "teacher" && !state.teacher) return false;
    if (!categories.has(course.category)) return false;
    if (course.qualificationEligible) return years.size > 0 && terms.size > 0;
    if (!course.year && !course.term) return years.size > 0 && terms.size > 0;
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

function snapshotPlanned() {
  return new Map(state.planned.entries());
}

function snapshotTermValue(value) {
  return parseRecognitionValue(value)?.term || value;
}

function queuePlanTransition(beforePlan, afterPlan, options = {}) {
  const beforeIds = new Set(beforePlan.keys());
  const afterIds = new Set(afterPlan.keys());
  const changes = [];
  const removed = [...beforeIds].filter((id) => !afterIds.has(id));
  const added = [...afterIds].filter((id) => !beforeIds.has(id));
  added.forEach((courseId) => {
    changes.push({
      courseId,
      kind: "confirm",
      term: snapshotTermValue(afterPlan.get(courseId))
    });
  });
  if (!changes.length || options.silent) {
    if (removed.length) {
      fxSequence.feedbackTimers.forEach((timer) => window.clearTimeout(timer));
      fxSequence.feedbackTimers = [];
      fxSequence.items.clear();
      fxSequence.scheduled = false;
      planFx.transitions.clear();
      planFx.queuedDelays.clear();
    }
    return;
  }

  const itemStep = options.step || 24;
  const cellStep = options.cellStep || Math.max(54, itemStep * 2);
  const groupedCourses = new Map(TERM_IDS.map((term) => [term, []]));
  changes.forEach((change) => {
    const course = allCourses.find((item) => item.id === change.courseId);
    if (!course || !groupedCourses.has(change.term)) return;
    groupedCourses.get(change.term).push({
      courseId: change.courseId,
      name: course.name
    });
  });
  groupedCourses.forEach((group) => {
    group.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  });
  const changeOrder = new Map();
  TERM_IDS.forEach((term, termIdx) => {
    const courseEntries = groupedCourses.get(term) || [];
    courseEntries.forEach(({ courseId }, index) => {
      changeOrder.set(courseId, (options.baseDelay || 0) + (termIdx * cellStep) + (index * itemStep));
    });
  });

  planFx.queuedDelays.clear();
  changes.forEach((change) => {
    planFx.queuedDelays.set(change.courseId, changeOrder.get(change.courseId) ?? (options.baseDelay || 0));
  });
  fxSequence.feedbackTimers.forEach((timer) => window.clearTimeout(timer));
  fxSequence.feedbackTimers = [];
  fxSequence.items.clear();
  fxSequence.scheduled = false;
  changes
    .slice()
    .sort((a, b) => (changeOrder.get(a.courseId) || 0) - (changeOrder.get(b.courseId) || 0))
    .slice(0, 48)
    .forEach((change) => {
    fxSequence.items.set(change.courseId, {
      kind: change.kind,
      delay: changeOrder.get(change.courseId) ?? (options.baseDelay || 0)
    });
  });
}

function animatedCourseClass(courseId) {
  const item = fxSequence.items.get(courseId);
  if (!item) return "";
  return ` fx-sequence fx-${item.kind === "remove" ? "release" : "activate"}`;
}

function animatedCourseStyle(courseId) {
  const item = fxSequence.items.get(courseId);
  return item ? `--fx-delay:${item.delay}ms;` : "";
}

function currentVisibleCourseIdSet() {
  return new Set([...document.querySelectorAll("#catalogList [data-course-id], #treeView [data-course-id]")]
    .map((element) => element.dataset.courseId));
}

function queueFilterReveal(beforeIds, afterCourses, options = {}) {
  const added = afterCourses
    .filter((course) => !beforeIds.has(course.id))
    .slice(0, 80);
  if (!added.length) return;
  if (filterFx.cleanupTimer) window.clearTimeout(filterFx.cleanupTimer);
  filterFx.items.clear();
  added.forEach((course, index) => {
    filterFx.items.set(course.id, (options.baseDelay || 0) + (index * 24));
  });
  const maxDelay = (options.baseDelay || 0) + ((added.length - 1) * 24);
  filterFx.cleanupTimer = window.setTimeout(() => {
    filterFx.cleanupTimer = null;
    filterFx.items.clear();
    render();
  }, maxDelay + 620);
}

function filterRevealClass(courseId) {
  return filterFx.items.has(courseId) && !fxSequence.items.has(courseId) ? " fx-filter-reveal" : "";
}

function filterRevealStyle(courseId) {
  const delay = filterFx.items.get(courseId);
  return Number.isFinite(delay) ? `--filter-reveal-delay:${delay}ms;` : "";
}

function courseElementsForAnimation(courseId) {
  const escaped = cssAttributeValue(courseId);
  return [...document.querySelectorAll(`#catalogList [data-course-id="${escaped}"], #treeView [data-course-id="${escaped}"]`)];
}

function animateExistingCourseElements(courseIds, className, options = {}) {
  const ids = [...courseIds].slice(0, options.limit || 120);
  const step = options.step || 18;
  ids.forEach((courseId, index) => {
    courseElementsForAnimation(courseId).forEach((element) => {
      element.classList.remove("fx-filter-hide", "fx-clear-release");
      element.classList.add(className);
      element.style.setProperty("--fx-exit-delay", `${index * step}ms`);
    });
  });
  return ids.length ? ((ids.length - 1) * step) + (options.duration || 360) : 0;
}

function animateExistingPlanRows(courseIds, className, options = {}) {
  const ids = [...courseIds].slice(0, options.limit || 120);
  const step = options.step || 18;
  ids.forEach((courseId, index) => {
    const escaped = cssAttributeValue(courseId);
    document.querySelectorAll(`#planGrid .planned-course[data-course-id="${escaped}"]`).forEach((element) => {
      element.classList.remove("fx-clear-release");
      element.classList.add(className);
      element.style.setProperty("--fx-exit-delay", `${index * step}ms`);
    });
  });
  return ids.length ? ((ids.length - 1) * step) + (options.duration || 360) : 0;
}

function cancelPendingPlanClear() {
  if (!planFx.clearTimer) return;
  window.clearTimeout(planFx.clearTimer);
  planFx.clearTimer = null;
  document.querySelectorAll(".fx-clear-release").forEach((element) => {
    element.classList.remove("fx-clear-release");
    element.style.removeProperty("--fx-exit-delay");
  });
}

function handleFilterChange() {
  const beforeIds = currentVisibleCourseIdSet();
  const afterCourses = visibleCourses();
  const afterIds = new Set(afterCourses.map((course) => course.id));
  const hidden = [...beforeIds].filter((id) => !afterIds.has(id));
  if (filterFx.exitTimer) window.clearTimeout(filterFx.exitTimer);
  if (!hidden.length) {
    queueFilterReveal(beforeIds, afterCourses);
    render();
    return;
  }
  const wait = animateExistingCourseElements(hidden, "fx-filter-hide", { step: 16, duration: 340 });
  filterFx.exitTimer = window.setTimeout(() => {
    filterFx.exitTimer = null;
    queueFilterReveal(beforeIds, afterCourses);
    render();
  }, wait);
}

function planTransitionClass(courseId) {
  const transition = planFx.transitions.get(courseId);
  if (!transition) return "";
  return ` fx-sequence fx-${transition.kind === "remove" ? "release" : "activate"}`;
}

function planAnimationDelay(courseId, fallbackDelay) {
  const transition = planFx.transitions.get(courseId);
  return transition ? transition.delay : fallbackDelay;
}

function planCellDelay(courseIds = []) {
  const delays = courseIds
    .map((courseId) => planFx.transitions.get(courseId)?.delay)
    .filter((delay) => Number.isFinite(delay));
  if (!delays.length) return null;
  return Math.min(...delays);
}

function updatePlanTransitions(currentPlan = snapshotPlanned()) {
  const now = Date.now();
  const previous = planFx.prevSnapshot;
  const nextTransitions = new Map();
  const animationDuration = 520;
  currentPlan.forEach((term, courseId) => {
    if (previous.get(courseId) === term) return;
    const old = planFx.transitions.get(courseId);
    const delay = planFx.queuedDelays.get(courseId) ?? (old && old.kind === "remove" ? old.delay : 0);
    nextTransitions.set(courseId, { kind: "activate", term, delay, expiresAt: now + delay + animationDuration });
  });
  planFx.transitions.forEach((transition, courseId) => {
    if (transition.expiresAt > now && !nextTransitions.has(courseId)) {
      nextTransitions.set(courseId, transition);
    }
  });
  planFx.transitions = nextTransitions;
  planFx.prevSnapshot = currentPlan;
  planFx.queuedDelays.clear();
  if (planFx.cleanupTimer) window.clearTimeout(planFx.cleanupTimer);
  if (nextTransitions.size) {
    const latestExpiry = Math.max(...[...nextTransitions.values()].map((transition) => transition.expiresAt));
    planFx.cleanupTimer = window.setTimeout(() => {
      planFx.cleanupTimer = null;
      if (purgeExpiredPlanTransitions()) renderPlan();
    }, Math.max(0, latestExpiry - now + 80));
  } else {
    planFx.cleanupTimer = null;
  }
  return nextTransitions;
}

function purgeExpiredPlanTransitions() {
  const now = Date.now();
  let changed = false;
  planFx.transitions.forEach((transition, courseId) => {
    if (transition.expiresAt <= now) {
      planFx.transitions.delete(courseId);
      changed = true;
    }
  });
  return changed;
}

function cssAttributeValue(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function firstVisibleCourseElement(courseId) {
  const selector = `[data-course-id="${cssAttributeValue(courseId)}"]`;
  const preferred = state.viewMode === "tree"
    ? document.querySelector(`#treeView ${selector} .tree-node-button`)
    : document.querySelector(`#catalogList ${selector}`);
  return preferred || document.querySelector(`${selector} .tree-node-button`) || document.querySelector(selector);
}

function scheduleQueuedNodeFeedback() {
  if (fxSequence.scheduled || !fxSequence.items.size) return;
  fxSequence.scheduled = true;
  let maxDelay = 0;
  fxSequence.items.forEach((item, courseId) => {
    maxDelay = Math.max(maxDelay, item.delay);
    const timer = window.setTimeout(() => {
      const element = firstVisibleCourseElement(courseId);
      if (element) burstAtElement(element, item.kind, item.kind === "remove" ? 0.78 : 0.92);
      playArcadeSfx(item.kind);
    }, item.delay + 80);
    fxSequence.feedbackTimers.push(timer);
  });
  const cleanup = window.setTimeout(() => {
    fxSequence.items.clear();
    fxSequence.feedbackTimers = [];
    fxSequence.scheduled = false;
    render();
  }, maxDelay + 980);
  fxSequence.feedbackTimers.push(cleanup);
}

function startTreeReveal() {
  fxSequence.treeTimers.forEach((timer) => window.clearTimeout(timer));
  fxSequence.treeTimers = [];
  fxSequence.treeReveal = true;
  const pulses = Math.min(14, Math.max(6, Math.ceil(visibleTreeNodes().length / 18)));
  for (let index = 0; index < pulses; index += 1) {
    const pulse = window.setTimeout(() => {
      playArcadeSfx(index === pulses - 1 ? "boost" : "switch");
    }, 120 + (index * 110));
    fxSequence.treeTimers.push(pulse);
  }
  const timer = window.setTimeout(() => {
    fxSequence.treeReveal = false;
  }, 1900);
  fxSequence.treeTimers.push(timer);
}

function treeRevealDelay(node, sectionIndex, laneIndex, displayTerms) {
  const termIndex = Math.max(0, displayTerms.findIndex((term) => term.id === node.term));
  const rowIndex = Math.max(0, (node.row || 1) - 1);
  return (termIndex * 90) + (sectionIndex * 38) + (laneIndex * 18) + (rowIndex * 42);
}

function isValidPlannedValue(course, value) {
  const recognition = parseRecognitionValue(value);
  if (recognition) {
    return course.qualificationEligible && recognitionTermsForMethod(course, recognition.method).some((term) => term.id === recognition.term);
  }
  return validTermsForCourse(course).some((term) => term.id === value) && !course.qualificationEligible;
}

function setPlanned(courseId, term, options = {}) {
  cancelPendingPlanClear();
  const course = allCourses.find((item) => item.id === courseId);
  const beforePlan = snapshotPlanned();
  const before = state.planned.get(courseId);
  let feedback = null;
  if (term === "none") {
    if (state.planned.delete(courseId)) {
      state.teacherAdded.delete(courseId);
      feedback = "remove";
    }
  } else if (parseRecognitionValue(term)) {
    const recognition = parseRecognitionValue(term);
    const valid = course?.qualificationEligible && recognitionTermsForMethod(course, recognition.method).some((item) => item.id === recognition.term);
    if (valid) {
      state.planned.set(courseId, term);
      feedback = before === term ? null : "confirm";
    } else {
      feedback = "error";
    }
  } else {
    if (course && isValidPlannedValue(course, term)) {
      state.planned.set(courseId, term);
      feedback = before === term ? null : "confirm";
    } else if (course) {
      feedback = "error";
    }
  }
  state.openCourseId = null;
  state.openTreeNodeId = null;
  if (feedback === "error") {
    triggerArcadeFeedback(feedback, options.source);
  } else if (feedback) {
    if (feedback === "remove") triggerArcadeFeedback("cancel", options.source);
    queuePlanTransition(beforePlan, snapshotPlanned(), { baseDelay: 0, step: 20, cellStep: 44 });
    syncArcadeAudio(true);
  }
  render();
}

function resetCatalogFilters() {
  document.querySelectorAll(".year-filter, .term-filter").forEach((input) => {
    input.checked = true;
  });
  document.querySelectorAll(".category-filter").forEach((input) => {
    input.checked = !["otherDept", "teacher"].includes(input.value) || (input.value === "teacher" && state.teacher);
  });
}

function teacherPlanCourses() {
  const preferred = new Map();
  allCourses.filter((course) =>
    (course.category === "teacher" || course.teacherRequired) &&
    (course.category !== "courseRequired" || (state.course !== NO_COURSE && course.course === state.course))
  ).forEach((course) => {
    const key = course.key;
    const existing = preferred.get(key);
    if (!existing || course.category === "teacher") {
      preferred.set(key, course);
    }
  });
  return [...preferred.values()];
}

function addTeacherPlanCourses(options = {}) {
  const beforePlan = snapshotPlanned();
  let added = 0;
  teacherPlanCourses().forEach((course) => {
    if (state.planned.has(course.id)) return;
    state.planned.set(course.id, openingTermForCourse(course));
    state.teacherAdded.add(course.id);
    added += 1;
  });
  if (!options.silent) queuePlanTransition(beforePlan, snapshotPlanned(), { baseDelay: 0, step: 20, cellStep: 48 });
  return added;
}

function removeTeacherPlanCourses() {
  const beforePlan = snapshotPlanned();
  let removed = 0;
  allCourses.forEach((course) => {
    const shouldRemove = course.category === "teacher" || state.teacherAdded.has(course.id);
    if (!shouldRemove || !state.planned.has(course.id)) return;
    state.planned.delete(course.id);
    removed += 1;
  });
  state.teacherAdded.clear();
  queuePlanTransition(beforePlan, snapshotPlanned(), { baseDelay: 0, step: 22, cellStep: 56 });
  return removed;
}

function autoFill(options = {}) {
  cancelPendingPlanClear();
  const beforePlan = snapshotPlanned();
  state.planned.clear();
  state.teacherAdded.clear();
  state.openCourseId = null;
  state.openTreeNodeId = null;
  resetCatalogFilters();
  allCourses.forEach((course) => {
    if (course.category === "courseRequired" && (state.course === NO_COURSE || course.course !== state.course)) return;
    if (course.category === "teacher" && !state.teacher) return;
    if (["basicRequired", "commonRequired", "courseRequired"].includes(course.category)) {
      state.planned.set(course.id, openingTermForCourse(course));
    }
  });
  if (state.teacher) {
    addTeacherPlanCourses({ silent: true });
  }
  if (!options.silent) {
    queuePlanTransition(beforePlan, snapshotPlanned(), { baseDelay: 0, step: 22, cellStep: 56 });
    syncArcadeAudio(true);
    render();
    triggerArcadeFeedback("boost");
    return;
  }
  syncArcadeAudio(true);
  render();
}

function clearPlan() {
  const beforePlan = snapshotPlanned();
  if (planFx.clearTimer || !beforePlan.size) {
    triggerArcadeFeedback("remove", document.querySelector("#clearButton"));
    return;
  }
  const courseIds = [...beforePlan.keys()];
  const wait = Math.max(
    animateExistingCourseElements(courseIds, "fx-clear-release", { step: 14, duration: 380 }),
    animateExistingPlanRows(courseIds, "fx-clear-release", { step: 22, duration: 380 })
  );
  triggerArcadeFeedback("remove", document.querySelector("#clearButton"));
  planFx.clearTimer = window.setTimeout(() => {
    planFx.clearTimer = null;
    state.planned.clear();
    state.teacherAdded.clear();
    state.openCourseId = null;
    state.openTreeNodeId = null;
    if (planFx.cleanupTimer) {
      window.clearTimeout(planFx.cleanupTimer);
      planFx.cleanupTimer = null;
    }
    planFx.transitions.clear();
    planFx.queuedDelays.clear();
    planFx.prevSnapshot = snapshotPlanned();
    syncArcadeAudio(true);
    render();
  }, wait + 40);
}

const immediateButtonRuns = new Map();

function runImmediateAction(key, event, action) {
  const now = Date.now();
  const lastRun = immediateButtonRuns.get(key) || 0;
  if (now - lastRun < 240) {
    event?.preventDefault?.();
    return;
  }
  immediateButtonRuns.set(key, now);
  event?.preventDefault?.();
  action();
}

function handleAutoFillButton(event) {
  runImmediateAction("autoFillButton", event, () => autoFill());
}

function handleClearButton(event) {
  runImmediateAction("clearButton", event, clearPlan);
}

function bindImmediateButton(selector, key, action) {
  const button = document.querySelector(selector);
  const run = (event) => runImmediateAction(key, event, action);
  button.addEventListener("pointerdown", run);
  button.addEventListener("click", run);
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
  const courseSpecific = sum((course) => course.category === "courseRequired");
  const courseSpecificByCourse = Object.fromEntries(
    COURSES
      .filter((course) => course !== NO_COURSE)
      .map((courseName) => [courseName, sum((course) => course.category === "courseRequired" && course.course === courseName)])
  );
  const qualification = sum((course) => isQualificationPlanned(course));
  const specialized = sum((course) => course.category === "specializedElective" && !isQualificationPlanned(course));
  const otherDeptRaw = sum((course) => course.category === "otherDept");
  const otherDeptCounted = Math.min(otherDeptRaw, 12);
  const otherDeptOutside = Math.max(0, otherDeptRaw - otherDeptCounted);
  const teacher = sum((course) => course.category === "teacher");
  const professional = common + courseSpecific;
  const professionalSubjectByCourse = professionalSubjectBreakdown(selected);
  const professionalSubjectTotal = Object.values(professionalSubjectByCourse).reduce((total, credits) => total + credits, 0);
  const manualOther = Number(state.manualOther);
  const other = manualOther + basicElectiveTransfer + otherDeptCounted + specialized + qualification;
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
    courseSpecificByCourse,
    professionalSubjectByCourse,
    professionalSubjectTotal,
    specialized,
    professional,
    otherDeptRaw,
    otherDeptCounted,
    otherDeptOutside,
    qualification,
    teacher,
    manualOther,
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

function prerequisiteIssuesByCourse() {
  const selected = selectedCourses();
  const issues = new Set();
  selected.forEach((course) => {
    if (isQualificationPlanned(course)) return;
    const required = prereqs[course.name] || [];
    required.forEach((requiredName) => {
      const prereqCourses = allCourses.filter((item) => item.key === normalizeName(requiredName));
      if (prereqCourses.some((item) => state.planned.has(item.id))) return;
      prereqCourses.forEach((prereqCourse) => {
        if (prereqCourse.category !== "basicElective" && prereqCourse.category !== "specializedElective") return;
        issues.add(prereqCourse.id);
      });
    });
  });
  return issues;
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
  const prereqIssues = prerequisiteIssuesByCourse();
  visibleCourses().forEach((course) => {
    const card = document.createElement("article");
    card.className = `course-card${state.planned.has(course.id) ? " is-planned" : ""}${treeMissingRequiredClass(course)}${treePrereqMissingClass(course, prereqIssues)}${animatedCourseClass(course.id)}${filterRevealClass(course.id)}`;
    card.dataset.courseId = course.id;
    const fxStyle = `${animatedCourseStyle(course.id)}${filterRevealStyle(course.id)}`;
    if (fxStyle) card.setAttribute("style", fxStyle);

    const main = document.createElement("div");
    main.className = "course-main";

    const info = document.createElement("div");
    info.className = "course-info";

    const title = document.createElement("div");
    title.className = "course-title";
    title.innerHTML = `<span>${course.name}</span><small>${course.credits}単位</small>`;

    validatePlannedCourse(course);

    const tags = document.createElement("div");
    tags.className = "tags";
    const termTag = courseTermTag(course);
    const tagTexts = [categoryLabels[course.category], course.course, termTag].filter(Boolean);
    tagTexts.forEach((text, index) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = text;
      if (index === 0) tag.title = categoryTitle(course.category);
      if (text === "履修/資格") tag.title = "科目履修 / 資格取得";
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
    select.innerHTML = optionMarkupForCourse(course);
    select.value = state.planned.get(course.id) || "none";
    select.addEventListener("change", (event) => setPlanned(course.id, event.target.value, { source: select }));

    const opening = document.createElement("button");
    opening.type = "button";
    opening.textContent = state.planned.has(course.id) ? plannedButtonLabel(course) : "履修";
    opening.className = "plan-button";
    opening.setAttribute("aria-expanded", state.openCourseId === course.id ? "true" : "false");
    opening.setAttribute("aria-label", `${course.name}の履修時期を選択${state.planned.has(course.id) ? `: ${plannedLabel(course)}` : ""}`);
    opening.addEventListener("click", () => {
      state.openCourseId = state.openCourseId === course.id ? null : course.id;
      triggerArcadeFeedback("switch", opening);
      render();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `${course.name}を外す`);
    remove.addEventListener("click", () => setPlanned(course.id, "none", { source: remove }));

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
  const currentPlan = snapshotPlanned();
  updatePlanTransitions(currentPlan);
  purgeExpiredPlanTransitions();
  const termLimit = state.gpa >= 3.7 ? 26 : 24;
  for (let year = 1; year <= 4; year += 1) {
    const column = document.createElement("div");
    column.className = "year-column";
    column.innerHTML = `<div class="year-title">${year}年</div>`;
    ["前", "後"].forEach((term) => {
      const id = termId(year, term);
      const courses = selectedCourses()
        .filter((course) => plannedTerm(course) === id)
        .sort((a, b) => a.name.localeCompare(b.name, "ja"));
      const credits = termCredits(id);
      const cellIndex = ((year - 1) * 2) + (term === "前" ? 0 : 1);
      const startDelay = cellIndex * 56;
      const cellDelay = planCellDelay(courses.map((course) => course.id));
      const box = document.createElement("section");
      box.className = `term-box${credits.capCounted > termLimit ? " limit-exceeded" : ""}${cellDelay !== null ? " fx-batch" : ""}`;
      if (cellDelay !== null) box.setAttribute("style", `--plan-cell-delay:${cellDelay}ms;`);
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
          ${courses.map((course, index) => {
            const delay = planAnimationDelay(course.id, startDelay + (index * 24));
            return `
            <div class="planned-course${isCapExcludedInPlan(course) ? " cap-excluded" : ""}${planTransitionClass(course.id)}" data-course-id="${course.id}" style="--fx-delay:${delay}ms;">
              <span>${course.name}</span>
              <small title="${categoryTitle(course.category)}">${categoryLabels[course.category]} / ${course.credits}単位${isRecognitionPlanned(course) ? ` / ${recognitionMethodLabel(course)}` : ""}${course.category === "teacher" ? " / 要件外" : ""}${isCapExcludedInPlan(course) ? " / 上限外" : ""}</small>
            </div>
          `;
          }).join("")}
        </div>`;
      column.appendChild(box);
    });
    grid.appendChild(column);
  }
}

function sectionClass(section) {
  if (section === "基礎教育科目") return "basic-required";
  if (section === "基礎教育必修") return "basic-required";
  if (section === "基礎教育選択") return "basic-elective";
  if (section === "コース共通") return "common";
  if (section === "情報システムコース") return "system";
  if (section === "映像メディアコース") return "movie";
  if (section === "サウンド制作コース") return "sound";
  if (section === "メディアデザインコース") return "design";
  if (section === "専門選択") return "specialized";
  if (section === "他学科履修") return "other";
  if (section === "教職課程に関する科目") return "teacher";
  return "common";
}

function visibleTreeNodes() {
  const courses = visibleCourses();
  const visibleCourseIds = new Set(courses.map((course) => course.id));
  const usedCourseIds = new Set();
  const nodes = [];

  officialTreeNodes.forEach((node) => {
    const course = courseForTreeNode(node);
    if (!course || !visibleCourseIds.has(course.id)) return;
    usedCourseIds.add(course.id);
    nodes.push({ ...node, row: treeRowByNodeId.get(node.id) || node.row || 1 });
  });

  courses.forEach((course) => {
    if (usedCourseIds.has(course.id)) return;
    nodes.push(syntheticTreeNodeForCourse(course));
  });

  return nodes;
}

function visibleTreeEdges(nodes = visibleTreeNodes()) {
  const visibleIds = new Set(nodes.map((node) => node.id));
  const edges = officialTreeEdges.filter((edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to));
  const nodesByCourseKey = new Map();
  nodes.forEach((node) => {
    const course = courseForTreeNode(node);
    if (!course) return;
    if (!nodesByCourseKey.has(course.key)) nodesByCourseKey.set(course.key, []);
    nodesByCourseKey.get(course.key).push(node);
  });
  Object.entries(prereqs).forEach(([courseName, requiredNames]) => {
    const toNodes = nodesByCourseKey.get(normalizeName(courseName)) || [];
    requiredNames.forEach((requiredName) => {
      const fromNodes = nodesByCourseKey.get(normalizeName(requiredName)) || [];
      toNodes.forEach((toNode) => {
        const sectionMatched = fromNodes.filter((fromNode) => fromNode.section === toNode.section);
        const sourceNodes = sectionMatched.length ? sectionMatched : fromNodes;
        sourceNodes.forEach((fromNode) => {
          edges.push({ from: fromNode.id, to: toNode.id });
        });
      });
    });
  });
  const seen = new Set();
  return edges.filter((edge) => {
    const key = `${edge.from}->${edge.to}`;
    if (edge.from === edge.to || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function treeConnectionCounts(nodes = visibleTreeNodes()) {
  const counts = new Map(nodes.map((node) => [node.id, { incoming: 0, outgoing: 0 }]));
  visibleTreeEdges(nodes).forEach((edge) => {
    counts.get(edge.from).outgoing += 1;
    counts.get(edge.to).incoming += 1;
  });
  return counts;
}

function renderTree() {
  const tree = document.querySelector("#treeView");
  tree.innerHTML = "";
  const nodes = visibleTreeNodes();
  const displayTerms = treeTerms(nodes);
  tree.style.setProperty("--tree-grid-template", `136px repeat(${displayTerms.length}, minmax(0, 1fr))`);
  const termLabels = displayTerms.map((term) => `<div class="tree-term">${term.label}</div>`).join("");
  const connectionCounts = treeConnectionCounts(nodes);
  const prereqIssues = prerequisiteIssuesByCourse();
  const sections = [...new Set(nodes.map((node) => node.section))]
    .sort((a, b) => {
      const aIndex = treeSectionOrder.indexOf(a);
      const bIndex = treeSectionOrder.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b, "ja");
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

  const header = document.createElement("div");
  header.className = "tree-header";
  header.innerHTML = `<div></div>${termLabels}`;
  tree.appendChild(header);

  tree.classList.toggle("is-revealing", fxSequence.treeReveal);

  sections.forEach((section, sectionIndex) => {
    const sectionNodes = nodes.filter((node) => node.section === section);
    const lanes = sortTreeLanes(section, [...new Set(sectionNodes.map((node) => node.lane))]);
    const block = document.createElement("section");
    block.className = `tree-section tree-section-${sectionClass(section)}`;
    const sectionTitle = treeSectionTitle(section);
    block.innerHTML = `<div class="tree-section-title"${sectionTitle ? ` title="${sectionTitle}"` : ""}>${section}</div>`;

    lanes.forEach((lane, laneIndex) => {
      const laneNodes = sectionNodes.filter((node) => node.lane === lane);
      const laneRows = laneRowSequence(section, lane, laneNodes);
      const row = document.createElement("div");
      row.className = `tree-row${centeredTreeLanes.has(`${section}::${lane}`) ? " is-centered-lane" : ""}`;
      const laneTitle = treeLaneTitle(lane);
      row.innerHTML = `<div class="tree-lane"${laneTitle ? ` title="${laneTitle}"` : ""}>${lane}</div>`;
      displayTerms.forEach((term) => {
        const cell = document.createElement("div");
        cell.className = "tree-cell";
        laneRows.forEach((laneRow) => {
          const slot = document.createElement("div");
          slot.className = "tree-slot";
          laneNodes
            .filter((node) => node.term === term.id && (node.row || 1) === laneRow)
            .forEach((node) => {
              const course = courseForTreeNode(node);
              if (!course) return;
              const treeName = treeDisplayName(node.displayName);
              const tooltip = treeNodeTooltip(course, node, treeName);
              validatePlannedCourse(course);
              const disabled = course.category === "teacher" && !state.teacher;
              const counts = connectionCounts.get(node.id) || { incoming: 0, outgoing: 0 };
              const item = document.createElement("article");
              item.className = `tree-node level-${node.level || "none"}${treeRequiredClass(course, node)}${treeMissingRequiredClass(course)}${treePrereqMissingClass(course, prereqIssues)}${tooltip ? " has-tooltip" : ""}${state.planned.has(course.id) ? " is-planned" : ""}${disabled ? " is-disabled" : ""}${state.openTreeNodeId === node.id ? " is-open" : ""}${state.showTreeMeta ? " has-meta" : ""}${state.showTreeCodes ? " has-code" : ""}${fxSequence.treeReveal ? " is-tree-reveal" : ""}${animatedCourseClass(course.id)}${filterRevealClass(course.id)}`;
              item.dataset.nodeId = node.id;
              item.dataset.courseId = course.id;
              item.dataset.incoming = counts.incoming;
              item.dataset.outgoing = counts.outgoing;
              const fxStyle = `${animatedCourseStyle(course.id)}${filterRevealStyle(course.id)}`;
              const revealStyle = fxSequence.treeReveal ? `--tree-reveal-delay:${treeRevealDelay(node, sectionIndex, laneIndex, displayTerms)}ms;` : "";
              if (fxStyle || revealStyle) item.setAttribute("style", `${fxStyle}${revealStyle}`);
              item.innerHTML = `
                <button type="button" class="tree-node-button" ${disabled ? "disabled" : ""} aria-expanded="${state.openTreeNodeId === node.id ? "true" : "false"}"${tooltip ? ` title="${tooltip}"` : ""}>
                  ${state.showTreeCodes ? `<span class="tree-node-code">${node.courseNumber}</span>` : ""}
                  <span class="tree-node-name" style="--tree-name-size:${treeNameFontSize(treeName)}px">${treeName}</span>
                  ${state.showTreeMeta ? `<span class="tree-node-meta">${node.level || categoryLabels[course.category]}${state.planned.has(course.id) ? ` / ${plannedButtonLabel(course)}` : ""}${course.category !== "teacher" && (course.teacherRequired || node.teacherRequired) ? " / 教職必修" : ""}</span>` : ""}
                </button>
              `;
              const button = item.querySelector(".tree-node-button");
              button.addEventListener("click", () => {
                state.openTreeNodeId = state.openTreeNodeId === node.id ? null : node.id;
                state.openCourseId = null;
                triggerArcadeFeedback("switch", button);
                render();
              });
              if (state.openTreeNodeId === node.id) {
                const menu = document.createElement("div");
                menu.className = "tree-node-menu";
                const select = document.createElement("select");
                select.setAttribute("aria-label", `${course.name}の配置`);
                select.innerHTML = optionMarkupForCourse(course);
                select.value = state.planned.get(course.id) || "none";
                select.addEventListener("change", (event) => setPlanned(course.id, event.target.value, { source: select }));
                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "remove-button";
                remove.textContent = "×";
                remove.setAttribute("aria-label", `${course.name}を外す`);
                remove.addEventListener("click", () => setPlanned(course.id, "none", { source: remove }));
                menu.append(select, remove);
                item.appendChild(menu);
              }
              slot.appendChild(item);
            });
          cell.appendChild(slot);
        });
        row.appendChild(cell);
      });
      block.appendChild(row);
    });
    tree.appendChild(block);
  });

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("tree-edges");
  svg.setAttribute("aria-hidden", "true");
  tree.appendChild(svg);
  requestAnimationFrame(drawTreeEdges);
}

function drawTreeEdges() {
  const tree = document.querySelector("#treeView");
  const svg = tree.querySelector(".tree-edges");
  if (!svg || tree.hidden) return;
  svg.innerHTML = "";
  const treeRect = tree.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${tree.scrollWidth} ${tree.scrollHeight}`);
  svg.setAttribute("width", tree.scrollWidth);
  svg.setAttribute("height", tree.scrollHeight);
  const nodes = visibleTreeNodes();
  const connectionCounts = treeConnectionCounts(nodes);
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <marker id="tree-edge-arrow" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" class="tree-edge-arrow"></path>
    </marker>
  `;
  svg.appendChild(defs);
  const leftAnchorPoint = (fromRect, toRect) => {
    const fromCenter = fromRect.top + (fromRect.height / 2);
    const toCenter = toRect.top + (toRect.height / 2);
    const delta = fromCenter - toCenter;
    let ratio = 0.5;
    if (Math.abs(delta) > 8) ratio = delta < 0 ? 0.28 : 0.72;
    return {
      x: toRect.left - treeRect.left + tree.scrollLeft,
      y: toRect.top + (toRect.height * ratio) - treeRect.top + tree.scrollTop
    };
  };
  visibleTreeEdges(nodes).forEach((edge) => {
    const from = tree.querySelector(`[data-node-id="${edge.from}"] .tree-node-button`);
    const to = tree.querySelector(`[data-node-id="${edge.to}"] .tree-node-button`);
    if (!from || !to) return;
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const sameColumn = Math.abs(a.left - b.left) < 12;
    let x1;
    let y1;
    let x2;
    let y2;
    let d;
    if (sameColumn) {
      x1 = a.left + a.width / 2 - treeRect.left + tree.scrollLeft;
      x2 = b.left + b.width / 2 - treeRect.left + tree.scrollLeft;
      if (b.top >= a.top) {
        y1 = a.bottom - treeRect.top + tree.scrollTop;
        y2 = b.top - treeRect.top + tree.scrollTop;
      } else {
        y1 = a.top - treeRect.top + tree.scrollTop;
        y2 = b.bottom - treeRect.top + tree.scrollTop;
      }
      const spanY = Math.abs(y2 - y1);
      const curveY = Math.max(18, spanY * 0.32);
      const cp1y = y1 + (y2 >= y1 ? curveY : -curveY);
      const cp2y = y2 - (y2 >= y1 ? curveY : -curveY);
      d = `M ${x1} ${y1} C ${x1} ${cp1y}, ${x2} ${cp2y}, ${x2} ${y2}`;
    } else {
      x1 = a.right - treeRect.left + tree.scrollLeft;
      y1 = a.top + a.height / 2 - treeRect.top + tree.scrollTop;
      ({ x: x2, y: y2 } = leftAnchorPoint(a, b));
      const spanX = Math.max(24, Math.abs(x2 - x1));
      const spanY = Math.abs(y2 - y1);
      const curveX = Math.min(Math.max(12, spanX * 0.28), Math.max(12, (spanX / 2) - 4));
      const swayY = Math.min(18, Math.max(0, spanY * 0.16));
      const cp1x = x1 + curveX;
      const cp2x = x2 - curveX;
      const cp1y = y1 + (y2 > y1 ? swayY : y2 < y1 ? -swayY : 0);
      const cp2y = y2 - (y2 > y1 ? swayY : y2 < y1 ? -swayY : 0);
      d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
    }
    path.setAttribute("d", d);
    path.setAttribute("class", "tree-edge");
    path.setAttribute("marker-end", "url(#tree-edge-arrow)");
    svg.appendChild(path);
  });
}

function updateTreeMenuPlacement() {
  const tree = document.querySelector("#treeView");
  const menu = tree?.querySelector(".tree-node-menu");
  const item = menu?.closest(".tree-node");
  if (!tree || !menu || !item || tree.hidden) return;
  menu.classList.remove("open-up");
  const treeRect = tree.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const spaceBelow = treeRect.bottom - itemRect.bottom;
  const spaceAbove = itemRect.top - treeRect.top;
  if (menuRect.height > spaceBelow - 8 && spaceAbove > spaceBelow) {
    menu.classList.add("open-up");
  }
}

function renderViewMode() {
  const workspace = document.querySelector(".workspace");
  const catalog = document.querySelector("#catalogList");
  const tree = document.querySelector("#treeView");
  const filters = document.querySelector("#catalogFilters");
  const filterToggle = document.querySelector("#filterToggle");
  const courseMenu = document.querySelector("#courseMenu");
  const courseMenuToggle = document.querySelector("#courseMenuToggle");
  const gpaMenu = document.querySelector("#gpaMenu");
  const gpaMenuToggle = document.querySelector("#gpaMenuToggle");
  const effectsMenu = document.querySelector("#effectsMenu");
  const effectsToggle = document.querySelector("#effectsToggle");
  const treeCodeToggleWrap = document.querySelector("#treeCodeToggleWrap");
  const treeCodeToggle = document.querySelector("#treeCodeToggle");
  const treeMetaToggleWrap = document.querySelector("#treeMetaToggleWrap");
  const treeMetaToggle = document.querySelector("#treeMetaToggle");
  const fxToggle = document.querySelector("#fxToggle");
  const bgmToggle = document.querySelector("#bgmToggle");
  const isTree = state.viewMode === "tree";
  catalog.hidden = isTree;
  tree.hidden = !isTree;
  treeCodeToggleWrap.hidden = !isTree;
  treeCodeToggle.checked = state.showTreeCodes;
  treeMetaToggleWrap.hidden = !isTree;
  treeMetaToggle.checked = state.showTreeMeta;
  fxToggle.checked = state.soundFx;
  bgmToggle.checked = state.soundBgm;
  filters.hidden = !state.filtersOpen;
  filterToggle.setAttribute("aria-expanded", String(state.filtersOpen));
  courseMenu.hidden = !state.courseMenuOpen;
  courseMenuToggle.textContent = `コース: ${state.course}`;
  courseMenuToggle.setAttribute("aria-expanded", String(state.courseMenuOpen));
  gpaMenu.hidden = !state.gpaMenuOpen;
  gpaMenuToggle.textContent = "GPA条件";
  gpaMenuToggle.setAttribute("aria-expanded", String(state.gpaMenuOpen));
  effectsMenu.hidden = !state.effectsOpen;
  effectsToggle.setAttribute("aria-expanded", String(state.effectsOpen));
  workspace.classList.toggle("catalog-tree-mode", isTree);
  const viewModeToggle = document.querySelector("#viewModeToggle");
  const viewModeValue = document.querySelector("#viewModeValue");
  viewModeToggle.checked = isTree;
  viewModeToggle.setAttribute("aria-label", `ツリー表示 ${isTree ? "ON" : "OFF"}`);
  viewModeValue.textContent = isTree ? "ON" : "OFF";
  if (isTree) {
    drawTreeEdges();
    requestAnimationFrame(updateTreeMenuPlacement);
  }
}

function renderCourseMenu() {
  const menu = document.querySelector("#courseMenu");
  if (!menu) return;
  const rows = COURSES.filter((course) => course !== NO_COURSE).map((course) => `
    <div class="course-menu-row">
      <span>${course}</span>
      <div class="course-menu-actions">
        <button type="button" data-course-action="add" data-course="${course}" title="${course}に変更し、現在の履修を残してコース必修を追加">コース変更＋必修追加</button>
        <button type="button" data-course-action="reset" data-course="${course}" title="${course}に変更し、他コース科目を解除">コース変更＋他コース解除</button>
      </div>
    </div>
  `);
  menu.innerHTML = [
    `<button type="button" class="course-menu-unselected" data-course-action="add" data-course="${NO_COURSE}" title="コースを未選択に変更">${NO_COURSE}</button>`,
    ...rows
  ].join("");
}

function signedOffset(value) {
  if (value === null || value === undefined) return "";
  return value > 0 ? `+${value}` : String(value);
}

function bgmCellClass(analysis, base = "") {
  const classes = ["bgm-roll-cell"];
  if (base) classes.push(base);
  if (analysis.radicalNoise || analysis.harmony.kind === "tritone" || analysis.harmony.kind === "diminished" || analysis.harmony.kind === "outside" || analysis.harmony.kind === "prereq" || analysis.harmony.outsideTones.length) {
    classes.push("is-radical");
  } else if (analysis.melodyChanged || analysis.bassChanged || analysis.arrangeNoise) {
    classes.push("is-subtle");
  } else {
    classes.push("is-active");
  }
  return classes.join(" ");
}

function appendBgmRollCell(grid, text, className, title = "") {
  const cell = document.createElement("div");
  cell.className = className;
  cell.textContent = text;
  if (title) cell.title = title;
  grid.appendChild(cell);
}

function appendBgmRollRow(grid, label, cells) {
  appendBgmRollCell(grid, label, "bgm-roll-label");
  cells.forEach((cell) => appendBgmRollCell(grid, cell.text, cell.className, cell.title));
}

function renderBgmRoll() {
  const panel = document.querySelector("#bgmRollPanel");
  const grid = document.querySelector("#bgmRollGrid");
  const toggle = document.querySelector("#bgmRollToggle");
  if (!panel || !grid) return;
  panel.hidden = !state.showBgmRoll;
  if (toggle) toggle.checked = state.showBgmRoll;
  if (!state.showBgmRoll) {
    grid.innerHTML = "";
    return;
  }
  const profile = currentArcadeBgmProfile();
  const arrangement = bgmArrangementState();
  const analyses = Array.from({ length: 16 }, (_, step) => bgmStepAnalysis(profile, arrangement, step));
  document.querySelector("#bgmRollCourse").textContent = state.course;
  document.querySelector("#bgmRollTempo").textContent = `${profile.bpm || 120} BPM`;
  document.querySelector("#bgmRollArrange").textContent = `履修 ${arrangement.count} / 前提 ${arrangement.missingPrereqs} / 欠損 ${arrangement.missingRequired} / 変化 ${arrangement.mutationStepCount}箇所`;
  document.querySelector("#bgmRollRadical").textContent = `外れ値 ${arrangement.missingRequired}`;
  grid.innerHTML = "";
  appendBgmRollCell(grid, "", "bgm-roll-label");
  analyses.forEach((_, index) => appendBgmRollCell(grid, String(index + 1), "bgm-roll-step"));
  appendBgmRollRow(grid, "旋律", analyses.map((analysis) => ({
    text: signedOffset(analysis.melodyOffset),
    className: analysis.melodyOffset === null
      ? "bgm-roll-cell is-empty"
      : bgmCellClass(analysis, "bgm-roll-melody"),
    title: analysis.melodyChanged ? "旋律を調整" : "旋律"
  })));
  appendBgmRollRow(grid, "低音", analyses.map((analysis) => ({
    text: signedOffset(analysis.bassOffset),
    className: analysis.bassOffset === null || analysis.bassOffset === undefined
      ? "bgm-roll-cell is-empty"
      : bgmCellClass(analysis, "bgm-roll-bass"),
    title: analysis.bassChanged ? "ベースを調整" : "ベース"
  })));
  appendBgmRollRow(grid, "和音", analyses.map((analysis) => ({
    text: analysis.chordHit ? analysis.harmony.label : "",
    className: analysis.chordHit ? bgmCellClass(analysis, "bgm-roll-chord") : "bgm-roll-cell is-empty",
    title: analysis.harmony.kind === "base" ? "通常和音" : `専用ハーモニー: ${analysis.harmony.label}`
  })));
  appendBgmRollRow(grid, "律動", analyses.map((analysis) => {
    const hits = [
      analysis.kick ? "K" : "",
      analysis.snare ? "S" : "",
      analysis.hat ? "H" : "",
      analysis.arrangeNoise ? "+" : "",
      analysis.radicalNoise ? "!" : ""
    ].filter(Boolean).join("");
    return {
      text: hits,
      className: hits ? bgmCellClass(analysis, "bgm-roll-rhythm") : "bgm-roll-cell is-empty",
      title: analysis.radicalNoise ? "外れ値リズム" : analysis.arrangeNoise ? "追加リズム" : "リズム"
    };
  }));
  appendBgmRollRow(grid, "外音", analyses.map((analysis) => ({
    text: analysis.harmony.outsideTones.length ? analysis.harmony.outsideTones.map(signedOffset).join("/") : "",
    className: analysis.harmony.outsideTones.length ? "bgm-roll-cell is-radical" : "bgm-roll-cell is-empty",
    title: analysis.harmony.outsideTones.length ? "スケール外アクセント" : ""
  })));
}

function setMeter(id, value, target) {
  setMeterSegments(id, [{ label: "進捗", value, className: "meter-segment-default" }], target);
}

function setMeterSegments(id, segments, target) {
  const meter = document.querySelector(`#${id}`);
  if (!meter) return;
  meter.className = "meter-fill";
  meter.innerHTML = "";
  const cappedTotal = Math.max(0, Math.min(target, segments.reduce((total, segment) => total + Math.max(0, segment.value), 0)));
  const visibleSegments = [];
  let remaining = cappedTotal;
  segments.forEach((segment) => {
    const value = Math.max(0, Math.min(segment.value, remaining));
    remaining -= value;
    if (value <= 0) return;
    visibleSegments.push({ ...segment, value });
  });
  visibleSegments.forEach((segment) => {
    const part = document.createElement("span");
    part.className = `meter-segment ${segment.className || "meter-segment-default"}`;
    part.style.width = `${(segment.value / target) * 100}%`;
    part.title = `${segment.label} ${formatCredits(segment.value)}単位`;
    meter.appendChild(part);
  });
}

function formatCredits(value) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function professionalBreakdownDetail(stats) {
  const breakdown = stats.professionalSubjectByCourse;
  const parts = [
    ["共通", breakdown.common],
    ["情報", breakdown.情報システム],
    ["映像", breakdown.映像メディア],
    ["音響", breakdown.サウンド制作],
    ["デザイン", breakdown.メディアデザイン]
  ]
    .filter(([, value]) => value > 0)
    .map(([label, value]) => `${label} ${formatCredits(value)}`);
  const detail = parts.length ? parts.join(" / ") : "未登録";
  return `専門科目計 ${formatCredits(stats.professionalSubjectTotal)}単位: ${detail}`;
}

function renderSummary(stats) {
  document.querySelector("#totalCredits").textContent = `${stats.total} / 124`;
  document.querySelector("#totalDetail").textContent = `要件外 ${stats.requirementOutside}単位 / 履修計 ${stats.attemptedTotal}単位`;
  document.querySelector("#basicCredits").textContent = `${stats.basic} / 36`;
  document.querySelector("#professionalCredits").textContent = `${stats.professional} / 36`;
  document.querySelector("#professionalDetail").textContent = professionalBreakdownDetail(stats);
  document.querySelector("#otherCredits").textContent = `${stats.other} / 52`;
  setMeterSegments("totalMeter", [
    { label: "基礎教育", value: stats.basic, className: "meter-segment-basic" },
    { label: "専門教育", value: stats.professional, className: "meter-segment-professional" },
    { label: "その他", value: stats.other, className: "meter-segment-other" }
  ], 124);
  setMeterSegments("basicMeter", [
    { label: "基礎教育必修", value: stats.basicRequiredCredits, className: "meter-segment-basic-required" },
    { label: "基礎教育選択", value: stats.basicElectiveCredits, className: "meter-segment-basic-elective" }
  ], 36);
  setMeterSegments("professionalMeter", [
    { label: "コース共通", value: stats.professionalSubjectByCourse.common, className: "meter-segment-common" },
    { label: "情報システム", value: stats.professionalSubjectByCourse.情報システム, className: "meter-segment-system" },
    { label: "映像メディア", value: stats.professionalSubjectByCourse.映像メディア, className: "meter-segment-movie" },
    { label: "サウンド制作", value: stats.professionalSubjectByCourse.サウンド制作, className: "meter-segment-sound" },
    { label: "メディアデザイン", value: stats.professionalSubjectByCourse.メディアデザイン, className: "meter-segment-design" }
  ], Math.max(36, stats.professionalSubjectTotal));
  setMeter("otherMeter", stats.other, 52);
}

function requirement(title, ok, detail) {
  return `<article class="requirement ${ok ? "ok" : "missing"}"><strong><span>${title}</span><span class="status">${ok ? "達成" : "未達"}</span></strong><p>${annotateRequirementTerms(detail)}</p></article>`;
}

function infoRequirement(title, detail) {
  return `<article class="requirement info"><strong><span>${title}</span><span class="status">情報</span></strong><p>${annotateRequirementTerms(detail)}</p></article>`;
}

const requirementTermTitles = {
  "要件外": "卒業要件124単位や各内訳要件に算入されない単位です。",
  "振替": "基礎教育選択の超過分のうち、その他の卒業要件へ回して数える単位です。",
  "基礎振替": "基礎教育選択の超過分から、その他の卒業要件52単位へ算入した単位です。",
  "他学科": "他学科履修として卒業要件に算入した単位です。",
  "単位認定": "資格取得などにより認定された単位です。",
  "その他認定": "手入力で加えた認定単位です。主に他大学科目など、個別に認定された単位を想定しています。",
  "基礎選択超過": "基礎教育選択14単位を超え、振替上限を超えたため要件外になった単位です。",
  "他学科超過": "他学科履修12単位の上限を超えたため要件外になった単位です。"
};

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function annotateRequirementTerms(text) {
  const terms = Object.keys(requirementTermTitles).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "g");
  return text.replace(pattern, (term) => `<span title="${requirementTermTitles[term]}">${term}</span>`);
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
    requirement("その他", stats.other >= 52, `${stats.other}単位 / 52単位以上、専門選択 ${stats.specialized}単位、単位認定 ${stats.qualification}単位、基礎振替 ${stats.basicElectiveTransfer}単位、他学科 ${stats.otherDeptCounted}単位、その他認定 ${stats.manualOther}単位`),
    infoRequirement("要件外内訳", `教職課程科目 ${stats.teacher}単位、基礎選択超過 ${stats.basicElectiveOutside}単位、他学科超過 ${stats.otherDeptOutside}単位`),
    requirement("3年次進級", promotion.ok, `${promotion.credits}単位 / 50単位、GPA条件 ${promotion.gpaOk ? "達成" : "未達"}`)
  ];
  if (state.teacher) {
    html.push(requirement("教職必修", teacherMissing.length === 0, teacherMissing.length ? `${teacherMissing.length}科目が未配置` : "対象科目を配置済み"));
  }
  document.querySelector("#requirementsList").innerHTML = html.join("");
}

function applyCourseSelection(nextCourse, mode, source) {
  cancelPendingPlanClear();
  const beforePlan = snapshotPlanned();
  const isResetAction = mode === "reset";
  state.course = nextCourse;
  if (isResetAction) {
    [...state.planned.keys()].forEach((id) => {
      const course = allCourses.find((item) => item.id === id);
      const removeCourseRequired = course?.category === "courseRequired" && course.course !== nextCourse;
      const removeSpecializedElective = course?.category === "specializedElective" && !course.qualificationEligible;
      if (removeCourseRequired || removeSpecializedElective) state.planned.delete(id);
    });
  }
  if (nextCourse !== NO_COURSE) {
    allCourses
      .filter((course) => course.category === "courseRequired" && course.course === nextCourse)
      .forEach((course) => state.planned.set(course.id, openingTermForCourse(course)));
  }
  state.courseMenuOpen = false;
  queuePlanTransition(beforePlan, snapshotPlanned(), { baseDelay: 0, step: 20, cellStep: 50 });
  triggerArcadeFeedback("switch", source);
  syncArcadeAudio(true);
  render();
}

function renderAlerts(stats) {
  const alerts = [];
  const prereqProblems = validatePrereqs();
  const caps = capProblems();
  if (state.teacherNotice) {
    alerts.push(["info", state.teacherNotice]);
  }
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
  renderBgmRoll();
  renderSummary(stats);
  renderRequirements(stats);
  renderAlerts(stats);
  renderTree();
  renderCourseMenu();
  renderViewMode();
  requestAnimationFrame(scheduleQueuedNodeFeedback);
}

function init() {
  document.querySelector("#courseMenuToggle").addEventListener("click", (event) => {
    state.courseMenuOpen = !state.courseMenuOpen;
    if (state.courseMenuOpen) {
      state.gpaMenuOpen = false;
      state.effectsOpen = false;
    }
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#courseMenu").addEventListener("click", (event) => {
    const button = event.target.closest("[data-course-action]");
    if (!button) return;
    applyCourseSelection(button.dataset.course, button.dataset.courseAction, button);
  });
  document.querySelector("#effectsToggle").addEventListener("click", (event) => {
    state.effectsOpen = !state.effectsOpen;
    if (state.effectsOpen) {
      state.courseMenuOpen = false;
      state.gpaMenuOpen = false;
    }
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#gpaMenuToggle").addEventListener("click", (event) => {
    state.gpaMenuOpen = !state.gpaMenuOpen;
    if (state.gpaMenuOpen) {
      state.courseMenuOpen = false;
      state.effectsOpen = false;
    }
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });

  document.querySelector("#teacherToggle").addEventListener("change", (event) => {
    cancelPendingPlanClear();
    state.teacher = event.target.checked;
    if (state.teacher) {
      const added = addTeacherPlanCourses();
      state.teacherNotice = `教職課程をONにしました。教職課程科目と教職必修指定科目を履修状態にしました（新規追加 ${added}科目）。`;
    } else {
      const removed = removeTeacherPlanCourses();
      state.teacherNotice = `教職課程をOFFにしました。教職課程科目と自動追加した教職必修指定科目を履修計画から外しました（削除 ${removed}科目）。`;
    }
    state.openCourseId = null;
    state.openTreeNodeId = null;
    resetCatalogFilters();
    triggerArcadeFeedback(state.teacher ? "boost" : "switch", event.currentTarget);
    syncArcadeAudio(true);
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
  document.querySelectorAll(".year-filter, .term-filter, .category-filter").forEach((input) => {
    input.addEventListener("change", handleFilterChange);
  });
  document.querySelector("#filterToggle").addEventListener("click", () => {
    state.filtersOpen = !state.filtersOpen;
    triggerArcadeFeedback("switch", document.querySelector("#filterToggle"));
    render();
  });
  document.querySelector("#viewModeToggle").addEventListener("change", (event) => {
    if (event.target.checked) {
      state.viewMode = "tree";
      state.openCourseId = null;
      startTreeReveal();
    } else {
      state.viewMode = "list";
      state.openTreeNodeId = null;
    }
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#treeCodeToggle").addEventListener("change", (event) => {
    state.showTreeCodes = event.target.checked;
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#treeMetaToggle").addEventListener("change", (event) => {
    state.showTreeMeta = event.target.checked;
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#fxToggle").addEventListener("change", (event) => {
    state.soundFx = event.target.checked;
    if (state.soundFx) triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  document.querySelector("#bgmToggle").addEventListener("change", (event) => {
    state.soundBgm = event.target.checked;
    triggerArcadeFeedback(state.soundBgm ? "boost" : "remove", event.currentTarget);
    syncArcadeAudio(true);
    render();
  });
  document.querySelector("#bgmRollToggle").addEventListener("change", (event) => {
    state.showBgmRoll = event.target.checked;
    triggerArcadeFeedback("switch", event.currentTarget);
    render();
  });
  window.hctAutoFillButton = handleAutoFillButton;
  window.hctClearButton = handleClearButton;
  bindImmediateButton("#autoFillButton", "autoFillButton", () => autoFill());
  bindImmediateButton("#clearButton", "clearButton", clearPlan);
  document.addEventListener("pointerdown", syncArcadeAudio, { once: true, capture: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopArcadeBgm();
    } else {
      syncArcadeAudio();
    }
  });
  window.addEventListener("resize", () => {
    if (state.viewMode !== "tree") return;
    requestAnimationFrame(drawTreeEdges);
    requestAnimationFrame(updateTreeMenuPlacement);
  });
  syncArcadeToggleLabels();
  autoFill({ silent: true });
}

init();
