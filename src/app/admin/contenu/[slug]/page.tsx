"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/content/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setTitle(slug);
          setContent("{}");
        } else {
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .catch(() => setContent("{}"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/content/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setMessage("✅ Contenu enregistré");
      } else {
        setMessage("❌ Erreur lors de l'enregistrement");
      }
    } catch {
      setMessage("❌ Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-ink/60">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Modifier : {slug}</h1>
        <p className="mt-1 text-sm text-ink/60">
          Éditez le contenu JSON de la page ci-dessous.
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-heading">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-heading">
          Contenu (JSON)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full rounded-xl border border-black/10 px-4 py-2.5 font-mono text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {message && (
        <div className="mb-4 text-sm font-medium">{message}</div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}
