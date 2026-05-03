import { logoutAdmin } from "../actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  updateCategory,
  updateProduct,
  updateSiteContent,
} from "./actions";
import {
  BarChart3,
  Boxes,
  Edit3,
  ImagePlus,
  LogOut,
  Package,
  Plus,
  Tags,
  Trash2,
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import { DeleteButton } from "./DeleteButton";

function parseImages(images: string) {
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function money(value: number) {
  return `Dh ${value.toFixed(2)}`;
}

export default async function MireyaDashboard() {
  const session = await requireAdmin();
  const [products, categories, orders, content] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ include: { products: true }, orderBy: { name: "asc" } }),
    prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } }),
    prisma.siteContent.findMany(),
  ]);

  const copy = Object.fromEntries(content.map((item) => [item.key, item.value]));
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const stock = products.reduce((sum, product) => sum + product.stock, 0);

  return (
    <main className="min-h-screen bg-[#f8f5f1] text-stone-900">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col lg:flex-row">
        <aside className="sticky top-0 z-20 border-b border-stone-200 bg-[#2d2426] px-5 py-4 text-white lg:h-screen lg:w-72 lg:border-b-0 lg:px-6 lg:py-8">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div>
              <p className="font-serif text-3xl text-[#ffdfe4]">Mireya</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Studio</p>
            </div>
            <form action={logoutAdmin}>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/20">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
          <nav className="mt-8 hidden space-y-1 text-sm font-semibold text-white/60 lg:block">
            {[
              ["Inventory", Package, "inventory"],
              ["Add Product", Plus, "add-product"],
              ["Categories", Tags, "categories"],
              ["Homepage", Edit3, "homepage"],
            ].map(([label, Icon, id]) => (
              <a key={String(id)} href={`#${String(id)}`} className="flex items-center gap-4 rounded-xl border border-transparent px-4 py-3.5 uppercase tracking-[0.2em] text-[10px] font-black transition hover:border-white/10 hover:bg-white/5 hover:text-white">
                <Icon className="h-4 w-4" />
                {String(label)}
              </a>
            ))}
          </nav>
          <p className="mt-8 hidden text-xs leading-6 text-white/45 lg:block">
            Signed in as {session.email}. Admin links stay hidden from the public store.
          </p>
        </aside>

        <section className="flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <header className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c46070]">Secure dashboard</p>
              <h1 className="mt-2 font-serif text-4xl text-[#2d2426]">Welcome back, {session.name}</h1>
            </div>
            <a href="/" className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-bold text-stone-600 transition hover:border-[#c46070] hover:text-[#c46070]">
              View storefront
            </a>
          </header>


          <section id="inventory" className="space-y-6">
            <h2 className="font-serif text-3xl font-bold uppercase tracking-wider text-[#2d2426]">Inventaire</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const images = parseImages(product.images);
                return (
                  <div key={product.id} className="group flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-stone-100 transition hover:shadow-md">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-50 mb-4 relative">
                      <img src={images[0] || "/favicon.ico"} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-[#2d2426] shadow-sm">
                        QTY {product.stock}
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="font-bold text-stone-900 text-lg leading-tight mb-1">{product.name}</h3>
                      <p className="text-sm font-medium text-stone-500 mb-4 font-mono">Dh {product.price.toFixed(2)}</p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100">
                        {/* Hidden form just for the delete button to work properly */}
                        <form className="flex w-full justify-between items-center">
                           <input type="hidden" name="id" value={product.id} />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                             {categories.find(c => c.id === product.categoryId)?.name}
                           </span>
                           <DeleteButton formAction={deleteProduct} itemType="product" />
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="add-product" className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm max-w-3xl">
            <h2 className="mb-8 font-serif text-3xl font-bold uppercase tracking-wider text-[#2d2426]">Nouveau Produit</h2>
            <form action={createProduct} className="space-y-6" encType="multipart/form-data">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Nom du produit</label>
                <input name="name" required className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4]" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Prix (MAD)</label>
                  <input name="price" required type="number" step="0.01" className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Stock Initial</label>
                  <input name="stock" required type="number" defaultValue="1" className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Catégorie</label>
                <select name="categoryId" required className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4]">
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Description</label>
                <textarea name="description" required className="min-h-[120px] w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 outline-none transition focus:border-[#c46070] focus:bg-white focus:ring-4 focus:ring-[#fde4e4]" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Photos du produit</label>
                <ImageUpload />
              </div>

              <button type="submit" className="w-full rounded-xl bg-[#2d2426] px-5 py-4 text-sm font-bold tracking-widest text-white uppercase transition hover:bg-[#c46070]">
                Enregistrer le produit
              </button>
            </form>
          </section>

          <section id="categories" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-serif text-3xl text-[#2d2426]">Categories</h2>
              <form action={createCategory} className="space-y-3" encType="multipart/form-data">
                <input name="name" required placeholder="Name" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
                <input name="slug" placeholder="slug" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
                <textarea name="description" placeholder="Description" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
                <input name="imageUrl" placeholder="Image URL" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm" />
                <button className="w-full rounded-lg bg-[#2d2426] px-4 py-2 text-sm font-bold text-white">Add Category</button>
              </form>
            </div>
            <div className="grid gap-4">
              {categories.map((category) => (
                <form key={category.id} action={updateCategory} className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#c46070]/30" encType="multipart/form-data">
                  <input type="hidden" name="id" value={category.id} />
                  
                  {/* Primary Row */}
                  <div className="flex flex-wrap items-center gap-4">
                    {category.imageUrl && (
                      <img src={category.imageUrl} alt={category.name} className="h-14 w-14 rounded-lg bg-stone-50 object-cover shadow-sm" />
                    )}
                    
                    <div className="flex-1 min-w-[200px]">
                      <input name="name" defaultValue={category.name} placeholder="Category Name" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm font-bold text-stone-800 outline-none focus:border-[#c46070]" />
                    </div>
                    
                    <div className="flex-1 min-w-[150px]">
                      <input name="slug" defaultValue={category.slug} placeholder="Slug" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[#c46070]" />
                    </div>
                    
                    <button type="submit" className="rounded-lg bg-[#2d2426] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#c46070]">
                      Save
                    </button>
                    <DeleteButton formAction={deleteCategory} itemType="category" />
                  </div>

                  {/* Secondary Row (Advanced Settings) */}
                  <div className="grid gap-4 rounded-xl bg-[#fefdfc] p-4 lg:grid-cols-2 border border-stone-100">
                    <textarea name="description" defaultValue={category.description || ""} placeholder="Description" className="min-h-[80px] w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[#c46070]" />
                    <input name="imageUrl" defaultValue={category.imageUrl || ""} placeholder="Image URL (optional)" className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[#c46070]" />
                  </div>
                </form>
              ))}
            </div>
          </section>



          <section id="homepage" className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-serif text-3xl text-[#2d2426]">Homepage Content</h2>
            <form action={updateSiteContent} className="grid gap-3 md:grid-cols-2">
              <input name="bannerTitle" defaultValue={copy.bannerTitle || "Spring Collection"} placeholder="Banner title" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
              <input name="announcement" defaultValue={copy.announcement || "handmade with love in Morocco"} placeholder="Announcement" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
              <textarea name="bannerSubtitle" defaultValue={copy.bannerSubtitle || "Create your dream pouch with unlimited options."} placeholder="Banner subtitle" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
              <textarea name="homeIntro" defaultValue={copy.homeIntro || "Handmade with love in Morocco."} placeholder="Homepage text" className="rounded-lg border border-stone-200 px-3 py-2 text-sm" />
              <button className="rounded-lg bg-[#2d2426] px-4 py-3 text-sm font-bold text-white md:col-span-2">Save homepage text</button>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}
