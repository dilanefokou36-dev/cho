"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SubmitBookButton({ bookId }: { bookId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch(`/api/libraire/livres/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "PENDING" }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Erreur lors de la soumission");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="text-sm font-medium text-accent hover:underline disabled:opacity-50"
    >
      {loading ? "..." : "Soumettre"}
    </button>
  );
}
