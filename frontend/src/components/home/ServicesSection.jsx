import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import ServiceCard from './ServiceCard';

const SkeletonLoader = () => (
  <div className="glass-card p-10 rounded-[2rem] animate-pulse border border-slate-100 bg-white">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 mb-8"></div>
    <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-5"></div>
    <div className="h-4 bg-slate-50 rounded-full w-full mb-3"></div>
    <div className="h-4 bg-slate-50 rounded-full w-5/6"></div>
  </div>
);

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-accent/5 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, y: -10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/5 text-white font-bold uppercase tracking-widest text-xs mb-8 border border-white/10 backdrop-blur-md"
           >
             <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]" />
             Core Offerings
           </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight"
          >
            Our Unmatched <span className="text-gradient">Capabilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed"
          >
            From discovery to deployment, every service is shaped to improve clarity, speed, and measurable business value across your digital presence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
            services.map((service, index) => (
              <ServiceCard key={service._id || index} service={service} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
