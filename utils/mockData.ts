
import { Category, Gender, LeatherType, CollectionType, Product, Review } from '../types';

/**
 * CENTRAL PRICING CONFIGURATION (Affordable Luxury Strategy)
 */
export const CENTRAL_PRICING_CONFIG: Record<string, { min: number; max: number }> = {
  [Category.BAGS]: { min: 1499, max: 3999 },
  [Category.WATCHES]: { min: 1999, max: 4999 },
  [Category.JACKETS]: { min: 3499, max: 6999 },
  [Category.SHOES]: { min: 2499, max: 4999 },
  [Category.WALLETS]: { min: 499, max: 1499 },
  [Category.BELTS]: { min: 699, max: 1499 },
  [Category.TRAVEL]: { min: 2999, max: 7999 },
  [Category.CLUTCHES]: { min: 1299, max: 2999 },
  [Category.COVERS]: { min: 399, max: 1299 },
  [Category.ACCESSORIES]: { min: 399, max: 1299 }
};

const LEATHER_TYPES = [LeatherType.FULL_GRAIN, LeatherType.TOP_GRAIN, LeatherType.SUEDE, LeatherType.GENUINE, LeatherType.VEGAN];
const GENDERS = [Gender.MEN, Gender.WOMEN, Gender.UNISEX];
const COLORS = ["Burgundy", "Cognac", "Jet Black", "Midnight Blue", "Forest Green", "Tan", "Cherry Red", "Slate Gray", "Mahogany"];
const BRANDS = ["VELRA Legacy", "Atelier X", "Sovereign Hide", "Nomad Crafts"];

const SAMPLE_REVIEW_COMMENTS = [
  "The grain on this leather is simply unmatched. A true masterpiece.",
  "Smells like pure luxury from the moment I opened the cedar box.",
  "Better than any international brand I've owned. Indian craftsmanship at its peak.",
  "Sturdy, elegant, and the patina is developing beautifully after just a week.",
  "A timeless acquisition. I've already received so many compliments.",
  "The attention to detail in the stitching is absolute perfection."
];

const generateReviews = (): Review[] => {
  return Array.from({ length: Math.floor(Math.random() * 4) + 2 }).map((_, i) => ({
    id: `rev-${Math.random()}`,
    userName: ["Arjun K.", "Priya S.", "Vikram R.", "Ananya M.", "Rohan D."][Math.floor(Math.random() * 5)],
    rating: 4 + Math.random(),
    comment: SAMPLE_REVIEW_COMMENTS[Math.floor(Math.random() * SAMPLE_REVIEW_COMMENTS.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('en-IN')
  }));
};

const IMAGE_LIBRARY: Record<string, string[]> = {
  [Category.BAGS]: [
    "https://i.pinimg.com/736x/eb/29/e5/eb29e5913fd13e7155a931801b34f714.jpg",
    "https://i.pinimg.com/736x/71/3d/fe/713dfe6bd909db4c91d7725722e6dd3f.jpg",
    "https://i.pinimg.com/736x/08/4c/59/084c592aef3a193c15f49ab8a567fbfd.jpg",
    "https://i.pinimg.com/736x/6b/db/30/6bdb3013783ce731effc69c5197303a9.jpg",
  ],
  [Category.WATCHES]: [
    "https://upload.wikimedia.org/wikipedia/commons/6/60/Black_Leather_Watch.jpg",
    "https://m.media-amazon.com/images/I/71b-mbTSfxL._AC_UX679_.jpg",
  ],
  [Category.JACKETS]: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
  ],
  [Category.SHOES]: [
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
  ]
};

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = Object.values(Category);
  
  categories.forEach((cat) => {
    const images = IMAGE_LIBRARY[cat] || IMAGE_LIBRARY[Category.BAGS];
    const pricing = CENTRAL_PRICING_CONFIG[cat] || { min: 1000, max: 5000 };
    
    for (let i = 0; i < 6; i++) {
      const id = `${cat.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`;
      products.push({
        id,
        name: `${cat} ${String.fromCharCode(65 + i)}`,
        price: Math.floor(Math.random() * (pricing.max - pricing.min + 1)) + pricing.min,
        category: cat,
        gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
        leatherType: LEATHER_TYPES[Math.floor(Math.random() * LEATHER_TYPES.length)],
        collectionType: CollectionType.REGULAR,
        description: `Exquisitely handcrafted ${cat} made from the finest materials. A timeless piece for the discerning collector.`,
        images: [images[i % images.length], images[(i + 1) % images.length]].filter(Boolean),
        colors: [COLORS[i % COLORS.length], COLORS[(i + 2) % COLORS.length]].filter(Boolean),
        style: "Classic",
        rating: 4.5 + Math.random() * 0.5,
        stock: Math.floor(Math.random() * 20),
        reviews: generateReviews(),
        craftsmanship: "Meticulously hand-stitched with 100% precision by our master artisans.",
        careInstructions: "Wipe with a soft, damp cloth. Use professional leather cleaner for deep cleaning.",
        deliveryEstimate: "3-5 Business Days",
        brand: BRANDS[Math.floor(Math.random() * BRANDS.length)],
        size: cat === Category.SHOES || cat === Category.JACKETS ? ["S", "M", "L", "XL"] : ["One Size"],
        availability: 'In Stock',
        isNew: i === 0 || i === 2
      });
    }
  });
  
  return products;
};

export const MOCK_PRODUCTS = generateProducts();

export const fetchBoutiqueCatalog = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 1000);
  });
};
