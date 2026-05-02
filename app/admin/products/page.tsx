import Link from "next/link";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  ExternalLink,
  Edit,
  Trash2
} from "lucide-react";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-1">Products</h1>
          <p className="text-gray-500 text-sm">Manage your product catalog and inventory.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-[#c46070] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#b05060] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Product
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none bg-gray-50 border-none rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-[#fde4e4] outline-none">
            <option>All Categories</option>
            <option>Pouches</option>
            <option>Tote Bags</option>
            <option>Accessories</option>
          </select>
          <select className="flex-1 sm:flex-none bg-gray-50 border-none rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-[#fde4e4] outline-none">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#fde4e4]/30 flex-shrink-0 flex items-center justify-center p-1.5">
                        <img 
                          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200" 
                          alt="Product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">E-Reader Pouch</p>
                        <p className="text-[10px] text-gray-400 font-mono">MIR-PRD-00{item}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Pouches</td>
                  <td className="px-6 py-4 font-medium text-gray-900">Dh 322.00</td>
                  <td className="px-6 py-4 text-gray-600">12</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/product/kindle-pouch`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View on Store"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="p-2 text-gray-400 group-hover:hidden">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
