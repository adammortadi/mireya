import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Mail, 
  Phone,
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // Mock order data
  const order = {
    id: params.id,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+212 612 345 678",
    address: "123 Rue de la Marche, Casablanca, Morocco",
    date: "Oct 24, 2026, 14:30 PM",
    status: "PENDING",
    total: 450.00,
    items: [
      { id: "1", name: "E-Reader Pouch", handwritten: "sarah", price: 322.00, quantity: 1, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200" },
      { id: "2", name: "Scrunchie Set", handwritten: null, price: 128.00, quantity: 1, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=200" },
    ]
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/orders"
          className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-gray-900 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-gray-900 mb-1">Order Details</h1>
          <p className="text-gray-500 text-sm">Managing order {order.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Order Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Order Items</h2>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{order.items.length} Items</span>
            </div>
            <div className="divide-y divide-gray-50">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-6">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="font-bold text-gray-900">Dh {item.price.toFixed(2)}</p>
                    </div>
                    {item.handwritten && (
                      <p className="text-xs text-[#c46070] mb-2 font-handwriting text-lg">
                        Personalization: "{item.handwritten}"
                      </p>
                    )}
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Dh {order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>Dh {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Timeline / History */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Order Timeline</h2>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center z-10 border-4 border-white">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-400">The customer placed the order through the storefront.</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{order.date}</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center z-10 border-4 border-white">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Awaiting Fulfillment</p>
                  <p className="text-xs text-gray-400">Handmade preparation starting soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Status */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Order Status</h2>
            <div className="space-y-4">
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#fde4e4] transition-all">
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
              </select>
              <button className="w-full bg-[#c46070] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#b05060] transition-all">
                Update Status
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-gray-900">Customer Info</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</p>
                  <p className="text-sm text-gray-900 font-medium">{order.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</p>
                  <p className="text-sm text-gray-900 font-medium">{order.phone}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Address</p>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{order.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
