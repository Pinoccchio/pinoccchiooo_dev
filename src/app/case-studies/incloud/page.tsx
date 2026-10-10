import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "InCloud case study",
  description: "How I independently built inventory administration and customer ordering across Next.js, Flutter, and Supabase for J.A's Food Trading.",
  alternates: { canonical: "https://pinoccchiooo-dev.vercel.app/case-studies/incloud" },
}

const inventoryScreen = "/repo_screenshots/incloud/Screenshots/Screenshot 2026-03-01 002305.png"
const customerScreen = "/repo_screenshots/incloud/Screenshots/Screenshot 2026-03-01 003452.png"

export default function InCloudCaseStudy() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--text-primary)] sm:px-10 sm:py-16">
      <article className="mx-auto max-w-5xl">
        <Link href="/#projects" className="text-sm text-[var(--text-secondary)] underline underline-offset-4">← All portfolio projects</Link>
        <header className="mt-12 mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Client project · Web + mobile</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">InCloud</h1>
          <p className="mt-5 text-xl leading-relaxed sm:text-2xl">Inventory administration and customer ordering, connected across web and mobile.</p>
          <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">I independently built the Next.js staff interface, Flutter customer application, and backend inventory and order workflows for J.A&apos;s Food Trading.</p>
          <dl className="mt-8 grid gap-6 border-y border-[var(--border)] py-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">My role</dt><dd className="mt-2 text-sm">Sole full-stack developer</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Core stack</dt><dd className="mt-2 text-sm">Next.js · Flutter · Supabase</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Project preview</dt><dd className="mt-2 text-sm">Actual application screenshots</dd></div>
          </dl>
        </header>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Two workflows, one connected system</h2>
          <p className="leading-8 text-[var(--text-secondary)]">Staff need detailed controls for products, stock, batches, suppliers, and orders. Customers need a simpler way to find products, build a cart, and follow their orders from a phone. I built separate interfaces around those different tasks, connected through Supabase-backed inventory and order records.</p>
        </section>
        <section className="mb-12">
          <div className="mb-6 max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold">A workspace for inventory operations</h2>
            <p className="leading-8 text-[var(--text-secondary)]">The Next.js administration interface brings product management, stock information, batch tracking, expiration dates, and inventory actions into a staff workspace. I also implemented supplier, order, reporting, authentication, and user administration workflows.</p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
            <Image src={inventoryScreen} alt="InCloud inventory administration showing stock statuses, product batches, expiration dates, and inventory actions" width={1914} height={907} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 1024px" />
            <figcaption className="p-5 text-sm leading-6 text-[var(--text-secondary)]">Inventory administration: stock status, batch details, and product controls in one view.</figcaption>
          </figure>
        </section>
        <section className="mb-12 grid items-start gap-8 sm:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">A customer experience built for a phone</h2>
            <p className="leading-8 text-[var(--text-secondary)]">The Flutter application focuses on product search, filtering, product details, cart interactions, and order tracking. Customers can see prices and available stock while browsing, with cart access close to the product list.</p>
            <h3 className="pt-4 text-lg font-semibold">Why separate the interfaces?</h3>
            <p className="leading-8 text-[var(--text-secondary)]">Inventory administration requires dense information and detailed controls. Mobile ordering needs a focused browsing flow. Using Next.js for staff and Flutter for customers let me shape each interface around its users while connecting their inventory and order workflows through the backend.</p>
          </div>
          <figure className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
            <Image src={customerScreen} alt="InCloud mobile product browsing with search, filters, prices, available stock, and cart access" width={435} height={1000} className="h-auto w-full" sizes="300px" />
            <figcaption className="p-4 text-sm leading-6 text-[var(--text-secondary)]">Customer product browsing in the Flutter app.</figcaption>
          </figure>
        </section>
        <section className="max-w-3xl space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-semibold">What I delivered</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A web administration interface, a mobile customer application, and the backend workflows connecting them. I handled the frontend, backend, and application integration independently. The portfolio gallery documents the implemented screens across inventory operations and customer ordering.</p>
          <Link href="/projects/incloud-system" className="mt-4 inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:bg-[var(--surface-secondary)]">Explore the screenshot gallery →</Link>
        </section>
      </article>
    </main>
  )
}
