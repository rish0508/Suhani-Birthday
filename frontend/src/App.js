import React, { useState, useEffect, useRef } from "react";
import "@/App.css";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Moon, UtensilsCrossed, GraduationCap, 
  Gamepad2, Music, Play, Pause, X, ChevronLeft, ChevronRight,
  Volume2, VolumeX, PartyPopper, Sparkles, Dices, Palette, ExternalLink
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Progress } from "./components/ui/progress";
import { Toaster, toast } from "sonner";

// All photos (14 total) - NO CAPTIONS
const ALL_PHOTOS = [
  "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/hgfx7p65_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%289%29.jpeg",
  "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/ohlf6jz8_WhatsApp%20Image%202026-03-01%20at%2018.19.10%20%282%29.jpeg",
  "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/cph13vb8_WhatsApp%20Image%202026-03-01%20at%2018.19.10%20%281%29.jpeg",
  "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/ln6mk3gq_WhatsApp%20Image%202026-03-01%20at%2018.19.10.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/dcq9zvca_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%288%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/a6kiz1n5_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%287%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/808tt3c3_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%286%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/6tu87g9x_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%285%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/tv2dg3r9_WhatsApp%20Image%202026-03-01%20at%2018.19.01%20%284%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/v9zs3khv_WhatsApp%20Image%202026-03-01%20at%2018.20.51%20%281%29.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/p5r22y2l_WhatsApp%20Image%202026-03-01%20at%2018.20.51.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/fmbsj92p_WhatsApp%20Image%202026-03-01%20at%2018.21.41.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/scntwdxu_WhatsApp%20Image%202026-03-01%20at%2018.25.57.jpeg",
  "https://customer-assets.emergentagent.com/job_suhani-23-birthday/artifacts/blgiqk44_image.png",
];

