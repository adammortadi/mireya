"use client";

export default function Newsletter() {
  return (
    <section className="bg-white py-20 px-6 border-t border-[#f7e8e8]">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-[26px] font-serif text-[#444] mb-4">Join the Mireya Club</h2>
        <p className="text-[13px] text-[#888] mb-10 leading-relaxed">
          Subscribe to get updates on new drops, exclusive patterns, and 10% off your first order.
        </p>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full border-b border-[#ddd] bg-transparent px-1 py-3 text-[14px] text-center focus:outline-none focus:border-[#e07a8a] transition-colors placeholder:text-[#ccc]"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-[11px] font-semibold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity mt-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
