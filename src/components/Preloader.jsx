import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Preloader({ onDone }) {
  const [closing, setClosing] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeTimer = setTimeout(() => setClosing(true), reduceMotion ? 0 : 250);
    const doneTimer = setTimeout(onDone, reduceMotion ? 0 : 650);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-charcoal text-ivory flex flex-col items-center justify-center pointer-events-auto select-none"
      animate={closing ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src="/duro-maker-logo.png"
        alt="Duro Maker Interiors"
        className="h-auto w-40 brightness-0 invert md:w-52"
      />
    </motion.div>
  );
}
