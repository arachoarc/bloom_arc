/**
 * 굿즈 출시 알림 신청 → 구글 스프레드시트 저장 (Google Apps Script 웹 앱)
 *
 * 설치 방법은 google-apps-script/README.md 참고.
 * 스크립트 속성(Project Settings → Script properties)에 SECRET 값을 넣어 두고,
 * Next.js 의 NOTIFY_SHEET_SECRET 과 같은 값을 쓴다.
 */

const SHEET_NAME = "notify";
const HEADER = ["신청 시각", "이메일", "언어", "알림 종류"];

function doPost(e) {
  const out = (obj) => ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);

  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return out({ ok: false, error: "bad_json" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || body.secret !== secret) return out({ ok: false, error: "unauthorized" });

  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return out({ ok: false, error: "invalid_email" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADER);
      sheet.setFrozenRows(1);
    }

    // 이미 신청한 이메일이면 다시 쌓지 않는다.
    const last = sheet.getLastRow();
    if (last > 1) {
      const emails = sheet.getRange(2, 2, last - 1, 1).getValues();
      if (emails.some((r) => r[0] === email)) return out({ ok: true, duplicate: true });
    }

    sheet.appendRow([new Date(), email, String(body.lang || ""), String(body.item || "goods")]);
    return out({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
