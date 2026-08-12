const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequestBody = {
  email?: unknown;
  practice?: unknown;
  website?: unknown;
  source?: unknown;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return Response.json({ ok: false, message: "Request is too large." }, { status: 413 });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ ok: false, message: "Request could not be read." }, { status: 400 });
  }

  // Honeypot submissions receive a neutral response without touching delivery.
  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const practice = typeof body.practice === "string" ? body.practice.trim() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 80) : "homepage";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json({ ok: false, message: "Enter a valid work email." }, { status: 400 });
  }
  if (practice.length < 2 || practice.length > 120) {
    return Response.json({ ok: false, message: "Enter your practice or organization." }, { status: 400 });
  }

  const endpoint = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (!endpoint) {
    return Response.json(
      { ok: false, message: "Online requests are being configured." },
      { status: 503 },
    );
  }

  let webhook: URL;
  try {
    webhook = new URL(endpoint);
    if (webhook.protocol !== "https:") throw new Error("Webhook must use HTTPS");
  } catch {
    return Response.json(
      { ok: false, message: "Online requests are temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "demo_request",
        email,
        practice,
        source,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Webhook rejected request");
    return Response.json({ ok: true }, { status: 202 });
  } catch {
    return Response.json(
      { ok: false, message: "Request delivery failed. Please try again or email us." },
      { status: 502 },
    );
  }
}
