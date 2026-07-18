import "@fontsource-variable/inter";
import "~/styles/app.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { ReactNode } from "react";
import { MotionRoot } from "~/components/motion/primitives";
import { Nav } from "~/components/forge/nav";
import { Footer } from "~/components/forge/footer";
import { StickyBar } from "~/components/forge/sticky-bar";
import { useLenis } from "~/hooks/use-lenis";
import { JsonLd, orgJsonLd } from "~/lib/seo";
import { site } from "~/config/site";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fafaf8" />
        <Meta />
        <Links />
        <JsonLd data={orgJsonLd()} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useLenis();
  return (
    <MotionRoot>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[8px] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <StickyBar />
    </MotionRoot>
  );
}

export function ErrorBoundary() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-canvas px-6 text-center">
      <h1 className="text-[36px] font-semibold leading-tight">
        This page doesn't exist. <span className="text-slate">Your growth system should.</span>
      </h1>
      <nav aria-label="Recovery" className="flex flex-wrap items-center justify-center gap-6">
        <a className="textlink text-[17px]" href="/">Home</a>
        <a className="textlink text-[17px]" href="/industries">Industries</a>
        <a className="textlink text-[17px]" href="/growth-audit">Book a Growth Audit</a>
      </nav>
      <p className="text-[14px] text-slate">{site.replyPromise}.</p>
    </main>
  );
}
