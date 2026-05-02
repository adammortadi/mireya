"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Could not sign in.");
      return;
    }

    localStorage.setItem("mireya-customer", JSON.stringify(data));
    router.push("/shop");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[28px] border border-[#f7e8e8] bg-white p-8 shadow-sm">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e07a8a]">Welcome back</p>
        <h1 className="mb-8 font-serif text-[34px] text-[#444]">Login</h1>
        <div className="space-y-4">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-[18px] border border-[#f7e8e8] px-5 py-4 text-[13px] outline-none focus:border-[#e07a8a]" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded-[18px] border border-[#f7e8e8] px-5 py-4 text-[13px] outline-none focus:border-[#e07a8a]" />
        </div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#fde4e4] py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c46070] transition hover:bg-[#f9c6cb] disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Login
        </button>
        <p className="mt-6 text-center text-[12px] text-[#aaa]">
          No account? <Link href="/register" className="font-bold text-[#c46070]">Register</Link>
        </p>
      </form>
    </div>
  );
}
