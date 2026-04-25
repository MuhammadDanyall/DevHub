const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/AdminModel');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@developershub.com';
    const password = 'adminpassword123'; // Change this!

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    await Admin.create({
      email,
      password,
    });

    console.log('Admin created successfully');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
