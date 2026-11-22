"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLoading } from "../providers/LoadingProvider";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type MaskTextProps = {
   lines: string[];
   as?: "h1" | "h2" | "h3" | "p"; // which HTML tag to render (default: h2)
   className?: string;           // classes on the outer tag
   lineClassName?: string;      // extra classes on each line
   delay?: number;
   stagger?: number;
}

export function MaskText({
    lines,
    as: Tag = "h2",
    className,
    lineClassName,
    delay = 0,
    stagger = 0.88,
}: MaskTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    // true when the element enters the viewport
    const inView = useInView(ref, VIEWPORT)
    // Wait until preloader is done
    const { isLoaded } = useLoading();
    // Only animate when both inView and isLoaded is true
    const show = inView && isLoaded; 

    // Combine base class with any extra class passed in
    const lineClasses = lineClassName ? `block ${lineClassName}` : "block";

    return (
        <Tag
          className={className}  
        >
            {/* Screen reader only — full text without animation */}
            <span className="sr-only">{lines.join(" ")}</span> 

            {/* Visual version, this is hidden from screen readers */}
            <span ref={ref} aria-hidden="true" className="block">
                {lines.map((line, i) => (
                   <span
                        key={`${line}-${i}`}
                        className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
                    >
                      <motion.span
                        className={lineClasses}
                        initial={{ y: "110%" }} 
                        animate={show ? { y: "0%" } : undefined} 
                        transition={{
                            duration: 1.05,
                            ease: EASE_OUT_EXPO,
                            delay: delay + i * stagger, 
                        }}
                        >
                            {line}
                        </motion.span>  
                    </span> 
                ))}
            </span>
        </Tag>
    );
}