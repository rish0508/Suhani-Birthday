import React, { useState, useEffect, useRef } from "react";
import "@/App.css";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sparkles, Moon, UtensilsCrossed, GraduationCap, 
  Gamepad2, Music, Play, Pause, X, ChevronLeft, ChevronRight,
  Volume2, VolumeX, PartyPopper
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Switch } from "./components/ui/switch";
import { Progress } from "./components/ui/progress";
import { Toaster, toast } from "sonner";

// User uploaded photos
const USER_PHOTOS = [
  { src: "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/hgfx7p65_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%289%29.jpeg", caption: "Night out vibes ✨" },
  { src: "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/ohlf6jz8_WhatsApp%20Image%202026-03-01%20at%2018.19.10%20%282%29.jpeg", caption: "Squad goals 💕" },
  { src: "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/cph13vb8_WhatsApp%20Image%202026-03-01%20at%2018.19.10%20%281%29.jpeg", caption: "Main character moment 👑" },
  { src: "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/ln6mk3gq_WhatsApp%20Image%202026-03-01%20at%2018.19.10.jpeg", caption: "Living her best life 🔥" },
  { src: "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/dcq9zvca_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%288%29.jpeg", caption: "Iconic duo 💫" },
  { src: "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/a6kiz1n5_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%287%29.jpeg", caption: "Slay queen 👸" },
  { src: "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/808tt3c3_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%286%29.jpeg", caption: "Brown outfit supremacy 🤎" },
  { src: "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/6tu87g9x_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%285%29.jpeg", caption: "Not the imposter, just iconic 🎮" },
  { src: "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/tv2dg3r9_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%284%29.jpeg", caption: "Saje scent level: MAX 🌿" },
];

const FUNNY_CAPTIONS = [
  "Main character detected ✅",
  "Not the imposter, just iconic 🎮",
  "Brown outfit supremacy 🤎",
  "Saje scent level: MAX 🌿",
  "Future Master's student vibes 📚",
  "Four Olives VIP member 🍝",
  "Emergency meeting called for being too cute 🚨",
  "Monodeal champion energy 🎯",
  "23 and thriving ✨",
  "Crewmate energy only 👾"
];

