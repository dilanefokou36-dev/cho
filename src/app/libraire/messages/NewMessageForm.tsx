"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Admin {
  id: number;
  name: string | null;
}

export function NewMessageForm({ admins }: { admins: Admin[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        content,
        receiverId: admins[0]?.id,
      }),
    });

    if (res.ok) {
      setSubject("");
      setContent("");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Une erreur est survenue");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-heading">Objet</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-heading">Message *</label>
        <textarea
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
