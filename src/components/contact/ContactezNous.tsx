"use client";

import { FormEvent, useState } from "react";

export function ContactezNous() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title text-center">Contactez-nous</h2>
        <p className="section-intro mx-auto text-center">
          Une question sur le métier de libraire ? Envoyez-nous un message.
        </p>

        {sent && (
          <div className="card-minimal mt-10 text-center">
            <p className="text-lg font-medium text-heading">Message envoyé !</p>
            <p className="mt-2 text-ink/70">Nous vous répondrons dans les plus brefs délais.</p>
            <button type="button" className="btn-outline mt-6" onClick={() => setSent(false)}>
              Envoyer un autre message
            </button>
          </div>
        )}

        {!sent && (
          <form onSubmit={handleSubmit} className="card-minimal mt-10 space-y-5">
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-heading">
                Votre nom
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
                placeholder="Ex: Jean Dupont"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-heading">
                Votre adresse email
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="mt-1 w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
                placeholder="exemple@email.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-heading">
                Votre message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                disabled={loading}
                className="mt-1 w-full resize-y rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
                placeholder="Votre message..."
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-60">
              {loading ? "Envoi en cours…" : "Envoyer le message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}