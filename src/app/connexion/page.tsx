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
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-black/5 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
            B
          </div>
          <h1 className="text-3xl font-bold text-heading">Connexion</h1>
          <p className="mt-2 text-base text-ink/60">Accédez à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-base text-red-600">{error}</div>
          )}

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

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-base text-ink/60">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-accent hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
