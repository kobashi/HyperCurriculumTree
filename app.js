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
  ["SE-029", "メディア文化論", 2, 3, "前"],
  ["SE-030", "デジタルファブリケーション", 2, 3, "前"],
  ["SE-031", "インターンシップ", 2, 1, "前"],
  ["SE-032", "情報メディア特別演習Ⅰ", 2, 3, "前"],
  ["SE-033", "情報メディア特別演習Ⅱ", 2, 3, "後"],
  ["SE-034", "アート&デザイン演習", 2, 4, "前"],
  ["SE-035", "音響制作演習", 2, 3, "前"]
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
  ["common-media-theory", "情報メディア論", "professional", "コース共通", "総合・その他", "1前", "初級", "1105", false],
  ["common-ethics", "情報社会の倫理と職業", "professional", "コース共通", "総合・その他", "1後", "中級", "2106", true],
  ["common-it-management", "ＩＴマネジメント", "professional", "コース共通", "情報資格系列", "1後", "初級", "2105", false],
  ["common-it-passport", "ITパスポート", "professional", "コース共通", "情報資格系列", "1後", "初級", "9101", false],
  ["common-it-strategy", "ＩＴストラテジ", "professional", "コース共通", "情報資格系列", "2前", "初級", "3105", false],
  ["common-software-basic", "ソフトウェア基礎", "professional", "コース共通", "情報資格系列", "2前", "中級", "3106", true],
  ["common-fe", "基本情報技術", "professional", "コース共通", "情報資格系列", "2後", "中級", "9102", false],
  ["common-info-management", "情報管理", "professional", "コース共通", "情報資格系列", "2前", "中級", "3109", true],
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
  ["sound-music-theory", "音楽理論", "professional", "サウンド制作コース", "楽曲制作系列", "2前", "初中級", "3302", false],
  ["sound-midi-2", "ＭＩＤＩ制作演習Ⅱ", "professional", "サウンド制作コース", "楽曲制作系列", "2前", "初中級", "3303", false],
  ["sound-creation", "サウンドクリエーション", "professional", "サウンド制作コース", "楽曲制作系列", "2後", "中級", "4304", false],

  ["design-graphic", "グラフィックデザイン", "professional", "メディアデザインコース", "メディアデザイン系列", "1後", "初級", "2401", false],
  ["design-exercise-1", "メディアデザイン演習Ⅰ", "professional", "メディアデザインコース", "メディアデザイン系列", "2前", "初級", "3401", false],
  ["design-color", "色彩学", "professional", "メディアデザインコース", "メディアデザイン系列", "2前", "初中級", "3204", false],
  ["design-exercise-2", "メディアデザイン演習Ⅱ", "professional", "メディアデザインコース", "メディアデザイン系列", "2後", "初級", "4401", false],
  ["design-multimedia", "マルチメディア", "professional", "メディアデザインコース", "メディアデザイン系列", "3前", "中級", "5204", true],
  ["design-living", "暮しとデザイン", "professional", "メディアデザインコース", "メディアデザイン系列", "3後", "上級", "6401", false],
  ["design-cg-basic", "ＣＧ基礎", "professional", "メディアデザインコース", "プロダクトデザイン系列", "2前", "中級", "3203", false],
  ["design-cad", "ＣＡＤ", "professional", "メディアデザインコース", "プロダクトデザイン系列", "2前", "中級", "3402", false],
  ["design-digital-fabrication", "デジタルファブリケーション", "professional", "メディアデザインコース", "プロダクトデザイン系列", "3前", "上級", "5401", false],
  ["design-web-programming", "Ｗｅｂプログラミング", "professional", "メディアデザインコース", "Webデザイン系列", "2前", "中級", "3108", false],
  ["design-web-design", "Ｗｅｂデザイン", "professional", "メディアデザインコース", "Webデザイン系列", "2後", "中級", "4402", true],
  ["design-web-analysis", "Ｗｅｂ解析", "professional", "メディアデザインコース", "Webデザイン系列", "3前", "上級", "5402", false],
  ["design-media-culture", "メディア文化論", "professional", "メディアデザインコース", "Webデザイン系列", "3前", "中級", "5403", false],
  ["design-documentary", "ドキュメンタリー演習", "professional", "メディアデザインコース", "Webデザイン系列", "3後", "上級", "6202", false],
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

