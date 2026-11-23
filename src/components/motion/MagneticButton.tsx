"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useSpring, useMotionValue, motion, useReducedMotion } from "framer-motion";

type MagneticButtonProps = {
    children: ReactNode;
    className?: string;
    // how strong the magnetic pull is (0 = none, 1 = full)
    strength?: number;
}

export function MagneticButton({ children, className, strength = 0.3 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    // respect user's "prefers-reduced-motion" setting
    const reduce = useReducedMotion(); 

    // Motion values for the x/y offset
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs so the movement feels natural
    const springX = useSpring(x, {
        stiffness: 220,
        damping: 16,
        mass: 0.3
    });
    const springY = useSpring(y, {
        stiffness: 220,
        damping: 16,
        mass: 0.3
    });

    // Calculate how far the mouse is from the center of the button
    const handleMove = (e: PointerEvent<HTMLDivElement>) => {
        if(reduce || e.pointerType !== "mouse" || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    // Snap back to original position when the mouse leaves
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    // Combine base classes with any extra className passed in
    const classes = className ? `inline-block ${className}` : "inline-block";

    return (
        <motion.div
          ref={ref}
          onPointerMove={handleMove}
          onPointerLeave={reset}
          style={{ x: springX, y: springY }}
          className={classes}
        >
            {children}
        </motion.div>
    )
}