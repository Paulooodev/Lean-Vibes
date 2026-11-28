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
      {
        slug: "kxng-sola",
        name: "KXNG Sola",
        genre: ["Hip-Hop", "Afro-Fusion"],
        origin: "Abuja, NG",
        signed: 2020,
        monthlyListeners: "2.8M",
        image: unsplash("photo-1539571696357-5a69c17a67c6", 900, 1200),
        heroImage: unsplash("photo-1501386761578-eac5c94b800a", 2400),
        shortBio: "Lyrical precision with a crown-heavy delivery.",
        bio: [
          "KXNG Sola is one of the sharpest pens of his generation, fusing hard-hitting hip-hop with Afro-fusion textures and street-level storytelling.",
          "His debut album 'Crown Theory' debuted at #1 on the Nigerian Apple Music charts and earned him nominations across the continent's leading award shows.",
        ],
        topTracks: [
          { title: "Crown Theory", duration: "3:41", streams: "72M" },
          { title: "Abuja Nights", duration: "3:05", streams: "54M" },
          { title: "Heavy Is The Head", duration: "2:51", streams: "38M" },
          { title: "Sola Szn", duration: "2:33", streams: "21M" },
        ],
        dsp: DSP_PLACEHOLDER,
      },
      {
        slug: "zuri",
        name: "Zuri",
        genre: ["Alté", "Soul"],
        origin: "Nairobi, KE",
        signed: 2021,
        monthlyListeners: "1.9M",
        image: unsplash("photo-1534528741775-53994a69daeb", 900, 1200),
        heroImage: unsplash("photo-1514525253161-7a46d19cd819", 2400),
        shortBio: "Alté soul from East Africa with a cinematic edge.",
        bio: [
          "Zuri's music lives between neo-soul, alté and ambient electronica, built on hazy production and a voice that floats over everything it touches.",
          "A favourite of global tastemakers, Zuri has soundtracked fashion campaigns, film trailers and festival sunsets from Nairobi to Paris.",
        ],
        topTracks: [
          { title: "Velvet Static", duration: "3:58", streams: "41M" },
          { title: "Rift Valley", duration: "4:12", streams: "29M" },
          { title: "Golden Hour", duration: "3:20", streams: "22M" },
          { title: "Slow Bloom", duration: "3:44", streams: "14M" },
        ],
        dsp: DSP_PLACEHOLDER,
        featured: true
      },
      {
        slug: "amara-blu",
        name: "Amara Blu",
        genre: ["R&B", "Alté"],
        origin: "Accra, GH",
        signed: 2023,
        monthlyListeners: "860K",
        image: unsplash("photo-1517841905240-472988babdf9", 900, 1200),
        heroImage: unsplash("photo-1506157786151-b8491531f063", 2400),
        shortBio: "Midnight R&B written in shades of blue.",
        bio: [
          "Amara Blu writes confessional R&B with Ghanaian highlife undertones, pairing lush harmonies with lyrics that read like diary entries.",
          "Since signing in 2023, Amara has become one of the most-shared new voices on editorial playlists across Africa and Europe.",
        ],
        topTracks: [
          { title: "Blue Hour", duration: "3:27", streams: "18M" },
          { title: "Accra to You", duration: "3:51", streams: "12M" },
          { title: "Unsent", duration: "2:59", streams: "8M" },
          { title: "Tide", duration: "3:33", streams: "5M" },
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