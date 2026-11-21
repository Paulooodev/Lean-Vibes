"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/data/site";
import { EASE_OUT_EXPO, EASE_CURTAIN } from "@/lib/motion";   
import { pad } from "@/lib/utils";

/** Check if a nav item should be marked as active */
const isActive = (pathname: string, href: string) => 
    href === "/" ? pathname : pathname.startsWith(href);

/** Small badge (e.g. "Soon") shown next to a nav item */
function Badge({ children }: { children: string }) {
    return (
      <span className="rounded-full border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-accent">
        {children}
      </span>  
    )
}

export function NavBar() {
   const pathname = usePathname();
   const [open, setOpen] = useState(false); 
   const [scrolled, setScrolled] = useState(false);
   const { scrollY } = useScroll();

   // Update "scrolled" state while the user is scrolling
   useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

   // Set initial scrolled state on mount
   useEffect(() => {
    setScrolled(window.scrollY > 24);
   }, [])

   // Close mobile menu when the route changes
   useEffect(() => {
    setOpen(false);
   }, [pathname]);

   // Lock body scroll + listen for Escape key when mobile menu is open
   useEffect(() => {
    if(!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
       html.style.overflow = "";
       window.removeEventListener("keydown", onKey); 
    };
   }, [open]);

   // Header background classes
   const headerClasses = `fixed inset-x-0 top-0 z-50 border-b transition-[background-color, border-color,backdrop-filter] duration-500 ${
    scrolled || open   
        ? "border-white/10 bg-ink/75 backdrop-blur-xl"
        : "border-transparent bg-ink/10 backdrop-blur-sm"
   }`;

   return (
    <>
        <header className={headerClasses}>
           <div className="container-x flex h-16 items-center justify-between sm:h-20">
            {/* Logo */}
            <Link href="/" aria-label={`${siteConfig.name} home`} className="relative z-10">
            <Image
                src="/logo2.png"
                alt={`${siteConfig.name} logo`}
                width={120}
                height={600}
                className="h-auto object-contain"
                priority
            />
            </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
             <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                   const active = isActive(pathname, item.href);
                   const linkClasses = `group relative flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                   }`;
                   return (
                    <li key={item.href}>
                        <Link
                           href={item.href}
                           aria-current={active ? "page" : undefined}
                           className={linkClasses}
                        >
                          <span>{item.label}</span>
                          {item.badge && <Badge>{item.badge}</Badge>} 

                          {active ? (
                            <motion.span
                               layoutId="nav-active"
                               className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                               transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          ) : (
                            <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-300 ease-expo group-hover:scale-x-100" />
                          )}
                        </Link>
                    </li>
                   )
                })}
            </ul> 
          </nav>  

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                {/* <MagneticButton>
                <ButtonLink href="/contact?type=demo" variant="outline" size="sm">
                    Submit Demo
                </ButtonLink>
                </MagneticButton> */}
              </div>  

             {/* Mobile menu toggle */}
             <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-white lg:hidden"
             >
               <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="h05 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence> 
            </button> 
            </div>
            </div> 
        </header>

        {/* Mobile full-screen drawer */}
        <AnimatePresence>
            {open && (
                <motion.div
                   id="mobile-menu"
                   key="mobile-menu"
                   role="dialog"
                   aria-modal="true"
                   aria-label="Site menu"
                   className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink lg:hidden"
                   initial={{ clipPath: "inset(0 0 100% 0)" }}
                   animate={{ clipPath: "inset(0 0 0% 0)" }}
                   exit={{ clipPath: "inset(0 0 100% 0)" }}
                   transition={{ duration: 0.7, ease: EASE_CURTAIN }}
                >
                 <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-28">
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
                            hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                        }}
                    >
                        {mainNav.map((item, i) => {
                            const active = isActive(pathname, item.href);
                            const labelClasses = `text-[clamp(2.25rem,9vw,4rem)] font-bold leading-none tracking-[-0.04em] transition-colors ${
                                active ? "text-accent" : "group-hover:text-white/70"
                            }`;
                            return (
                              <li key={item.href} className="overflow-hidden border-b border-white/10">
                                <motion.div
                                   variants={{
                                    hidden: { y: "100%", opacity: 0 },
                                    visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } }
                                   }} 
                                >
                                    <Link
                                      href={item.href}
                                      onClick={() => setOpen(false)}
                                      aria-current={active ? "page" : undefined}
                                      className="group flex items-center justify-between py-5"
                                    >
                                      <span className="flex items-baseline gap-4">
                                       <span className="text-xs tabular-nums text-muted">{pad(i + 1)}</span>
                                       <span className={labelClasses}>{item.label}</span>
                                       {item.badge && <Badge>{item.badge}</Badge>}
                                      </span>
                                      <ArrowUpRight className="h-6 w-6 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> 
                                    </Link>
                                </motion.div>
                              </li>  
                            )
                        })}
                    </motion.ul>

                {/* Bottom section of mobile menu */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"  
                >
                 <div>
                   <p className="eyebrow">Get in touch</p>
                   {/* <a href={`mailto:${siteConfig.emails.general}`} className="mt-2 block text-lg font-medium hover:text-accent">
                    {siteConfig.emails.general}
                    </a>      */}
                </div>  
                {/* <SocialLinks />  */}
                </motion.div>    
                </div>   
                </motion.div>
            )}
        </AnimatePresence>
    </>
   )
}