import { motion, useScroll } from 'framer-motion';
import Hero from '../components/home/Hero';
import TrustMarquee from '../components/home/TrustMarquee';
import AboutUs from '../components/home/AboutUs';
import ServicesSection from '../components/home/ServicesSection';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import ContactForm from '../components/home/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] selection:bg-cyan/10 selection:text-cyan">
      {/* Custom Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-accent z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <Hero />
      <TrustMarquee />
      <AboutUs />
      <ServicesSection />
      <PortfolioShowcase />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