// Sparkle Particles Component
const SparkleParticles = () => {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 4 + Math.random() * 8
  }));

  return (
    <div className="sparkle-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Polaroid Card Component
const PolaroidCard = ({ src, caption, onClick, rotation = 0, className = "" }) => {
  const randomCaption = caption || FUNNY_CAPTIONS[Math.floor(Math.random() * FUNNY_CAPTIONS.length)];
  
  return (
    <motion.div
      className={`polaroid cursor-pointer ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ scale: 1.05, rotate: rotation + 3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <img 
        src={src} 
        alt="Memory" 
        className="w-full h-48 sm:h-56 object-cover rounded-sm"
        loading="lazy"
      />
      <p className="font-handwritten text-center text-sm sm:text-base mt-3 text-[#4A3B32]">
        {randomCaption}
      </p>
    </motion.div>
  );
};

// Flip Card Component
const FlipCard = ({ icon: Icon, title, frontText, backText, color }) => {
  return (
    <div className="flip-card fun-fact-card">
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div 
          className="flip-card-front absolute w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-12 h-12 mb-4 text-white" />
          <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
          <p className="font-body text-white/90 mt-2">{frontText}</p>
        </div>
        {/* Back */}
        <div 
          className="flip-card-back absolute w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: color }}
        >
          <p className="font-handwritten text-lg text-white">{backText}</p>
        </div>
      </div>
    </div>
  );
};

// Crewmate SVG Component
const Crewmate = ({ color = "#5D4037", className = "" }) => (
  <svg viewBox="0 0 100 120" className={`crewmate ${className}`}>
    <ellipse cx="50" cy="80" rx="35" ry="35" fill={color} />
    <ellipse cx="50" cy="45" rx="30" ry="35" fill={color} />
    <ellipse cx="65" cy="45" rx="18" ry="22" fill="#87CEEB" opacity="0.9" />
    <ellipse cx="25" cy="90" rx="12" ry="25" fill={color} />
  </svg>
);

// Navigation Dots
const NavDots = ({ activeSection }) => {
  const sections = ['hero', 'gallery', 'birthday', 'facts', 'amongus', 'sage', 'olives', 'masters', 'footer'];
  
  return (
    <div className="nav-dots">
      {sections.map((section, index) => (
        <button
          key={section}
          className={`nav-dot ${activeSection === section ? 'active' : ''}`}
          onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
          data-testid={`nav-dot-${section}`}
          aria-label={`Go to ${section} section`}
        />
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [voteResult, setVoteResult] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [relaxMode, setRelaxMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [encouragementRevealed, setEncouragementRevealed] = useState(false);
  const [mastersProgress, setMastersProgress] = useState(23);
  const [activeSection, setActiveSection] = useState('hero');
  const audioRef = useRef(null);

  // Confetti function
  const fireConfetti = () => {
    const colors = ['#5D4037', '#8D6E63', '#D7CCC8', '#BCAAA4', '#A1887F'];
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
    }, 200);
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 400);
    
    toast.success("🎉 Birthday vibes activated!", {
      description: "Blessings delivered ✅ (Sage-approved)"
    });
  };

  // Handle vote
  const handleVote = () => {
    setVoteResult(true);
    setTimeout(() => {
      setVoteModalOpen(false);
      setVoteResult(false);
    }, 3000);
  };

  // Audio toggle
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Progress animation for Masters section
  useEffect(() => {
    const interval = setInterval(() => {
      setMastersProgress(prev => {
        if (prev >= 100) return 23;
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'birthday', 'facts', 'amongus', 'sage', 'olives', 'masters', 'footer'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox navigation
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % USER_PHOTOS.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + USER_PHOTOS.length) % USER_PHOTOS.length);

  return (
    <div className={`relax-mode ${relaxMode ? 'active' : ''}`}>
      <Toaster position="top-center" richColors />
      <SparkleParticles />
      <NavDots activeSection={activeSection} />
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="hero-section min-h-screen flex flex-col items-center justify-center px-4 py-12 relative grain-overlay">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl"
        >
          <motion.h1 
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5D4037] mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            HAPPY 23RD BIRTHDAY, SUHANI 🎉
          </motion.h1>
          
          <motion.p 
            className="font-body text-base sm:text-lg text-[#8D6E63] mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Brown aesthetic. Sage vibes. Among Us energy. Master's era loading…
          </motion.p>
          
          <motion.p 
            className="font-handwritten text-lg text-[#A1887F] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            March 2, 2003 → March 2, 2026
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              data-testid="confetti-btn"
              onClick={fireConfetti}
              className="bg-[#5D4037] hover:bg-[#4A3B32] text-white px-8 py-6 text-lg rounded-full font-body animate-pulse-glow"
            >
              <PartyPopper className="w-5 h-5 mr-2" />
              Press for Birthday Confetti
            </Button>
            
            <Button
              data-testid="emergency-meeting-btn"
              onClick={() => document.getElementById('amongus')?.scrollIntoView({ behavior: 'smooth' })}
              className="emergency-btn text-white px-8 py-6 text-lg rounded-full font-body animate-shake"
            >
              🚨 Emergency Meeting
            </Button>
          </div>

          {/* Featured Polaroids */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <motion.div
              initial={{ rotate: -5, opacity: 0 }}
              animate={{ rotate: -5, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <PolaroidCard 
                src={USER_PHOTOS[0].src} 
                caption="The birthday queen 👑" 
                rotation={-5}
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              />
            </motion.div>
            <motion.div
              initial={{ rotate: 3, opacity: 0 }}
              animate={{ rotate: 3, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="hidden sm:block"
            >
              <PolaroidCard 
                src={USER_PHOTOS[3].src} 
                caption="23 years of iconic 💫" 
                rotation={3}
                onClick={() => { setLightboxIndex(3); setLightboxOpen(true); }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-[#8D6E63] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#8D6E63] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ==================== PHOTO GALLERY ==================== */}
      <section id="gallery" className="py-20 px-4 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-center text-[#5D4037] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Suhani's Photo Evidence 📸
          </motion.h2>
          <motion.p 
            className="font-handwritten text-center text-[#8D6E63] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            (Proof she's been slaying since day one)
          </motion.p>

          <div className="gallery-grid">
            {USER_PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PolaroidCard
                  src={photo.src}
                  caption={photo.caption}
                  rotation={(index % 2 === 0 ? 1 : -1) * (Math.random() * 3)}
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BIG BIRTHDAY MOMENT ==================== */}
      <section id="birthday" className="birthday-moment py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="big-birthday-text font-heading font-extrabold text-white mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            HAPPY BIRTHDAY SUHANI
          </motion.h2>
          
          <motion.div
            className="glass rounded-2xl p-6 inline-block"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-handwritten text-xl text-[#5D4037]">
              Blessings delivered ✅ (Sage-approved)
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              data-testid="big-confetti-btn"
              onClick={fireConfetti}
              className="bg-white text-[#5D4037] hover:bg-[#EFEBE9] px-10 py-6 text-xl rounded-full font-heading"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Send More Confetti
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ==================== FUN FACT CARDS ==================== */}
      <section id="facts" className="py-20 px-4 bg-gradient-to-b from-[#EFEBE9] to-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-center text-[#5D4037] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Makes Suhani... Suhani ✨
          </motion.h2>
          <motion.p 
            className="font-handwritten text-center text-[#8D6E63] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            (Flip the cards to reveal the tea ☕)
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FlipCard
                icon={Heart}
                title="Favorite Color"
                frontText="BROWN"
                backText="Mocha queen energy. If it ain't brown, she ain't wearing it 🤎"
                color="#8D6E63"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FlipCard
                icon={Moon}
                title="Signature Vibe"
                frontText="Saje Sleep Well 🌿"
                backText="Will offer you essential oils before asking how you're doing. The sage-iest friend."
                color="#8FA895"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FlipCard
                icon={Gamepad2}
                title="Game"
                frontText="Among Us 🎮"
                backText="Gets crewmate EVERY. SINGLE. TIME. Still calls emergency meetings tho 🚨"
                color="#D32F2F"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FlipCard
                icon={UtensilsCrossed}
                title="Restaurant"
                frontText="Four Olives 🍝"
                backText="Has her own reserved booth (in her dreams). Vancouver's finest."
                color="#5D4037"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <FlipCard
                icon={GraduationCap}
                title="Dream"
                frontText="Master's Degree 📚"
                backText="Future genius in the making. The professors aren't ready."
                color="#4A3B32"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <FlipCard
                icon={Sparkles}
                title="Inside Joke"
                frontText="Monodeal 🎯"
                backText="IYKYK. The Monopoly Deal champion. Will bankrupt you with a smile."
                color="#A1887F"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== AMONG US SECTION ==================== */}
      <section id="amongus" className="among-us-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#D32F2F] mb-4">
              🚨 EMERGENCY MEETING 🚨
            </h2>
            <p className="font-body text-xl text-[#4A3B32]">
              Suhani is SUS… of being too iconic.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0 }}
            >
              <Crewmate color="#5D4037" className="w-16 h-20" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            >
              <Crewmate color="#8D6E63" className="w-16 h-20" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
            >
              <Crewmate color="#D32F2F" className="w-16 h-20" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
            >
              <Crewmate color="#8FA895" className="w-16 h-20" />
            </motion.div>
          </div>

          <motion.div
            className="glass rounded-2xl p-8 max-w-md mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-handwritten text-lg text-[#5D4037] mb-6">
              Fun fact: Suhani has gotten crewmate 47 times in a row. Statistically impossible. Suspiciously iconic.
            </p>
            
            <Button
              data-testid="vote-imposter-btn"
              onClick={() => setVoteModalOpen(true)}
              className="emergency-btn text-white px-8 py-4 text-lg rounded-full font-body w-full"
            >
              Vote: Suhani = Imposter? 🗳️
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ==================== SAGE RELAX SECTION ==================== */}
      <section id="sage" className={`sage-section py-20 px-4 ${relaxMode ? 'relaxed' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#4A3B32] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sage Sleep Well Mode 🌿
          </motion.h2>
          
          <motion.p 
            className="font-body text-lg text-[#5D4037]/80 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Stress? Not invited. Sleep Well only.
          </motion.p>

          <motion.div
            className="glass rounded-2xl p-8 max-w-md mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="font-body text-[#4A3B32]">Activate Sage Relax Mode</span>
              <Switch
                data-testid="relax-mode-toggle"
                checked={relaxMode}
                onCheckedChange={setRelaxMode}
              />
            </div>
            
            {relaxMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-handwritten text-[#8FA895] mb-4">
                  ✨ Vibes = immaculate ✨
                </p>
                <Button
                  data-testid="play-music-btn"
                  onClick={toggleAudio}
                  variant="outline"
                  className="border-[#8FA895] text-[#5D4037] hover:bg-[#8FA895]/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause Vibes' : 'Play Plain Jane'}
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.p 
            className="font-handwritten text-[#8FA895] mt-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            "Suhani's secret weapon: essential oils and chaos"
          </motion.p>
        </div>
      </section>

      {/* ==================== FOUR OLIVES SECTION ==================== */}
      <section id="olives" className="olives-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#5D4037] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Four Olives Fan Club 🍝
          </motion.h2>
          
          <motion.p 
            className="font-body text-lg text-[#8D6E63] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Official Suhani HQ in Vancouver
          </motion.p>

          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-left mb-6">
              <p className="font-heading text-lg text-[#5D4037] mb-2">📍 Order for Suhani:</p>
              <p className="font-handwritten text-[#8D6E63]">
                "The tastiest thing on the menu"<br />
                (she can't decide, she wants it all)
              </p>
            </div>
            
            <Button
              data-testid="reserve-table-btn"
              onClick={() => setReservationModalOpen(true)}
              className="bg-[#5D4037] hover:bg-[#4A3B32] text-white px-8 py-4 rounded-full font-body w-full"
            >
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Reserve Table for Suhani
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ==================== MASTERS ERA SECTION ==================== */}
      <section id="masters" className="masters-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#5D4037] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Master's Era Loading… 📚
          </motion.h2>

          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-2">
              <span className="font-body text-[#8D6E63]">Progress</span>
              <span className="font-heading text-[#5D4037]">{mastersProgress}%</span>
            </div>
            <Progress value={mastersProgress} className="h-4 bg-[#D7CCC8]" />
          </motion.div>

          <motion.p 
            className="font-handwritten text-xl text-[#5D4037] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Future Master's student. Current legend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="encouragement-btn"
              onClick={() => setEncouragementRevealed(true)}
              variant="outline"
              className="border-[#5D4037] text-[#5D4037] hover:bg-[#5D4037] hover:text-white px-8 py-4 rounded-full"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Send Encouragement
            </Button>
          </motion.div>

          <AnimatePresence>
            {encouragementRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 glass rounded-2xl p-6 max-w-md mx-auto"
              >
                <p className="font-handwritten text-lg text-[#5D4037]">
                  "Suhani, you're going to SLAY that Master's degree. The universities aren't ready for your brown aesthetic energy. Go get 'em! 🎓✨"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <section id="footer" className="footer-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            We love you, Suhani 💛
          </motion.h2>

          <motion.p 
            className="font-handwritten text-xl text-white/80 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Here's to 23 more years of being iconic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="replay-confetti-btn"
              onClick={fireConfetti}
              className="bg-white text-[#5D4037] hover:bg-[#EFEBE9] px-10 py-6 text-xl rounded-full font-heading"
            >
              <PartyPopper className="w-6 h-6 mr-2" />
              Replay Confetti
            </Button>
          </motion.div>

          <motion.p 
            className="font-body text-white/60 mt-12 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built with love, brown vibes, and suspicious amounts of Among Us references.
          </motion.p>
        </div>
      </section>

      {/* ==================== AUDIO TOGGLE (FIXED) ==================== */}
      <div 
        className="audio-toggle"
        onClick={toggleAudio}
        data-testid="audio-toggle-fixed"
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        <span className="text-sm font-body">{isPlaying ? 'Playing' : 'Music'}</span>
      </div>

      {/* ==================== LIGHTBOX MODAL ==================== */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl bg-[#4A3B32]/95 border-none p-2 sm:p-4">
          <div className="relative">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2"
              data-testid="lightbox-close-btn"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img
              src={USER_PHOTOS[lightboxIndex]?.src}
              alt="Gallery"
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            
            <div className="flex justify-between items-center mt-4 px-4">
              <button
                onClick={prevImage}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3"
                data-testid="lightbox-prev-btn"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <p className="font-handwritten text-white text-lg text-center px-4">
                {FUNNY_CAPTIONS[lightboxIndex % FUNNY_CAPTIONS.length]}
              </p>
              
              <button
                onClick={nextImage}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3"
                data-testid="lightbox-next-btn"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ==================== VOTE MODAL ==================== */}
      <Dialog open={voteModalOpen} onOpenChange={setVoteModalOpen}>
        <DialogContent className="bg-[#FFEBEE] border-2 border-[#D32F2F]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#D32F2F] text-center">
              🚨 VOTING TIME 🚨
            </DialogTitle>
            <DialogDescription className="text-center">
              Is Suhani the imposter?
            </DialogDescription>
          </DialogHeader>
          
          {!voteResult ? (
            <div className="flex flex-col gap-4 mt-4">
              <Button
                data-testid="vote-yes-btn"
                onClick={handleVote}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-6 text-lg"
              >
                Yes, she's sus 🔪
              </Button>
              <Button
                data-testid="vote-no-btn"
                onClick={handleVote}
                variant="outline"
                className="border-[#D32F2F] text-[#D32F2F] py-6 text-lg"
              >
                No, she's innocent 👼
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <p className="font-heading text-2xl text-[#5D4037] mb-4">
                VOTING RESULTS:
              </p>
              <p className="font-handwritten text-xl text-[#D32F2F]">
                No. She's the MAIN CHARACTER.
              </p>
              <p className="font-body text-[#8D6E63] mt-4">
                (0 votes for imposter. Unanimous icon status.)
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== RESERVATION MODAL ==================== */}
      <Dialog open={reservationModalOpen} onOpenChange={setReservationModalOpen}>
        <DialogContent className="bg-white border-2 border-[#5D4037]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#5D4037] text-center">
              🍝 Four Olives Reservation 🍝
            </DialogTitle>
          </DialogHeader>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <div className="bg-[#F5F5DC] rounded-lg p-6 mb-4">
              <p className="font-body text-[#5D4037] mb-2">Reservation confirmed for:</p>
              <p className="font-heading text-xl text-[#5D4037]">
                Suhani + her 23 years of slay
              </p>
            </div>
            
            <p className="font-handwritten text-[#8D6E63]">
              Table: The best one (obviously)<br />
              Time: Whenever the queen arrives<br />
              Special requests: Brown tablecloth, Sage candle, Among Us napkins
            </p>
          </motion.div>
          
          <Button
            onClick={() => setReservationModalOpen(false)}
            className="bg-[#5D4037] hover:bg-[#4A3B32] text-white"
            data-testid="reservation-close-btn"
          >
            Got it, bestie ✨
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
