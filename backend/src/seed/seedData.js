const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Banner = require('../models/Banner');
const Review = require('../models/Review');

const connectDB = require('../config/db');

const categories = [
  { name: 'Ice Creams', slug: 'ice-creams', icon: '🍦', displayOrder: 1, image: '/images/icecream.jpeg' },
  { name: 'Milk', slug: 'milk', icon: '🥛', displayOrder: 2, image: '/images/milk.jpeg' },
  { name: 'Butter', slug: 'butter', icon: '🧈', displayOrder: 3, image: '/images/butter.jpeg' },
  { name: 'Cheese', slug: 'cheese', icon: '🧀', displayOrder: 4, image: '/images/cheese.jpeg' },
  { name: 'Paneer', slug: 'paneer', icon: '🫕', displayOrder: 5, image: '/images/paneer.jpeg' },
  { name: 'Ghee', slug: 'ghee', icon: '✨', displayOrder: 6, image: '/images/ghee.jpeg' },
  { name: 'Curd & Dahi', slug: 'curd-dahi', icon: '🥣', displayOrder: 7, image: '/images/dahi.jpeg' },
  { name: 'Lassi & Beverages', slug: 'lassi-beverages', icon: '🥤', displayOrder: 8, image: '/images/lassi.jpeg' },
  { name: 'Chocolates', slug: 'chocolates', icon: '🍫', displayOrder: 9, image: '/images/chocalates.jpeg' },
  { name: 'Cookies & Biscuits', slug: 'cookies-biscuits', icon: '🍪', displayOrder: 10, image: '/images/cookies.jpeg' },
  { name: 'Sweets & Mithai', slug: 'sweets-mithai', icon: '🍬', displayOrder: 11, image: '/images/sweets.jpeg' },
  { name: 'Cream', slug: 'cream', icon: '🍶', displayOrder: 12, image: '/images/Cream.jpeg' },
  { name: 'Frozen Foods', slug: 'frozen-foods', icon: '🧊', displayOrder: 13, image: '/images/icecream.jpeg' },
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('🗑️  Clearing existing data...');

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Banner.deleteMany();
    await Review.deleteMany();

    // Drop stale indexes to avoid conflicts
    try {
      await mongoose.connection.collection('categories').dropIndexes();
      await mongoose.connection.collection('products').dropIndexes();
    } catch (e) {
      // Collections may not exist yet, that's fine
    }

    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create({
      name: 'Admin',
      email: 'admin@neerzaamul.com',
      phone: '8209524367',
      password: 'admin123',
      role: 'admin',
    });

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    const catMap = {};
    createdCategories.forEach((c) => { catMap[c.name] = c._id; });

    // Create products
    console.log('📦 Creating products...');
    const products = [
      // Ice Creams
      { name: 'Amul Chocolate Cone', description: 'Rich chocolate ice cream cone with crunchy wafer and chocolate coating', price: 40, discount: 0, quantity: '110ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 50, availability: true, isFeatured: true, isBestSeller: true, nutritionInfo: { energy: '180 kcal', protein: '3g', fat: '9g', carbs: '22g', sugar: '18g' } },
      { name: 'Amul Vanilla Magic', description: 'Creamy vanilla flavored ice cream with real vanilla extract', price: 30, discount: 10, quantity: '100ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 40, availability: true, isBestSeller: true },
      { name: 'Amul Tricone Butterscotch', description: 'Butterscotch ice cream with crunchy nuts in a crispy cone', price: 45, discount: 0, quantity: '120ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 35, availability: true, isFeatured: true },
      { name: 'Amul Sundae Magic Chocolate', description: 'Indulgent chocolate sundae with fudge swirl', price: 50, discount: 15, quantity: '150ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 25, availability: true, isNewArrival: true },
      { name: 'Amul Family Pack Rajbhog', description: 'Traditional Rajbhog flavored ice cream for the whole family', price: 280, discount: 5, quantity: '1L', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 15, availability: true },
      { name: 'Amul Cassata', description: 'Classic Italian Cassata with nuts and fruits', price: 120, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 20, availability: true, isFeatured: true },

      // Milk
      { name: 'Amul Gold Milk', description: 'Full cream milk with high fat content, rich and creamy', price: 35, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Milk'], images: ['/images/milk.jpeg'], stock: 100, availability: true, isBestSeller: true },
      { name: 'Amul Taaza Toned Milk', description: 'Toned milk with balanced nutrition', price: 28, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Milk'], images: ['/images/taaza.jpeg'], stock: 100, availability: true, isFeatured: true },
      { name: 'Amul Slim n Trim Milk', description: 'Double toned skimmed milk for health-conscious consumers', price: 25, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Milk'], images: ['/images/milk.jpeg'], stock: 60, availability: true },
      { name: 'Amul Masti Buttermilk', description: 'Refreshing spiced buttermilk', price: 20, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Milk'], images: ['/images/lassi.jpeg'], stock: 80, availability: true },

      // Butter
      { name: 'Amul Butter 500g', description: 'India\'s favourite pasteurized butter, made from fresh cream', price: 275, discount: 0, quantity: '500g', brand: 'Amul', category: catMap['Butter'], images: ['/images/butter.jpeg'], stock: 30, availability: true, isBestSeller: true, isFeatured: true },
      { name: 'Amul Butter 100g', description: 'Convenient small pack of pasteurized butter', price: 58, discount: 0, quantity: '100g', brand: 'Amul', category: catMap['Butter'], images: ['/images/butter.jpeg'], stock: 50, availability: true },
      { name: 'Amul Garlic & Herbs Butter', description: 'Flavored butter with garlic and Italian herbs', price: 55, discount: 10, quantity: '100g', brand: 'Amul', category: catMap['Butter'], images: ['/images/garlic.jpeg'], stock: 25, availability: true, isNewArrival: true },

      // Cheese
      { name: 'Amul Cheese Block 200g', description: 'Processed cheese block, perfect for sandwiches and cooking', price: 105, discount: 0, quantity: '200g', brand: 'Amul', category: catMap['Cheese'], images: ['/images/cheese.jpeg'], stock: 35, availability: true, isBestSeller: true },
      { name: 'Amul Cheese Slices', description: 'Convenient individually wrapped cheese slices', price: 125, discount: 5, quantity: '200g (10 slices)', brand: 'Amul', category: catMap['Cheese'], images: ['/images/cheese.jpeg'], stock: 40, availability: true },
      { name: 'Amul Diced Cheese', description: 'Pre-cut cheese cubes for salads and cooking', price: 90, discount: 0, quantity: '200g', brand: 'Amul', category: catMap['Cheese'], images: ['/images/diced.jpeg'], stock: 20, availability: true, isNewArrival: true },
      { name: 'Amul Pizza Mozzarella', description: 'Shredded mozzarella cheese perfect for pizza', price: 135, discount: 0, quantity: '200g', brand: 'Amul', category: catMap['Cheese'], images: ['/images/cheese.jpeg'], stock: 15, availability: true },

      // Paneer
      { name: 'Amul Fresh Paneer 200g', description: 'Fresh and soft cottage cheese made from cow milk', price: 95, discount: 0, quantity: '200g', brand: 'Amul', category: catMap['Paneer'], images: ['/images/paneer.jpeg'], stock: 25, availability: true, isBestSeller: true },
      { name: 'Amul Fresh Paneer 1kg', description: 'Bulk pack of fresh cottage cheese', price: 400, discount: 5, quantity: '1kg', brand: 'Amul', category: catMap['Paneer'], images: ['/images/paneer.jpeg'], stock: 10, availability: true },
      { name: 'Amul Malai Paneer', description: 'Premium malai paneer with extra creamy texture', price: 110, discount: 0, quantity: '200g', brand: 'Amul', category: catMap['Paneer'], images: ['/images/paneer.jpeg'], stock: 18, availability: true, isFeatured: true },

      // Ghee
      { name: 'Amul Pure Ghee 500ml', description: 'Pure cow ghee made from fresh cream, rich aroma and taste', price: 340, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Ghee'], images: ['/images/ghee.jpeg'], stock: 20, availability: true, isBestSeller: true },
      { name: 'Amul Pure Ghee 1L', description: 'Value pack of premium Amul cow ghee', price: 620, discount: 3, quantity: '1L', brand: 'Amul', category: catMap['Ghee'], images: ['/images/ghee.jpeg'], stock: 15, availability: true },

      // Curd & Dahi
      { name: 'Amul Masti Dahi 400g', description: 'Thick and creamy set curd made from toned milk', price: 35, discount: 0, quantity: '400g', brand: 'Amul', category: catMap['Curd & Dahi'], images: ['/images/dahi.jpeg'], stock: 60, availability: true, isBestSeller: true },
      { name: 'Amul Masti Dahi 1kg', description: 'Large pack of thick set curd', price: 75, discount: 0, quantity: '1kg', brand: 'Amul', category: catMap['Curd & Dahi'], images: ['/images/dahi.jpeg'], stock: 30, availability: true },

      // Lassi & Beverages
      { name: 'Amul Kool Rose', description: 'Refreshing rose flavored milk drink', price: 25, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Lassi & Beverages'], images: ['/images/lassi.jpeg'], stock: 50, availability: true, isFeatured: true },
      { name: 'Amul Lassi Mango', description: 'Sweet mango flavored thick lassi', price: 30, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Lassi & Beverages'], images: ['/images/lassi.jpeg'], stock: 45, availability: true, isBestSeller: true },
      { name: 'Amul Kool Badam Milk', description: 'Rich badam (almond) flavored milk drink', price: 30, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Lassi & Beverages'], images: ['/images/badam.jpeg'], stock: 40, availability: true },
      { name: 'Amul Kool Café', description: 'Cold coffee milk drink', price: 25, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Lassi & Beverages'], images: ['/images/lassi.jpeg'], stock: 35, availability: true, isNewArrival: true },

      // Chocolates
      { name: 'Amul Dark Chocolate 150g', description: 'Premium dark chocolate with 55% cocoa', price: 125, discount: 10, quantity: '150g', brand: 'Amul', category: catMap['Chocolates'], images: ['/images/chocalates.jpeg'], stock: 30, availability: true, isFeatured: true },
      { name: 'Amul Milk Chocolate 150g', description: 'Smooth and creamy milk chocolate', price: 110, discount: 0, quantity: '150g', brand: 'Amul', category: catMap['Chocolates'], images: ['/images/chocalates.jpeg'], stock: 35, availability: true, isBestSeller: true },
      { name: 'Amul Chocominis', description: 'Bite-sized chocolate treats, perfect for sharing', price: 20, discount: 0, quantity: '28g', brand: 'Amul', category: catMap['Chocolates'], images: ['/images/chocominis.jpeg'], stock: 100, availability: true },
      { name: 'Amul Fruit & Nut Chocolate', description: 'Milk chocolate with raisins and almonds', price: 135, discount: 5, quantity: '150g', brand: 'Amul', category: catMap['Chocolates'], images: ['/images/chocalates.jpeg'], stock: 20, availability: true },

      // Cookies & Biscuits
      { name: 'Amul Cookies Chocolate Chip', description: 'Crunchy cookies loaded with chocolate chips', price: 45, discount: 0, quantity: '150g', brand: 'Amul', category: catMap['Cookies & Biscuits'], images: ['/images/cookies.jpeg'], stock: 40, availability: true, isFeatured: true },
      { name: 'Amul Butter Cookies', description: 'Rich butter cookies made with real Amul butter', price: 40, discount: 0, quantity: '150g', brand: 'Amul', category: catMap['Cookies & Biscuits'], images: ['/images/cookies.jpeg'], stock: 45, availability: true },

      // Sweets
      { name: 'Amul Mithai Gulab Jamun', description: 'Ready to eat Gulab Jamun in sugar syrup', price: 160, discount: 0, quantity: '500g', brand: 'Amul', category: catMap['Sweets & Mithai'], images: ['/images/sweets.jpeg'], stock: 15, availability: true, isFeatured: true },
      { name: 'Amul Shrikhand Elaichi', description: 'Traditional Elaichi flavored Shrikhand', price: 65, discount: 0, quantity: '100g', brand: 'Amul', category: catMap['Sweets & Mithai'], images: ['/images/sweets.jpeg'], stock: 20, availability: true },

      // Cream
      { name: 'Amul Fresh Cream 200ml', description: 'Fresh dairy cream for cooking and desserts', price: 50, discount: 0, quantity: '200ml', brand: 'Amul', category: catMap['Cream'], images: ['/images/Cream.jpeg'], stock: 30, availability: true, isBestSeller: true },
      { name: 'Amul Whipping Cream', description: 'Heavy cream perfect for whipping and baking', price: 85, discount: 0, quantity: '250ml', brand: 'Amul', category: catMap['Cream'], images: ['/images/Cream.jpeg'], stock: 15, availability: true },

      // Some out-of-stock products
      { name: 'Amul Kaju Katli Ice Cream', description: 'Premium Kaju Katli flavored ice cream - limited edition', price: 90, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 0, availability: false },
      { name: 'Amul Shahi Anjeer Ice Cream', description: 'Royal fig flavored ice cream', price: 85, discount: 0, quantity: '500ml', brand: 'Amul', category: catMap['Ice Creams'], images: ['/images/icecream.jpeg'], stock: 3, availability: true },
    ];

    await Product.insertMany(products);

    // Create banners
    console.log('🖼️  Creating banners...');
    await Banner.insertMany([
      {
        title: 'Summer Special! 🍦',
        subtitle: 'Cool down with our premium ice cream collection',
        image: '/images/icecream.jpeg',
        link: '/products?category=ice-creams',
        isActive: true,
        displayOrder: 1,
      },
      {
        title: 'Fresh Dairy Every Day 🥛',
        subtitle: 'Farm fresh milk, butter, cheese & more delivered to your doorstep',
        image: '/images/amul.jpeg',
        link: '/products',
        isActive: true,
        displayOrder: 2,
      },
      {
        title: 'Chocolate Paradise 🍫',
        subtitle: 'Explore our range of Amul chocolates',
        image: '/images/chocalates.jpeg',
        link: '/products?category=chocolates',
        isActive: true,
        displayOrder: 3,
      },
    ]);

    // Create reviews
    console.log('⭐ Creating reviews...');
    await Review.insertMany([
      { customerName: 'Rahul Sharma', rating: 5, comment: 'Best ice cream parlour in Mansarovar! Fresh Amul products and great variety.', isApproved: true },
      { customerName: 'Priya Gupta', rating: 5, comment: 'Amazing quality dairy products. The paneer and butter are always fresh. Highly recommend!', isApproved: true },
      { customerName: 'Amit Singh', rating: 4, comment: 'Good collection of Amul products. Quick service and friendly staff.', isApproved: true },
      { customerName: 'Sneha Jain', rating: 5, comment: 'My kids love the Amul ice cream cones. We visit every weekend. The best parlour nearby!', isApproved: true },
      { customerName: 'Vikram Patel', rating: 4, comment: 'Great prices and authentic Amul products. The lassi here is fantastic!', isApproved: true },
      { customerName: 'Meena Agarwal', rating: 5, comment: 'Excellent service and fresh products. The Amul Chocolate Cone is a must-try!', isApproved: true },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin login: admin@neerzaamul.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
