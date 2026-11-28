"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArtistCard } from "../cards/ArtistCards";
import { Reveal } from "../motion/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { allGenres, artists } from "@/data/artists";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { button } from "framer-motion/client";

export function RosterShowcase(){
    // Tracks the currently selected genre tab (defaults to "All" to show every artist)
    const [filter, setFilter] = useState("All");
    // Builds the filter tab list by placing "All" ahead of every unique genre.
    const filters = useMemo(() => ["All", ...allGenres], []);

    // If filter is "All", show everyone, otherwise show only artists whose genre array includes the selected filter
    const visible = filter === "All" ? artists : artists.filter((a) => a.genre.includes(filter));

    return(
        <section id="roster" className="py-24 sm:py-32">
            <div className="container-x">
                <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
                    <SectionHeading
                        index="01"
                        eyebrow="The Roster"
                        title={["Artists shaping", "the global sound."]}
                        description="The voices shaping the culture. Every artist on the Lean Vibes roster is built to lead, not follow."
                    />
                    <Reveal delay={0.1}>
                       <div
                            role="group"
                            aria-label="Filter roster by genre"
                            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0 lg:max-w-md lg:justify-end"
                        >
                            {filters.map((g) => {
                                const active = filter === g;
                               // base button classes
                                const base = "relative isolate shrink-0 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300";
                                // different styles when active vs inactive
                               const activeClasses = "border-white text-ink";
                               const inactiveClasses = "border-white/15 text-white/60 hover:border-white/40 hover:text-white"; 

                               // We combine the classes together
                               const buttonClasses = active ? `${base} ${activeClasses}` : `${base} ${inactiveClasses}`

                               return (
                                    <button
                                      key={g}
                                      type="button"
                                      aria-pressed={active}
                                      className={buttonClasses}
                                    >
                                        {active && (
                                            <motion.span
                                              layoutId="roster-filter"
                                              className="absolute inset-0 -z-10 rounded-full bg-white" 
                                              transition={{ type: "spring", stiffness: 400, damping: 34}}
                                            />
                                        )}
                                        {g}
                                    </button>
                               )
                            })}
                         </div> 
                    </Reveal>
                </div>

              <Reveal delay={0.15} className="mt-14">
                <motion.ul layout className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((artist) => (
                            <motion.li
                               key={artist.slug}
                               layout
                               initial={{ opacity: 0, scale: 0.96 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.96 }}
                               transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                            >
                                <ArtistCard artist={artist} index={artists.indexOf(artist)}  />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
              </Reveal>  
            </div>
        </section>
    )
}