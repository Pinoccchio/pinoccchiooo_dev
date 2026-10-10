import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PicklePark case study",
  description: "Full-stack development of court booking, Open Play, payments, and facility operations by Jan Miko A. Guevarra.",
  alternates: { canonical: "https://pinoccchiooo-dev.vercel.app/case-studies/picklepark" },
}

export default function PickleParkCaseStudy() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--text-primary)] sm:px-10 sm:py-16">
      <article className="mx-auto max-w-5xl">
        <Link href="/#projects" className="text-sm text-[var(--text-secondary)] underline underline-offset-4">← All portfolio projects</Link>
        <header className="mb-12 mt-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Client project · Responsive web platform</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">PicklePark</h1>
          <p className="mt-5 text-xl leading-relaxed sm:text-2xl">From court booking to the workflows that run a sports facility.</p>
          <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">As the sole full-stack developer during my JohnV MEDIA practicum, I implemented customer booking and staff operations workflows across the frontend, backend, and payment integrations.</p>
          <dl className="mt-8 grid gap-6 border-y border-[var(--border)] py-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">My role</dt><dd className="mt-2 text-sm">Sole full-stack developer</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Practicum</dt><dd className="mt-2 text-sm">July–August 2026 · JohnV MEDIA</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Core stack</dt><dd className="mt-2 text-sm">Next.js · Supabase · PayMongo</dd></div>
          </dl>
        </header>
        <section className="mb-10 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">More than a booking page</h2>
          <p className="leading-8 text-[var(--text-secondary)]">Customers need to find court availability and reserve a session. Staff need to manage the same courts alongside Open Play, tournaments, payments, and day-to-day operations. I built customer-facing and administrative workflows around those connected tasks.</p>
        </section>
        <figure className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
          <Image src="/picklepark-thumbnail.png" alt="PicklePark public website with facility navigation and sign-in access for court booking" width={1920} height={1080} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 1024px" />
          <figcaption className="p-5 text-sm leading-6 text-[var(--text-secondary)]">The public website introduces the facility and gives customers access to availability and booking.</figcaption>
        </figure>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">What I implemented</h2>
          <p className="leading-8 text-[var(--text-secondary)]">My work covered court bookings, Open Play operations, Court Pulse, credits, payment workflows, and tournament and administration tools. I used Next.js, React, and TypeScript for the responsive interface, with Supabase and PostgreSQL for backend data and Realtime updates. Payment workflows integrate PayMongo.</p>
        </section>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Validate a booking where the records live</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A customer can see an available slot, but the backend still needs to check whether the booking is valid. The booking implementation checks authentication, court availability, the expected price, and schedule conflicts before creating the booking and applying its credit charge.</p>
          <p className="leading-8 text-[var(--text-secondary)]">This places the business rules alongside the stored booking and credit records. The interface helps customers choose a session; backend validation decides whether that request can proceed. Open Play conflict checks also account for a player who is already participating during the requested booking time.</p>
        </section>
        <section className="max-w-3xl space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-semibold">What I delivered</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A customer-facing web platform with booking access, supported by implemented facility operations and payment workflows. My practicum contribution covered the full stack, connecting the user interface with the rules and records behind it.</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <a href="https://www.pickleparkph.com/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:bg-[var(--surface-secondary)]">Visit live website ↗</a>
            <Link href="/case-studies/incloud" className="inline-flex px-5 py-3 text-sm underline underline-offset-4">Read the InCloud case study →</Link>
          </div>
        </section>
      </article>
    </main>
  )
}