const officialTreeEdges = [
  ["common-programming-intro", "common-program-exercise-1"],
  ["common-program-exercise-1", "common-data-science"],
  ["common-info-processing", "common-data-science"],
  ["common-data-science", "common-ai"],
  ["common-media-theory", "common-ethics"],
  ["common-it-management", "common-it-strategy"],
  ["common-it-strategy", "common-fe"],
  ["common-it-strategy", "common-software-basic"],
  ["common-it-strategy", "common-info-management"],
  ["common-special-seminar-1", "common-special-seminar-2"],
  ["common-special-seminar-2", "common-art-design"],
  ["common-seminar-1", "common-seminar-2"],
  ["common-seminar-2", "common-graduation-1"],
  ["common-graduation-1", "common-graduation-2"],
  ["system-program-2", "system-program-3"],
  ["system-algorithm", "system-game-programming"],
  ["system-game-programming", "system-program-3"],
  ["system-program-3", "system-program-4"],
  ["system-program-3", "system-sound-programming"],
  ["system-program-4", "system-knowledge"],
  ["system-network-1", "system-network-2"],
  ["system-network-2", "system-mobile"],
  ["system-intro", "system-basic-theory"],
  ["system-basic-theory", "system-media-tech"],
  ["system-media-tech", "system-development"],
  ["system-development", "system-database"],
  ["movie-production-1", "movie-production-2"],
  ["movie-production-2", "movie-processing"],
  ["movie-processing", "movie-media-art"],
  ["movie-processing", "movie-documentary"],
  ["movie-processing", "movie-broadcast"],
  ["movie-digital-art", "movie-animation"],
  ["movie-animation", "movie-cg-basic"],
  ["movie-cg-basic", "movie-cg-exercise"],
  ["sound-digital-intro", "sound-practice"],
  ["sound-practice", "sound-acoustics"],
  ["sound-acoustics", "sound-production"],
  ["sound-ear-training", "sound-production"],
  ["sound-production", "sound-recording"],
  ["sound-midi-1", "sound-music-theory"],
  ["sound-midi-1", "sound-midi-2"],
  ["sound-music-theory", "sound-creation"],
  ["sound-midi-2", "sound-creation"],
  ["design-graphic", "design-exercise-1"],
  ["design-exercise-1", "design-exercise-2"],
  ["design-exercise-2", "design-multimedia"],
  ["design-multimedia", "design-living"],
  ["design-cg-basic", "design-digital-fabrication"],
  ["design-cad", "design-digital-fabrication"],
  ["design-web-programming", "design-web-design"],
  ["design-web-design", "design-web-analysis"],
  ["design-media-culture", "design-documentary"],
  ["teacher-principles", "teacher-curriculum"],
  ["teacher-role", "teacher-curriculum"],
  ["teacher-curriculum", "teacher-psychology"],
  ["teacher-psychology", "teacher-counseling"],
  ["teacher-counseling", "teacher-info-method-1"],
  ["teacher-info-method-1", "teacher-info-method-2"],
  ["teacher-info-method-2", "teacher-practice"],
  ["teacher-practice", "teacher-final"]
].map(([from, to]) => ({ from, to }));

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
  viewMode: "list",
  showTreeCodes: false,
  showTreeMeta: false,
  teacherNotice: "",
  openCourseId: null,
  openTreeNodeId: null,
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
  if (courseName === state.course) {
    return candidates.find((course) => course.category === "courseRequired" && course.course === state.course) ||
      candidates.find((course) => course.category === "specializedElective") ||
      candidates[0] ||
      null;
  }
  return candidates.find((course) => course.category === "specializedElective") || candidates[0] || null;
}

function treeSectionForCourse(course) {
  if (course.category === "basicRequired") return "基礎教育必修";
  if (course.category === "basicElective") return "基礎教育選択";
  if (course.category === "commonRequired") return "コース共通";
  if (course.category === "courseRequired") return `${course.course}コース`;
  if (course.category === "specializedElective") return "専門選択";
  if (course.category === "otherDept") return "他学科履修";
  if (course.category === "teacher") return "教職課程に関する科目";
  return categoryLabels[course.category] || "その他";
}

