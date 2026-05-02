export const metadata = {
  title: "Mireya | The Art of Handmade Moroccan Pouches & Personalized Luxury",
  description: "Discover Mireya, where traditional Moroccan craftsmanship meets personalized luxury. Explore our handmade collection of pouches and bags, sewn with love in Morocco.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] bg-[#FFF0F5] overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000"
          alt="Mireya Moroccan Craftsmanship"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c46070] mb-6">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#2d2426] mb-8 leading-[1.1]">
            The Art of <span className="font-handwriting text-[#c46070]">Handmade</span> Luxury
          </h1>
          <p className="font-serif text-lg md:text-xl text-stone-700 max-w-2xl mx-auto italic">
            "Made with love, sewn by hand, born in Morocco."
          </p>
        </div>
      </section>

      {/* Main Article Content */}
      <article className="py-24 container mx-auto px-6 max-w-3xl">
        <div className="space-y-16">
          
          <section>
            <h2 className="font-serif text-3xl text-[#2d2426] mb-8 leading-tight">
              The Essence of Mireya: Where Tradition Meets Modern Elegance
            </h2>
            <div className="prose prose-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                Mireya began with a single, heartfelt vision: to create something that carries the soul of Morocco in every stitch. In an era of mass production and fleeting trends, we chose a different path—the path of <strong>slow fashion</strong> and <strong>genuine craftsmanship</strong>.
              </p>
              
              <h3 className="font-serif text-xl text-[#2d2426] mt-10 mb-4">Crafted by Hand in the Heart of Morocco</h3>
              <p>
                Every Mireya pouch is born in our local Moroccan atelier. We don't use assembly lines; we use human hands. Each piece of fabric is hand-selected for its quality and texture, and every seam is sewn with a level of attention that only a master artisan can provide. This dedication ensures that no two Mireya products are exactly alike—they are as unique as the women who carry them.
              </p>
              
              <h3 className="font-serif text-xl text-[#2d2426] mt-10 mb-4">Slow Fashion for the Conscious Woman</h3>
              <p>
                We believe that quality should never be sacrificed for speed. By embracing slow fashion, we ensure that every product is built to last. Our pouches aren't just accessories; they are companions for your daily life, designed to be beautiful, functional, and durable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-[#2d2426] mb-8 leading-tight">
              Why Personalized Luxury Matters
            </h2>
            <div className="prose prose-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                Luxury is no longer just about a brand name; it's about the connection you have with your belongings. At Mireya, we take this connection personally.
              </p>

              <h3 className="font-serif text-xl text-[#2d2426] mt-10 mb-4">Free Custom Embroidery for Every Order</h3>
              <p>
                We offer free personalization on every pouch we create. Whether it's your name, a special date, or a word that inspires you, our hand-guided embroidery turns a beautiful pouch into a personal treasure. This isn't just an add-on; it's the core of what we do.
              </p>

              <h3 className="font-serif text-xl text-[#2d2426] mt-10 mb-4">A Gift That Tells a Story</h3>
              <p>
                Searching for a meaningful gift? A personalized Mireya pouch is more than just a present—it's a story of care and intention. From the selection of the fabric to the final embroidery, the recipient will feel the love that went into its creation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-3xl text-[#2d2426] mb-8 leading-tight">
              Supporting Local Artisans and Traditional Skills
            </h2>
            <div className="prose prose-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                By choosing Mireya, you are directly supporting the preservation of traditional Moroccan sewing and embroidery techniques. We are proud to provide a space where local artisans can practice their craft with pride and earn a fair wage. Every purchase helps keep these ancient skills alive in a modern world.
              </p>
            </div>
          </section>

          <section className="pt-12 border-t border-stone-100 text-center">
            <h2 className="font-serif text-3xl text-[#2d2426] mb-6 italic">
              Carry a Piece of Morocco With You
            </h2>
            <p className="text-stone-500 mb-10 max-w-xl mx-auto">
              When you carry a Mireya pouch, you aren&apos;t just holding a bag; you&apos;re carrying a legacy of Moroccan love, artistry, and timeless luxury.
            </p>
          </section>

        </div>
      </article>

      {/* Values Stats */}
      <section className="bg-[#FFFBF8] py-24 border-y border-stone-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "100%", label: "Handmade" },
              { number: "0", label: "Mass Production" },
              { number: "MOR", label: "Born in Morocco" },
            ].map((stat) => (
              <div key={stat.label} className="text-center flex flex-col items-center gap-4">
                <span className="font-serif text-5xl text-[#c46070]">{stat.number}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

