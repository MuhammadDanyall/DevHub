const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/AdminModel');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for admin seeding...');

        const existingAdmin = await Admin.findOne({ email: 'admin@developershub.io' });
        if (existingAdmin) {
            console.log('Admin already exists.');
        } else {
            await Admin.create({
                email: 'admin@developershub.io',
                password: 'adminpassword123'
            });
            console.log('Admin created: admin@developershub.io / adminpassword123');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
