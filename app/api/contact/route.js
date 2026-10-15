const SERVICES = [
  "Brand & Cultural Strategy",
  "Video Production",
  "Social Content Creation",
  "Motion Design & AI Content Creation",
];
const TYPES = ["contact", "consultation"];

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (body.website) return Response.json({ ok: true });

  const type = TYPES.includes(body.type) ? body.type : "contact";
  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const company = clean(body.company, 150);
  const message = clean(body.message, 4000);
  const date = clean(body.date, 20);
  const time = clean(body.time, 40);
  const services = Array.isArray(body.services)
    ? body.services.filter((s) => SERVICES.includes(s))
    : [];

  if (!name) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!message) return Response.json({ error: "Please tell us a bit about your project." }, { status: 400 });

  const subject =
    type === "consultation"
      ? `Consultation request from ${name}`
      : `New enquiry from ${name}`;

  const rows = [
    ["Type", type === "consultation" ? "Book a consultation" : "General enquiry"],
    ["Name", name],
    ["Email", email],
    ["Company", company || "-"],
    ["Services", services.join(", ") || "-"],
    ...(type === "consultation" ? [["Preferred date", date || "-"], ["Preferred time", time || "-"]] : []),
    ["Message", message],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    if (process.env.NODE_ENV === "development") {
      console.log(`\n[contact form] ${subject}\n${text}\n`);
      return Response.json({ ok: true });
    }
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return Response.json({ error: "Messages can't be sent right now. Please email us directly." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Inevita Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: email provider error", res.status, await res.text());
    return Response.json({ error: "Something went wrong sending your message. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
