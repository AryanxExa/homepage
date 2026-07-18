import type { Config } from "@react-router/dev/config";
import { VERTICAL_SLUGS } from "./app/config/verticals";

// ssr:false + prerender = fully static output (EA §2): CDN pages, no server runtime.
export default {
  ssr: false,
  prerender: [
    "/",
    "/system",
    "/industries",
    ...VERTICAL_SLUGS.map((s) => `/industries/${s}`),
    "/process",
    "/pricing",
    "/about",
    "/growth-audit",
    "/growth-audit/booked",
  ],
} satisfies Config;
