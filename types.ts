
export enum Category {
  BAGS = 'Bags',
  SHOES = 'Shoes',
  WALLETS = 'Wallets',
  BELTS = 'Belts',
  TRAVEL = 'Travel',
  CLUTCHES = 'Clutches',
  JACKETS = 'Jackets',
  WATCHES = 'Watches',
  COVERS = 'Covers',
  ACCESSORIES = 'Accessories'
}

export enum Gender {
  MEN = 'Men',
  WOMEN = 'Women',
  UNISEX = 'Unisex',
  KIDS = 'Kids'
}

export enum LeatherType {
  FULL_GRAIN = 'Full Grain',
  TOP_GRAIN = 'Top Grain',
  GENUINE = 'Genuine',
  SUEDE = 'Suede',
  VEGAN = 'Vegan'
}

export enum CollectionType {
  REGULAR = 'Regular Wear',
  PARTY = 'Party Wear',
  OFFICE = 'Office Essentials',
  TRAVEL = 'Travel Suite'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  gender: Gender;
  leatherType: LeatherType;
  collectionType: CollectionType;
  description: string;
  images: string[];
  colors: string[];
  style: string;
  rating: number;
  stock: number;
  reviews: Review[];
  craftsmanship: string;
  careInstructions: string;
  deliveryEstimate: string;
  // New fields for advanced filtering
  brand: string;
  size: string[];
  availability: 'In Stock' | 'Out of Stock' | 'Pre-order';
  isNew: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserPreferences {
  language: string;
  mood: string;
  category: Gender | 'Corporate Gifting';
  budgetRange: [number, number];
  style: string;
}

export interface CartItem extends Product {
  quantity: number;
  giftWrap: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentId: string;
  timestamp: any;
  shippingAddress: string;
}

export enum OrderStatus {
  ORDERED = 'Ordered',
  PACKED = 'Packed',
  SHIPPED = 'Shipped',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered'
}
