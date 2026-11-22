import { unsplash } from "@/lib/utils";

/** Streaming platform links for an artist */
export type DSPLinks = {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;    
}

/** A single track in an artist's top tracks list */
export type Track = {
  title: string;
  duration: string;
  streams: string;
};

/** Full artist profile */
export type Artist = {
    slug: string;
    name: string;
    genre: string[];
    origin: string;
    signed: number; //year signed to label
    monthlyListeners: string;
    image: string; // portrait 3:4
    heroImage: string; // wide landscape image for hero sections
    shortBio: string;
    bio: string[]; // longer bio split into paragraphs
    topTracks: Track[];
    dsp: DSPLinks;
    featured?: boolean;
};

/** Default streaming links (to be replaced with real ones later) */
const DSP_PLACEHOLDER: DSPLinks = {
    spotify: "https://open.spotify.com/",
    appleMusic: "https://music.apple.com/",
    youtube: "https://youtube.com/",    
};

export const artists: Artist[] = [
    {
      slug: "temi-reign",
      name: "Temi Reign",
      genre: ["Afrobeats", "Amapiano"],
      origin: "Lagos, NG",
      signed: 2022,
      monthlyListeners: "3.1M",
      image: unsplash("photo-1494790108377-be9c29b29330", 900, 1200),
      heroImage: unsplash("photo-1470225620780-dba8ba36b745", 2400),
      shortBio: "Dancefloor royalty with log-drum precision.",
      bio: [
      "Temi Reign bridges Lagos and Johannesburg with an infectious mix of Afrobeats hooks and amapiano grooves made for the club and the timeline.",
      "Her breakout single 'Shayo' went viral across TikTok in 40+ countries, launching one of the fastest-growing careers on the continent.",
    ],
    topTracks: [
        { title: "Shayo", duration: "3:02", streams: "126M"},
        { title: "Owambe", duration: "3:15", streams: "19M" },
    ],
    dsp: DSP_PLACEHOLDER,
    },
    {
        slug: "lumi",
        name: "Lumi",
        genre: ["Afro-Pop", "Soul"],
        origin: "Kigali, RW",
        signed: 2024,
        monthlyListeners: "540K",
        image: unsplash("photo-1529626455594-4ff0802cfb7e", 900, 1200),
        heroImage: unsplash("photo-1429962714451-bb934ecdc4ec", 2400),
        shortBio: "The newest light on the roster.",
        bio: [
          "Lumi is the newest signee to LEAN VIBES, a Rwandan singer-songwriter crafting warm Afro-pop anthems rooted in soul and gospel harmony.",
          "Her debut EP 'First Light' arrives with a growing global fanbase and early support from leading editorial playlists.",
        ],
        topTracks: [
          { title: "First Light", duration: "3:16", streams: "7M" },
          { title: "Kigali Rain", duration: "3:42", streams: "4M" },
          { title: "Halo", duration: "2:55", streams: "2M" },
          { title: "Home", duration: "3:30", streams: "1M" },
        ],
        dsp: DSP_PLACEHOLDER,
      },
];

/** Unique list of all genres across every artist */
export const allGenres: string[] = Array.from(
    new Set(artists.flatMap((a) => a.genre))
);

export function getArtistBySlug(slug: string): Artist | undefined {
    return artists.find((a) => a.slug === slug);
}