export type NavItem = {
    label: string;
    href: string;
    badge?: string;
};

/** Allowed social media platforms */
export type SocialPlatform = "instagram" | "x" | "youtube" | "tiktok";

/** A social media link */
export type SocialLink = {
    platform: SocialPlatform;
    label: string;
    href: string;
}

/** A statistic/number to display (e.g. on the homepage) */
export type Stat = {
    value: number;
    label: string;
    suffix?: string;   
    prefix?: string;   
    decimals?: number; 
}

/** A physical location / office */
export type Location = {
   city: string;
   label: string;
   address: string;  
}

/** Main site information */
export const siteConfig = {
   name: "LEAN VIBES",
   legalName: "Lean Vibes Music Ltd.",
   tagline: "Sound for the culture. Built for the world.",
   description: 
        "LEAN VIBES is an independent record label developing, releasing and amplifying the next generation of African and global artists.",
    // url: "https://leanvibezz.com",
    city: "Lagos",
    // emails: {
    //   general: "hello@leanvibes.com",  
    //   press: "press@leanvibes.com",  
    //   booking: "booking@leanvibes.com",  
    //   demos: "demos@leanvibes.com",  
    //   legal: "legal@leanvibes.com",  
    //   privacy: "privacy@leanvibes.com",  
    // } 
    locations: [
        { city: "Lagos", label: "Headquarters", address: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria" }, 
    ] satisfies Location[],
};

/** Main navigation links (usually in the header) */
export const mainNav: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Shop", href: "/shop", badge: "Soon" },
    { label: "Contact", href: "/contact" },
]

/** Legal / footer navigation links */
export const legalNav: NavItem[] = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
];

/** Social media profiles */

export const socialLinks: SocialLink[] = [
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { platform: "x", label: "X (formerly Twitter)", href: "https://x.com/" },
    { platform: "youtube", label: "YouTube", href: "https://youtube.com/" },
    { platform: "tiktok", label: "TikTok", href: "https://tiktok.com/" },
];

/** Key numbers to display (e.g. on the homepage) */
export const labelStats: Stat[] = [
    { value: 1.1, suffix: "B+", decimals: 1, label: "Global Streams"},
    { value: 2, label: "Roster Artists" },
    { value: 10, label: "Countries Reached" },
    { value: 5, label: "Certifications" },
]