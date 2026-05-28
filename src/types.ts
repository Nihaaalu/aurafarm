export interface Watch {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  description: string;
  stock: boolean;
  featured: boolean;
  category: string;
}

export interface CartItem {
  watch: Watch;
  quantity: number;
}

export type PageType = 'home' | 'collection' | 'details' | 'about' | 'contact';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
