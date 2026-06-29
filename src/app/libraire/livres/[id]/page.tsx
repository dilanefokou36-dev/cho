"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ModifierLivrePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    status: "DRAFT",
  });

  useEffect(() => {
    fetch(`/api/libraire/livres/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          author: data.author || "",
          description: data.description || "",
          price: data.price != null ? String(data.price) : "",
          category: data.category || "",
          imageUrl: data.imageUrl || "",
          status: data.status || "DRAFT",
        });
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/libraire/livres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: form.price ? parseFloat(form.price) : null,
      }),
    });

    if (res.ok) {
      router.push("/libraire/livres");
    } else {
      const data = await res.json();
      alert(data.error || "Une erreur est survenue");
      setLoading(false);
    }
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
      <h1 className="mb-6 text-2xl font-bold text-heading">Modifier le livre</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-black/5 bg-white p-8 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Titre *
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Auteur
          </label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-heading">
              Prix (€)
            </label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-heading">
              Statut
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            >
              <option value="DRAFT">Brouillon</option>
              <option value="PENDING">Soumettre</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            Catégorie
          </label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-heading">
            URL de l&apos;image
          </label>
          <input
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-canvas"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
