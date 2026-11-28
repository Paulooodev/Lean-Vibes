import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";
import { MaskText } from "../motion/MaskText";


// Small label that usually sits above a heading (Eyebrow)
export function Eyebrow({
    index, 
    children,
    className
}: {
    index?: string;
    children: ReactNode;
    className?: string
}) {
    const classes = className ? `eyebrow flex items-center gap-3 ${className}` : "eyebrow flex items-center gap-3";
    return (
    <p className={classes}>
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px w-8 bg-white/25" aria-hidden="true"/>
        <span>{children}</span>
    </p>
    )
}

type SectionHeadingProps = {
    index?: string;
    eyebrow: string;
    // An arry of lines for big titles
    title: string[];
    description?: string;
    className?: string;
    as?: "h1" | "h2";
};

export function SectionHeading({
    index,
    eyebrow,
    title,
    description,
    className,
    as = "h2"
}: SectionHeadingProps) {
    const classes = className ? `max-w-3xl ${className}` : "max-w-3xl";


    return (
    <div className={classes}>
        <Reveal>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <MaskText as={as} lines={title} className="display-md mt-5" />
        {description && (
            <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {description}
                </p>
            </Reveal>
        )}
    </div>
    );
}