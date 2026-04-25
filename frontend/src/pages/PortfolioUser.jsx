import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Layout } from 'lucide-react';

const GithubIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
import API from '../services/api';

const PortfolioUser = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    const fetchPortfolio = async () => {
      try {
        const { data } = await API.get('/portfolio');
        setProjects(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-primary mb-6"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-500">Work</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-light"
          >
            Explore our latest projects showcasing technical excellence and stunning design.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-accent shadow-lg"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 text-xl py-10">No projects to display yet.</div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group card-hover flex flex-col"
                >
                  <div className="h-64 overflow-hidden relative bg-slate-200">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.projectName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <Layout size={48} className="mb-2 opacity-50" />
                        <span className="font-medium text-sm tracking-wider uppercase">Project Preview</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-accent transition-colors">{project.projectName}</h3>
                    <p className="text-slate-500 leading-relaxed font-light mb-6 flex-1">
                      {project.techStack?.join(', ') || 'Technology stack coming soon.'}
                    </p>
                    
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full flex items-center gap-1.5 border border-slate-200">
                            <Code2 size={12} className="text-accent"/> {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.link && (
                      <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-accent hover:text-indigo-600 transition-colors">
                          <ExternalLink size={16} /> Visit Project
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioUser;
