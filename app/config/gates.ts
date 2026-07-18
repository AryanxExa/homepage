/* IA §11 phase gates as code (EA §4). Flipping a flag swaps nav slots,
   footer entries and prerender targets together. */
export const gates = {
  /** ≥2 real, permissioned case studies exist. */
  results: false,
  /** Live WhatsApp demo line is operational. */
  demoPage: false,
  /** ≥5 genuinely useful playbooks exist. */
  insights: false,
  /** Real "from AED" anchors confirmed by the founder (§19.3). */
  pricingAnchors: false,
  /** Retired the day `results` opens (reverse gate). */
  foundingPartners: true,
} as const;
