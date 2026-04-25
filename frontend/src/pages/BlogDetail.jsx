import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import API from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogDetails = async () => {
      try {
        const { data } = await API.get(`/blog/${id}`);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/10 border-t-[#00f0ff] shadow-lg"></div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="bg-[#121212] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8a2be2]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-[#00f0ff] font-bold mb-10 transition-colors group tracking-widest uppercase text-sm">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Insights
        </Link>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">
               <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/5"><Calendar size={16} className="text-[#00f0ff]" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
               <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/5"><User size={16} className="text-[#8a2be2]" /> {blog.author || 'Editorial Team'}</span>
               <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/5"><Clock size={16} className="text-[#00f0ff]" /> 5 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              {blog.title}
            </h1>
            
            {blog.image && (
              <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-10 bg-[#1a1a1a] border border-white/5">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-80" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-a:text-[#00f0ff] hover:prose-a:text-[#8a2be2] prose-img:rounded-3xl font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
             <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">
               Share this article
             </div>
             <div className="flex gap-4">
               <button className="p-3 bg-white/5 text-slate-300 hover:text-[#00f0ff] hover:bg-white/10 rounded-full transition-all border border-white/5 hover:border-[#00f0ff]/50 hover:scale-110">
                 <Share2 size={20} />
               </button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
