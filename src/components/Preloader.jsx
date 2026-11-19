import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onDone }) {
  const [percent, setPercent] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setClosing(true);
          setTimeout(onDone, 800);
          return 100;
        }
        return prev + 3;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-charcoal text-ivory flex flex-col items-center justify-center pointer-events-auto select-none"
      animate={closing ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <img
        src="/duro-maker-logo.png"
        alt="Duro Maker Interiors"
        className="w-40 md:w-52 h-auto brightness-0 invert"
      />
      <div className="mt-8 text-sm tabular-nums text-beige tracking-widest font-mono">
        {percent}%
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-beige transition-all duration-75"
        style={{ width: `${percent}%` }}
      />
    </motion.div>
  );
}
