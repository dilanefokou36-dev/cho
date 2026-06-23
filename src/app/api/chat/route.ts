import { NextRequest } from "next/server";

const FAQ: Record<string, string> = {
  "horaires": "Les librairies au Cameroun ouvrent généralement de 8h à 18h30, du lundi au samedi. Certaines fermet le dimanche et les jours fériés.",
  "salaire": "Le salaire d'un libraire au Cameroun varie entre 50 000 et 200 000 FCFA selon l'expérience et la structure.",
  "formation": "Plusieurs formations existent : Bacc (Littérature), BTS (Commerce), Licence (Lettres modernes), Master (Métiers du livre).",
  "prix": "Le prix du livre au Cameroun est fixé par l'éditeur ou l'importateur. La libraire applique une marge d'environ 30%.",
  "fournisseur": "Les libraires s'approvisionnement auprès des éditeurs locaux (CLE, PUY) et des distributeurs (Dilicom, Hachette).",
};

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) {
      return Response.json({ answer: "Posez votre question sur le métier de libraire." });
    }

    const questionLower = question.toLowerCase();
    for (const [key, answer] of Object.entries(FAQ)) {
      if (questionLower.includes(key)) {
        return Response.json({ answer });
      }
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json({
        answer: "Je suis un assistant spécialisé sur le métier de libraire au Cameroun. Posez-moi une question sur les horaires, les salaires, les formations, les fournisseurs ou tout autre aspect du métier."
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          {
            role: "system",
            content: "Tu es un expert du métier de libraire au Cameroun. Réponds en français de façon concise et claire (max 5 phrases). Si la question ne concerne pas le métier de libraire, dis poliment que tu ne peux pas répondre.",
          },
          { role: "user", content: question },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const txt = await res.text();
      console.error("OpenRouter error:", res.status, txt);
      return Response.json({ answer: trouverReponseLocale(questionLower) });
    }

    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    return Response.json({ answer: answer || trouverReponseLocale(questionLower) });
  } catch (e) {
    console.error("Chat error:", e instanceof Error ? e.message : String(e));
    return Response.json({ answer: trouverReponseLocale("") });
  }
}

function trouverReponseLocale(q: string): string {
  for (const [key, answer] of Object.entries(FAQ)) {
    if (q.includes(key)) return answer;
  }
  return "Je suis un assistant sur le métier de libraire. Posez-moi une question sur les horaires, salaires, formations, fournisseurs, etc.";
}