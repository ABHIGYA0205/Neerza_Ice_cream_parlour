// Sample data for static rendering when API is unavailable
export const sampleCategories = [
  { _id: '1', name: 'Ice Creams', slug: 'ice-creams', icon: '🍦', image: '/images/icecream.jpeg' },
  { _id: '2', name: 'Milk', slug: 'milk', icon: '🥛', image: '/images/milk.jpeg' },
  { _id: '3', name: 'Butter', slug: 'butter', icon: '🧈', image: '/images/butter.jpeg' },
  { _id: '4', name: 'Cheese', slug: 'cheese', icon: '🧀', image: '/images/cheese.jpeg' },
  { _id: '5', name: 'Paneer', slug: 'paneer', icon: '🫕', image: '/images/paneer.jpeg' },
  { _id: '6', name: 'Ghee', slug: 'ghee', icon: '✨', image: '/images/ghee.jpeg' },
  { _id: '7', name: 'Curd & Dahi', slug: 'curd-dahi', icon: '🥣', image: '/images/dahi.jpeg' },
  { _id: '8', name: 'Lassi & Beverages', slug: 'lassi-beverages', icon: '🥤', image: '/images/lassi.jpeg' },
  { _id: '9', name: 'Chocolates', slug: 'chocolates', icon: '🍫', image: '/images/chocalates.jpeg' },
  { _id: '10', name: 'Cookies', slug: 'cookies', icon: '🍪', image: '/images/cookies.jpeg' },
  { _id: '11', name: 'Sweets', slug: 'sweets', icon: '🍬', image: '/images/sweets.jpeg' },
  { _id: '12', name: 'Cream', slug: 'cream', icon: '🍶', image: '/images/Cream.jpeg' },
  { _id: '13', name: 'Frozen Foods', slug: 'frozen-foods', icon: '🧊', image: '/images/icecream.jpeg' },
];

