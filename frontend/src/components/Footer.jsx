import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const TwitterIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-8 text-slate-500 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-accent/5 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14 rounded-[2rem] border border-slate-100 bg-slate-50 px-6 py-8 md:px-10 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan font-bold">Ready To Build</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-black text-primary">Need a sharper digital presence for your agency?</h3>
          </div>
          <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 transition-colors shadow-lg shadow-primary/20">
            Start the Conversation
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="bg-gradient-to-br from-cyan to-accent p-2.5 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] group-hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all duration-300">
                 <Rocket className="text-white h-6 w-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-primary">
                DevelopersHub
              </span>
            </Link>
            <p className="text-slate-500 max-w-md leading-relaxed mb-8 font-light">
              Premium websites, secure admin suites, and product-focused engineering for brands that want cleaner execution and stronger digital presence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 hover:border-cyan/50 hover:text-cyan hover:bg-white transition-all hover:scale-110 shadow-sm">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 hover:border-accent/50 hover:text-accent hover:bg-white transition-all hover:scale-110 shadow-sm">
                <LinkedinIcon size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 hover:border-cyan/50 hover:text-cyan hover:bg-white transition-all hover:scale-110 shadow-sm">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-primary font-bold mb-6 text-lg tracking-wide uppercase">Company</h4>
            <ul className="space-y-4">
               <li><a href="#home" className="text-slate-500 hover:text-cyan font-medium transition-colors text-sm uppercase tracking-wider">Home</a></li>
               <li><a href="#services" className="text-slate-500 hover:text-cyan font-medium transition-colors text-sm uppercase tracking-wider">Services</a></li>
               <li><a href="#portfolio" className="text-slate-500 hover:text-cyan font-medium transition-colors text-sm uppercase tracking-wider">Portfolio</a></li>
               <li><a href="#contact" className="text-slate-500 hover:text-cyan font-medium transition-colors text-sm uppercase tracking-wider">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6 text-lg tracking-wide uppercase">Connect</h4>
            <ul className="space-y-4">
               <li className="text-slate-500 font-medium font-light">123 Innovation Drive,<br/>San Francisco, CA 94105</li>
               <li><a href="mailto:hello@developershub.io" className="text-slate-500 hover:text-accent font-medium transition-colors">hello@developershub.io</a></li>
               <li><a href="tel:+15551234567" className="text-slate-500 hover:text-accent font-medium transition-colors">+1 (555) 123-4567</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} DevelopersHub Corporation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-400 tracking-wide uppercase">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
