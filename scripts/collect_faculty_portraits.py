"""Collect timetable instructors' portraits from the university faculty pages."""

from __future__ import annotations

import argparse
import html
import re
import unicodedata
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path
from urllib.parse import quote, urlparse


ROOT = Path(__file__).resolve().parents[1]
TIMETABLE = ROOT / "docs/2026-course-instructors.md"
OUTPUT = ROOT / "docs/2026-faculty-portraits.md"
IMAGE_DIR = ROOT / "assets/faculty"
BASE = "https://www.nagoya-bunri.ac.jp"
USER_AGENT = "HyperCurriculumTree faculty source review/1.0"
INDEX_ENTRY = re.compile(
    r'<a href="(https://www\.nagoya-bunri\.ac\.jp/faculty/[^\"]+/)" '
    r'class="listindex__item__link faculty__index__item">.*?'
    r'<h3 class="faculty__index__item__name">(.*?)</h3>',
    re.S,
)
PROFILE_NAME = re.compile(r'<h1 class="faculty__article__header__name">(.*?)</h1>', re.S)
PORTRAIT = re.compile(
    r'<div class="faculty__article__header__portrait">\s*<img src="([^"]+)"', re.S
)
PERSON_NAME = re.compile(r"([^\s（）/、]+)\s+([^\s（）/、]+)")


def normalized_name(name: str) -> str:
    return unicodedata.normalize("NFKC", re.sub(r"\s+", "", html.unescape(name)))


def fetch(url: str) -> bytes:
    request = urllib.request.Request(quote(url, safe=":/%?&=+#"), headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read()


def timetable_instructors() -> dict[str, str]:
    instructors: dict[str, str] = {}
    for line in TIMETABLE.read_text(encoding="utf-8").splitlines():
        if not line.startswith("| ") or line.startswith(("| 科目名", "| ---")):
            continue
        columns = [cell.strip() for cell in line.strip("|").split("|")]
        for cell in columns[1:]:
            for match in PERSON_NAME.finditer(cell):
                name = f"{match.group(1)} {match.group(2)}"
                if match.group(2) != "他":
                    instructors.setdefault(normalized_name(name), name)
    return instructors


def faculty_profiles() -> dict[str, tuple[str, str]]:
    profiles: dict[str, tuple[str, str]] = {}
    page_number = 1
    while True:
        url = f"{BASE}/faculty/" if page_number == 1 else f"{BASE}/faculty/page/{page_number}/"
        page = fetch(url).decode("utf-8")
        entries = INDEX_ENTRY.findall(page)
        if not entries:
            break
        for profile_url, name_html in entries:
            name = re.sub(r"<[^>]+>", "", html.unescape(name_html)).strip()
            profiles[normalized_name(name)] = (name, profile_url)
        if len(entries) < 25:
            break
        page_number += 1
    return profiles


def portrait_for(profile_name: str, profile_url: str, download: bool) -> tuple[str | None, str | None]:
    page = fetch(profile_url).decode("utf-8")
    heading = PROFILE_NAME.search(page)
    if not heading or normalized_name(heading.group(1)) != normalized_name(profile_name):
        raise ValueError(f"Profile name mismatch: {profile_url}")
    match = PORTRAIT.search(page)
    if not match:
        return None, None
    image_url = html.unescape(match.group(1))
    if urlparse(image_url).hostname != "www.nagoya-bunri.ac.jp":
        raise ValueError(f"Unexpected image host: {image_url}")
    suffix = Path(urlparse(image_url).path).suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError(f"Unexpected image type: {image_url}")
    local_path = IMAGE_DIR / f"{normalized_name(profile_name)}{suffix}"
    if download:
        if not local_path.exists():
            data = fetch(image_url)
            if len(data) < 1000 or not (
                data.startswith(b"\xff\xd8\xff")
                or data.startswith(b"\x89PNG\r\n\x1a\n")
                or data.startswith(b"RIFF") and data[8:12] == b"WEBP"
            ):
                raise ValueError(f"Invalid image data: {image_url}")
            IMAGE_DIR.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(data)
    return image_url, str(local_path.relative_to(ROOT))


def build_list(download: bool) -> None:
    instructors = timetable_instructors()
    profiles = faculty_profiles()
    matched = sorted(set(instructors) & set(profiles), key=lambda key: instructors[key])
    unmatched = sorted(set(instructors) - set(profiles), key=lambda key: instructors[key])
    print(f"Timetable instructors: {len(instructors)}")
    print(f"Faculty profiles: {len(profiles)}")
    print(f"Exact name matches: {len(matched)}")
    print(f"No exact match: {len(unmatched)}")
    print("Unmatched:", ", ".join(instructors[key] for key in unmatched))
    if not download:
        return

    portraits: dict[str, tuple[str | None, str | None]] = {}
    failures: dict[str, str] = {}
    with ThreadPoolExecutor(max_workers=4) as executor:
        pending = {
            executor.submit(portrait_for, *profiles[key], True): key
            for key in matched
        }
        for future in as_completed(pending):
            key = pending[future]
            try:
                portraits[key] = future.result()
            except Exception as exc:
                failures[key] = str(exc)

    lines = [
        "# 2026年度 担当教員の顔写真一覧",
        "",
        "[2026年度科目別担当者一覧](2026-course-instructors.md)の担当者と、"
        f"[名古屋文理大学 教育スタッフ紹介]({BASE}/faculty/)を氏名の完全一致で照合した。",
        "",
        "写真は大学公式サイトのプロフィールに掲載されている画像を直接リンク表示する。"
        "確認用にローカルにも取得したが、写真ファイルは公開リポジトリに含めない。"
        "氏名が一致しない担当者には写真を割り当てていない。",
        "時間割の「他」や姓のみの記載からは新たな人物を推定していない。",
        f"取得日: {date.today().isoformat()}。公開利用時は大学公式サイトの著作権表示を確認する。",
        "",
        f"- 時間割から抽出した氏名: {len(instructors)}名",
        f"- プロフィールと一致: {len(matched)}名",
        f"- 写真を確認: {sum(bool(portraits.get(key, (None, None))[1]) for key in matched)}名",
        f"- プロフィールに写真なし: {sum(key in portraits and not portraits[key][1] for key in matched)}名",
        f"- プロフィールと一致せず: {len(unmatched)}名",
        "",
        "## 写真を確認できた教員",
        "",
        "| 教員 | 写真 | プロフィール | 画像原本 |",
        "| --- | --- | --- | --- |",
    ]
    for key in matched:
        name, profile_url = profiles[key]
        image_url, local_path = portraits.get(key, (None, None))
        if local_path and image_url:
            lines.append(
                f"| {name} | ![{name}]({quote(image_url, safe=':/%?&=+#')}) | "
                f"[教員紹介]({profile_url}) | [画像]({quote(image_url, safe=':/%?&=+#')}) |"
            )
    lines += ["", "## 写真を取得できなかった担当者", ""]
    for key in unmatched:
        lines.append(f"- {instructors[key]}: 教員紹介一覧に同名のプロフィールなし")
    for key in matched:
        if key in failures:
            lines.append(f"- {instructors[key]}: 取得失敗（{failures[key]}）")
        elif not portraits.get(key, (None, None))[1]:
            lines.append(f"- {instructors[key]}: プロフィールに顔写真の掲載なし")
    lines.append("")
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Saved: {sum(bool(portraits.get(key, (None, None))[1]) for key in matched)}")
    print(f"Failures: {len(failures)}")
    for key, error in failures.items():
        print(instructors[key], error)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--download", action="store_true")
    build_list(parser.parse_args().download)
