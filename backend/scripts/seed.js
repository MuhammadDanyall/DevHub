const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/ServiceModel');
const Portfolio = require('../models/PortfolioModel');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Add App Service
        const appService = {
            title: 'Mobile App Development',
            description: 'Building high-performance, cross-platform mobile applications for iOS and Android using React Native and Flutter. We focus on seamless UX and native-like performance.',
            iconUrl: 'app-service-icon' // Placeholder as requested by the schema
        };

        await Service.create(appService);
        console.log('Service added: Mobile App Development');

        // 2. Add 3 Portfolio Items
        const portfolioItems = [
            {
                projectName: 'SwiftPay Digital Wallet',
                image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
                techStack: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
                link: 'https://swiftpay.example.com'
            },
            {
                projectName: 'HealthTrack AI',
                image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
                techStack: ['Flutter', 'Python', 'Firebase', 'TensorFlow'],
                link: 'https://healthtrack.example.com'
            },
            {
                projectName: 'EcoStore E-Commerce',
                image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
                techStack: ['Next.js', 'Tailwind CSS', 'Shopify API', 'Vercel'],
                link: 'https://ecostore.example.com'
            }
        ];

        await Portfolio.insertMany(portfolioItems);
        console.log('3 Portfolio items added.');

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
