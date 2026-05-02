"use client";

import { useActionState } from "react";
import { LockKeyhole, Loader2 } from "lucide-react";
import { loginAdmin, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAdmin, {});

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="identity" className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">
          Username or email
        </label>
        <input
          id="identity"
          name="identity"
          type="text"
          autoComplete="username"
          required
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#c46070] focus:ring-4 focus:ring-[#fde4e4]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#c46070] focus:ring-4 focus:ring-[#fde4e4]"
        />
      </div>
      <label className="flex items-center gap-3 text-sm text-stone-600">
        <input name="remember" type="checkbox" defaultChecked className="h-4 w-4 rounded border-stone-300 accent-[#c46070]" />
        Remember this studio session
      </label>
      {state.error && (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2d2426] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c46070] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
        Enter Studio
      </button>
    </form>
  );
}
