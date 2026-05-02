import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

export default function AdminCategories() {
  const categories = [
    { id: "cat_1", name: "Pouches", slug: "pouches", products: 12, imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200" },
    { id: "cat_2", name: "Tote Bags", slug: "tote-bags", products: 5, imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=200" },
    { id: "cat_3", name: "Personalized", slug: "personalized", products: 8, imageUrl: "https://images.unsplash.com/photo-1616428619176-50346c4f8d53?auto=format&fit=crop&q=80&w=200" },
    { id: "cat_4", name: "Accessories", slug: "accessories", products: 15, imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-1">Categories</h1>
          <p className="text-gray-500 text-sm">Organize your products into collections.</p>
        </div>
        <button className="bg-[#c46070] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#b05060] transition-all shadow-sm">
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="h-40 bg-gray-50 relative overflow-hidden">
              <img 
                src={cat.imageUrl} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-lg">{cat.name}</h3>
                <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  {cat.products} Products
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mb-6">slug: {cat.slug}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Link 
                  href={`/category/${cat.slug}`} 
                  target="_blank"
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-[#c46070] hover:underline"
                >
                  View Category
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
