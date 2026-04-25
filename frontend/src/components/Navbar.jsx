import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'Services', path: '/#services' },
    { name: 'Portfolio', path: '/#portfolio' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl glass-nav rounded-full z-50 transition-all duration-300 px-2"
      >
        <div className="flex justify-between h-16 items-center px-4 sm:px-6">
          <Link to="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-cyan to-accent p-2 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] group-hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all duration-300">
               <Layers className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-primary">
              DevelopersHub
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-slate-500 hover:text-primary font-bold transition-colors text-xs uppercase tracking-[0.15em] relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan to-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-primary text-white hover:bg-slate-800 px-6 py-2.5 rounded-full font-black transition-all shadow-[0_8px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.2)] text-xs tracking-widest uppercase hover:-translate-y-0.5"
            >
              Book a Meeting
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2 hover:bg-black/5 rounded-full transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-nav rounded-[2rem] p-6 space-y-4 z-40 border border-white/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="block px-4 py-3 text-primary font-bold text-sm uppercase tracking-widest border-b border-black/5 hover:bg-black/5 rounded-xl transition-colors text-center"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { setIsOpen(false); setIsBookingOpen(true); }}
              className="block w-full text-center bg-gradient-to-r from-cyan to-accent text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest mt-4 shadow-lg shadow-blue-500/20"
            >
              Book a Meeting
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Navbar;
