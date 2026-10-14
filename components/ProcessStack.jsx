"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { name: "Listen", line: "Before anything is drawn, we learn the business.", bg: "#ffffff", fg: "#121212" },
  { name: "Shape", line: "One clear idea, then the look and voice to carry it.", bg: "#c2f84f", fg: "#121212" },
  { name: "Build", line: "Design and code in the same room.", bg: "#121212", fg: "#ffffff" },
  { name: "Launch", line: "Out the door, then we keep improving it.", bg: "#f59e0b", fg: "#121212" },
];

function Card({ step, i, n, progress }) {
  const last = i === n - 1;
  const scale = useTransform(progress, [i / n, (i + 1) / n], [1, last ? 1 : 0.92]);

  return (
    <motion.article
      style={{ scale, backgroundColor: step.bg, color: step.fg, top: `calc(5rem + ${i * 1.25}rem)` }}
      className={`sticky flex h-[70vh] min-h-[24rem] origin-top flex-col justify-end rounded-3xl border border-black/10 p-6 md:p-10 ${
        last ? "" : "mb-[18vh]"
      }`}
    >
      <h3 className="text-[clamp(3.5rem,16vw,15rem)] font-semibold leading-[0.85] tracking-tighter">
        {step.name}
      </h3>
      <p className="mt-6 max-w-md text-lg md:text-xl">{step.line}</p>
    </motion.article>
  );
}

export default function ProcessStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <h2 className="mb-10 text-sm font-medium">How we work</h2>
      <div ref={ref}>
        {steps.map((s, i) => (
          <Card key={s.name} step={s} i={i} n={steps.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
