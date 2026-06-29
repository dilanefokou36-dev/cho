"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    storeName: "",
    description: "",
    address: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    fetch("/api/libraire/profil")
      .then((res) => res.json())
      .then((data) => {
        setForm({
          storeName: data.storeName || "",
          description: data.description || "",
          address: data.address || "",
          phone: data.phone || "",
          website: data.website || "",
        });
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/libraire/profil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Une erreur est survenue");
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-ink">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Mon profil libraire</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-black/5 bg-white p-8 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Nom de la librairie *
          </label>
          <input
            required
            value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Adresse
          </label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-heading">
              Téléphone
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-heading">
              Site web
            </label>
            <input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
