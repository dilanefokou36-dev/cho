"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">
            B
          </div>
          <h1 className="text-2xl font-bold text-heading">Connexion</h1>
          <p className="mt-1 text-sm text-ink/60">Accédez à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-heading">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="exemple@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-heading">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-accent hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
