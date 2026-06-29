"use client";

import { useEffect, useState } from "react";

interface MessageUser {
  id: number;
  name: string | null;
  email: string;
}

interface Message {
  id: number;
  subject: string | null;
  content: string;
  read: boolean;
  createdAt: string;
  sender: MessageUser;
  receiver: MessageUser;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then(setMessages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id: number) => {
    await fetch(`/api/messages/${id}`, { method: "PATCH" });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-ink">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Messages</h1>
        <p className="mt-1 text-sm text-ink">
          Consultez les messages envoyés sur la plateforme.
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border border-black/5 bg-white shadow-card transition-all ${
              !msg.read ? "ring-2 ring-accent/10" : ""
            }`}
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === msg.id ? null : msg.id)
              }
              className="flex w-full items-center gap-4 px-6 py-4 text-left"
            >
              <div
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  msg.read ? "bg-gray-300" : "bg-accent"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-heading">
                  {msg.subject || "(Sans objet)"}
                </p>
                <p className="truncate text-xs text-ink">
                  {msg.sender.name || msg.sender.email} &rarr;{" "}
                  {msg.receiver.name || msg.receiver.email}
                </p>
              </div>
              <span className="shrink-0 text-xs text-ink">
                {new Date(msg.createdAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              {!msg.read && (
                <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  Nouveau
                </span>
              )}
              {msg.read && (
                <span className="shrink-0 text-xs text-green-600">
                  Lu
                </span>
              )}
            </button>

            {expandedId === msg.id && (
              <div className="border-t border-black/5 px-6 py-4">
                <div className="mb-3 text-sm text-ink">
                  <p>
                    <strong>De :</strong> {msg.sender.name || msg.sender.email}
                  </p>
                  <p>
                    <strong>À :</strong> {msg.receiver.name || msg.receiver.email}
                  </p>
                  <p>
                    <strong>Date :</strong>{" "}
                    {new Date(msg.createdAt).toLocaleString("fr-FR", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="mb-4 whitespace-pre-wrap rounded-xl bg-canvas p-4 text-sm text-ink">
                  {msg.content}
                </div>
                {!msg.read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="rounded-2xl border border-black/5 bg-white p-12 text-center text-sm text-ink">
            Aucun message.
          </div>
        )}
      </div>
    </div>
  );
}
