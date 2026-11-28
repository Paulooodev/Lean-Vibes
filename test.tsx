"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allGenres, artists } from "@/data/artists";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function RosterShowcase() {
  // Hint: "All" is the default filter
  const [filter, setFilter] = useState("All");

  // Hint: build the filter buttons list = ["All", ...every unique genre]
  const filters = useMemo(() => ["All", ...allGenres], []);

  // Hint: if filter is "All", show everyone. Otherwise only artists whose genre array includes the selected filter
  const visible = filter === "All" ? artists : artists.filter((a) => a.genre.includes(filter));

  return (
    <section id="roster" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="01"
            eyebrow="The Roster"
            title={["Artists shaping", "the global sound."]}
            description="A small, carefully chosen roster of artists working across Afrobeats, hip-hop, alté, R&B and amapiano."
          />

          <Reveal delay={0.1}>
            <div
              role="group"
              aria-label="Filter roster by genre"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0 lg:max-w-md lg:justify-end"
            >
              {filters.map((g) => {
                const active = filter === g;

                // Hint: base button classes
                const base = "relative isolate shrink-0 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300";
                // Hint: different styles when active vs inactive
                const activeClasses = "border-white text-ink";
                const inactiveClasses = "border-white/15 text-white/60 hover:border-white/40 hover:text-white";

                // Hint: combine them (same pattern you used in Eyebrow / SectionHeading)
                // const buttonClasses = active ? `${base} ${activeClasses}` : `${base} ${inactiveClasses}`;

                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(g)}
                    className={/* your buttonClasses here */}
                  >
                    {/* Hint: only show the white background pill when this filter is active */}
                    {/* {active && (
                      <motion.span
                        layoutId="roster-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )} */}
                    {g}
                  </button>
                );
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
                  {/* Hint: pass the artist and their original index (from the full artists array) */}
                  <ArtistCard artist={artist} index={artists.indexOf(artist)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}








import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/data/artists";
import { pad } from "@/lib/utils";

type ArtistCardProps = { 
  artist: Artist; 
  index: number; 
  sizes?: string; 
};

/**
 * Card that links to an artist page.
 * 
 * Hint: This is a Next.js Link wrapping an image + overlay info.
 */
export function ArtistCard({ artist, index, sizes }: ArtistCardProps) {
  return (
    <Link
      // Hint: build the artist page URL using the slug
      // href={`/artists/${artist.slug}`}
      href=""
      className="group relative block aspect-[3/4] overflow-hidden bg-ink-800 focus-visible:outline-offset-[-2px]"
    >
      <Image
        src={artist.image}
        // Hint: descriptive alt text using the artist name
        // alt={`Portrait of ${artist.name}`}
        alt=""
        fill
        // Hint: fallback sizes if none were passed
        // sizes={sizes ?? "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"}
        sizes={sizes}
        className="object-cover grayscale transition-[filter,transform] duration-700 ease-expo group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
      />

      {/* Dark gradient so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />

      {/* Hint: padded index number (e.g. 01, 02) in the top-left */}
      {/* <span className="absolute left-4 top-4 text-[11px] font-medium tracking-[0.2em] text-white/60 sm:left-5 sm:top-5">
        {pad(index + 1)}
      </span> */}

      {/* Hint: arrow icon that appears on hover (top-right) */}
      {/* <span
        aria-hidden="true"
        className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 translate-x-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span> */}

      {/* Bottom content: genres + name + origin */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        {/* Hint: map over artist.genre to create small pills */}
        {/* <div className="mb-3 flex flex-wrap gap-1.5">
          {artist.genre.map((g) => (
            <span key={g} className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:text-[10px]">
              {g}
            </span>
          ))}
        </div> */}

        <h3 className="text-xl font-bold leading-none tracking-[-0.03em] sm:text-3xl">
          {/* Hint: artist name goes here */}
        </h3>
        <p className="mt-2 text-xs text-muted">
          {/* Hint: artist origin goes here */}
        </p>
      </div>

      {/* Accent line that grows from left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100"
      />
    </Link>
  );
}


<motion.a
  {...fadeUp(0.85)}
  href={getPrimaryListenLink(latest)}
  target="_blank"
  rel="noopener noreferrer"
  className="group hidden w-full max-w-sm items-center gap-4 border border-white/10 bg-ink/50 p-3 backdrop-blur-md transition-colors hover:border-white/30 sm:flex"
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
        <Image src={latest.cover} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block text-[10px]">Latest {latest.type}</span>
        <span className="mt-1 block truncate text-lg font-semibold tracking-tight">{latest.title}</span>
        <span className="block truncate text-sm text-muted">{latest.artistName}</span>
      </span>
    </motion.span>
  </AnimatePresence>
  <span className="mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent transition-transform duration-500 group-hover:scale-110">
    <Play className="ml-0.5 h-4 w-4 fill-white" />
  </span>
</motion.a>


// Artist Card (to be changed later on)
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/data/artists";
import { pad } from "@/lib/utils";

type ArtistCardProps = { artist: Artist; index: number; sizes?: string };

export function ArtistCard({ artist, index, sizes }: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-ink-800 focus-visible:outline-offset-[-2px]"
    >
      <Image
        src={artist.image}
        alt={`Portrait of ${artist.name}`}
        fill
        sizes={sizes ?? "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"}
        className="object-cover grayscale transition-[filter,transform] duration-700 ease-expo group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />

      <span className="absolute left-4 top-4 text-[11px] font-medium tracking-[0.2em] text-white/60 sm:left-5 sm:top-5">
        {pad(index + 1)}
      </span>

      <span
        aria-hidden="true"
        className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 translate-x-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {artist.genre.map((g) => (
            <span
              key={g}
              className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:text-[10px]"
            >
              {g}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold leading-none tracking-[-0.03em] sm:text-3xl">{artist.name}</h3>
        <p className="mt-2 text-xs text-muted">{artist.origin}</p>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-expo group-hover:scale-x-100"
      />
    </Link>
  );
}









import { Hero } from "@/components/sections/Hero";
import { RosterShowcase } from "@/components/sections/RosterShowcase";
import { ReleasesStrip } from "@/components/sections/ReleasesStrip";
import { EthosSection } from "@/components/sections/EthosSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Marquee } from "@/components/ui/Marquee";
import { artists } from "@/data/artists";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={artists.map((a) => a.name)} />
      <RosterShowcase />
      <ReleasesStrip />
      <EthosSection />
      <ServicesPreview />
      <CtaBanner />
    </>
  );
}