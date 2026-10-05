import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FlavourDetail } from "@/components/FlavourDetail";
import { flavours, getFlavourBySlug } from "@/data/flavours";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return flavours.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const flavour = getFlavourBySlug(slug);

  if (!flavour) {
    return {};
  }

  const title = `${flavour.name} — PULSE`;
  const description = `${flavour.seoTagline} ${flavour.seoDescription}`;
  const url = `${siteUrl}/flavours/${flavour.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "PULSE",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${flavour.name} by PULSE`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/opengraph-image.png`],
    },
  };
}

export default async function FlavourPage({ params }) {
  const { slug } = await params;
  const flavour = getFlavourBySlug(slug);

  if (!flavour) {
    notFound();
  }

  const recommendations = flavours.filter((item) => item.slug !== flavour.slug);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flavour.name,
    description: `${flavour.seoTagline} ${flavour.seoDescription}`,
    image: new URL(flavour.image, siteUrl).toString(),
    url: `${siteUrl}/flavours/${flavour.slug}`,
    brand: {
      "@type": "Organization",
      name: "PULSE",
    },
    offers: {
      "@type": "Offer",
      price: "320",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/flavours/${flavour.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <FlavourDetail flavour={flavour} recommendations={recommendations} />
      <Footer />
    </>
  );
}
