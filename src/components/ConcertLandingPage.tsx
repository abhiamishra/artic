'use client';
import { useState } from 'react';
import { Music, Calendar, User, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Add Google Fonts - you can experiment with different combinations
const fonts = {
  orbitron: 'font-["Orbitron",monospace]', // Futuristic sci-fi
  righteous: 'font-["Righteous",cursive]', // Bold retro
  bungee: 'font-["Bungee",cursive]', // Street art style
  monoton: 'font-["Monoton",cursive]', // Neon sign style
  creepster: 'font-["Creepster",cursive]', // Horror/metal band
  blackOpsOne: 'font-["Black_Ops_One",cursive]', // Military stencil
  pressStart: 'font-["Press_Start_2P",cursive]', // 8-bit gaming
  audiowide: 'font-["Audiowide",cursive]', // Tech/digital
  herbus: 'font-["Herbus",cursive]', // Modern, geometric sci-fi
};

// Current font selection - change these to experiment!
const currentFonts = {
  title: fonts.monoton, // Main title
  subtitle: fonts.pressStart, // Subtitle text  
  input: fonts.pressStart, // Input placeholders
  button: fonts.pressStart, // Button text
};

export default function ConcertLandingPage() {
  const [formData, setFormData] = useState({
    artist: '',
    concert: '',
    section: '',
    venue: '',
    date: ''
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const [imageUrl, setImageUrl] = useState(""); // This stores the image link
  const [loading, setLoading] = useState(false); // This tracks if we are waiting

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Name the file based on the artist
      link.download = `${formData.artist.replace(/\s+/g, '_')}_concert.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      // Fallback: just open in a new tab
      window.open(imageUrl, '_blank');
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    // Optional: setImageUrl(""); // Clear if you don't want it stored
  };

  const handleSubmit = async () => {
    if (!formData.artist || !formData.concert || !formData.date) {
      alert('Please fill in all fields');
      return;
    }
    //console.log('Concert Entry:', formData);

    setLoading(true); // 2. Trigger loading screen immediately

    try{
      const rsp = await fetch("/api/image-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artist: formData.artist,
          concert: formData.concert,   // relative to /public
          section: formData.section, 
          venue: formData.venue,
          date: formData.date,
        }),
      });

      const image_data = await rsp.json();

      if (image_data.url) {
        //console.log("setting url")
        setImageUrl(image_data.url);
  
        setLoading(false);
        setIsAnimating(true);
      } else {
        setLoading(false);
        alert("Generation failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
    
    // const image_data = {
    //   "url": "https://v3b.fal.media/files/b/0a8834d0/cW9v8n530DqH2R0UewMER.png"
    // }

  };

  return (
    <>
      {/* Google Fonts - Add these fonts to your project */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.pcom" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Righteous&family=Bungee&family=Monoton&family=Creepster&family=Black+Ops+One&family=Press+Start+2P&family=Audiowide&display=swap" rel="stylesheet" />
      
       {/* Custom Animation Styles */}
       <style jsx>{`
        @keyframes wiggle {
          /* Adjust these numbers until the "top" faces the way you want */
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-5deg) scale(1.05); }
        }

        @keyframes popUp {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          100% { 
            opacity: 1; 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-pop-up {
          animation: popUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
       {/* <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg) scale(1.2); }
          25% { transform: rotate(2deg) scale(1.25); }
          50% { transform: rotate(-1deg) scale(1.15); }
          75% { transform: rotate(1deg) scale(1.2); }
        }
        @keyframes sizzle {
          0% { 
            transform: scale(1) rotate(0deg);
            filter: brightness(1) contrast(1) saturate(1);
          }
          20% { 
            transform: scale(1.1) rotate(2deg);
            filter: brightness(1.2) contrast(1.1) saturate(1.2);
          }
          40% { 
            transform: scale(1.2) rotate(-2deg);
            filter: brightness(1.4) contrast(1.2) saturate(1.4);
          }
          60% { 
            transform: scale(1.3) rotate(3deg);
            filter: brightness(1.6) contrast(1.3) saturate(1.6);
          }
          80% { 
            transform: scale(1.4) rotate(-1deg);
            filter: brightness(1.8) contrast(1.4) saturate(1.8);
          }
          100% { 
            transform: scale(1.5) rotate(12deg);
            filter: brightness(2) contrast(1.5) saturate(2);
          }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        @keyframes popUp {
          0% { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          20% { 
            transform: scale(0.3) rotate(-120deg);
            opacity: 0.5;
          }
          40% { 
            transform: scale(0.7) rotate(-60deg);
            opacity: 0.8;
          }
          60% { 
            transform: scale(1.1) rotate(0deg);
            opacity: 1;
          }
          80% { 
            transform: scale(0.95) rotate(10deg);
            opacity: 1;
          }
          100% { 
            transform: scale(1.2) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style> */}



      <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Dark carnival atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
        
        {/* Circus Tent PNG Background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center">
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
            <img 
                src="/circus-tent.png" 
                alt="Circus tents" 
                className={`h-full w-auto object-contain duration-1000 ${
                isAnimating 
                    ? 'opacity-100 brightness-150 drop-shadow-2xl animate-pulse' 
                    : 'opacity-30'
                }`}
            />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-red-300 rounded-full transition-all duration-1000 ${
                isAnimating ? 'animate-ping opacity-100' : 'animate-pulse opacity-20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
          
          {/* Extra sparkle effects during animation */}
          {isAnimating && [...Array(20)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-300 rounded-full animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}

          {isAnimating && [...Array(20)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-15">
              <Link href="/about" className="cursor-pointer">
                <h1 
                  style={{ wordSpacing: '0.5em' }} 
                  className={`
                      text-7xl font-bold tracking-wider whitespace-nowrap
                      bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
                      ${currentFonts.title}
                      transition-all duration-300 ease-out
                      hover:scale-105 hover:brightness-150
                      hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]
                      cursor-default select-none
                  `}
                >
                  ARTIC
                </h1>
              </Link>
            </div>
           
            <p className={`text-gray-300 text-lg ${currentFonts.subtitle}`}>
              Enter show details and create your Artic
            </p>
            <br/>
            <Link href="/privacy" className="cursor-pointer">
              <p 
                style={{ wordSpacing: '0.5em' }} 
                className={`
                    text-xs font-bold tracking-wider whitespace-nowrap
                    bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
                    ${currentFonts.subtitle}
                    transition-all duration-300 ease-out
                    hover:scale-105 hover:brightness-150
                    hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]
                    cursor-default select-none
                `}
              >
                PRIVACY POLICY
              </p>
            </Link>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Artist Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="ARTIST NAME"
                required
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${currentFonts.input}`}
              />
            </div>

            {/* Concert Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Music className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="text"
                name="concert"
                value={formData.concert}
                onChange={handleInputChange}
                placeholder="CONCERT/TOUR NAME"
                required
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${currentFonts.input}`}
              />
            </div>

            {/* Concert Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Music className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="SECTION"
                required
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${currentFonts.input}`}
              />
            </div>

            {/* Concert Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Music className="h-5 w-5 text-red-400" />
              </div>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="VENUE"
                required
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${currentFonts.input}`}
              />
            </div>

            {/* Date Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 ${currentFonts.input}`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading} // Prevent double clicks
              className={`w-full py-4 bg-[rgb(184,24,24)] hover:bg-[rgb(158,178,177)] text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 ${currentFonts.button}`}
            >
              {loading ? "PROCESSING..." : "LOG CONCERT EXPERIENCE"}
            </button>
          </div>

          {/* Footer text */}
          <p className={`text-center text-gray-500 text-sm mt-8 ${currentFonts.button}`}>
            Keep track of your memories with your custom Artic
          </p>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
          {/* Animated Spinner or Icon */}
          <div className="relative">
            <Sparkles className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
            <div className="absolute inset-0 h-12 w-12 text-yellow-400 animate-ping opacity-50">
               <Sparkles />
            </div>
          </div>
          
          <h2 className={`text-2xl text-white tracking-widest animate-pulse ${currentFonts.subtitle}`}>
            DEVELOPING MEMORIES...
          </h2>
          <p className="text-gray-400 mt-2 font-mono text-xs">This may take a few seconds</p>
        </div>
      )}
      
      {/* Pop-up Image Effect */}
      {isAnimating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dark overlay */}
          <div 
            className="absolute inset-0 bg-black/95 animate-fade-in cursor-pointer" 
            onClick={handleClose}
          />
          
          {/* Main Animated Container - forced to Column */}
          <div className="relative z-[110] animate-pop-up flex flex-col items-center justify-center w-full max-w-2xl pointer-events-none">
            
            {imageUrl && (
              <div className="animate-wiggle flex flex-col items-center pointer-events-auto">
                
                {/* Relative wrapper for Image + Close Button */}
                <div className="relative">
                  {/* Close Button - positioned relative to the image top-right */}
                  <button 
                    onClick={handleClose}
                    className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors z-[120] shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>

                  <img 
                    src={imageUrl} 
                    alt="AI Result" 
                    className="rounded-lg shadow-[0_0_80px_rgba(255,255,255,0.2)] border border-white/10"
                    style={{ 
                      maxHeight: "60vh", // Use vh for height to leave room for button below
                      width: "auto",
                      objectFit: "contain"
                    }} 
                  />
                </div>

                {/* Download Button - Now clearly outside the image wrapper but inside the column */}
                <button
                  onClick={handleDownload}
                  className={`mt-10 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full flex items-center gap-3 transform transition-all hover:scale-110 shadow-[0_0_30px_rgba(250,204,21,0.4)] ${currentFonts.button}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  SAVE ARTIC
                </button>
                
                <p className="mt-4 text-white/40 text-[10px] tracking-widest uppercase">
                  Click background to exit
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional atmospheric effects */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-60"></div>
    </div>
    </>
  );
}