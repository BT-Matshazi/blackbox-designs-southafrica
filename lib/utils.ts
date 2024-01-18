import { type Metadata } from "next"

export function constructMetadata({
  title = "BlackBox Designs - Web Design & Development",
  description = "BlackBox Designs is a web design and development company based in the South Africa, Johannesburg. We specialise in creating bespoke websites for small to large businesses and individuals.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      "web design",
      "website design",
      "web development",
      "web design johannesburg",
      "WordPress",
      "CMS",
    ],
    openGraph: {
      title,
      description,
    },
    authors: [
      { name: "Bekithemba Matshazi", url: "https://bekithembamatshazi.co.za" },
    ],
    applicationName: "BlackBox Designs",
    referrer: "origin-when-cross-origin",
    creator: "Bekithemba Matshazi",
    publisher: "Bekithemba Matshazi",
    icons,
    metadataBase: new URL("https://www.blackboxdesigns.co.za"),
  };
}
