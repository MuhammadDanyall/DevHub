import { motion } from 'framer-motion';

const techStacks = [
  "React.js", "Node.js", "MongoDB", "PostgreSQL", "Next.js", "Tailwind CSS", 
  "TypeScript", "AWS", "Docker", "GraphQL", "Figma", "React Native"
];

const TrustMarquee = () => {
  return (
    <section className="py-10 bg-[#121212] border-y border-white/5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Core Stack</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-2">Built with modern tools that support premium delivery.</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
            Trusted workflow across design, frontend, backend, and deployment
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-[200%] animate-marquee">
        {[...techStacks, ...techStacks].map((tech, idx) => (
          <div key={idx} className="flex-1 flex justify-center items-center px-4">
            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm md:text-base font-semibold text-white/80 tracking-[0.18em] uppercase hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors duration-300">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustMarquee;
