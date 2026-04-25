const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../models/ServiceModel');

dotenv.config();

const updateDetails = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for detailed update...');

        const services = await Service.find();
        
        for (const service of services) {
            let features = [];
            let benefits = [];
            let content = '';

            const title = service.title.toLowerCase();

            if (title.includes('web')) {
                content = 'Our web development services focus on creating blazing-fast, responsive, and secure websites. We use modern frameworks like React and Next.js to ensure your site is built for the future.';
                features = ['SEO Optimization', 'Responsive Design', 'Custom CMS', 'PWA Support'];
                benefits = ['Higher Conversion Rates', 'Improved Search Ranking', 'Faster Load Speeds'];
            } else if (title.includes('app') || title.includes('mobile')) {
                content = 'We build next-generation mobile apps using React Native and Flutter. From conceptualization to deployment on App Store and Play Store, we handle the full lifecycle.';
                features = ['Cross-platform Codebase', 'Biometric Auth', 'Push Notifications', 'Offline Storage'];
                benefits = ['Reach iOS & Android Users', 'Low Maintenance Cost', 'Native Performance'];
            } else if (title.includes('backend') || title.includes('api')) {
                content = 'Scalable and secure backend systems are the backbone of any application. We specialize in Node.js, Go, and Python based microservices and REST/GraphQL APIs.';
                features = ['Microservices Architecture', 'Database Optimization', 'JWT Authentication', 'Docker Integration'];
                benefits = ['Infinite Scalability', 'Rock-solid Security', 'Efficient Resource Usage'];
            } else {
                content = 'Custom-built solutions tailored to your unique business needs. We leverage the best technology to solve your specific problems and drive innovation.';
                features = ['Scalable Design', 'Cloud Integration', 'Agile Workflow', 'Detailed Documentation'];
                benefits = ['Reduced Operational Costs', 'Improved Efficiency', 'Future-proof Solution'];
            }

            service.content = content;
            service.features = features;
            service.benefits = benefits;
            await service.save();
            console.log(`Updated details for: ${service.title}`);
        }

        console.log('Detailed update completed!');
        process.exit();
    } catch (error) {
        console.error('Error updating details:', error);
        process.exit(1);
    }
};

updateDetails();
