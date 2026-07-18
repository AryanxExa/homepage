import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("system", "routes/system.tsx"),
  route("industries", "routes/industries.tsx"),
  route("industries/:vertical", "routes/vertical.tsx"),
  route("process", "routes/process.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("about", "routes/about.tsx"),
  route("growth-audit", "routes/growth-audit.tsx"),
  route("growth-audit/booked", "routes/booked.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