export const sampleProducts = [
  { _id: 'p1', name: 'Amul Chocolate Cone', description: 'Rich chocolate ice cream cone', price: 40, discount: 0, quantity: '110ml', brand: 'Amul', category: { _id: '1', name: 'Ice Creams', slug: 'ice-creams' }, images: ['/images/icecream.jpeg'], stock: 50, availability: true, isFeatured: true, isBestSeller: true },
  { _id: 'p2', name: 'Amul Vanilla Magic', description: 'Creamy vanilla flavored ice cream', price: 30, discount: 10, quantity: '100ml', brand: 'Amul', category: { _id: '1', name: 'Ice Creams', slug: 'ice-creams' }, images: ['/images/icecream.jpeg'], stock: 40, availability: true, isBestSeller: true },
  { _id: 'p3', name: 'Amul Butter 500g', description: 'India\'s favourite pasteurized butter', price: 275, discount: 0, quantity: '500g', brand: 'Amul', category: { _id: '3', name: 'Butter', slug: 'butter' }, images: ['/images/butter.jpeg'], stock: 30, availability: true, isFeatured: true, isBestSeller: true },
  { _id: 'p4', name: 'Amul Cheese Block 200g', description: 'Processed cheese block', price: 105, discount: 0, quantity: '200g', brand: 'Amul', category: { _id: '4', name: 'Cheese', slug: 'cheese' }, images: ['/images/cheese.jpeg'], stock: 35, availability: true, isBestSeller: true },
  { _id: 'p5', name: 'Amul Gold Milk', description: 'Full cream milk', price: 35, discount: 0, quantity: '500ml', brand: 'Amul', category: { _id: '2', name: 'Milk', slug: 'milk' }, images: ['/images/milk.jpeg'], stock: 100, availability: true, isBestSeller: true },
  { _id: 'p6', name: 'Amul Pure Ghee 500ml', description: 'Pure cow ghee', price: 340, discount: 0, quantity: '500ml', brand: 'Amul', category: { _id: '6', name: 'Ghee', slug: 'ghee' }, images: ['/images/ghee.jpeg'], stock: 20, availability: true, isBestSeller: true },
  { _id: 'p7', name: 'Amul Dark Chocolate', description: 'Premium dark chocolate 55% cocoa', price: 125, discount: 10, quantity: '150g', brand: 'Amul', category: { _id: '9', name: 'Chocolates', slug: 'chocolates' }, images: ['/images/chocalates.jpeg'], stock: 30, availability: true, isFeatured: true },
  { _id: 'p8', name: 'Amul Lassi Mango', description: 'Sweet mango thick lassi', price: 30, discount: 0, quantity: '200ml', brand: 'Amul', category: { _id: '8', name: 'Lassi & Beverages', slug: 'lassi-beverages' }, images: ['/images/lassi.jpeg'], stock: 45, availability: true, isBestSeller: true },
  { _id: 'p9', name: 'Amul Fresh Paneer 200g', description: 'Fresh and soft cottage cheese', price: 95, discount: 0, quantity: '200g', brand: 'Amul', category: { _id: '5', name: 'Paneer', slug: 'paneer' }, images: ['/images/paneer.jpeg'], stock: 25, availability: true, isBestSeller: true },
  { _id: 'p10', name: 'Amul Masti Dahi 400g', description: 'Thick and creamy set curd', price: 35, discount: 0, quantity: '400g', brand: 'Amul', category: { _id: '7', name: 'Curd & Dahi', slug: 'curd-dahi' }, images: ['/images/dahi.jpeg'], stock: 60, availability: true, isBestSeller: true },
  { _id: 'p11', name: 'Amul Garlic & Herbs Butter', description: 'Flavored butter with garlic', price: 55, discount: 10, quantity: '100g', brand: 'Amul', category: { _id: '3', name: 'Butter', slug: 'butter' }, images: ['/images/garlic.jpeg'], stock: 25, availability: true, isNewArrival: true },
  { _id: 'p12', name: 'Amul Chocominis', description: 'Bite-sized chocolate treats', price: 20, discount: 0, quantity: '28g', brand: 'Amul', category: { _id: '9', name: 'Chocolates', slug: 'chocolates' }, images: ['/images/chocominis.jpeg'], stock: 100, availability: true },
  { _id: 'p13', name: 'Amul Cookies Chocolate Chip', description: 'Crunchy cookies with chocolate chips', price: 45, discount: 0, quantity: '150g', brand: 'Amul', category: { _id: '10', name: 'Cookies', slug: 'cookies' }, images: ['/images/cookies.jpeg'], stock: 40, availability: true, isFeatured: true },
  { _id: 'p14', name: 'Amul Kool Badam Milk', description: 'Rich badam flavored milk', price: 30, discount: 0, quantity: '200ml', brand: 'Amul', category: { _id: '8', name: 'Lassi & Beverages', slug: 'lassi-beverages' }, images: ['/images/badam.jpeg'], stock: 40, availability: true },
  { _id: 'p15', name: 'Amul Taaza Toned Milk', description: 'Toned milk with balanced nutrition', price: 28, discount: 0, quantity: '500ml', brand: 'Amul', category: { _id: '2', name: 'Milk', slug: 'milk' }, images: ['/images/taaza.jpeg'], stock: 100, availability: true, isFeatured: true },
  { _id: 'p16', name: 'Amul Fresh Cream 200ml', description: 'Fresh dairy cream', price: 50, discount: 0, quantity: '200ml', brand: 'Amul', category: { _id: '12', name: 'Cream', slug: 'cream' }, images: ['/images/Cream.jpeg'], stock: 30, availability: true, isBestSeller: true },
  { _id: 'p17', name: 'Amul Diced Cheese', description: 'Pre-cut cheese cubes', price: 90, discount: 0, quantity: '200g', brand: 'Amul', category: { _id: '4', name: 'Cheese', slug: 'cheese' }, images: ['/images/diced.jpeg'], stock: 20, availability: true, isNewArrival: true },
  { _id: 'p18', name: 'Amul Mithai Gulab Jamun', description: 'Ready to eat Gulab Jamun', price: 160, discount: 0, quantity: '500g', brand: 'Amul', category: { _id: '11', name: 'Sweets', slug: 'sweets' }, images: ['/images/sweets.jpeg'], stock: 15, availability: true, isFeatured: true },
];

export const sampleReviews = [
  { _id: 'r1', customerName: 'Rahul Sharma', rating: 5, comment: 'Best ice cream parlour in Mansarovar! Fresh Amul products and great variety.' },
  { _id: 'r2', customerName: 'Priya Gupta', rating: 5, comment: 'Amazing quality dairy products. The paneer and butter are always fresh. Highly recommend!' },
  { _id: 'r3', customerName: 'Amit Singh', rating: 4, comment: 'Good collection of Amul products. Quick service and friendly staff.' },
  { _id: 'r4', customerName: 'Sneha Jain', rating: 5, comment: 'My kids love the Amul ice cream cones. We visit every weekend!' },
  { _id: 'r5', customerName: 'Vikram Patel', rating: 4, comment: 'Great prices and authentic Amul products. The lassi is fantastic!' },
  { _id: 'r6', customerName: 'Meena Agarwal', rating: 5, comment: 'Excellent service and fresh products. The Amul Chocolate Cone is a must-try!' },
];
