"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionAccordionProps {
    title: string
    count: number
    icon: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
}

export function SectionAccordion({ title, count, icon, children, defaultOpen = true }: SectionAccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 mb-2 border-b border-slate-200 dark:border-slate-800 pb-4 group cursor-pointer"
            >
                <div className="text-primary group-hover:text-primary/80 transition-colors">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-left">{title}</h2>

                <div className="ml-auto flex items-center gap-4">
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-600 dark:text-slate-400">
                        {count}
                    </span>
                    <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-8">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
