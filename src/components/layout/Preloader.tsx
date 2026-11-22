"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import Image from "next/image";
import { EASE_CURTAIN, EASE_OUT_EXPO } from "@/lib/motion";
import { pad } from "@/lib/utils";

type PreloaderProps = {
    onComplete: () => void; // function to call when loading is finished
};

export function Preloader({ onComplete }: PreloaderProps) {
    const reduce = useReducedMotion;
    // current progress (0–100)
    const [progress, setProgress] = useState(0);
    // ref version so the animation loop can update it without re-renders
    const progressRef = useRef(0);
    // This becomes true once the page is actually ready
    const readyRef = useRef(false);

    // Lock scroll while preloader is showing
    useEffect(() => {
        const html = document.documentElement;
        html.style.overflow = "hidden";
        return () => {
           // unlock scroll when preloader unmounts 
           html.style.overflow = ""; 
        }
    }, [])

    useEffect(() => {
       let cancelled = false;
       
       // Promise that resolves when the window finishes loading
       const windowLoaded = new Promise<void>((resolve) => {
        document.readyState === "complete" ? resolve() : window.addEventListener("load", () => resolve(), { once: true})
       });

       // Promise that resolves when fonts are ready
        const fontsReady = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

         // Force resolve after 4 seconds (safety cap)
        const cap = new Promise<void>((resolve) => setTimeout(resolve, 4000));

       // Wait for either (window + fonts) or the 4s cap
       Promise.race([Promise.all([windowLoaded, fontsReady]), cap]).then(() => {
         if(!cancelled) readyRef.current = true;
       });

       return () => {
        cancelled = true;
       }
    }, []);

  // Animate the progress bar
  // Holds at 90% until the page is ready, then goes to 100%
  useEffect(() => {
    let raf = 0;
    let timeout: number | undefined;
    let last = performance.now();
    const minDuration = reduce ? 500 : 2000;

    const tick = (now: number) => {
        const cap = readyRef.current ? 100 : 90;
        progressRef.current = Math.min(
            progressRef.current + ((now - last) / minDuration) * 100,
            cap
        );
        last = now;
        setProgress(Math.floor(progressRef.current));
        
        // Once we hit 100%, wait a moment then call onComplete
        if(progressRef.current >= 100) {
            timeout = window.setTimeout(onComplete, 350);
            return;
        }
       raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
       cancelAnimationFrame(raf);
       if(timeout)  clearTimeout(timeout)
    }
  }, [onComplete, reduce]);

  return (
    <motion.div
      id="preloader"
      role="status"
      aria-live="polite"
      aria-busy={progress < 100}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }} // slides up when leaving
      transition={{ duration: reduce ? 0.4 : 1.1, ease: EASE_CURTAIN }}
    >
     <span className="sr-only">Loading {siteConfig.name}</span>

        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
            <motion.div
            animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [1, 0.85, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
            <Image
                src="/logo2.png"
                alt={`${siteConfig.name} logo`}
                width={120}
                height={600}
                className="h-auto object-contain"
                priority
            />
            </motion.div>   
        </motion.div>

        {/* Progress bar */}
        <div className="mt-10 h-px w-48 overflow-hidden bg-white/10 sm:w-64" aria-hidden="true">
          <div
            className="h-full origin-left bg-accent transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${progress / 100})` }}
           />  
        </div>

        {/* Progress percentage */}
        <div className="mt-4 flex w-48 justify-between text-[10px] uppercase tracking-[0.3em] text-muted sm:w-64" aria-hidden="true">
          <span>Loading</span>
          <span className="tabular-nums">{pad(progress, 3)}%</span>  
        </div>

       {/* Cities text at the bottom */}
       <p className="eyebrow absolute bottom-8">{siteConfig.cities}</p>
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" aria-hidden="true" />
    </motion.div>
  );
}