"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import CategoryImageUpload from "./CategoryImageUpload";
import { Plus, X } from "lucide-react";

type CategoryOption = {
  id: string;
  name: string;
};

interface AddProductFormProps {
  categories: CategoryOption[];
  createProductAction: (formData: FormData) => Promise<void>;
  createCategoryAction: (formData: FormData) => Promise<{ id: string; name: string }>;
}

export default function AddProductForm({
  categories,
  createProductAction,
  createCategoryAction,
}: AddProductFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resetKey, setResetKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Local categories state to allow instant additions
  const [localCategories, setLocalCategories] = useState<CategoryOption[]>(categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Quick category creation state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickCatName, setQuickCatName] = useState("");
  const [quickCatSlug, setQuickCatSlug] = useState("");
  const [quickCatDesc, setQuickCatDesc] = useState("");
  const [quickCatStatus, setQuickCatStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [quickCatResetKey, setQuickCatResetKey] = useState(0);

  // Sync with prop updates
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleQuickCatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuickCatName(value);
    setQuickCatSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  async function handleQuickCatSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!quickCatName.trim()) return;

    setQuickCatStatus("loading");
    try {
      const formData = new FormData();
      formData.append("name", quickCatName);
      formData.append("slug", quickCatSlug);
      formData.append("description", quickCatDesc);
      
      // Get the image file if selected
      const quickCatForm = document.getElementById("quick-cat-form") as HTMLFormElement;
      if (quickCatForm) {
        const fileInput = quickCatForm.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput && fileInput.files?.[0]) {
          formData.append("image", fileInput.files[0]);
        }
      }

      const newCat = await createCategoryAction(formData);
      
      // Update local state instantly
      setLocalCategories((prev) => [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedCategoryId(newCat.id);

      setQuickCatStatus("success");
      setQuickCatName("");
      setQuickCatSlug("");
      setQuickCatDesc("");
      setQuickCatResetKey((k) => k + 1);
      
      // Close after brief success delay
      setTimeout(() => {
        setShowQuickAdd(false);
        setQuickCatStatus("idle");
      }, 1000);

      router.refresh();
    } catch (err) {
      console.error(err);
      setQuickCatStatus("error");
    }
  }

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await createProductAction(formData);
      setStatus("success");
      formRef.current?.reset();
      setSelectedCategoryId("");
      setResetKey((key) => key + 1);
      router.refresh();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
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

      <form ref={formRef} action={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Catégorie</label>
            {!showQuickAdd && (
              <button
                type="button"
                onClick={() => setShowQuickAdd(true)}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#c46070] hover:text-[#2d2426] transition-colors"
              >
                <Plus className="w-3 h-3" /> Nouvelle Catégorie
              </button>
            )}
          </div>
          
          <select
            name="categoryId"
            required
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            disabled={status === "loading"}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4] disabled:opacity-50"
          >
            <option value="">Sélectionner une catégorie</option>
            {localCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {showQuickAdd && (
          <div id="quick-cat-form" className="rounded-2xl border border-[#fde4e4] bg-[#fdfafb] p-5 space-y-4 transition-all duration-300">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <h4 className="font-serif text-sm font-bold text-[#2d2426]">Ajouter rapidement une catégorie</h4>
              <button
                type="button"
                onClick={() => setShowQuickAdd(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {quickCatStatus === "success" && (
              <div className="rounded-lg bg-green-50 p-2.5 text-xs font-bold text-green-700 border border-green-200">
                🎉 Catégorie ajoutée et sélectionnée !
              </div>
            )}
            {quickCatStatus === "error" && (
              <div className="rounded-lg bg-red-50 p-2.5 text-xs font-bold text-red-700 border border-red-200">
                ❌ Échec de la création.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Nom</label>
                <input
                  value={quickCatName}
                  onChange={handleQuickCatNameChange}
                  disabled={quickCatStatus === "loading"}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#c46070]"
                  placeholder="Accessoires"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Slug</label>
                <input
                  value={quickCatSlug}
                  onChange={(e) => setQuickCatSlug(e.target.value)}
                  disabled={quickCatStatus === "loading"}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#c46070]"
                  placeholder="accessoires"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Description</label>
              <textarea
                value={quickCatDesc}
                onChange={(e) => setQuickCatDesc(e.target.value)}
                disabled={quickCatStatus === "loading"}
                className="min-h-[60px] w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#c46070]"
                placeholder="Description de la catégorie..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-stone-400">Image</label>
              <CategoryImageUpload key={quickCatResetKey} name="quick-cat-image" />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowQuickAdd(false)}
                className="rounded-lg border border-stone-200 px-4 py-2 text-xs font-bold text-stone-500 hover:bg-stone-50 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleQuickCatSubmit}
                disabled={quickCatStatus === "loading" || !quickCatName.trim()}
                className="rounded-lg bg-[#2d2426] px-4 py-2 text-xs font-bold text-white hover:bg-[#c46070] transition disabled:opacity-50"
              >
                {quickCatStatus === "loading" ? "Création..." : "Ajouter"}
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
}
