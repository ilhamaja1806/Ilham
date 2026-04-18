
export type Category = 'All' | 'Bomber' | 'Denim' | 'Windbreaker' | 'Vintage' | 'Varsity' | 'Parka' | 'Sukajan' | 'Puffer';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  secondaryImage?: string;
  sizes: string[];
  isNew?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  productIds?: string[]; // Referensi produk yang direkomendasikan AI
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  helpfulCount: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'In Transit' | 'Delivered';

export type PaymentMethod = 'QRIS' | 'Bank Transfer' | 'E-Wallet';

export interface OrderTrackPoint {
  status: string;
  location: string;
  time: string;
  isCompleted: boolean;
}

export interface Order {
  id: string;
  receiptNumber: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  trackingHistory: OrderTrackPoint[];
}
