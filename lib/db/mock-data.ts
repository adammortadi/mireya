export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isBestSeller?: boolean;
  isPersonalizable?: boolean;
  createdAt: string;
  emoji?: string;
  handwrittenTitle?: string;
  bgColor?: string;
};

export const MIREYA_HERO_IMAGE = "/hero-banner.png";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat_1",
    name: "Pouches",
    slug: "pouches",
    description: "Handmade flat and quilted pouches.",
    imageUrl: "/uploads/categories/cat1.jpeg",
  },
  {
    id: "cat_2",
    name: "Tote Bags",
    slug: "tote-bags",
    description: "Cute fabric bags for your essentials.",
    imageUrl: "/uploads/categories/cat2.jpeg",
  },
  {
    id: "cat_3",
    name: "Personalized",
    slug: "personalized",
    description: "Add your name with custom embroidery.",
    imageUrl: "/uploads/categories/cat3.jpeg",
  },
  {
    id: "cat_4",
    name: "Accessories",
    slug: "accessories",
    description: "Fabric charms and tiny everyday pieces.",
    imageUrl: "/uploads/categories/cat4.jpeg",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    categoryId: "cat_1",
    name: "Spring White Lace Small Pouch",
    slug: "spring-white-lace-small-pouch",
    handwrittenTitle: "white lace",
    emoji: "🤍",
    bgColor: "#FFFDF8",
    description: "A soft handmade pouch for your favorite little essentials.",
    price: 329,
    stock: 20,
    images: ["https://images.pexels.com/photos/34578274/pexels-photo-34578274.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: true,
    isPersonalizable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_2",
    categoryId: "cat_1",
    name: "Granny Cross-Stitch Flat Pouch",
    slug: "granny-cross-stitch-flat-pouch",
    handwrittenTitle: "cross stitch",
    emoji: "🌸",
    bgColor: "#FFF4F6",
    description: "Flat pouch with a soft cottage mood and handmade finish.",
    price: 249,
    stock: 18,
    images: ["https://images.pexels.com/photos/4000503/pexels-photo-4000503.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: true,
    isPersonalizable: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_3",
    categoryId: "cat_3",
    name: "Romantic Embroidery Small Pouch",
    slug: "romantic-embroidery-small-pouch",
    handwrittenTitle: "embroidery",
    emoji: "🪡",
    bgColor: "#FFF0F5",
    description: "Personalized pouch with delicate embroidered details.",
    price: 299,
    stock: 12,
    images: ["https://images.unsplash.com/photo-1591375275714-8b2b55b0bf0d?auto=format&fit=crop&q=80&w=900"],
    isBestSeller: true,
    isPersonalizable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_4",
    categoryId: "cat_1",
    name: "Butter Yellow Lace Flat Pouch",
    slug: "butter-yellow-lace-flat-pouch",
    handwrittenTitle: "butter lace",
    emoji: "💛",
    bgColor: "#FFF8F0",
    description: "A sunny flat pouch for pens, makeup, and daily treasures.",
    price: 199,
    stock: 24,
    images: ["https://images.pexels.com/photos/34578275/pexels-photo-34578275.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: false,
    isPersonalizable: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_5",
    categoryId: "cat_1",
    name: "Honey Mini Pouch",
    slug: "honey-mini-pouch",
    handwrittenTitle: "honey",
    emoji: "🐝",
    bgColor: "#FFF8EA",
    description: "A mini pouch for tiny essentials and soft everyday styling.",
    price: 179,
    stock: 22,
    images: ["https://images.pexels.com/photos/7171399/pexels-photo-7171399.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: false,
    isPersonalizable: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_6",
    categoryId: "cat_2",
    name: "Round Straw Bag",
    slug: "round-straw-bag",
    handwrittenTitle: "straw bag",
    emoji: "🧺",
    bgColor: "#FFF8F0",
    description: "A soft summer bag styled with pastel florals.",
    price: 380,
    stock: 10,
    images: ["https://images.unsplash.com/photo-1768033976342-6dea958334d2?auto=format&fit=crop&q=80&w=900"],
    isBestSeller: false,
    isPersonalizable: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_7",
    categoryId: "cat_3",
    name: "Daisy Spring Small Pouch",
    slug: "daisy-spring-small-pouch",
    handwrittenTitle: "daisy spring",
    emoji: "🌼",
    bgColor: "#F3FBFF",
    description: "A dreamy custom pouch with springtime colors.",
    price: 279,
    stock: 14,
    images: ["https://images.pexels.com/photos/34578274/pexels-photo-34578274.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: true,
    isPersonalizable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_8",
    categoryId: "cat_4",
    name: "Pink Hearts Basket",
    slug: "pink-hearts-basket",
    handwrittenTitle: "pink hearts",
    emoji: "💗",
    bgColor: "#FFF0F5",
    description: "A soft little basket for bedroom, desk, or vanity storage.",
    price: 259,
    stock: 16,
    images: ["https://images.pexels.com/photos/7171399/pexels-photo-7171399.jpeg?auto=compress&cs=tinysrgb&w=900"],
    isBestSeller: false,
    isPersonalizable: false,
    createdAt: new Date().toISOString(),
  },
];

export const getCategories = async () => Promise.resolve(MOCK_CATEGORIES);

export const getProducts = async () => Promise.resolve(MOCK_PRODUCTS);

export const getProductBySlug = async (slug: string) => {
  const product = MOCK_PRODUCTS.find((item) => item.slug === slug);
  return Promise.resolve(product || null);
};

export const getCategoryBySlug = async (slug: string) => {
  const category = MOCK_CATEGORIES.find((item) => item.slug === slug);
  return Promise.resolve(category || null);
};

export const getProductsByCategory = async (categoryId: string) => {
  const products = MOCK_PRODUCTS.filter((item) => item.categoryId === categoryId);
  return Promise.resolve(products);
};
