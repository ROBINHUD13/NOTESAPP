import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const variants = {
  left: {
    hidden: { scale: 0.5, opacity: 0, x: -150 },
    visible: { scale: 1, opacity: 1, x: 0 },
  },
  right: {
    hidden: { scale: 0.5, opacity: 0, x: 150 },
    visible: {  scale: 1, opacity: 1, x: 0 },
  },
};

export default function AnimatedSection({ children, direction = "left" }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <div className="w-full h-full" ref={ref}>
      <motion.div
        animate={controls}
        initial="hidden"
        variants={variants[direction]}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
