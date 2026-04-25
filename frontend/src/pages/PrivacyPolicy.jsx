import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Globe, Server } from 'lucide-react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-cyan font-bold uppercase tracking-widest text-xs mb-6 border border-blue-100">
              <Shield size={14} /> Legal Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-10 tracking-tight">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-slate-600 space-y-8 font-light leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3 mt-12">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-cyan shadow-sm border border-slate-100"><Lock size={20}/></span>
                  1. Information Collection
                </h2>
                <p>
                  At DevelopersHub, we prioritize the security of your data. We collect information that you provide directly to us when you fill out contact forms, book meetings, or communicate with our engineering teams. This may include your name, email address, phone number, and project details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3 mt-12">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-cyan shadow-sm border border-slate-100"><Eye size={20}/></span>
                  2. Use of Information
                </h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, including to process your requests for consultation, manage project deliveries, and communicate with you about our latest innovations and engineering updates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3 mt-12">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-cyan shadow-sm border border-slate-100"><Server size={20}/></span>
                  3. Data Security
                </h2>
                <p>
                  We implement enterprise-grade security measures to protect your personal information. Our systems utilize SSL encryption, secure JWT authentication, and robust architectural principles to ensure that your data remains confidential and protected against unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3 mt-12">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-cyan shadow-sm border border-slate-100"><Globe size={20}/></span>
                  4. Cookies & Tracking
                </h2>
                <p>
                  We use cookies and similar tracking technologies to analyze trends, administer the website, and track users' movements around the site. This help us provide a more personalized experience and improve our platform's overall design and functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3 mt-12">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-cyan shadow-sm border border-slate-100"><FileText size={20}/></span>
                  5. Policy Updates
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically to stay informed about our data protection efforts.
                </p>
              </section>
            </div>

            <div className="mt-20 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-center">
              <p className="text-slate-500 font-medium">
                Last Updated: April 2026. For any questions regarding this policy, please contact us at <a href="mailto:hello@developershub.io" className="text-cyan hover:underline font-bold">hello@developershub.io</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
