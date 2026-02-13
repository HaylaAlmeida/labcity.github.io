'use client';

import { motion } from 'framer-motion';
import { useId, useMemo } from 'react';

type DataNode = {
    top: string;
    left: string;
    duration: number;
};

function hashStringToUint32(input: string): number {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(seed: number) {
    return function rand() {
        let t = (seed += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function HeroAnimations() {
    const seedId = useId();
    const nodes = useMemo<DataNode[]>(() => {
        const seed = hashStringToUint32(seedId);
        const rand = mulberry32(seed);
        return Array.from({ length: 6 }, () => ({
            top: `${rand() * 80 + 10}%`,
            left: `${rand() * 80 + 10}%`,
            duration: 3 + rand() * 2,
        }));
    }, [seedId]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
        >
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"
                    style={{
                        top: node.top,
                        left: node.left
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: node.duration, repeat: Infinity }}
                />
            ))}
        </motion.div>
    );
}
