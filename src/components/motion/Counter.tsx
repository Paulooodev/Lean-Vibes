"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLoading } from "../providers/LoadingProvider";
import { EASE_OUT_EXPO } from "@/lib/motion";

type CounterProps = {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
}
/**
 * Counts up from 0 to a number when it scrolls into view.
 */
export function Counter({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 2.2 
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const { isLoaded } = useLoading();
    const reduce = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if(!inView || !isLoaded) return;

        if(reduce) {
            setDisplay(value);
            return;
        }

        // animate from 0 to value
        const controls = animate(0, value, {
            duration,
            ease: EASE_OUT_EXPO,
            onUpdate: (latest) => setDisplay(latest),
        });

     // stop the animation if the component unmounts early
     return () => controls.stop();  
    }, [inView, isLoaded, reduce, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {display.toFixed(decimals)} 
            {suffix}
        </span>
    )
}



