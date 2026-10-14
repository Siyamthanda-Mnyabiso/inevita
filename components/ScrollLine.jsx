"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Scroll-driven stroke, after Skiper UI #19 (Svg follow scroll).
// The path is authored in a 1000x4000 box and stretched to the page height;
// non-scaling-stroke keeps the line weight constant at any size.
const D =
  "M860 120 C 700 60, 420 140, 380 360 C 340 580, 760 560, 800 820 " +
  "C 840 1080, 200 980, 180 1300 C 160 1620, 820 1500, 840 1840 " +
  "C 860 2180, 160 2100, 160 2440 C 160 2780, 800 2640, 840 2980 " +
  "C 880 3320, 300 3260, 300 3520 C 300 3760, 600 3800, 500 3960";

export default function ScrollLine({ className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.8"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  // Scale the path into real pixel coordinates so the stroke is never distorted
  // (non-scaling-stroke breaks pathLength dashes).
  const [size, setSize] = useState({ w: 1000, h: 4000 });
  useEffect(() => {
    const el = ref.current;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const d = D.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) =>
    `${(x * size.w) / 1000} ${(y * size.h) / 4000}`
  );

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="h-full w-full"
        fill="none"
        overflow="visible"
      >
        <motion.path
          d={d}
          stroke="var(--lime)"
          strokeLinecap="round"
          className="[stroke-width:10px] md:[stroke-width:20px]"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
