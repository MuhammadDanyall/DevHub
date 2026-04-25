import { motion } from 'framer-motion';
import { CheckCircle2, Award } from 'lucide-react';

const reasons = [
  'World-Class Engineering Talent',
  'Future-Proof Architecture',
  'Data-Driven Agile Methodology',
  'Uncompromising Security Standards',
  '24/7 Enterprise Support',
];

const AboutUs = () => {
  return (
    <section id="about" className="py-32 bg-[#F8FAFC] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.04),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.06),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:44px_44px] opacity-100 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan/10 to-accent/15 blur-xl" />
              <div className="absolute -top-8 -left-8 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-xl hidden md:block">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Delivery</p>
                <p className="mt-2 text-2xl font-black text-primary">Fast, precise, scalable</p>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Professional Team" 
                className="relative rounded-[2rem] shadow-2xl object-cover aspect-[4/3] border border-white/10"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -right-4 glass-card p-6 pr-10 rounded-2xl hidden md:flex items-center gap-5 border border-white/60 shadow-2xl"
              >
                <div className="bg-accent/10 p-3 rounded-xl text-accent">
                   <Award size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">10+</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">
                    Enterprise Launches
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-cyan font-bold uppercase tracking-widest text-xs mb-8 border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Why DevelopersHub
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-primary leading-[1.1] tracking-tight">
                Architecting <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-600 to-cyan">Digital Success</span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              We do more than ship pages. DevelopersHub builds full digital systems with conversion-focused UX, enterprise-grade system architecture, and operational clarity for fast-growing agencies and serious brands.
            </p>

            <ul className="grid gap-4 md:grid-cols-2">
              {reasons.map((reason, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (0.1 * idx) }}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-base text-slate-600 font-medium tracking-tight shadow-sm"
                >
                  <div className="bg-accent/10 p-1.5 rounded-full text-accent shadow-sm">
                     <CheckCircle2 size={22} strokeWidth={2.5} />
                  </div>
                  {reason}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
