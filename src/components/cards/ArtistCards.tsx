import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artists, type Artist } from "@/data/artists";
import { pad } from "@/lib/utils";

type ArtistCardProps = {
    artist: Artist;
    index: number;
    sizes?: string;
};

// Card that links to an artist page.

export function ArtistCard({ artist, index, sizes}: ArtistCardProps) {
    return (
        <Link href={`/artists/${artist.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-ink-800 focus-visible:outline-offset-[-2px]">
            <Image
                src={artist.image}
                alt={`Portrait of ${artist.name}`}
                fill
                sizes={sizes && "(min-width: 1024px) 25wv, (min-width:768px) 33vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
            />

             {/* Dark gradient so text stays readable */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true"/>
             <span className="absolute left-4 top-4 font-medium text-[11px] tracking-[0.2em] text-white/60 sm:left-5 sm:top-5">
                {pad(index + 1)}
             </span>
             <span aria-hidden="true" className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 translate-x-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:right-5 sm:top-5">
                <ArrowUpRight className="h-4 w-4"/>
             </span>

             {/* Bottom content: genres + name + origin */}
             <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                    {artist.genre.map((g) => (
                        <span key={g}className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:text-[10px]">
                            {g}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-bold leading-none tracking-[-0.03em] sm:text-3xl">
                    {artist.name}
                </h3>

                <p className="mt-2 text-xs text-muted">
                    {artist.origin}
                </p>
             </div>

            {/* Accent line that grows from left on hover */}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-in-out group-hover:scale-x-100"/> 
        </Link>
    )
}