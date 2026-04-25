import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Globe, Layers, ShieldCheck, ChartNoAxesCombined } from 'lucide-react';
import BookingModal from '../BookingModal';

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const rotatingWords = ['Products', 'Experiences', 'Platforms', 'Growth'];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveWordIndex((currentIndex) => (currentIndex + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <>
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F8FAFC]">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan/5 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-[0.02] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:52px_52px] opacity-100"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 lg:mt-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 mb-8 shadow-[0_8px_30px_rgba(37,99,235,0.06)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
              </span>
              <span className="text-slate-500 text-xs font-bold tracking-widest uppercase">Premium Design & Engineering Unit</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.25rem] font-black text-primary mb-6 leading-[0.98] tracking-tight">
              Design That Converts. <br className="hidden lg:block"/>
              Engineering That Scales. <br className="hidden lg:block"/>
              <span className="inline-flex min-h-[1.2em] items-center text-gradient drop-shadow-sm">
                {rotatingWords[activeWordIndex]}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-light">
              DevelopersHub Corporation creates elegant customer-facing experiences and high-performance digital systems for modern agencies. We blend conversion-first UX, robust cloud architecture, and premium motion to help brands look sharper and operate faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="group relative inline-flex items-center justify-center gap-3 px-9 py-4.5 bg-gradient-to-r from-cyan to-accent text-white rounded-full font-bold transition-all duration-300 shadow-[0_15px_35px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:scale-105"
              >
                Book a Meeting <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#portfolio" className="inline-flex items-center justify-center gap-2 px-9 py-4.5 bg-white hover:bg-slate-50 text-primary border border-slate-200 rounded-full font-bold transition-all duration-300 hover:border-slate-300 shadow-sm">
                View Portfolio
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
              {[
                { icon: Sparkles, label: 'Premium UI Direction', value: 'High-end visuals' },
                { icon: ShieldCheck, label: 'Enterprise Data Security', value: 'Encrypted & Private' },
                { icon: ChartNoAxesCombined, label: 'Business Impact', value: 'Lead-focused UX' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <item.icon className="text-cyan mb-3" size={20} />
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Floating 3D-Style UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto perspective-1000">
              {/* Central Glass Card */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotateX: [5, -5, 5], rotateY: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute inset-0 glass-card rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden z-20 border border-white/40 shadow-[0_32px_64px_rgba(15,23,42,0.1)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/10 to-accent/10 flex items-center justify-center border border-slate-100 shadow-inner">
                    <Layers className="text-cyan" size={32} />
                  </div>
                  <div className="px-5 py-2 bg-slate-50 text-primary rounded-full text-xs font-bold tracking-widest uppercase border border-slate-100">
                    Premium Quality
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="h-5 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="h-5 bg-slate-100 rounded-full w-1/2"></div>
                  <div className="h-5 bg-gradient-to-r from-cyan/30 to-accent/30 rounded-full w-5/6 shadow-[0_8px_15px_rgba(37,99,235,0.1)]"></div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-5">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Conversion Layer</p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">UX<span className="text-2xl text-slate-400">+</span></p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest">Scale</p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">99.9%</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [15, -15, 15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -right-16 glass-card p-6 rounded-[2rem] border border-white/60 z-30 flex items-center gap-5 shadow-2xl"
              >
                <div className="bg-gradient-to-br from-cyan to-blue-700 p-4 rounded-2xl text-white shadow-lg"><Globe size={28}/></div>
                <div>
                  <p className="text-base font-bold text-primary">Customer Site</p>
                  <p className="text-sm text-slate-500 font-medium">React, Tailwind, Motion</p>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }}
                className="absolute -bottom-10 -left-16 glass-card p-6 rounded-[2rem] border border-white/60 z-30 flex items-center gap-5 shadow-2xl"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-accent p-4 rounded-2xl text-white shadow-lg"><Smartphone size={28}/></div>
                <div>
                  <p className="text-base font-bold text-primary">Core Infrastructure</p>
                  <p className="text-sm text-slate-500 font-medium">Enterprise Management</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
    <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Hero;
