"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    const id = setInterval(() => setN((v) => Math.min(100, v + 4)), 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (n === 100) {
      const t = setTimeout(() => {
        setDone(true);
        document.documentElement.classList.remove("lenis-stopped");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [n]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-between bg-lime p-6 text-[#121212] md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-sans text-base font-semibold tracking-tight">Inevita / loading</span>
          <span className="text-[30vw] md:text-[22vw] leading-[0.8] font-semibold tabular-nums tracking-tighter">
            {n}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
