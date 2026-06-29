"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"VISITOR" | "LIBRAIRE">("VISITOR");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const body: Record<string, unknown> = { name, email, password, role };

    if (role === "LIBRAIRE") {
      if (!storeName) {
        setError("Le nom de votre librairie est requis");
        return;
      }
      body.storeName = storeName;
      body.phone = phone;
      body.city = city;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur lors de l'inscription");
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInRes?.ok) {
      router.push(role === "LIBRAIRE" ? "/libraire" : "/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-black/5 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
            B
          </div>
          <h1 className="text-3xl font-bold text-heading">Inscription</h1>
          <p className="mt-2 text-base text-ink/60">Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-base text-red-600">{error}</div>
          )}

          {/* Choix du rôle */}
          <div className="rounded-xl border border-black/5 bg-canvas p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink/50">
              Vous êtes ?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("VISITOR")}
                className={`flex-1 rounded-lg border-2 px-5 py-4 text-center font-medium transition-all ${
                  role === "VISITOR"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-transparent bg-white text-ink/60 hover:border-black/10"
                }`}
              >
                <span className="block text-xl">👤</span>
                Visiteur
              </button>
              <button
                type="button"
                onClick={() => setRole("LIBRAIRE")}
                className={`flex-1 rounded-lg border-2 px-5 py-4 text-center font-medium transition-all ${
                  role === "LIBRAIRE"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-transparent bg-white text-ink/60 hover:border-black/10"
                }`}
              >
                <span className="block text-xl">📖</span>
                Libraire
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-heading">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-heading">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="exemple@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-heading">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="••••••••"
            />
          </div>

          {role === "LIBRAIRE" && (
            <>
              <div>
                <label className="mb-1.5 block font-medium text-heading">
                  Nom de votre librairie <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Librairie du Centre"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block font-medium text-heading">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="6XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-medium text-heading">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="Yaoundé"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Créer mon compte
          </button>
        </form>

        <p className="mt-6 text-center text-base text-ink/60">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-accent hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
