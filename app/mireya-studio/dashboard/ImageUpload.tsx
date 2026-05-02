"use client";

import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

export default function ImageUpload() {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dataTransferRef = useRef<DataTransfer>(new DataTransfer());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Add new files to our DataTransfer collection
    files.forEach(file => dataTransferRef.current.items.add(file));
    
    // Sync the input with our collection
    if (inputRef.current) {
      inputRef.current.files = dataTransferRef.current.files;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newDataTransfer = new DataTransfer();
    const files = Array.from(dataTransferRef.current.files);
    
    files.forEach((file, i) => {
      if (i !== index) newDataTransfer.items.add(file);
    });

    dataTransferRef.current = newDataTransfer;
    if (inputRef.current) {
      inputRef.current.files = dataTransferRef.current.files;
    }

    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 transition hover:border-[#c46070] hover:bg-[#fde4e4]/30 p-6">
        <Camera className="h-8 w-8 text-stone-400" />
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
            Glissez des images ici ou cliquez
          </p>
          <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
            {previews.length > 0 ? `${previews.length} images sélectionnées` : "Soutient plusieurs images"}
          </p>
        </div>
        <input 
          ref={inputRef}
          name="image" 
          type="file" 
          accept="image/*" 
          className="hidden" 
          multiple 
          onChange={handleFileChange}
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200 group">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
