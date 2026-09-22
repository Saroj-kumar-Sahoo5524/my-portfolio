import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = process.env.APP_URL || "https://sarojkumarsahoo.online";
const FULL_NAME = "Saroj Kumar Sahoo";
const TITLE = `${FULL_NAME} — Full-Stack Web Developer | Next.js, React & Node.js`;
const DESCRIPTION =
  "Saroj Kumar Sahoo is a Full-Stack Web Developer based in Bhubaneswar, Odisha, India. Specializing in Next.js 15, React 19, Node.js, TypeScript, and Tailwind CSS. Available for freelance & full-time opportunities worldwide.";

export const metadata: Metadata = {
  /* ── Core ── */
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Saroj Kumar Sahoo",
    "Saroj Kumar Sahoo developer",
    "Full-Stack Web Developer Bhubaneswar",
    "Full-Stack Developer Odisha",
    "Full-Stack Developer India",
    "Next.js Developer India",
    "React Developer Bhubaneswar",
    "Node.js Developer",
    "TypeScript Developer",
    "Freelance Web Developer India",
    "Hire Full-Stack Developer India",
    "Portfolio website developer",
    "Next.js 15",
    "React 19",
    "Tailwind CSS",
    "Three.js",
    "WebGL developer",
    "WordPress developer Odisha",
    "Web developer for hire",
    "Best web developer Bhubaneswar",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  /* ── Canonical ── */
  alternates: {
    canonical: SITE_URL,
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ── */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${FULL_NAME} | Full-Stack Developer`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Full-Stack Web Developer Portfolio`,
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@sarojkumarjagu",
    images: [`${SITE_URL}/og-image.png`],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification (add your codes after verifying in Google Search Console) ── */
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

/* ── JSON-LD Structured Data ── */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Full-Stack Web Developer",
  description: DESCRIPTION,
  email: "sarojjagu@gmail.com",
  telephone: "+91-8457875524",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/saroj-kumar-sahoo-167099181/",
    "https://www.instagram.com/sarojkumarjagu/",
    "https://www.facebook.com/sks845",
  ],
  knowsAbout: [
    "Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS",
    "WordPress", "MySQL", "Three.js", "Full-Stack Web Development",
    "SEO", "Digital Marketing",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${FULL_NAME} Portfolio`,
  url: SITE_URL,
  description: DESCRIPTION,
  author: { "@type": "Person", name: FULL_NAME },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Geo tags — helps local SEO */}
        <meta name="geo.region" content="IN-OR" />
        <meta name="geo.placename" content="Bhubaneswar, Odisha, India" />
        <meta name="geo.position" content="20.2961;85.8245" />
        <meta name="ICBM" content="20.2961, 85.8245" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-[#050505] text-[#f5f5f5]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

