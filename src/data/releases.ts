import { unsplash } from "@/lib/utils";
import type { DSPLinks } from "./artists";

/** Possible release formats */
export type ReleaseType = "Single" | "EP" | "Album";

export type Release = {
   id: string; 
   title: string;
   artistSlug: string;
   artistName: string;
   type: ReleaseType;
   year: number;
   cover: string;
   links: DSPLinks;
   featured?: boolean;  
}

/** Default streaming links (to be replaced with real ones later) */
const LINKS: DSPLinks = {
  spotify: "https://open.spotify.com/",
  appleMusic: "https://music.apple.com/",
  youtube: "https://youtube.com/",
};

export const releases: Release[] = [
     { 
        id: "midnight-lagos", 
        title: "Midnight Lagos", 
        artistSlug: "nova-ade", 
        artistName: "Nova Adé", 
        type: "Album", 
        year: 2025, 
        cover: unsplash("photo-1614613535308-eb5fbd3d2c17", 800, 800), 
        links: LINKS, 
        featured: true 
      },
      { 
          id: "blue-hour", 
          title: "Blue Hour", 
          artistSlug: "amara-blu", 
          artistName: "Amara Blu", 
          type: "Single", 
          year: 2023, 
          cover: unsplash("photo-1541701494587-cb58502866ab", 800, 800), 
          links: LINKS,
          featured: true 
        },
        { 
          id: "first-light", 
          title: "First Light", 
          artistSlug: "lumi", 
          artistName: "Lumi", 
          type: "EP", 
          year: 2025, 
          cover: unsplash("photo-1558591710-4b4a1ae0f04d", 800, 800), 
          links: LINKS,
          featured: true 
        },
        { 
          id: "diaspora-tapes", 
          title: "Diaspora Tapes", 
          artistSlug: "dxrk", 
          artistName: "DXRK", 
          type: "EP", 
          year: 2024, 
          cover: unsplash("photo-1579546929518-9e396f3cc809", 800, 800), 
          links: LINKS,
          featured: true 
        },
        { 
          id: "crown-theory", 
          title: "Crown Theory", 
          artistSlug: "kxng-sola", 
          artistName: "KXNG Sola", 
          type: "Album", 
          year: 2024, 
          cover: unsplash("photo-1550684848-fac1c5b4e853", 800, 800), 
          links: LINKS, 
          featured: true 
        },
];

/** Get all releases by a specific artist (using their slug) */
export function getReleasesByArtist(slug: string): Release[] {
    return releases.filter((r) => r.artistSlug === slug);
}

/** 
 * Get the best available listen link for a release.
 * Priority: Spotify, Apple Music, YouTube, "#"
 */
export function getPrimaryListenLink(release: Release): string {
    return release.links.spotify    
        ?? release.links.appleMusic
        ?? release.links.youtube
        ?? "#"
}