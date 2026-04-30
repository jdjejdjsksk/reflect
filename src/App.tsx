import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Gamepad2, 
  Code2, 
  Briefcase, 
  Cpu, 
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Send
} from "lucide-react";

/**
 * Custom Cursor Component
 */
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 1000, mass: 0.1 }}
      />
    </>
  );
};

const PROJECTS = [
  {
    id: 1,
    title: "NEON NEXUS RP",
    description: "Lead Systems Architect. Designed a server-authoritative inventory & economy system supporting 10k+ concurrent entities with optimized memory overhead.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60",
    tags: ["Systems", "Optimization", "UI/UX"],
    label: "LIVE"
  },
  {
    id: 2,
    title: "KINETIC ARENA",
    description: "Built a fully custom physics-based combat engine from scratch. Includes active hitboxes, complex animation states, and lag-compensated networking.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    tags: ["Physics", "Combat", "Auth"],
    label: "ALPHA"
  }
];

export default function App() {
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUsername(label);
    setTimeout(() => setCopiedUsername(null), 2000);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed inset-0 z-[1000] bg-[#080A0F] flex flex-col items-center justify-center p-6"
          >
            <div className="scanline"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-12"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter italic text-white">reflec.xyz</h1>
                <p className="font-mono text-xs tracking-[0.5em] text-blue-500 uppercase">System Ready</p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setHasEntered(true);
                    setIsPlaying(true);
                    setIsMuted(false);
                  }}
                  className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-3 text-lg italic uppercase font-black uppercase">
                    Sync Audio
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setHasEntered(true);
                    setIsPlaying(false);
                    setIsMuted(true);
                  }}
                  className="group px-10 py-5 glass font-bold rounded-2xl transition-all border-white/10 hover:border-white/30"
                >
                  <span className="relative flex items-center gap-3 text-lg italic uppercase text-gray-400 group-hover:text-white transition-colors">
                    Silent Init
                  </span>
                </motion.button>
              </div>

              <div className="pt-12 flex items-center justify-center gap-8 opacity-20">
                <div className="flex flex-col items-center">
                  <div className="w-[1px] h-12 bg-white" />
                  <span className="text-[10px] font-mono mt-2">ID: M-FLX-GB26</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player Widget */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-4 glass p-3 rounded-2xl border-white/10 group hover:border-blue-500/50 transition-all duration-500 ${isMuted ? 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : ''}`}
      >
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-blue-500/20 flex items-center justify-center">
           <img 
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&auto=format&fit=crop" 
              className={`w-full h-full object-cover transition-transform duration-[3000ms] ${isPlaying && !isMuted ? 'rotate-[360deg] scale-110' : ''}`}
           />
           <button 
             onClick={() => {
                if (isMuted) {
                  setIsMuted(false);
                  setIsPlaying(true);
                } else {
                  setIsPlaying(!isPlaying);
                }
             }}
             className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors"
           >
             {isPlaying && !isMuted ? <span className="w-3 h-3 bg-blue-500 animate-pulse rounded-sm" /> : <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />}
           </button>
        </div>
        <div className="pr-4 overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500">
           <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest whitespace-nowrap">{isMuted ? 'Muted' : 'Now Playing'}</p>
           <p className="text-xs font-bold whitespace-nowrap italic tracking-tight">Gato Bandido</p>
           <p className="text-[10px] text-gray-500 whitespace-nowrap">mamaflex</p>
           {!isMuted && isPlaying && (
             <div className="flex gap-1 h-3 mt-1 items-end">
               {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                 <motion.div
                   key={i}
                   animate={{ height: ["20%", "100%", "20%"] }}
                   transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                   className="w-[2px] bg-blue-500/50 rounded-full"
                 />
               ))}
             </div>
           )}
        </div>
        {isPlaying && !isMuted && (
          <div className="absolute opacity-0 pointer-events-none -z-50">
            <iframe 
              width="300" 
              height="200" 
              src="https://www.youtube.com/embed/R4H7u4mN7S0?autoplay=1&loop=1&playlist=R4H7u4mN7S0&controls=0&disablekb=1&modestbranding=1" 
              allow="autoplay"
              title="Music Player"
            />
          </div>
        )}
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="scanline"></div>

      <div className="max-w-3xl mx-auto px-6 py-24 space-y-24 relative z-10">
        
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-10"
        >
          <div className="relative inline-block">
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.05 }}
              initial={{ rotate: 3 }}
              className="w-40 h-40 mx-auto rounded-[3rem] overflow-hidden neon-border bg-[#0B0E14] transition-all duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&auto=format&fit=crop&q=60" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 w-7 h-7 rounded-full border-4 border-[#080A0F] animate-pulse" />
          </div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl font-bold tracking-tight italic"
            >
              reflec.xyz
            </motion.h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-blue-500/50"></span>
              <p className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase">ROBLOX INFRASTRUCTURE EXPERT</p>
              <span className="h-[1px] w-12 bg-blue-500/50"></span>
            </div>
          </div>

          <p className="text-gray-400 text-xl leading-relaxed max-w-xl mx-auto font-light">
            Crafting <span className="text-white font-medium">highly-performant</span> Luau frameworks and state-of-the-art combat engines for front-page experiences.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button 
              onClick={() => copyToClipboard("prvtocol", "discord")}
              className="px-10 py-5 bg-white text-black font-bold rounded-2xl transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 group relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {copiedUsername === "discord" ? (
                  <motion.div 
                    key="check"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={20} className="text-green-600" />
                    <span>Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="content"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare size={20} />
                    <span>Hire via Discord</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <a 
              href="#projects"
              className="px-10 py-5 glass font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center gap-3 border-white/20 active:scale-95"
            >
              Explore Systems
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/5 max-w-md mx-auto">
            <div className="space-y-1">
              <p className="text-3xl font-bold">45M+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Visits</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Peak CCU</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">6yrs</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">XP</p>
            </div>
          </div>
        </motion.header>

        {/* Projects Section */}
        <section id="projects" className="space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-3xl font-bold italic flex items-center gap-4">
               <span className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                <Code2 size={24} />
               </span>
               Case Files
            </h3>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative glass rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] transition-all border-white/10"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-64 h-56 md:h-auto overflow-hidden relative">
                    <img 
                      src={project.image} 
                      className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110" 
                      alt={project.title}
                    />
                    <div className="absolute top-4 left-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest ${project.label === 'LIVE' ? 'bg-green-500 text-black' : 'bg-blue-500 text-white'}`}>
                        {project.label}
                       </span>
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-3xl font-bold tracking-tight uppercase italic">{project.title}</h4>
                        <ExternalLink className="text-gray-600 group-hover:text-blue-500 transition-colors" size={24} />
                      </div>
                      <p className="text-gray-400 leading-relaxed text-lg font-light">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-mono font-medium px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.5em] text-center">Protocol Stack</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Frameworks (Knit/ECS/Custom)", "Networking (Modular)", "Data Management", "Complex Physics", "Performance Auth", "Fusion UI"].map((skill, index) => (
              <motion.span 
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 glass rounded-2xl text-sm font-medium hover:border-blue-500/40 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <section className="pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-16 rounded-[4rem] text-center space-y-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] -z-10 group-hover:bg-blue-500/10 transition-all duration-1000" />
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight italic">Initiate Session?</h2>
              <p className="text-gray-400 text-lg">Currently available for high-fidelity studio integrations & premium commissions.</p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-6">
                <button 
                  onClick={() => copyToClipboard("prvtocol", "dc-footer")}
                  className="p-6 glass rounded-3xl hover:text-white transition-all hover:border-blue-500 group/btn relative"
                  title="Copy Discord"
                >
                  <MessageSquare size={32} className="text-gray-500 group-hover/btn:text-blue-400" />
                  <AnimatePresence>
                    {copiedUsername === "dc-footer" && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -45 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 text-[10px] bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button 
                  onClick={() => copyToClipboard("@protecture", "tg-footer")}
                  className="p-6 glass rounded-3xl hover:text-white transition-all hover:border-sky-500 group/btn relative"
                  title="Copy Telegram"
                >
                  <Send size={32} className="text-gray-500 group-hover:text-sky-400" />
                  <AnimatePresence>
                    {copiedUsername === "tg-footer" && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -45 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 text-[10px] bg-sky-500 text-white px-2 py-1 rounded"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              
              <div className="space-y-2 opacity-50">
                <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">Secure Lines Open</p>
                <p className="text-sm font-mono text-white">me@reflec.xyz</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-white/5 space-y-4">
          <div className="flex justify-center gap-12 text-[11px] font-mono text-gray-600 uppercase tracking-[0.3em]">
            <span>ROBLOX PLATFORM</span>
            <span>EXPERIENCE 2026</span>
            <span>TECHNICAL PORTFOLIO</span>
          </div>
          <p className="text-[10px] text-gray-800">reflec.xyz © Designed for peak performance and visual impact.</p>
        </footer>

      </div>
    </div>
  );
}
