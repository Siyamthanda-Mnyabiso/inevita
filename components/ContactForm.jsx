"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SERVICES = [
  "Brand & Cultural Strategy",
  "Video Production",
  "Social Content Creation",
  "Motion Design & AI Content Creation",
];
const TIMES = ["Morning (8:00 to 12:00)", "Afternoon (12:00 to 17:00)", "Evening (17:00 to 19:00)"];

const field =
  "w-full rounded-2xl border border-foreground/15 bg-white px-5 py-4 text-base outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground";
const label = "mb-2 block text-sm font-medium";

export default function ContactForm() {
  const [type, setType] = useState("consultation");
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  const toggle = (s) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd), type, services }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-lime p-8 text-[#121212] md:p-12"
      >
        <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">Thank you.</h3>
        <p className="mt-4 max-w-md text-lg">
          {type === "consultation"
            ? "We've received your consultation request and will confirm a time by email."
            : "We've received your message and will get back to you soon."}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid grid-cols-2 gap-1 rounded-full bg-foreground/[0.06] p-1" role="tablist">
        {[
          ["consultation", "Book a consultation"],
          ["contact", "Contact us"],
        ].map(([v, l]) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={type === v}
            onClick={() => setType(v)}
            className={`rounded-full px-3 py-3 text-sm font-medium transition-colors ${
              type === v ? "bg-lime text-[#121212]" : "text-foreground/60"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={label}>Company <span className="text-foreground/40">(optional)</span></label>
        <input id="company" name="company" maxLength={150} autoComplete="organization" className={field} placeholder="Company or brand" />
      </div>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const on = services.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  on ? "border-lime bg-lime text-[#121212]" : "border-foreground/15 hover:border-foreground"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {type === "consultation" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-1 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className={label}>Preferred date</label>
                <input id="date" name="date" type="date" min={minDate} className={field} />
              </div>
              <div>
                <label htmlFor="time" className={label}>Preferred time</label>
                <select id="time" name="time" defaultValue="" className={field}>
                  <option value="">No preference</option>
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label htmlFor="message" className={label}>
          {type === "consultation" ? "What would you like to talk about?" : "Message"}
        </label>
        <textarea id="message" name="message" required rows={5} maxLength={4000} className={`${field} resize-y`} placeholder="Tell us about your brand and what you have in mind" />
      </div>

      {/* Honeypot, hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor
        className="w-full rounded-full bg-foreground px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-lime hover:text-[#121212] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : type === "consultation" ? "Request consultation" : "Send message"}
      </button>
    </form>
  );
}
