"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!e.target.closest?.("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-4 rounded-full bg-white mix-blend-difference md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: big ? 4 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