// Sparkle Particles Component
const SparkleParticles = () => {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 8,
    size: 3 + Math.random() * 4
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

// Photo Card - Clean, no captions
const PhotoCard = ({ src, onClick }) => (
  <motion.div
    className="photo-item rounded-lg cursor-pointer overflow-hidden"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <img 
      src={src} 
      alt="" 
      className="w-full h-48 sm:h-56 object-cover"
      loading="lazy"
    />
  </motion.div>
);

// Quirk Card Component (flip cards for "What makes Suhani, Suhani")
const QuirkCard = ({ icon: Icon, title, frontText, backText, color }) => (
  <div className="flip-card quirk-card">
    <div className="flip-card-inner relative w-full h-full">
      <div 
        className="flip-card-front absolute w-full h-full rounded-xl p-5 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-10 h-10 mb-3 text-white/90" />
        <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
        <p className="font-body text-white/80 mt-2 text-sm">{frontText}</p>
      </div>
      <div 
        className="flip-card-back absolute w-full h-full rounded-xl p-5 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: color }}
      >
        <p className="font-body text-sm text-white/90">{backText}</p>
      </div>
    </div>
  </div>
);

// Crewmate SVG Component
const Crewmate = ({ color = "#8B6914", className = "" }) => (
  <svg viewBox="0 0 100 120" className={`crewmate ${className}`}>
    <ellipse cx="50" cy="80" rx="35" ry="35" fill={color} />
    <ellipse cx="50" cy="45" rx="30" ry="35" fill={color} />
    <ellipse cx="65" cy="45" rx="18" ry="22" fill="#87CEEB" opacity="0.9" />
    <ellipse cx="25" cy="90" rx="12" ry="25" fill={color} />
  </svg>
);

// Navigation Dots
const NavDots = ({ activeSection }) => {
  const sections = ['hero', 'pictures', 'quirks', 'birthday', 'amongus', 'monodeal', 'olives', 'masters'];
  
  return (
    <div className="nav-dots">
      {sections.map((section) => (
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

// Saje Product Image
const SAJE_IMAGE = "https://customer-assets.emergentagent.com/job_57bf3841-2aa7-492c-b653-218ee28c3459/artifacts/y96m98r6_image.png";

// Main App Component
function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [voteResult, setVoteResult] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [encouragementRevealed, setEncouragementRevealed] = useState(false);
  const [mastersProgress, setMastersProgress] = useState(23);
  const [activeSection, setActiveSection] = useState('hero');
  const [showMusicModal, setShowMusicModal] = useState(false);
  const audioRef = useRef(null);

  // Confetti function - brown colors
  const fireConfetti = () => {
    const colors = ['#8B6914', '#A67C52', '#5D4037', '#D4A574', '#C4A67C'];
    
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
    
    toast.success("Happy Birthday Suhani! 🎂");
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

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'pictures', 'quirks', 'birthday', 'amongus', 'monodeal', 'olives', 'masters'];
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
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Toaster position="top-center" theme="dark" />
      <SparkleParticles />
      <NavDots activeSection={activeSection} />
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl"
        >
          <motion.h1 
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FDFBF7] mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            HAPPY 23RD BIRTHDAY
          </motion.h1>
          
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B6914] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SUHANI
          </motion.h2>
          
          <motion.p 
            className="font-body text-[#A67C52] mb-8"
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
              className="bg-[#8B6914] hover:bg-[#A67C52] text-white px-8 py-6 text-lg rounded-full font-body"
            >
              <PartyPopper className="w-5 h-5 mr-2" />
              Birthday Confetti
            </Button>
            
            <Button
              data-testid="play-music-btn"
              onClick={() => setShowMusicModal(true)}
              className="bg-[#5D4037] hover:bg-[#4A3B32] text-white px-8 py-6 text-lg rounded-full font-body"
            >
              <Music className="w-5 h-5 mr-2" />
              Play Happy Birthday
            </Button>
            
            <Button
              data-testid="emergency-meeting-btn"
              onClick={() => document.getElementById('amongus')?.scrollIntoView({ behavior: 'smooth' })}
              className="emergency-btn text-white px-8 py-6 text-lg rounded-full font-body"
            >
              🚨 Emergency Meeting
            </Button>
          </div>

          {/* Featured Photos */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-lg overflow-hidden border border-[#2a2a2a]"
            >
              <img 
                src={ALL_PHOTOS[0]} 
                alt="" 
                className="w-48 h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="rounded-lg overflow-hidden border border-[#2a2a2a] hidden sm:block"
            >
              <img 
                src={ALL_PHOTOS[3]} 
                alt="" 
                className="w-48 h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
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
          <div className="w-6 h-10 border-2 border-[#8B6914] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#8B6914] rounded-full" />
          </div>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* ==================== PICTURES SECTION ==================== */}
      <section id="pictures" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-center text-[#FDFBF7] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pictures
          </motion.h2>
          <motion.p 
            className="font-body text-center text-[#A67C52] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            A collection of memories
          </motion.p>

          <div className="gallery-grid">
            {ALL_PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <PhotoCard
                  src={photo}
                  onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== QUIRKS OF SUHANI ==================== */}
      <section id="quirks" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-center text-[#FDFBF7] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Makes Suhani, Suhani
          </motion.h2>
          <motion.p 
            className="font-body text-center text-[#A67C52] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Hover to flip
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <QuirkCard
                icon={Palette}
                title="Favorite Color"
                frontText="Brown"
                backText="Everything she owns is brown. Her wardrobe is basically a coffee shop."
                color="#5D4037"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flip-card quirk-card">
                <div className="flip-card-inner relative w-full h-full">
                  <div 
                    className="flip-card-front absolute w-full h-full rounded-xl p-4 flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: '#8B6914' }}
                  >
                    <img src={SAJE_IMAGE} alt="Saje Sleep Well" className="w-16 h-20 object-contain mb-2" />
                    <h3 className="font-heading text-lg font-bold text-white">Saje Sleep Well</h3>
                    <p className="font-body text-white/80 mt-1 text-sm">Her 'vape'</p>
                  </div>
                  <div 
                    className="flip-card-back absolute w-full h-full rounded-xl p-5 flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: '#8B6914' }}
                  >
                    <p className="font-body text-sm text-white/90">She uses Saje Sleep Well like other people use vapes. Will offer you essential oils before asking how you're doing.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <QuirkCard
                icon={Gamepad2}
                title="Among Us"
                frontText="Always Crewmate"
                backText="Has gotten crewmate 47 times in a row. This is statistically impossible."
                color="#D32F2F"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <QuirkCard
                icon={UtensilsCrossed}
                title="Four Olives"
                frontText="Vancouver HQ"
                backText="Her favorite restaurant. Probably has a reserved booth at this point."
                color="#A67C52"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <QuirkCard
                icon={GraduationCap}
                title="Master's Degree"
                frontText="The Dream"
                backText="Currently manifesting. Professors aren't ready."
                color="#4A3B32"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <QuirkCard
                icon={Dices}
                title="Monodeal"
                frontText="Champion"
                backText="Will bankrupt you with a smile. No mercy in Monopoly Deal."
                color="#8B6914"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== HAPPY BIRTHDAY SECTION ==================== */}
      <section id="birthday" className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#8B6914] mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            HAPPY BIRTHDAY
          </motion.h2>
          
          <motion.p
            className="font-body text-xl text-[#FDFBF7]/80 mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            23 looks good on you
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              data-testid="big-confetti-btn"
              onClick={fireConfetti}
              className="bg-[#8B6914] hover:bg-[#A67C52] text-white px-10 py-6 text-xl rounded-full font-heading"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              More Confetti
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

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
          </motion.div>

          <div className="flex justify-center gap-4 mb-8">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }}>
              <Crewmate color="#5D4037" className="w-14 h-18" />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>
              <Crewmate color="#8B6914" className="w-14 h-18" />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>
              <Crewmate color="#D32F2F" className="w-14 h-18" />
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}>
              <Crewmate color="#A67C52" className="w-14 h-18" />
            </motion.div>
          </div>

          <motion.div
            className="glass-dark rounded-xl p-8 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-[#FDFBF7]/80 mb-6">
              Suhani has gotten crewmate 47 times in a row.
              <br /><br />
              <span className="text-[#8B6914]">This is statistically impossible.</span>
            </p>
            
            <Button
              data-testid="vote-imposter-btn"
              onClick={() => setVoteModalOpen(true)}
              className="emergency-btn text-white px-8 py-4 text-lg rounded-full font-body w-full"
            >
              Vote: Suhani = Imposter?
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== MONODEAL SECTION ==================== */}
      <section id="monodeal" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Monodeal
          </motion.h2>
          
          <motion.div
            className="glass-dark rounded-xl p-8 max-w-md mx-auto mt-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Dices className="w-16 h-16 mx-auto mb-4 text-[#8B6914]" />
            <p className="font-body text-[#FDFBF7]/80">
              Do not play Monopoly Deal with Suhani unless you're ready to lose everything.
            </p>
            <p className="font-body text-[#A67C52] mt-4 text-sm">
              Current win streak: Unknown (she stopped counting)
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== FOUR OLIVES SECTION ==================== */}
      <section id="olives" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Four Olives
          </motion.h2>
          
          <motion.p 
            className="font-body text-[#A67C52] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Her favorite restaurant in Vancouver
          </motion.p>

          <motion.div
            className="glass-dark rounded-xl p-8 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-[#8B6914]" />
            <p className="font-body text-[#FDFBF7]/80 mb-6">
              Order: "Whatever looks good"
              <br />
              Translation: Everything on the menu
            </p>
            
            <Button
              data-testid="reserve-table-btn"
              onClick={() => setReservationModalOpen(true)}
              className="bg-[#8B6914] hover:bg-[#A67C52] text-white px-8 py-4 rounded-full font-body w-full"
            >
              Reserve Table
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== MASTERS SECTION ==================== */}
      <section id="masters" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Master's Degree
          </motion.h2>

          <motion.p 
            className="font-body text-[#A67C52] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Loading...
          </motion.p>

          <motion.div
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-2">
              <span className="font-body text-[#A67C52]">Progress</span>
              <span className="font-heading text-[#8B6914]">{mastersProgress}%</span>
            </div>
            <Progress value={mastersProgress} className="h-3 bg-[#2a2a2a]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="encouragement-btn"
              onClick={() => setEncouragementRevealed(true)}
              variant="outline"
              className="border-[#8B6914] text-[#8B6914] hover:bg-[#8B6914] hover:text-white px-8 py-4 rounded-full"
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
                className="mt-8 glass-dark rounded-xl p-6 max-w-md mx-auto"
              >
                <p className="font-body text-[#FDFBF7]/80">
                  You're gonna crush 490 with Marina. You got{' '}
                  <a 
                    href="https://www.linkedin.com/in/ian-paterson-98a887257/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#8B6914] hover:text-[#A67C52] underline inline-flex items-center gap-1"
                  >
                    Ian
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {' '}bro
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== FOOTER ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              data-testid="replay-confetti-btn"
              onClick={fireConfetti}
              className="bg-[#8B6914] hover:bg-[#A67C52] text-white px-10 py-6 text-xl rounded-full font-heading"
            >
              <PartyPopper className="w-6 h-6 mr-2" />
              Replay Confetti
            </Button>
          </motion.div>

          <motion.p 
            className="font-body text-[#A67C52]/60 mt-12 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Happy 23rd Birthday, Suhani 🤎
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
        <DialogContent className="max-w-4xl bg-[#0a0a0a]/95 border-[#2a2a2a] p-2 sm:p-4">
          <div className="relative">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
              data-testid="lightbox-close-btn"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img
              src={ALL_PHOTOS[lightboxIndex]}
              alt=""
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            
            <div className="flex justify-between items-center mt-4 px-4">
              <button
                onClick={prevImage}
                className="bg-white/10 hover:bg-white/20 rounded-full p-3"
                data-testid="lightbox-prev-btn"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <span className="text-[#A67C52] text-sm">
                {lightboxIndex + 1} / {ALL_PHOTOS.length}
              </span>
              
              <button
                onClick={nextImage}
                className="bg-white/10 hover:bg-white/20 rounded-full p-3"
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
        <DialogContent className="bg-[#141414] border-[#D32F2F]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#D32F2F] text-center">
              🚨 VOTING TIME 🚨
            </DialogTitle>
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
                className="border-[#D32F2F] text-[#D32F2F] py-6 text-lg hover:bg-[#D32F2F]/10"
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
              <p className="font-heading text-xl text-[#FDFBF7] mb-4">
                VOTING RESULTS:
              </p>
              <p className="font-body text-[#D32F2F]">
                Suhani was not the imposter.
              </p>
              <p className="font-body text-[#A67C52] mt-4 text-sm">
                (0 imposters remain)
              </p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== RESERVATION MODAL ==================== */}
      <Dialog open={reservationModalOpen} onOpenChange={setReservationModalOpen}>
        <DialogContent className="bg-[#141414] border-[#8B6914]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-[#8B6914] text-center">
              Four Olives Reservation
            </DialogTitle>
          </DialogHeader>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <div className="bg-[#0a0a0a] rounded-lg p-6 mb-4 border border-[#2a2a2a]">
              <p className="font-body text-[#FDFBF7]/80 mb-2">Reservation confirmed for:</p>
              <p className="font-heading text-lg text-[#8B6914]">
                Suhani
              </p>
            </div>
            
            <p className="font-body text-[#A67C52] text-sm">
              Table: The best one<br />
              Time: Whenever she arrives<br />
              Special requests: Brown napkins
            </p>
          </motion.div>
          
          <Button
            onClick={() => setReservationModalOpen(false)}
            className="bg-[#8B6914] hover:bg-[#A67C52] text-white"
            data-testid="reservation-close-btn"
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
