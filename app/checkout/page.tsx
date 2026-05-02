"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/useCart";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const address = String(formData.get("address") || "");

    // Construct the WhatsApp message
    let message = `*NEW ORDER - MIREYA*\n\n`;
    message += `*Customer Details:*\n`;
    message += `- Name: ${name}\n`;
    message += `- Phone: ${phone}\n`;
    message += `- Address: ${address}\n\n`;
    
    message += `*Order Summary:*\n`;
    items.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}) - Dh ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*TOTAL: Dh ${total.toFixed(2)} MAD*\n\n`;
    message += `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212679956653?text=${encodedMessage}`;

    // Small delay to show loader for a premium feel
    setTimeout(() => {
      clearCart();
      window.location.href = whatsappUrl;
    }, 1000);
  }

  if (orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16 text-center">
        <div className="max-w-md">
          <CheckCircle className="mx-auto mb-6 h-14 w-14 text-[#e07a8a]" strokeWidth={1.5} />
          <h1 className="mb-3 font-serif text-[34px] text-[#444]">Order received</h1>
          <p className="mb-8 text-[13px] leading-relaxed text-[#888]">
            Thank you. Your Mireya order is saved and ready for studio review.
          </p>
          <Link href="/shop" className="rounded-full bg-[#fde4e4] px-9 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c46070]">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e07a8a]">Secure checkout</p>
          <h1 className="mb-8 font-serif text-[36px] text-[#444]">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone"].map((field) => (
              <input
                key={field}
                name={field}
                required
                type={field === "email" ? "email" : "text"}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="w-full rounded-[18px] border border-[#f7e8e8] px-5 py-4 text-[13px] outline-none transition focus:border-[#e07a8a]"
              />
            ))}
            <textarea
              name="address"
              required
              rows={4}
              placeholder="Delivery address"
              className="w-full rounded-[18px] border border-[#f7e8e8] px-5 py-4 text-[13px] outline-none transition focus:border-[#e07a8a]"
            />
            {error && <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-600">{error}</p>}
            <button
              disabled={loading || items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
              Place order
            </button>
          </form>
        </section>

        <aside className="lg:sticky lg:top-32 h-fit rounded-[28px] bg-[#FFFBFB] p-6">
          <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-[#888]">Order summary</h2>
          {items.length > 0 ? (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.images[0] || "/favicon.ico"} alt={item.name} className="h-16 w-16 rounded-[16px] bg-[#fde4e4]/40 object-contain p-2" />
                  <div className="flex-1">
                    <p className="text-[13px] text-[#555]">{item.name}</p>
                    <p className="text-[11px] text-[#aaa]">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[12px] font-bold text-[#555]">Dh {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between border-t border-[#f7e8e8] pt-5 text-[13px] font-bold text-[#444]">
                <span>Total</span>
                <span>Dh {total.toFixed(2)} MAD</span>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="mb-6 text-[13px] text-[#aaa]">Your cart is empty.</p>
              <Link href="/shop" className="rounded-full bg-[#fde4e4] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c46070]">
                Shop now
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
