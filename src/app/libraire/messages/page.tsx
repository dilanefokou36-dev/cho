import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NewMessageForm } from "./NewMessageForm";
import { MarkAsReadButton } from "./MarkAsReadButton";

export default async function LibraireMessagesPage() {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as Record<string, unknown>)?.id as string);

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-heading">Messages</h1>
        <p className="mt-1 text-sm text-ink">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="mb-8 rounded-2xl border border-black/5 bg-white p-12 text-center shadow-sm">
          <p className="text-ink">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="mb-8 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-5 shadow-sm ${
                !msg.read && msg.receiverId === userId
                  ? "border-accent/20 bg-accent/5"
                  : "border-black/5 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-heading">
                    {msg.subject || "(Sans objet)"}
                  </p>
                  <p className="mt-1 text-sm text-ink line-clamp-2">
                    {msg.content}
                  </p>
                  <p className="mt-2 text-xs text-ink">
                    {msg.senderId === userId
                      ? `À ${msg.receiver.name || "Utilisateur"}`
                      : `De ${msg.sender.name || "Utilisateur"}`}
                    {" · "}
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {!msg.read && msg.receiverId === userId && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                      Nouveau
                    </span>
                  )}
                  {msg.read && (
                    <span className="text-xs text-green-600">Lu</span>
                  )}
                  {!msg.read && msg.receiverId === userId && (
                    <MarkAsReadButton messageId={msg.id} isReceiver={true} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-heading">
          Envoyer un message à l&apos;administration
        </h2>
        <NewMessageForm admins={admins} />
      </div>
    </div>
  );
}
