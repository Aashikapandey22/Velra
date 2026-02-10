
import React from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', icon: '🇺🇸' },
  { code: 'hi', name: 'Hindi', icon: '🇮🇳' },
  { code: 'bn', name: 'Bengali', icon: '🇮🇳' },
  { code: 'mr', name: 'Marathi', icon: '🇮🇳' },
  { code: 'fr', name: 'French', icon: '🇫🇷' },
  { code: 'es', name: 'Spanish', icon: '🇪🇸' },
  { code: 'de', name: 'German', icon: '🇩🇪' },
  { code: 'ja', name: 'Japanese', icon: '🇯🇵' },
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    boutique: 'Boutique',
    jackets: 'Jackets',
    shoes: 'Shoes',
    bags: 'Bags',
    search: 'Search Masterworks...',
    login: 'Login',
    profile: 'Profile',
    explore_edits: 'Explore All Edits',
    lookbook: 'Lookbook \'24',
    legacy_works: 'Legacy Works',
    the_collections: 'The Collections',
    start_concierge: 'Start Concierge',
    trust_genuine: 'Genuine Leather',
    trust_warranty: 'Lifetime Warranty',
    trust_secure: 'Secure Payments',
    new_arrivals: 'New Arrivals',
    limited_release: 'Limited Release',
    buy_now: 'Quick Acquire',
    filter_by: 'Filter By',
    category: 'Category',
    material: 'Material',
    color: 'Color',
    price_range: 'Price Range',
    brand: 'Brand',
    rating: 'Rating',
    clear_all: 'Clear All',
    size: 'Size',
    availability: 'Availability',
    results_found: 'Artisan Pieces Curated',
    enter_shop: 'Enter Shop'
  },
  hi: {
    boutique: 'बुटीक',
    jackets: 'जैकेट',
    shoes: 'जूते',
    bags: 'बैग',
    search: 'खोजें...',
    login: 'लॉगिन',
    profile: 'प्रोफ़ाइल',
    explore_edits: 'सभी संग्रह देखें',
    lookbook: 'लुकबुक \'24',
    legacy_works: 'विरासत कार्य',
    the_collections: 'संग्रह',
    start_concierge: 'द्वारपाल शुरू करें',
    trust_genuine: 'असली चमड़ा',
    trust_warranty: 'आजीवन वारंटी',
    trust_secure: 'सुरक्षित भुगतान',
    new_arrivals: 'नया आगमन',
    limited_release: 'सीमित रिलीज',
    buy_now: 'अभी खरीदें',
    filter_by: 'फ़िल्टर करें',
    category: 'श्रेणी',
    material: 'सामग्री',
    color: 'रंग',
    price_range: 'मूल्य सीमा',
    brand: 'ब्रांड',
    rating: 'रेटिंग',
    clear_all: 'सब साफ़ करें',
    size: 'आकार',
    availability: 'उपलब्धता',
    results_found: 'कलात्मक वस्तुएं',
    enter_shop: 'दुकान में प्रवेश करें'
  },
  fr: {
    boutique: 'Boutique',
    jackets: 'Vestes',
    shoes: 'Chaussures',
    bags: 'Sacs',
    search: 'Rechercher...',
    login: 'Connexion',
    profile: 'Profil',
    explore_edits: 'Explorer les collections',
    lookbook: 'Lookbook \'24',
    legacy_works: 'Œuvres héritées',
    the_collections: 'Les Collections',
    start_concierge: 'Démarrer Concierge',
    trust_genuine: 'Cuir Véritable',
    trust_warranty: 'Garantie à vie',
    trust_secure: 'Paiements Sécurisés',
    new_arrivals: 'Nouveautés',
    limited_release: 'Édition Limitée',
    buy_now: 'Acquérir',
    filter_by: 'Filtrer par',
    category: 'Catégorie',
    material: 'Matériau',
    color: 'Couleur',
    price_range: 'Gamme de prix',
    brand: 'Marque',
    rating: 'Note',
    clear_all: 'Effacer tout',
    size: 'Taille',
    availability: 'Disponibilité',
    results_found: 'Pièces Artisanales',
    enter_shop: 'Entrer dans la boutique'
  }
};

export const MOODS = [
  "Festival vibe", "Birthday gifting", "Office use", "Travel", "Daily use", "Wedding", "Luxury occasion", "Student budget"
];

export const STYLES = [
  "Classic", "Modern", "Minimal", "Vintage", "Bold", "Designer"
];

export const CATEGORY_PREFS = [
  "Women", "Men", "Unisex", "Kids", "Corporate gifting"
];

export const CURRENCY = "₹";

export const Icons = {
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  ),
  ShoppingCart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  Heart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  ),
  ChevronRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}><path d="M9 5l7 7-7 7" /></svg>
  ),
  Globe: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" {...props}><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  )
};
