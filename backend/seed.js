const mongoose = require('mongoose');
const Service = require('./models/ServiceModel');
require('dotenv').config();

const services = [
  {
    title: "Custom Web Development",
    description: "High-performance, responsive websites and progressive web apps tailored to your unique business needs.",
    iconUrl: "web"
  },
  {
    title: "Mobile App Engineering",
    description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
    iconUrl: "app"
  },
  {
    title: "Backend & API Architecture",
    description: "Robust, secure, and scalable server-side solutions and RESTful APIs to power your digital ecosystem.",
    iconUrl: "backend"
  },
  {
    title: "Cloud & DevOps Solutions",
    description: "Cloud migration, AWS architecture, and automated CI/CD pipelines to ensure maximum uptime and scalability.",
    iconUrl: "cloud"
  },
  {
    title: "UI/UX Design & Branding",
    description: "User-centric interface design that combines stunning visual aesthetics with seamless human-computer interaction.",
    iconUrl: "design"
  },
  {
    title: "Custom Enterprise Software",
    description: "Bespoke software systems designed from the ground up to automate and aggressively scale your enterprise operations.",
    iconUrl: "custom"
  }
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Connected');
    await Service.deleteMany({});
    console.log('Cleared existing services');
    await Service.insertMany(services);
    console.log('Added IT services successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.disconnect();
  });
