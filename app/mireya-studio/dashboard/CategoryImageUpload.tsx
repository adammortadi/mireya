"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";

interface CategoryImageUploadProps {
  name?: string;
  defaultValue?: string;
  onClear?: () => void;
}

export default function CategoryImageUpload({
  name = "image",
  defaultValue = "",
  onClear,
}: CategoryImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(defaultValue);
  }, [defaultValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setPreview("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative mx-auto aspect-video max-w-sm rounded-xl overflow-hidden border border-stone-200 group bg-stone-50">
          <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 transition hover:border-[#c46070] hover:bg-[#fde4e4]/30 p-6">
          <Camera className="h-7 w-7 text-stone-400" />
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
              Choisir une image de catégorie
            </p>
            <p className="text-[9px] text-stone-400 mt-1 uppercase tracking-wider">
              PNG, JPG, WebP jusqu'à 5MB
            </p>
          </div>
          <input
            ref={inputRef}
            name={name}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