function treeLaneForCourse(course) {
  return categoryLabels[course.category] || "科目";
}

function syntheticTreeNodeForCourse(course) {
  return {
    id: `course-${course.id}`,
    courseId: course.id,
    courseName: course.name,
    displayName: course.name,
    page: course.category === "teacher" ? "teacher" : "catalog",
    section: treeSectionForCourse(course),
    lane: treeLaneForCourse(course),
    term: openingTermForCourse(course),
    level: "",
    courseNumber: course.id,
    teacherRequired: course.teacherRequired
  };
}

const treeShortNameMap = new Map([
  ["プラクティカル・イングリッシュⅠ", "プラクティカル英語Ⅰ"],
  ["プラクティカル・イングリッシュⅡ", "プラクティカル英語Ⅱ"],
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
  if (length >= 16) return 8.6;
  if (length >= 13) return 9.2;
  return 10.5;
}

const treeSectionOrder = [
  "基礎教育必修",
  "基礎教育選択",
  "コース共通",
  "情報システムコース",
  "映像メディアコース",
  "サウンド制作コース",
  "メディアデザインコース",
  "専門選択",
  "他学科履修",
  "教職課程に関する科目"
];

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
  }
}

function visibleCourses() {
  const filter = document.querySelector("#categoryFilter").value;
  const years = new Set([...document.querySelectorAll(".year-filter:checked")].map((input) => Number(input.value)));
  const terms = new Set([...document.querySelectorAll(".term-filter:checked")].map((input) => input.value));
  const currentRequired = currentCourseRequiredKeys();
  return allCourses.filter((course) => {
    const retainedTeacherCourse = course.category === "teacher" && !state.teacher && state.planned.has(course.id);
    if (retainedTeacherCourse) return true;
    if (course.category === "courseRequired" && course.course !== state.course) return false;
    if (course.category === "specializedElective" && currentRequired.has(course.key)) return false;
    if (course.category === "teacher" && !state.teacher && !state.planned.has(course.id)) return false;
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
  state.openTreeNodeId = null;
  render();
}

function resetCatalogFilters() {
  const categoryFilter = document.querySelector("#categoryFilter");
  if (categoryFilter) categoryFilter.value = "all";
  document.querySelectorAll(".year-filter, .term-filter").forEach((input) => {
    input.checked = true;
  });
}

function teacherPlanCourses() {
  const preferred = new Map();
  allCourses.filter((course) =>
    (course.category === "teacher" || course.teacherRequired) &&
    (course.category !== "courseRequired" || course.course === state.course)
  ).forEach((course) => {
    const key = course.key;
    const existing = preferred.get(key);
    if (!existing ||
      course.category === "teacher" ||
      (course.category === "courseRequired" && existing.category === "specializedElective")) {
      preferred.set(key, course);
    }
  });
  return [...preferred.values()];
}

function addTeacherPlanCourses() {
  let added = 0;
  teacherPlanCourses().forEach((course) => {
    if (state.planned.has(course.id)) return;
    state.planned.set(course.id, openingTermForCourse(course));
    added += 1;
  });
  return added;
}

function autoFill() {
  state.planned.clear();
  state.openCourseId = null;
  state.openTreeNodeId = null;
  resetCatalogFilters();
  allCourses.forEach((course) => {
    if (course.category === "courseRequired" && course.course !== state.course) return;
    if (course.category === "teacher" && !state.teacher) return;
    if (["basicRequired", "commonRequired", "courseRequired"].includes(course.category)) {
      state.planned.set(course.id, openingTermForCourse(course));
    }
  });
  if (state.teacher) {
    addTeacherPlanCourses();
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

    validatePlannedCourse(course);

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
    select.innerHTML = optionMarkupForCourse(course);
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

function sectionClass(section) {
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
    nodes.push(node);
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
      fromNodes.forEach((fromNode) => {
        toNodes.forEach((toNode) => {
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
  const termLabels = TERMS.map((term) => `<div class="tree-term">${term.label}</div>`).join("");
  const nodes = visibleTreeNodes();
  const connectionCounts = treeConnectionCounts(nodes);
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

  sections.forEach((section) => {
    const sectionNodes = nodes.filter((node) => node.section === section);
    const lanes = [...new Set(sectionNodes.map((node) => node.lane))];
    const block = document.createElement("section");
    block.className = `tree-section tree-section-${sectionClass(section)}`;
    block.innerHTML = `<div class="tree-section-title">${section}</div>`;

    lanes.forEach((lane) => {
      const row = document.createElement("div");
      row.className = "tree-row";
      row.innerHTML = `<div class="tree-lane">${lane}</div>`;
      TERMS.forEach((term) => {
        const cell = document.createElement("div");
        cell.className = "tree-cell";
        sectionNodes
          .filter((node) => node.lane === lane && node.term === term.id)
          .forEach((node) => {
            const course = courseForTreeNode(node);
            if (!course) return;
            const treeName = treeDisplayName(node.displayName);
            validatePlannedCourse(course);
            const disabled = course.category === "teacher" && !state.teacher;
            const counts = connectionCounts.get(node.id) || { incoming: 0, outgoing: 0 };
            const item = document.createElement("article");
            item.className = `tree-node level-${node.level || "none"}${state.planned.has(course.id) ? " is-planned" : ""}${disabled ? " is-disabled" : ""}${counts.outgoing > 1 ? " is-branch" : ""}${counts.incoming > 1 ? " is-merge" : ""}${state.openTreeNodeId === node.id ? " is-open" : ""}${state.showTreeMeta ? " has-meta" : ""}${state.showTreeCodes ? " has-code" : ""}`;
            item.dataset.nodeId = node.id;
            item.dataset.courseId = course.id;
            item.dataset.incoming = counts.incoming;
            item.dataset.outgoing = counts.outgoing;
            item.innerHTML = `
              <button type="button" class="tree-node-button" ${disabled ? "disabled" : ""} aria-expanded="${state.openTreeNodeId === node.id ? "true" : "false"}">
                ${state.showTreeCodes ? `<span class="tree-node-code">${node.courseNumber}</span>` : ""}
                <span class="tree-node-name" style="--tree-name-size:${treeNameFontSize(treeName)}px" title="${node.displayName}">${treeName}</span>
                ${state.showTreeMeta ? `<span class="tree-node-meta">${node.level || categoryLabels[course.category]}${course.teacherRequired || node.teacherRequired ? " / 教" : ""}${state.planned.has(course.id) ? ` / ${plannedButtonLabel(course)}` : ""}</span>` : ""}
              </button>
            `;
            const button = item.querySelector(".tree-node-button");
            button.addEventListener("click", () => {
              state.openTreeNodeId = state.openTreeNodeId === node.id ? null : node.id;
              state.openCourseId = null;
              render();
            });
            if (state.openTreeNodeId === node.id) {
              const menu = document.createElement("div");
              menu.className = "tree-node-menu";
              const select = document.createElement("select");
              select.setAttribute("aria-label", `${course.name}の配置`);
              select.innerHTML = optionMarkupForCourse(course);
              select.value = state.planned.get(course.id) || "none";
              select.addEventListener("change", (event) => setPlanned(course.id, event.target.value));
              const remove = document.createElement("button");
              remove.type = "button";
              remove.className = "remove-button";
              remove.textContent = "×";
              remove.setAttribute("aria-label", `${course.name}を外す`);
              remove.addEventListener("click", () => setPlanned(course.id, "none"));
              menu.append(select, remove);
              item.appendChild(menu);
            }
            cell.appendChild(item);
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
    <marker id="tree-edge-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" class="tree-edge-arrow"></path>
    </marker>
  `;
  svg.appendChild(defs);
  const branchHubs = new Map();
  const mergeHubs = new Map();
  visibleTreeEdges(nodes).forEach((edge) => {
    const from = tree.querySelector(`[data-node-id="${edge.from}"] .tree-node-button`);
    const to = tree.querySelector(`[data-node-id="${edge.to}"] .tree-node-button`);
    if (!from || !to) return;
    const fromCounts = connectionCounts.get(edge.from) || { incoming: 0, outgoing: 0 };
    const toCounts = connectionCounts.get(edge.to) || { incoming: 0, outgoing: 0 };
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const x1 = a.right - treeRect.left + tree.scrollLeft;
    const y1 = a.top + a.height / 2 - treeRect.top + tree.scrollTop;
    const x2 = b.left - treeRect.left + tree.scrollLeft;
    const y2 = b.top + b.height / 2 - treeRect.top + tree.scrollTop;
    const mid = Math.max(x1 + 18, (x1 + x2) / 2);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
    path.setAttribute("class", `tree-edge${fromCounts.outgoing > 1 ? " is-branch-edge" : ""}${toCounts.incoming > 1 ? " is-merge-edge" : ""}`);
    path.setAttribute("marker-end", "url(#tree-edge-arrow)");
    svg.appendChild(path);
    if (fromCounts.outgoing > 1) branchHubs.set(edge.from, { x: x1, y: y1 });
    if (toCounts.incoming > 1) mergeHubs.set(edge.to, { x: x2, y: y2 });
  });
  branchHubs.forEach((point) => {
    const hub = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hub.setAttribute("class", "tree-edge-hub branch");
    hub.setAttribute("cx", point.x);
    hub.setAttribute("cy", point.y);
    hub.setAttribute("r", 4);
    svg.appendChild(hub);
  });
  mergeHubs.forEach((point) => {
    const hub = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hub.setAttribute("class", "tree-edge-hub merge");
    hub.setAttribute("cx", point.x);
    hub.setAttribute("cy", point.y);
    hub.setAttribute("r", 4);
    svg.appendChild(hub);
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
  const treeCodeToggleWrap = document.querySelector("#treeCodeToggleWrap");
  const treeCodeToggle = document.querySelector("#treeCodeToggle");
  const treeMetaToggleWrap = document.querySelector("#treeMetaToggleWrap");
  const treeMetaToggle = document.querySelector("#treeMetaToggle");
  const isTree = state.viewMode === "tree";
  catalog.hidden = isTree;
  tree.hidden = !isTree;
  treeCodeToggleWrap.hidden = !isTree;
  treeCodeToggle.checked = state.showTreeCodes;
  treeMetaToggleWrap.hidden = !isTree;
  treeMetaToggle.checked = state.showTreeMeta;
  workspace.classList.toggle("catalog-tree-mode", isTree);
  document.querySelector("#listModeButton").setAttribute("aria-pressed", String(!isTree));
  document.querySelector("#treeModeButton").setAttribute("aria-pressed", String(isTree));
  if (isTree) {
    drawTreeEdges();
    requestAnimationFrame(updateTreeMenuPlacement);
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
  renderTree();
  renderViewMode();
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
      const added = addTeacherPlanCourses();
      state.teacherNotice = `教職課程をONにしました。教職課程科目と教職必修指定科目を履修状態にしました（新規追加 ${added}科目）。`;
    } else {
      state.teacherNotice = "教職課程をOFFにしました。すでに履修状態にした教職課程科目・教職必修指定科目は外していません。不要な科目は個別に×で外してください。";
    }
    state.openCourseId = null;
    state.openTreeNodeId = null;
    resetCatalogFilters();
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
  document.querySelector("#listModeButton").addEventListener("click", () => {
    state.viewMode = "list";
    state.openTreeNodeId = null;
    render();
  });
  document.querySelector("#treeModeButton").addEventListener("click", () => {
    state.viewMode = "tree";
    state.openCourseId = null;
    render();
  });
  document.querySelector("#treeCodeToggle").addEventListener("change", (event) => {
    state.showTreeCodes = event.target.checked;
    render();
  });
  document.querySelector("#treeMetaToggle").addEventListener("change", (event) => {
    state.showTreeMeta = event.target.checked;
    render();
  });
  document.querySelector("#autoFillButton").addEventListener("click", autoFill);
  document.querySelector("#clearButton").addEventListener("click", () => {
    state.planned.clear();
    state.openCourseId = null;
    state.openTreeNodeId = null;
    render();
  });
  autoFill();
}

init();
