import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { isExternalHref } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

// Base styles shared by every button
const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 ease-expo disabled:pointer-events-none disabled:opacity-50";

// Different color styles
const variants: Record<Variant, string> = {
   primary: "bg-accent text-white hover:bg-white hover:text-ink",
   light: "bg-white text-ink hover:bg-accent hover:text-white",
   outline: "border border-white/20 text-white hover:border-white hover:bg-white hover:text-ink",
   ghost: "text-white/80 hover:text-white",
} 

// Different sizes
const sizes: Record<Size, string> = {
    sm: "h-10 px-5 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-[15px]",
}

/**
 * Builds a single space-separated Tailwind class string for buttons and links.
 * The `= {}` makes the entire options object optional, so calling `buttonClasses()`
 * with no arguments safely falls back to the default variant and size.
 */
export function buttonClasses({
    variant = "primary",
    size = "md",
    className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
    const classes = [base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")
        return classes;
}

/**
 * Props for the ButtonLink component.
 * Combines our custom styling/icon props with all standard HTML <a> attributes
 * (like target, rel, onClick, aria-label).
 * `Omit` removes href, className, and children from the native <a> type so they
 * don't conflict with our stricter definitions above.
 */

type ButtonLinkProps = {
    href: string;
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    className?: string;
    icon?: LucideIcon | null;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/**
 * A styled button that can be either a Next.js Link (internal) or a normal <a> (external).
 */
export function ButtonLink({
    href,
    children,
    variant,
    size,
    className,
    icon: Icon = ArrowUpRight,
    ...rest
}: ButtonLinkProps) {
    const classes = buttonClasses({ variant, size, className});

    // Button content (text + optional icon)
    const content = (
        <>
          <span>{children}</span>
          {Icon && (
            <Icon
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </>
    );

    // External links open in a new tab
    if(isExternalHref(href)) {
        const isHttp = href.startsWith("http");
        return (
            <a
              href={href}
              className={classes}
              target={isHttp ? "_blank" : undefined}
              rel={isHttp ? "noopener noreferrer" : undefined}
              {...rest}
            >
                {content}
            </a>
        )
    }

    // Internal links use Next.js Link
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  )
}