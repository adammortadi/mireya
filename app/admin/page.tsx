import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  ArrowUpRight
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "Dh 12,450.00", icon: TrendingUp, change: "+12.5%", color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Orders", value: "8", icon: ShoppingCart, change: "+2 today", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Products", value: "24", icon: Package, change: "4 categories", color: "text-[#c46070]", bg: "bg-[#fde4e4]" },
    { label: "Customers", value: "156", icon: Users, change: "+8 this week", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl text-gray-900 mb-2">Welcome back, Admin</h1>
        <p className="text-gray-500">Here's what's happening with Mireya today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded">
                Realtime
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <span className={`text-[11px] font-bold ${stat.color} mb-1 flex items-center gap-0.5`}>
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <button className="text-[11px] font-bold tracking-widest uppercase text-[#c46070] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {[1, 2, 3, 4, 5].map((order) => (
                  <tr key={order} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#c46070]">#MIR-102{order}</td>
                    <td className="px-6 py-4 text-gray-600">Sarah Johnson</td>
                    <td className="px-6 py-4 text-gray-400">Oct 24, 2026</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">Dh 450.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Store Activity</h2>
          <div className="space-y-6">
            {[
              { icon: Package, text: "New product 'Lavender Pouch' added", time: "2 hours ago" },
              { icon: ShoppingCart, text: "New order received #MIR-1025", time: "4 hours ago" },
              { icon: Clock, text: "Order #MIR-1022 marked as shipped", time: "6 hours ago" },
              { icon: Users, text: "New customer registered", time: "1 day ago" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-700 leading-snug">{activity.text}</p>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
