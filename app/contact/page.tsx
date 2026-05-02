import ContactForm from "@/components/storefront/ContactForm";

export const metadata = {
  title: "Contact | Mireya",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 container mx-auto px-6 max-w-2xl">
      <div className="text-center mb-16">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
          Get in Touch
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
          Have a question about your order, a custom request, or just want to say hi? We&apos;d love to hear from you.
        </p>
      </div>

      <ContactForm />

      <div className="mt-16 text-center border-t border-gray-100 pt-12 text-sm text-gray-400 space-y-2">
        <p>You can also reach us on Instagram</p>
        <a href="#" className="font-medium text-gray-700 hover:text-[#E07A8A] transition-colors">
          @mireya.thebrand
        </a>
      </div>
    </div>
  );
}
