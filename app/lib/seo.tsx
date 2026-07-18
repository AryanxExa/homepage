import { site } from "~/config/site";

/* Meta + JSON-LD builders (EA §10, AI §3). Schema mirrors only claims the
   visible page makes — the no-fabrication rule applies to markup. */

export function pageMeta(opts: { title?: string; description?: string; path: string }) {
  const title = opts.title ? `${opts.title} — ${site.name}` : `${site.name} — Growth Systems for UAE Service Businesses`;
  const description = opts.description ?? site.description;
  const url = `${site.url}${opts.path}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
  ];
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
    address: {
      "@type": "PostalAddress",
      ...(site.address ? { streetAddress: site.address } : {}),
      addressLocality: site.city,
      addressCountry: "AE",
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"],
    sameAs: [site.instagram],
    knowsAbout: [
      "WhatsApp Business automation",
      "appointment scheduling",
      "CRM",
      "no-show reduction",
      "customer retention",
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    url: `${site.url}${path}`,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: "United Arab Emirates",
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
