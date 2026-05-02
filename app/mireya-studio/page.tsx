import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function MireyaStudioLogin() {
  const session = await readAdminSession();
  if (session) {
    redirect("/mireya-studio/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fbf7f3] px-4 py-10 text-stone-900">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden lg:block">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#c46070]">Private studio</p>
          <h1 className="font-serif text-6xl leading-[0.95] text-[#2d2426]">
            Mireya operations, tucked quietly away.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-stone-600">
            Manage products, orders, homepage copy, pricing, stock, and content from one secure workspace.
          </p>
        </section>

        <section className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(45,36,38,0.08)] sm:p-8">
          <div className="mb-8">
            <p className="mb-2 font-serif text-3xl text-[#c46070]">Mireya</p>
            <h2 className="text-xl font-bold text-stone-900">Studio sign in</h2>
            <p className="mt-2 text-sm text-stone-500">Authorized administrators only.</p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
