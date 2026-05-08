"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

type CategoryOption = {
  id: string;
  name: string;
};

export default function AddProductForm({ categories, createProductAction }: { categories: CategoryOption[], createProductAction: (formData: FormData) => Promise<void> }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resetKey, setResetKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await createProductAction(formData);
      setStatus("success");
      formRef.current?.reset();
      setResetKey((key) => key + 1);
      router.refresh();
      // Hide success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6" encType="multipart/form-data">
      {status === "success" && (
        <div className="rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700 border border-green-200">
          🎉 Le produit a été ajouté avec succès !
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700 border border-red-200">
          ❌ Échec de l&apos;ajout du produit. Veuillez réessayer.
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Nom du produit</label>
        <input name="name" required disabled={status === "loading"} className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Prix (MAD)</label>
          <input name="price" required type="number" step="0.01" disabled={status === "loading"} className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Stock Initial</label>
          <input name="stock" required type="number" defaultValue="1" disabled={status === "loading"} className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Catégorie</label>
        <select name="categoryId" required disabled={status === "loading"} className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50">
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Description</label>
        <textarea name="description" required disabled={status === "loading"} className="min-h-[120px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50" />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Photos du produit</label>
        <ImageUpload key={resetKey} />
      </div>

      <button type="submit" disabled={status === "loading"} className="w-full rounded-xl bg-[#2d2426] px-5 py-4 text-sm font-bold tracking-widest text-white uppercase transition hover:bg-[#c46070] disabled:opacity-70 flex items-center justify-center gap-2">
        {status === "loading" ? "Enregistrement en cours..." : "Enregistrer le produit"}
      </button>
    </form>
  );
}
