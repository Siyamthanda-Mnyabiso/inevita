"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// After Skiper UI #24 (Tik tik color list): the section color follows the row
// at the centre of the screen, and a preview card can be dragged around.
const services = [
  { name: "Brand Strategy", badge: "Strategy", bg: "#c2f84f", fg: "#121212" },
  { name: "Identity & Design", badge: "Design", bg: "#ffffff", fg: "#121212" },
  { name: "Web Experiences", badge: "Development", bg: "#121212", fg: "#ffffff" },
  { name: "Content & Motion", badge: "Motion", bg: "#f59e0b", fg: "#121212" },
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
      <ul className="mx-auto max-w-7xl px-6 py-[20vh] md:py-[30vh] md:px-10">
        {services.map((s, i) => (
          <li
            key={s.name}
            data-i={i}
            ref={(el) => (rows.current[i] = el)}
            className="flex items-baseline justify-between gap-6 py-[7vh] md:py-[10vh] transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0.25 }}
          >
            <h3 className="text-[clamp(2rem,9vw,9rem)] font-semibold leading-none tracking-tighter">
              {s.name}
            </h3>
            <span className="hidden text-sm font-medium md:block">{s.badge}</span>
          </li>
        ))}
      </ul>

      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        data-cursor
        className="fixed right-4 bottom-4 z-20 grid h-32 w-28 sm:h-44 sm:w-36 cursor-grab touch-none place-items-center rounded-2xl border border-current/20 p-3 text-center sm:p-4 shadow-2xl md:right-10 md:bottom-10 md:h-64 md:w-52"
        animate={{ backgroundColor: cur.fg, color: cur.bg }}
        transition={{ duration: 0.6 }}
      >
        <span className="select-none break-words text-xs font-semibold sm:text-sm">{cur.name}</span>
      </motion.div>
    </motion.section>
  );
}
