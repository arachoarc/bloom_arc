const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** 알림 신청 이메일을 구글 Apps Script 웹 앱으로 넘겨 스프레드시트에 쌓는다. */
export async function POST(request: Request) {
  const url = process.env.NOTIFY_SHEET_URL;
  const secret = process.env.NOTIFY_SHEET_SECRET;
  if (!url || !secret) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let body: { email?: unknown; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  const lang = body.lang === "en" ? "en" : "ko";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, email, lang, item: "goods" }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = (await res.json()) as { ok?: boolean };
    if (!res.ok || !data.ok) throw new Error("sheet_rejected");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "sheet_failed" }, { status: 502 });
  }
}
