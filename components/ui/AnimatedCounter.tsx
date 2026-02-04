"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
}

export function AnimatedCounter({ value, duration = 0.5 }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, value, {
                duration: duration,
                ease: "easeOut"
            });
            return controls.stop;
        }
    }, [isInView, value, motionValue, duration]);

    useEffect(() => {
        return motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Math.floor(latest)
                );
            }
        });
    }, [motionValue]);

    return <span ref={ref} />;
}
