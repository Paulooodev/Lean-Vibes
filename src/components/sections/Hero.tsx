"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MaskText } from "../motion/MaskText";
import { useLoading } from "../providers/LoadingProvider";
import { MagneticButton } from "../motion/MagneticButton";
import { ButtonLink } from "../ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { artists } from "@/data/artists";
import { getPrimaryListenLink, releases } from "@/data/releases";

export function Hero(){
   const ref = useRef<HTMLElement>(null);
   const reduce = useReducedMotion();
   const { isLoaded } = useLoading();

   // Decides which releases should rotate in the hero.
    const ROTATION = releases.some((r) => r.featured)
        ? releases.filter((r) => r.featured)
        : releases;
   const featured = artists.find((a) => a.featured) ?? artists[2];

   // Index of the currently displayed release
   const [releaseIndex, setReleaseIndex] = useState(0);

   // Auto-rotate featured releases every 5s once the page finishes loading
   useEffect(() => {
    if(!isLoaded || ROTATION.length < 2) return;
    const timer = setInterval(() => {
      // Advance to next release and loop back to 0 at the end
      setReleaseIndex((i) => (i + 1) % ROTATION.length);
    }, 5000)
    // Clear interval on unmount to prevent memory leaks
    return () => clearInterval(timer);
   }, [isLoaded]);

   // Active release object to render
   const latest = ROTATION[releaseIndex];

// Parallax + fade effect as the user scrolls
      const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
      const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
      const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
      const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

// Reusable fade-up animation (only runs after loading finishes)
    const fadeUp = (delay: number) => ({
       initial: { opacity: 0, y: 24 },
       animate: isLoaded ? { opacity: 1, y: 0 } : undefined,
       transition: { duration: 1, ease: EASE_OUT_EXPO, delay }, 
    });

  
    return (
       <section
            ref={ref}
            className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
            aria-label="Featured"
        >
          {/* Background image with subtle zoom-in and parallax */}
           <motion.div
                className="absolute inset-0 -z-20"
                style={{ y: imageY }}
                initial={{ scale: 1.15 }}
                animate={isLoaded ? { scale: 1 } : undefined}
                transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
            >
            <Image
               src={featured.heroImage}
               alt=""
               fill
               priority
               sizes="100vw"
               className="object-cover"
            />
            </motion.div>

         {/* Dark gradients so text stays readable */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" aria-hidden="true" />    


        {/* Main content */}
        <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="container-x relative w-full pb-8 pt-32 sm:pb-12"
        >
            {/* Now streaming pill */}
            <motion.p
               {...fadeUp(0.2)}
               className="eyebrow flex items-center gap-3 text-white/70"
            >
             <span className="relative flex h-2 w-2">
               {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
               <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /> */}
             </span>
             Now Streaming: {latest.title} · {latest.artistName}   
            </motion.p>

            {/* Big headline with mask animation */}
            <MaskText
                as="h1"
                lines={["Sound of", "the new era."]}
                className="display-xl mt-6"
                delay={0.35}
                stagger={0.1}
            />

            {/* Description + buttons + latest release card */}
             <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
               <motion.div {...fadeUp(0.7)}>
                  <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                    {siteConfig.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {/* Various components to be added later on */}
                    <MagneticButton>
                      <ButtonLink href="#roster" variant="light" size="lg" icon={ArrowDown}>
                        Explore Roster
                      </ButtonLink>
                    </MagneticButton>
                    <ButtonLink href="#releases" variant="outline" size="lg">
                      Latest Releases
                    </ButtonLink>
                  </div>
                </motion.div> 

                {/* Latest release card */}
                <motion.a
                  {...fadeUp(0.85)}
                  href={getPrimaryListenLink(latest)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full max-w-sm items-center gap-4 border border-white/10 bg-ink/50 p-3 backdrop-blur-md transition-colors hover:border-white/30 flex"
                >
                 <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={latest.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden">
                      <Image
                          src={latest.cover}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />   
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-[10px]">Latest {latest.type}</span>
                      <span className="mt-1 block truncate text-lg font-semibold tracking-tight">
                          {latest.title}
                      </span>
                      <span className="block truncate text-sm text-muted">{latest.artistName}</span>
                    </span>
                  </motion.span>
                </AnimatePresence> 
                  <span className="mr-2 grid h-11 shrink-0 place-items-center rounded-full bg-accent transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-white" />
                  </span>
                </motion.a>
             </div>

             {/* Bottom bar: cities + scroll indicator */}
            <motion.div
            {...fadeUp(1)}
            className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-muted"
            >
            <span className="uppercase tracking-[0.25em]">{siteConfig.cities}</span>
            <span className="flex items-center gap-3 uppercase tracking-[0.25em]">
                Scroll
                <span className="relative h-8 w-px overflow-hidden bg-white/20">
                {!reduce && (
                    <motion.span
                    className="absolute inset-x-0 top-0 h-3 bg-white"
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
                </span>
            </span>
            </motion.div>
        </motion.div>
        </section> 
    )
}