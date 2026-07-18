import { Link } from "react-router";
import { gates } from "~/config/gates";
import { site } from "~/config/site";
import { verticalList } from "~/config/verticals";
import { waHref, waPrefills } from "~/lib/wa";

/* IA §10: the verifier's scroll. Legitimacy column first; mobile collapse
   order legitimacy-first. Footer links are P2 — no P0 here. */
export function Footer() {
  const wa = waHref(waPrefills.general);
  return (
    <footer data-band="engine" className="bg-ink text-canvas">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <p className="text-[20px] font-bold">{site.name}</p>
          <p className="mt-1 text-[15px] text-invsec">{site.tagline}</p>
          <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-invsec">
            One connected system — bookings, clients, WhatsApp, numbers — built and run with you.
          </p>
          <address className="mt-4 text-[14px] not-italic text-invsec">
            {site.address ? <p>{site.address}, </p> : null}
            <p>
              {site.city}, {site.country}
            </p>
            {site.phoneDisplay && (
              <a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="textlink">
                {site.phoneDisplay}
              </a>
            )}
          </address>
          {wa && (
            <a href={wa} className="textlink mt-2 inline-block text-[14px]">
              Message us on WhatsApp
            </a>
          )}
          <p className="mt-3 text-[13px] text-invsec">{site.replyPromise}.</p>
        </div>

        <nav aria-label="The system">
          <p className="overline text-invsec">The system</p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px]">
            <li><Link className="hover:underline" to="/system">The System</Link></li>
            <li><Link className="hover:underline" to={gates.demoPage ? "/demo" : "/#demo"}>See it run</Link></li>
            <li><Link className="hover:underline" to="/process">Process</Link></li>
            <li><Link className="hover:underline" to="/pricing">Pricing</Link></li>
            {gates.results && <li><Link className="hover:underline" to="/results">Results</Link></li>}
          </ul>
        </nav>

        <nav aria-label="Industries">
          <p className="overline text-invsec">Industries</p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px]">
            {verticalList.map((v) => (
              <li key={v.slug}>
                <Link className="hover:underline" to={`/industries/${v.slug}`}>{v.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="overline text-invsec">Company</p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px]">
            <li><Link className="hover:underline" to="/about">About</Link></li>
            <li><Link className="hover:underline" to="/growth-audit">Book a Growth Audit</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-steel">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 px-5 py-6 text-[13px] text-invsec sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
          <p>Real people, in the UAE, who answer their own WhatsApp.</p>
          <p>
            © {site.name} {new Date().getFullYear()} ·{" "}
            <a className="hover:underline" href={site.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
