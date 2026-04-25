import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import API from '../../services/api';

const TwitterIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    try {
      await API.post('/inquiries', formData);
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 space-y-12"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan mb-4 font-bold">Contact Studio</p>
              <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tight">
                Let's Build Something <span className="text-gradient">Memorable</span>
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed">
                Share your idea, redesign goal, or product roadmap. We will help shape it into a clean digital experience with reliable backend foundations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Response Time</p>
                <p className="mt-3 text-2xl font-black text-primary">Within 24 Hours</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Project Fit</p>
                <p className="mt-3 text-2xl font-black text-primary">Web, Admin, MERN</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0 text-cyan shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Global HQ</h4>
                  <p className="text-slate-500 font-light">123 Innovation Drive, Tech District<br/>San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0 text-accent shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Email Us</h4>
                  <p className="text-slate-500 font-light">hello@developershub.io</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0 text-cyan shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">Call Us</h4>
                  <p className="text-slate-500 font-light">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[TwitterIcon, InstagramIcon, LinkedinIcon, GithubIcon].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 hover:text-cyan hover:bg-slate-100 transition-all hover:scale-110 shadow-sm">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Glass Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12"
          >
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-[0_32px_64px_rgba(15,23,42,0.08)]">
              <form onSubmit={handleSubmit} className="space-y-8">
                {status.success && (
                  <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl border border-emerald-100 text-center font-medium">
                    Message sent successfully! We will get back to you soon.
                  </div>
                )}
                {status.error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-2xl border border-red-100 text-center font-medium">
                    {status.error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="input-floating block w-full px-0 py-3 text-primary bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer transition-colors font-light"
                    />
                    <label htmlFor="name" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="input-floating block w-full px-0 py-3 text-primary bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer transition-colors font-light"
                    />
                    <label htmlFor="email" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder=" "
                    className="input-floating block w-full px-0 py-3 text-primary bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-cyan peer transition-colors font-light"
                  />
                  <label htmlFor="subject" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Subject</label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="input-floating block w-full px-0 py-3 text-primary bg-transparent border-0 border-b-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors resize-none font-light"
                  ></textarea>
                  <label htmlFor="message" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Details</label>
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4.5 rounded-full transition-all flex items-center justify-center gap-3 disabled:opacity-70 text-lg uppercase tracking-wider mt-8 shadow-[0_15px_35px_rgba(15,23,42,0.2)] hover:-translate-y-1"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
