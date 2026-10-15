"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// After Skiper UI #24 (Tik tik color list): the section color follows the row
// at the centre of the screen, and a preview card can be dragged around.
const services = [
  {
    name: "Brand & Cultural Strategy",
    bg: "#c2f84f",
    fg: "#121212",
    desc: "We help brands define who they are, understand the audiences they serve and identify opportunities to strengthen their relevance and positioning.",
    items: [
      "Brand positioning and identity direction",
      "Brand communication and messaging",
      "Cultural research and audience insights",
      "Creative direction",
      "Campaign strategy and concept development",
    ],
  },
  {
    name: "Video Production",
    bg: "#ffffff",
    fg: "#121212",
    desc: "We transform ideas into compelling visual stories through considered cinematography, creative direction and professional production.",
    items: [
      "Brand commercials",
      "Campaign and promotional videos",
      "Product films and advertisements",
      "Documentary and interview production",
      "Event videography",
      "Photography and visual content",
      "Video editing and post-production",
    ],
  },
  {
    name: "Social Content Creation",
    bg: "#121212",
    fg: "#ffffff",
    desc: "We develop platform-native content that helps brands communicate consistently, capture attention and build meaningful connections with their audiences.",
    items: [
      "Short-form video and Reels",
      "Social-first campaign content",
      "Content series and recurring formats",
      "Creator-led and UGC-style content",
      "Product and lifestyle content",
      "Content repurposing and adaptation",
      "Monthly content production",
    ],
  },
  {
    name: "Motion Design & AI Content Creation",
    bg: "#f59e0b",
    fg: "#121212",
    desc: "We explore motion, digital design and emerging creative technologies to expand how brands communicate, visualise ideas and engage audiences.",
    items: [
      "Motion graphics and animated typography",
      "2D and 3D visual design",
      "AI-assisted creative development",
      "Generative imagery and video",
      "Product visualisation",
      "Experimental visual storytelling",
      "AI-enhanced campaign assets",
    ],
  },
];

export default function ServicesList() {
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  // Active row = the one closest to the middle of the screen. Measured on scroll
  // (not with an IntersectionObserver band) so fast flicks on touch never skip a row.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      rows.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cur = services[active];

  return (
    <motion.section
      id="services"
      className="relative z-10 [clip-path:inset(0)]"
      animate={{ backgroundColor: cur.bg, color: cur.fg }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-7xl px-6 pt-32 md:px-10 md:pt-48">
        <h2 className="text-sm font-medium">Our Services</h2>
        <p className="mt-6 max-w-3xl text-xl font-medium leading-snug md:text-3xl">
          We help brands evolve through strategic thinking, cultural understanding and creative
          execution. From defining a brand&apos;s direction to producing the work that brings its
          vision to life, we connect intention with meaningful creative output.
        </p>
      </div>

      <ul className="mx-auto max-w-7xl px-6 pb-[20vh] md:px-10">
        {services.map((s, i) => (
          <li
            key={s.name}
            data-i={i}
            ref={(el) => (rows.current[i] = el)}
            className="grid gap-8 py-[12vh] transition-opacity duration-500 md:grid-cols-12 md:items-center md:gap-12"
            style={{ opacity: i === active ? 1 : 0.2 }}
          >
            <div className="md:col-span-7">
              <h3 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-semibold leading-[0.95] tracking-tighter">
                {s.name}
              </h3>
            </div>
            <div
              className="transition-opacity duration-500 md:col-span-5"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <p className="text-base md:text-lg">{s.desc}</p>
              <ul className="mt-6 space-y-2 border-t border-current/20 pt-6 text-sm md:text-base">
                {s.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        data-cursor
        className="fixed right-4 bottom-4 z-20 hidden h-44 w-36 sm:grid cursor-grab touch-none place-items-center rounded-2xl border border-current/20 p-3 text-center sm:p-4 shadow-2xl md:right-10 md:bottom-10 md:h-64 md:w-52"
        animate={{ backgroundColor: cur.fg, color: cur.bg }}
        transition={{ duration: 0.6 }}
      >
        <span className="select-none text-sm font-semibold">{cur.name}</span>
      </motion.div>
    </motion.section>
  );
}
