/* Launch configuration. Nullable fields are §19 founder inputs — components
   render honest fallbacks until they land (no invented values, ever). */
export const site = {
  name: "YanForge",
  tagline: "Growth, engineered.",
  description:
    "YanForge engineers growth systems for UAE service businesses — connecting website, booking, CRM, AI and WhatsApp into one system that fills calendars and keeps clients coming back.",
  url: "https://yanforge.com",
  locale: "en_AE",
  /** WhatsApp Business number, digits only with country code (§19.8). */
  whatsappNumber: null as string | null,
  /** Real street address (§19) — footer + LocalBusiness schema. */
  address: null as string | null,
  city: "Dubai",
  country: "United Arab Emirates",
  phoneDisplay: null as string | null,
  replyPromise: "We reply within 15 minutes, 9am–9pm GST",
  instagram: "https://instagram.com/yanforge",
  founder: null as { name: string; title: string } | null,
} as const;

export type Site = typeof site;
