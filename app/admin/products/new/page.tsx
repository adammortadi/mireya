"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus,
  Save,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl("");
    }
  };

  const removeImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-gray-900 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-1">Add Product</h1>
          <p className="text-gray-500 text-sm">Create a new item in your collection.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Basic Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Product Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Lavender Pouch"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Handwritten Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. lavender pouch"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell your customers about this product..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Price (MAD)</label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Inventory</label>
                  <input 
                    required
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Emoji</label>
                  <input 
                    type="text"
                    placeholder="🌸"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Media</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
                />
                <button 
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all"
                >
                  Add
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group">
                    <img src={img} alt="Product" className="w-full h-full object-contain" />
                    <button 
                      type="button"
                      onClick={() => removeImage(img)}
                      className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#fde4e4] hover:text-[#c46070] transition-all cursor-pointer">
                  <Upload className="w-6 h-6" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Organization */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Organization</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Category</label>
                <select required className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] outline-none transition-all">
                  <option value="">Select a category</option>
                  <option value="cat_1">Pouches</option>
                  <option value="cat_2">Tote Bags</option>
                  <option value="cat_3">Personalized</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-400">Card Background</label>
                <div className="flex gap-2">
                  {['#FFF0F5', '#FFF4F6', '#FFF8F0', '#F0F8FF'].map((color) => (
                    <button 
                      key={color}
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input 
                    type="text"
                    placeholder="#HEX"
                    className="flex-1 px-3 py-1 bg-gray-50 border-none rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-900">Best Seller</p>
                  <p className="text-[11px] text-gray-400">Featured on homepage</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#c46070] focus:ring-[#fde4e4]" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-900">Personalizable</p>
                  <p className="text-[11px] text-gray-400">Enable custom name field</p>
                </div>
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#c46070] focus:ring-[#fde4e4]" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              disabled={loading}
              className="w-full bg-[#c46070] text-white py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#b05060] transition-all shadow-lg shadow-[#c46070]/10 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Product
            </button>
            <Link 
              href="/admin/products"
              className="w-full bg-white text-gray-500 py-4 rounded-2xl text-sm font-bold flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all"
            >
              Discard
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
