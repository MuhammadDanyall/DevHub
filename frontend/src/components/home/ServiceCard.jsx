import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MonitorPlay, Code, Database, Smartphone, Cloud, PenTool, Layers, ArrowRight } from 'lucide-react';

const iconMap = {
  web: MonitorPlay,
  app: Smartphone,
  backend: Database,
  cloud: Cloud,
  design: PenTool,
  custom: Layers,
  default: Code,
};

const ServiceCard = ({ service, index }) => {
  const titleLower = service.title?.toLowerCase() || '';
  let IconComponent = iconMap.default;
  
  if (titleLower.includes('web') || titleLower.includes('frontend')) IconComponent = iconMap.web;
  else if (titleLower.includes('app') || titleLower.includes('mobile')) IconComponent = iconMap.app;
  else if (titleLower.includes('backend') || titleLower.includes('api')) IconComponent = iconMap.backend;
  else if (titleLower.includes('cloud') || titleLower.includes('aws')) IconComponent = iconMap.cloud;
  else if (titleLower.includes('design') || titleLower.includes('ui')) IconComponent = iconMap.design;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card p-10 rounded-[2rem] flex flex-col items-start transition-all duration-500 group relative overflow-hidden hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 border border-slate-100 hover:border-cyan/30"
    >
      <div className="absolute left-8 top-8 text-xs font-bold tracking-[0.3em] text-slate-200">
        0{index + 1}
      </div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="mt-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-cyan mb-8 border border-slate-100 group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-accent group-hover:text-white group-hover:border-transparent transition-all duration-500 z-10 shadow-sm group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)]">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-cyan transition-colors duration-300 relative z-10">{service.title}</h3>
      <p className="text-slate-500 leading-relaxed text-base md:text-lg flex-1 font-light relative z-10 group-hover:text-slate-600 transition-colors">
        {service.description}
      </p>
      
      <Link 
        to={`/services/${service._id}`} 
        className="mt-8 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-cyan font-semibold tracking-wide text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 uppercase relative z-10"
      >
        Explore more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
