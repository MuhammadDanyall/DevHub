import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import { ExternalLink } from 'lucide-react';

const PortfolioShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/portfolio');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tight"
          >
            Award-Winning <span className="text-gradient">Portfolio</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-light"
          >
            A refined snapshot of high-impact product builds delivered with strong engineering standards and polished interface design.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-slate-100 rounded-[2rem] border border-slate-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden glass-card aspect-[4/3] cursor-pointer border border-slate-200 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <img 
                  src={project.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80'} 
                  alt={project.projectName} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 z-20 p-7">
                  <div className="rounded-[1.5rem] border border-white/40 bg-white/60 p-6 backdrop-blur-xl shadow-2xl">
                    <span className="text-cyan font-bold text-xs tracking-widest uppercase mb-3 block">
                      {project.techStack?.slice(0, 3).join(' • ') || 'Featured Build'}
                    </span>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-primary mb-2">{project.projectName}</h3>
                        <p className="text-slate-600 text-sm line-clamp-2 font-light">
                          Live product crafted with a modern full-stack workflow.
                        </p>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary hover:text-cyan hover:border-cyan/40 transition-colors shadow-sm"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
