"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <span className="text-4xl block mb-6">💌</span>
        <h2 className="font-serif text-2xl text-gray-900 mb-3">Message received!</h2>
        <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            className="border-b border-gray-200 bg-transparent py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="border-b border-gray-200 bg-transparent py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Subject
        </label>
        <input
          type="text"
          required
          placeholder="How can we help?"
          className="border-b border-gray-200 bg-transparent py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell us more..."
          className="border-b border-gray-200 bg-transparent py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300 resize-none"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-12 py-4 bg-[#FFE5E5] text-gray-700 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#FFD1D8] transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
