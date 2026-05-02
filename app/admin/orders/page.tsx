import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function AdminOrders() {
  const orders = [
    { id: "MIR-1025", customer: "Sarah Johnson", email: "sarah@example.com", date: "Oct 24, 2026", total: 450.00, status: "PENDING", items: 2 },
    { id: "MIR-1024", customer: "Amine Benali", email: "amine@example.com", date: "Oct 23, 2026", total: 189.00, status: "SHIPPED", items: 1 },
    { id: "MIR-1023", customer: "Layla Idrissi", email: "layla@example.com", date: "Oct 22, 2026", total: 820.00, status: "DELIVERED", items: 3 },
    { id: "MIR-1022", customer: "Youssef Tazi", email: "youssef@example.com", date: "Oct 22, 2026", total: 244.00, status: "PROCESSING", items: 1 },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-700";
      case "PROCESSING": return "bg-blue-100 text-blue-700";
      case "SHIPPED": return "bg-purple-100 text-purple-700";
      case "DELIVERED": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-1">Orders</h1>
          <p className="text-gray-500 text-sm">Track and manage customer purchases.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-100 p-2.5 rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
            <Filter className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
            <input 
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#fde4e4] transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl w-fit">
        {["All Orders", "Pending", "Processing", "Shipped", "Delivered"].map((tab) => (
          <button 
            key={tab}
            className={`px-6 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all ${
              tab === "All Orders" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-[#c46070] font-bold">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600">{order.items} items</td>
                  <td className="px-6 py-4 font-bold text-gray-900">Dh {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
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
