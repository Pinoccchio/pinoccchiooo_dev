import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PesoJar case study",
  description: "Full-stack Flutter development with local-first SQLite storage, authenticated cloud synchronization, and subscription integration.",
  alternates: { canonical: "https://pinoccchiooo-dev.vercel.app/case-studies/pesojar" },
}

export default function PesoJarCaseStudy() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--text-primary)] sm:px-10 sm:py-16">
      <article className="mx-auto max-w-5xl">
        <Link href="/#projects" className="text-sm text-[var(--text-secondary)] underline underline-offset-4">← All portfolio projects</Link>
        <header className="mb-12 mt-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Client project · Flutter + backend + administration</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">PesoJar</h1>
          <p className="mt-5 text-xl leading-relaxed sm:text-2xl">Personal finance workflows that start on the device and connect to the cloud.</p>
          <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">I handled full-stack development as the sole developer during my JohnV MEDIA practicum, covering the Flutter application, local storage and synchronization, account access, subscription integration, and protected administration.</p>
          <dl className="mt-8 grid gap-6 border-y border-[var(--border)] py-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">My role</dt><dd className="mt-2 text-sm">Sole full-stack developer</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Practicum</dt><dd className="mt-2 text-sm">July–August 2026 · JohnV MEDIA</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Core stack</dt><dd className="mt-2 text-sm">Flutter · SQLite · Cloudflare</dd></div>
          </dl>
        </header>
        <section className="mb-10 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Keep everyday finance tasks close to the user</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A budgeting app needs to make recording and reviewing money straightforward. PesoJar organizes personal finance around jars and transactions, with a local-first data model so those records live on the device while authenticated synchronization connects them to cloud services.</p>
        </section>
        <figure className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
          <Image src="/pesojar-thumbnail.jpg" alt="PesoJar public website introducing its budgeting app and jar-based finance interface" width={1280} height={800} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 1024px" />
          <figcaption className="p-5 text-sm leading-6 text-[var(--text-secondary)]">The public website introduces PesoJar and previews its mobile budgeting experience.</figcaption>
        </figure>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Local storage first, authenticated sync second</h2>
          <p className="leading-8 text-[var(--text-secondary)]">The Flutter app stores finance data in SQLite. Cloud synchronization runs through a Cloudflare Worker API, with Better Auth for account access and Cloudflare D1 for cloud records. Cloudflare R2 supports profile image storage.</p>
          <p className="leading-8 text-[var(--text-secondary)]">The sync implementation marks local changes as pending and collects them for upload. When merging cloud records, it checks for pending local edits rather than replacing them blindly. This separates everyday app interactions from the work of reconciling local and remote data.</p>
        </section>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Keep subscription routing in the backend</h2>
          <p className="leading-8 text-[var(--text-secondary)]">The app requests a billing destination from the Worker and opens the returned URL. The backend controls routing to plan selection, Stripe Checkout, or the billing portal. Keeping that decision behind the API allows billing routing to change without hardcoding checkout links into the mobile app.</p>
          <p className="leading-8 text-[var(--text-secondary)]">My scope also included a protected Next.js administration interface. Together, the mobile app, Worker, and administration tools cover the user experience and the backend services supporting it.</p>
        </section>
        <section className="max-w-3xl space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-semibold">What I delivered</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A Flutter finance application backed by local storage, authenticated cloud synchronization, subscription integration, and administration workflows. The work connected mobile interfaces with storage, APIs, and account services across the full stack.</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <a href="https://pesojar.com/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:bg-[var(--surface-secondary)]">Visit live website ↗</a>
            <Link href="/case-studies/picklepark" className="inline-flex px-5 py-3 text-sm underline underline-offset-4">Read the PicklePark case study →</Link>
          </div>
        </section>
      </article>
    </main>
  )
}
