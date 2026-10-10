import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pay247 case study",
  description: "A HighLevel and Xendit payment connector with OAuth setup, provider verification, webhook processing, and a verified sandbox checkout.",
  alternates: { canonical: "https://pinoccchiooo-dev.vercel.app/case-studies/pay247" },
}

export default function Pay247CaseStudy() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--text-primary)] sm:px-10 sm:py-16">
      <article className="mx-auto max-w-5xl">
        <Link href="/#projects" className="text-sm text-[var(--text-secondary)] underline underline-offset-4">← All portfolio projects</Link>
        <header className="mb-12 mt-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Payment integration · Sandbox pilot</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Pay247</h1>
          <p className="mt-5 text-xl leading-relaxed sm:text-2xl">Connect a checkout to a verified payment—and bring the result back to the order.</p>
          <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">I implemented a HighLevel and Xendit payment connector covering OAuth merchant setup, checkout mapping, provider verification, and native webhook processing.</p>
          <dl className="mt-8 grid gap-6 border-y border-[var(--border)] py-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">My role</dt><dd className="mt-2 text-sm">Full-stack integration developer</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Integration</dt><dd className="mt-2 text-sm">HighLevel · Xendit · Webhooks</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Verified milestone</dt><dd className="mt-2 text-sm">₱100 sandbox checkout · October 9, 2026</dd></div>
          </dl>
        </header>
        <section className="mb-10 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">The payment must match the order</h2>
          <p className="leading-8 text-[var(--text-secondary)]">A checkout opening successfully is only one step. The connector needs to associate the payment with the correct merchant and order, verify the provider&apos;s result, and synchronize that result back to HighLevel. Pay247 coordinates that flow between the two services.</p>
        </section>
        <figure className="mb-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
          <Image src="/pay247-thumbnail.jpg" alt="Pay247 product preview introducing Xendit payments inside HighLevel" width={1280} height={800} className="h-auto w-full" sizes="(max-width: 1024px) 100vw, 1024px" />
          <figcaption className="p-5 text-sm leading-6 text-[var(--text-secondary)]">Public product preview. The dashboard shown uses sample data.</figcaption>
        </figure>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Verify the provider before confirming payment</h2>
          <p className="leading-8 text-[var(--text-secondary)]">I implemented authenticated setup and checkout mapping, then connected native Xendit notifications to the stored payment records. The receiver validates callback authentication and payment identity, checks the provider&apos;s payment state, and sends the confirmed result to HighLevel.</p>
          <p className="leading-8 text-[var(--text-secondary)]">Payment records preserve the association between merchant, order, and provider session. Event deduplication and synchronization controls handle repeated notifications and overlapping callbacks so the connector can retry a failed confirmation without treating each callback as a new payment.</p>
        </section>
        <section className="mb-12 max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold">Follow the result across every system</h2>
          <p className="leading-8 text-[var(--text-secondary)]">The recorded October 9 sandbox test used a ₱100 GCash checkout. Xendit confirmed the capture, Pay247 persisted the payment result, and the native payment-session and payment-capture events processed on their first delivery. HighLevel showed a Succeeded transaction and a Completed/Paid order, while the customer browser displayed the success screen.</p>
          <p className="leading-8 text-[var(--text-secondary)]">That test checked the connection from checkout through provider capture and webhook processing to the final order state. It gave the integration a concrete, traceable sandbox milestone.</p>
        </section>
        <section className="max-w-3xl space-y-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-semibold">Current scope</h2>
          <p className="leading-8 text-[var(--text-secondary)]">The verified result covers the hosted sandbox pilot. Live payments, self-service merchant onboarding, and an actual multi-merchant lifecycle require their own validation. The public website presents the product and its interactive preview.</p>
          <div className="flex flex-wrap gap-3 pt-4">
            <a href="https://pay247.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:bg-[var(--surface-secondary)]">Visit product preview ↗</a>
            <Link href="/case-studies/pesojar" className="inline-flex px-5 py-3 text-sm underline underline-offset-4">Read the PesoJar case study →</Link>
          </div>
        </section>
      </article>
    </main>
  )
}
