import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  // VARSITY
  {
    id: '1',
    name: 'Neo-Retro Varsity Jacket',
    price: 499000,
    description: 'Siluet varsity klasik dengan lengan faux leather premium dan badan wol kepadatan tinggi. Menampilkan bordir tanda tangan JTRIFT "J" yang ikonik.',
    category: 'Varsity',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    stock: 12
  },
  {
    id: '15',
    name: 'Brooklyn Eagle Varsity',
    price: 525000,
    description: 'Varsity jacket dengan patch bordir elang raksasa di bagian punggung. Menggunakan kombinasi warna navy dan cream yang sangat vintage.',
    category: 'Varsity',
    image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    sizes: ['L', 'XL', 'XXL'],
    stock: 4
  },
  
  // WINDBREAKER & COACH
  {
    id: '2',
    name: 'Vanquisher Coach Jacket',
    price: 429000,
    description: 'Coach jacket ikonik dengan sablon "Vanquisher" teknikal di bagian punggung. Menggunakan bahan taslan anti-air dengan detail grafis yang tajam.',
    category: 'Windbreaker',
    image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=800', 
    secondaryImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    stock: 18
  },
  {
    id: '7',
    name: 'Cyberpunk Anorak',
    price: 445000,
    description: 'Anorak jacket dengan kantong kanguru besar di depan. Bahan microfiber waterproof, sangat cocok untuk outfit techwear.',
    category: 'Windbreaker',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    stock: 10
  },

  // SUKAJAN
  {
    id: '8',
    name: 'Ryu Dragon Sukajan',
    price: 649000,
    description: 'Jaket souvenir (Sukajan) dengan bordir naga full-back. Bahan satin premium yang berkilau mewah dengan detail jahitan yang sangat rumit.',
    category: 'Sukajan',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    stock: 5
  },
  {
    id: '9',
    name: 'Koi Fish Reversible Sukajan',
    price: 699000,
    description: 'Jaket dua sisi (reversible). Sisi depan bordir ikan koi, sisi dalam minimalis. Satu jaket untuk dua gaya berbeda.',
    category: 'Sukajan',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    sizes: ['L', 'XL'],
    stock: 3
  },

  // DENIM
  {
    id: '3',
    name: 'Vintage Wash Denim',
    price: 589000,
    description: '14oz heavy denim dengan detail custom hand-distressed. Setiap potong memiliki pola wash yang unik.',
    category: 'Denim',
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    stock: 8
  },

  // PARKA
  {
    id: '11',
    name: 'Arctic Explorer Parka',
    price: 729000,
    description: 'Parka panjang dengan penutup kepala (hoodie) berbulu. Tahan angin dan air, dirancang untuk cuaca dingin ekstrem.',
    category: 'Parka',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
    sizes: ['L', 'XL', 'XXL'],
    isNew: true,
    stock: 6
  },
  {
    id: '12',
    name: 'Urban Field Parka',
    price: 549000,
    description: 'M-65 inspired field parka. Memiliki 4 kantong besar di depan, sangat fungsional untuk membawa barang-barang harian.',
    category: 'Parka',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    stock: 12
  },

  // PUFFER
  {
    id: '13',
    name: 'Onyx Cloud Puffer',
    price: 599000,
    description: 'Puffer jacket dengan volume besar (oversized). Menggunakan isian dacron berkualitas yang ringan namun sangat empuk.',
    category: 'Puffer',
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L'],
    isNew: true,
    stock: 9
  },

  // BOMBER
  {
    id: '4',
    name: 'Midnight Bomber Jacket',
    price: 459000,
    description: 'Satin finish yang halus dengan lapisan dalam quilted. Kantong utilitas di lengan kiri untuk nuansa militer otentik.',
    category: 'Bomber',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L'],
    stock: 15
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Aditya Pratama',
    rating: 5,
    comment: 'Gila sih kualitasnya! Varsity jacketnya beneran heavy duty. Detail bordirnya rapih banget, gak kalah sama brand luar.',
    date: '2 hari yang lalu',
    productName: 'Neo-Retro Varsity Jacket',
    helpfulCount: 12
  },
  {
    id: 'r8',
    userName: 'Fajar Ramadhan',
    rating: 5,
    comment: 'Sukajannya juara! Bordir naganya detail banget, gak ada benang lepas sama sekali. Berasa pake brand Jepang harga jutaan.',
    date: '1 minggu yang lalu',
    productName: 'Ryu Dragon Sukajan',
    helpfulCount: 24
  },
  {
    id: 'r2',
    userName: 'Siti Rahma',
    rating: 5,
    comment: 'Coach jacketnya anti airnya oke banget. Pas buat motoran malem-malem di Bekasi. Design punggungnya standout parah!',
    date: '1 minggu yang lalu',
    productName: 'Vanquisher Coach Jacket',
    helpfulCount: 8
  },
  {
    id: 'r4',
    userName: 'Kevin Sanjaya',
    rating: 5,
    comment: 'Akhirnya nemu brand lokal yang concern sama detail wash denimnya. Gak nyesel nunggu batch terbarunya.',
    date: '1 bulan yang lalu',
    productName: 'Vintage Wash Denim',
    helpfulCount: 15
  }
];

export const FORMAT_CURRENCY = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};
