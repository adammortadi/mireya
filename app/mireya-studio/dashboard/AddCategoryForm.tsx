"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CategoryImageUpload from "./CategoryImageUpload";

interface AddCategoryFormProps {
  createCategoryAction: (formData: FormData) => Promise<any>;
}

export default function AddCategoryForm({ createCategoryAction }: AddCategoryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resetKey, setResetKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // Auto-generate slug if it's not manually customized
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await createCategoryAction(formData);
      setStatus("success");
      formRef.current?.reset();
      setName("");
      setSlug("");
      setResetKey((key) => key + 1);
      router.refresh();
      // Reset success banner after 3 seconds
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
          🎉 La catégorie a été créée avec succès !
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700 border border-red-200">
          ❌ Échec de la création de la catégorie. Veuillez réessayer.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Nom de la Catégorie</label>
          <input
            name="name"
            required
            value={name}
            onChange={handleNameChange}
            disabled={status === "loading"}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50"
            placeholder="Ex: T-Shirts, Accessoires"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Slug URL</label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={status === "loading"}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50"
            placeholder="t-shirts"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Description</label>
        <textarea
          name="description"
          disabled={status === "loading"}
          className="min-h-[100px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50"
          placeholder="Brève description de la catégorie..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Image de la Catégorie</label>
        <CategoryImageUpload key={resetKey} name="image" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-[#2d2426] px-5 py-4 text-sm font-bold tracking-widest text-white uppercase transition hover:bg-[#c46070] disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {status === "loading" ? "Création en cours..." : "Créer la catégorie"}
      </button>
    </form>
  );
}
