import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollWheel = () => {
  const controls = useAnimation();
  const rotation = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollDelta = e.deltaY;

      // Minimal threshold to avoid jitter on small scrolls
      if (Math.abs(scrollDelta) < 1) return;

      const rotationStep = scrollDelta * 0.3;
      rotation.current += rotationStep;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        controls.start({
          rotate: rotation.current,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 20
          }
        });
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [controls]);

  return (
    <motion.img
    src="/wheel.png"
    alt="scroll wheel"
    initial={{ rotate: 0 }}
    animate={controls}
    className="h-[25rem] w-[25rem] opacity-40"
  />
  

  
  );
};

export default ScrollWheel;
