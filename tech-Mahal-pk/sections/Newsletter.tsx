"use client";

import { useState, FormEvent } from "react";
import { FiSend, FiCheck } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Demo-only: no backend is wired up yet. In production this would POST
    // to an email provider (Mailchimp/Klaviyo/custom API route).
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-max">
        <Reveal className="glass-card mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center sm:p-12">
          <div>
            <p className="eyebrow justify-center">Stay In The Loop</p>
            <h2 className="section-title">
              Get New Deals <span className="accent">First.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-platinum-400">
              Subscribe for early access to flash deals, new arrivals, and restock alerts.
              No spam — just genuinely good prices.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-platinum-500 focus:border-gold-500/50 focus:outline-none"
            />
            <button type="submit" className="btn-primary btn-sm flex-shrink-0 justify-center">
              {submitted ? (
                <>
                  <FiCheck size={14} /> Subscribed
                </>
              ) : (
                <>
                  <FiSend size={14} /> Subscribe
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
