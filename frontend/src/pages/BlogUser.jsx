import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const BlogUser = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get('/blog');
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-primary mb-6"
          >
            Insights & <span className="text-gradient">Perspectives</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-light"
          >
            Deep dives into modern engineering, digital strategy, and the future of web technologies.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-100 border-t-cyan shadow-lg"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 text-xl py-10">No articles published yet.</div>
            ) : (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-blue-900/5 border border-slate-100 group flex flex-col hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)]"
                >
                  <div className="h-56 overflow-hidden relative bg-slate-100">
                    <img 
                      src={blog.image || 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800' }}
                    />
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col relative">
                    {/* Floating Meta Tag */}
                    <div className="absolute -top-6 right-8 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-xs font-bold text-cyan flex items-center gap-2">
                       <BookOpen size={14} /> Article
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><User size={14} /> {blog.author || 'Admin'}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-cyan transition-colors">{blog.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed mb-6 flex-1 line-clamp-3">
                      {blog.content.replace(/<[^>]+>/g, '')}
                    </p>
                    
                    <Link to={`/blog/${blog._id}`} className="inline-flex items-center text-accent font-bold text-sm tracking-wide uppercase transition-all duration-300 group-hover:translate-x-2 mt-auto pt-4 border-t border-slate-100">
                      Read Full Story <ArrowRight size={16} className="ml-2" />
                    </Link>
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

export default BlogUser;
