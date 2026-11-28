"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useLoading } from "../providers/LoadingProvider";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type RevealProps = {
    // content to animate in
    children: ReactNode;   
    className?: string;    
    // delay before animation starts (seconds)
    delay?: number;  
    // how far below it starts (in pixels)      
    y?: number; 
    // animation length in seconds           
    duration?: number;     
}

/**
 * Scroll-triggered fade and slide-up animation.
  (Only starts when the element is in view and the preloader has finished.)
 */


export function Reveal({
    children,
    className,
    delay = 0,
    y = 32,
    duration = 0.9
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    // true once the element enters the viewport
    const inView = useInView(ref, VIEWPORT); 
    // true after the preloader finishes
    const { isLoaded } = useLoading(); 
    
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView && isLoaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration, delay, ease: EASE_OUT_EXPO}}
        >
            {children}
        </motion.div>
    )
}





