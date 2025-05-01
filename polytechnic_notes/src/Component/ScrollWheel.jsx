import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollWheel = () => {
  const controls = useAnimation();
  const rotation = useRef(0);
  const rafId = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleScroll = (deltaY) => {
      if (Math.abs(deltaY) < 1) return;

      const rotationStep = deltaY * 0.3;
      rotation.current += rotationStep;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        controls.start({
          rotate: rotation.current,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
          },
        });
      });
    };

    const handleWheel = (e) => handleScroll(e.deltaY);

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      handleScroll(deltaY);
      touchStartY.current = currentY;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
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
