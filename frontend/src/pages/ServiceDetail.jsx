import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Search, 
  MessageSquare,
  MonitorPlay,
  Smartphone,
  Database,
  Cloud,
  PenTool,
  Layers,
  Code
} from 'lucide-react';
import API from '../services/api';

const iconMap = {
  web: MonitorPlay,
  app: Smartphone,
  backend: Database,
  cloud: Cloud,
  design: PenTool,
  custom: Layers,
  default: Code,
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const { data } = await API.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.error('Error fetching service details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-100 border-t-cyan"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black text-primary mb-4">Service Not Found</h2>
        <Link to="/" className="text-cyan font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const titleLower = service.title?.toLowerCase() || '';
  let IconComponent = iconMap.default;
  if (titleLower.includes('web') || titleLower.includes('frontend')) IconComponent = iconMap.web;
  else if (titleLower.includes('app') || titleLower.includes('mobile')) IconComponent = iconMap.app;
  else if (titleLower.includes('backend') || titleLower.includes('api')) IconComponent = iconMap.backend;
  else if (titleLower.includes('cloud') || titleLower.includes('aws')) IconComponent = iconMap.cloud;
  else if (titleLower.includes('design') || titleLower.includes('ui')) IconComponent = iconMap.design;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/#services" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan font-bold transition-colors mb-8 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-2/3"
            >
              <span className="text-cyan font-bold uppercase tracking-widest text-sm mb-4 block">Service Excellence</span>
              <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/3 flex justify-center"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-white shadow-2xl flex items-center justify-center border border-slate-100 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan to-accent rounded-[3rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <IconComponent size={80} className="text-cyan md:size-[100px]" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Overview</h2>
                <div className="prose prose-lg text-slate-600 font-light leading-relaxed max-w-none">
                  {service.content || service.description}
                  {!service.content && (
                    <p className="mt-4">
                      DevelopersHub provides industry-leading solutions for {service.title}. Our team of expert engineers ensures that every project is built with the highest standards of performance, security, and scalability. We work closely with our clients to understand their unique requirements and deliver products that exceed expectations.
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-cyan/10 flex items-center justify-center text-cyan mb-6">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">Fast Implementation</h3>
                  <p className="text-slate-500 font-light">Rapid development cycles without compromising on quality or architectural integrity.</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">Enterprise Security</h3>
                  <p className="text-slate-500 font-light">Built-in security best practices to protect your data and user privacy at every layer.</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Key Features */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sticky top-32"
              >
                <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-cyan flex items-center justify-center text-white"><CheckCircle2 size={18} /></span> Key Features
                </h3>
                <ul className="space-y-6">
                  {(service.features && service.features.length > 0 ? service.features : [
                    'Tailored Architectural Design',
                    'Smooth User Experience',
                    '24/7 Technical Support',
                    'Scalable Infrastructure',
                    'Cross-platform Compatibility',
                    'Optimized Performance'
                  ]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 text-cyan shrink-0"><CheckCircle2 size={18} strokeWidth={3} /></div>
                      <span className="text-slate-600 font-medium leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/#contact" className="mt-10 block w-full bg-primary hover:bg-slate-800 text-white text-center py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
                  Get Started
                </Link>
                <p className="text-center text-slate-400 text-sm mt-4">Free consultation included</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose DevelopersHub?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light">We combine technical grit with creative thinking to deliver products that empower businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MessageSquare size={28} />, title: 'Clear Communication', desc: 'Direct access to engineers and transparent project status at all times.' },
              { icon: <Search size={28} />, title: 'Data-Driven Design', desc: 'Every UI and UX decision is backed by user research and analytics.' },
              { icon: <Layers size={28} />, title: 'Future-Proof Stack', desc: 'We use the most modern technologies ensuring long-term maintainability.' }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-8 group-hover:bg-cyan group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{benefit.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
