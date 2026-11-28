"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useLoading } from "../providers/LoadingProvider";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type StaggerContainerProps = {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
};

/**
 * Wrap a list of items so they animate in one after another.
 */
export function StaggerContainer({
    children, 
    className,
    stagger = 0.08,
    delay = 0
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, VIEWPORT);
    const { isLoaded } = useLoading();

    return (
        <motion.div
           ref={ref}
           className={className}
           initial="hidden"
           animate={inView && isLoaded ? "visible" : "hidden"}
           variants={{
            hidden: {},
            visible: {
                transition: { 
                staggerChildren: stagger,  // space between each child
                delayChildren: delay       // wait before first child
            } 
            }
           }}
        >
            {children}
        </motion.div>
    )
}


// Variant to be used on every child that wants to be animated
export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE_OUT_EXPO}
    }
}


/**
 * Individual item that fades and slides up.
 */
export function StaggerItem({
    children,
    className
}: {children: ReactNode; className?: string }) {
    return (
        <motion.div className={className} variants={staggerItemVariants}>
          {children}  
        </motion.div>
    )
}

