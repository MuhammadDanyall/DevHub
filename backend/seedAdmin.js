const mongoose = require('mongoose');
const Admin = require('./models/AdminModel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const adminEmail = 'admin@developershub.com';
    const adminPassword = 'adminpassword123';
    
    // check if exists
    const admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      await Admin.create({ email: adminEmail, password: adminPassword });
      console.log('Admin created: ', adminEmail);
    } else {
       console.log('Admin already exists: ', adminEmail);
       admin.password = adminPassword;
       await admin.save();
       console.log('Admin password reset to default.');
    }
    process.exit(0);
  })
  .catch(console.error);
