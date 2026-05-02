"use client";

import { useCart } from "@/lib/store/useCart";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, closeCart, removeItem, updateQuantity } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[60] transition-opacity duration-500"
          onClick={toggleCart}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.04)] transform transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-[#f7e8e8]">
          <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#444]">Your Cart</h2>
          <button onClick={toggleCart} className="p-2 -mr-2 text-gray-300 hover:text-black transition-colors">
            <X className="w-5 h-5" strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 pb-20">
              <div className="w-16 h-16 rounded-full bg-[#fde4e4]/30 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#e07a8a]" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-[15px] font-serif text-[#555]">Your cart is empty</p>
                <p className="text-[12px] text-[#bbb] tracking-wide">Add your favorite pouches to get started ✨</p>
              </div>
              <button 
                onClick={toggleCart}
                className="mt-4 px-10 py-3.5 bg-[#fde4e4] text-[#c46070] text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-90 transition-all rounded-full shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10 py-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div 
                    className="w-24 h-24 rounded-[18px] overflow-hidden flex-shrink-0 relative"
                    style={{ backgroundColor: item.bgColor || '#fde4e4' }}
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex flex-col flex-1 py-0.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[13px] font-medium text-[#444] mb-1">{item.name}</h3>
                        <p className="text-[12px] text-[#bbb] mb-3">Dh {item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-gray-300 hover:text-[#e07a8a] transition-colors p-1 -mt-1 -mr-1"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-[#eee] rounded-full px-1.5 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="p-1 text-gray-300 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3" strokeWidth={2} />
                        </button>
                        <span className="text-[12px] px-3 font-medium text-[#555] min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="p-1 text-gray-300 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3" strokeWidth={2} />
                        </button>
                      </div>
                      <span className="text-[13px] font-medium text-[#555]">
                        Dh {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-[#f7e8e8]">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]">
                <span>Subtotal</span>
                <span className="text-[#444]">Dh {total.toFixed(2)} MAD</span>
              </div>
              <p className="text-[11px] text-[#bbb] tracking-wide text-center italic">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-black text-white py-4 rounded-full text-center text-[11px] font-bold tracking-[0.25em] uppercase hover:opacity-90 transition-all shadow-lg shadow-black/5"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
