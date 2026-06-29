"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  endpoint: string;
  type?: "libraire" | "livre";
  currentStatus?: string;
}

export function AdminActions({ endpoint, type, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showValidity, setShowValidity] = useState(false);
  const [validityDays, setValidityDays] = useState("30");

  async function handleAction(status: string, extra?: Record<string, unknown>) {
    setLoading(status);
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ...extra }),
    });
    if (res.ok) {
      setShowValidity(false);
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Une erreur est survenue");
      setLoading(null);
    }
  }

  if (type === "libraire" && currentStatus === "APPROVED") {
    return (
      <button
        onClick={() => handleAction("REVOKED")}
        disabled={loading != null}
        className="rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700 transition-colors hover:bg-orange-200 disabled:opacity-50"
      >
        {loading === "REVOKED" ? "..." : "Révoquer"}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {type === "libraire" && !showValidity && (
        <button
          onClick={() => setShowValidity(true)}
          disabled={loading != null}
          className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 disabled:opacity-50"
        >
          Approuver
        </button>
      )}

      {type === "libraire" && showValidity && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-2">
          <span className="text-xs text-green-800">Validité</span>
          <select
            value={validityDays}
            onChange={(e) => setValidityDays(e.target.value)}
            className="rounded border border-green-300 px-2 py-1 text-xs"
          >
            <option value="7">7 jours</option>
            <option value="15">15 jours</option>
            <option value="30">30 jours</option>
            <option value="90">90 jours</option>
            <option value="365">1 an</option>
            <option value="">Permanent</option>
          </select>
          <button
            onClick={() =>
              handleAction("APPROVED", {
                validityDays: validityDays ? parseInt(validityDays) : null,
              })
            }
            disabled={loading != null}
            className="rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading === "APPROVED" ? "..." : "OK"}
          </button>
          <button
            onClick={() => setShowValidity(false)}
            className="text-xs text-red-600 hover:underline"
          >
            Annuler
          </button>
        </div>
      )}

      {type !== "libraire" && (
        <button
          onClick={() => handleAction("APPROVED")}
          disabled={loading != null}
          className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 disabled:opacity-50"
        >
          {loading === "APPROVED" ? "..." : "Approuver"}
        </button>
      )}

      {(!type || currentStatus !== "APPROVED") && (
        <button
          onClick={() => handleAction("REJECTED")}
          disabled={loading != null}
          className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
        >
          {loading === "REJECTED" ? "..." : "Refuser"}
        </button>
      )}
    </div>
  );
}
