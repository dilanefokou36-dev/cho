"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkAsReadButton({ messageId, isReceiver }: { messageId: number; isReceiver: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!isReceiver) return null;

  async function handleClick() {
    setLoading(true);
    await fetch(`/api/messages/${messageId}`, { method: "PATCH" });
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
    >
      {loading ? "..." : "Marquer comme lu"}
    </button>
  );
}
