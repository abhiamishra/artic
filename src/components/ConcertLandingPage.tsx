'use client';
import { useState } from 'react';
import { Music, Calendar, User, Sparkles, Building, DiscAlbum } from 'lucide-react';
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
  const [blankarticURL, setBlankArticURL] = useState(""); // This stores the image link
  const [loading, setLoading] = useState(false); // This tracks if we are waiting

  const [albumLoading, setAlbumLoading] = useState(false); // This tracks if we are waiting
  const [error, setError] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumData, setAlbumData] = useState<any>(null);
  
  const [fullarticURL, setFullArticURL] = useState(""); // This stores the image link
  const [imageUrl, setImageUrl] = useState(""); // This stores the image link

  const returnAlbumCover = async () => {
    setAlbumLoading(true);
    setAlbumData(null);

    try {
      const response = await fetch(`/api/itunes?term=${encodeURIComponent(albumName)}`);
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'API call failed');
      } else {
        setAlbumData(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Network error: ' + err.message);
      }
    } finally {
      setAlbumLoading(false);
    }
  };

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

    try {
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
        setBlankArticURL(image_data.url);
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
  };

  const handleArticSubmit = async () => {
    if (!formData.artist || !formData.concert || !formData.date || !albumName) {
      alert('Please fill in all fields');
      return;
    }
    //console.log('Concert Entry:', formData);

    setLoading(true); // 2. Trigger loading screen immediately

    try {
      const rsp = await fetch("/api/image-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tradingcardURL: blankarticURL,
          albumURL: albumData
        }),
      });

      const full_artic_img = await rsp.json();

      if (full_artic_img.url) {
        //console.log("setting url")
        setFullArticURL(full_artic_img.url);
        setImageUrl(full_artic_img.url);

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
  };

  return (
    <>
      {/* Google Fonts - Add these fonts to your project */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Righteous&family=Bungee&family=Monoton&family=Creepster&family=Black+Ops+One&family=Press+Start+2P&family=Audiowide&display=swap" rel="stylesheet" />

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-5deg) scale(1.05); }
        }

        @keyframes popUp {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-pop-up { animation: popUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-wiggle { animation: wiggle 3s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      <div className="min-h-screen relative overflow-x-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center opacity-30">
            {[...Array(6)].map((_, i) => (
              <img key={i} src="/circus-tent.png" alt="Circus tents" className="h-full w-auto object-contain" />
            ))}
          </div>
          
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`absolute w-1 h-1 bg-red-300 rounded-full transition-all duration-1000 ${isAnimating ? 'animate-ping opacity-100' : 'animate-pulse opacity-20'}`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }}></div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center p-4 md:p-8">
          
          {/* Header */}
          <div className="text-center mb-12 w-full">
            <Link href="/about" className="cursor-pointer inline-block">
              <h1 style={{ wordSpacing: '0.5em' }} className={`text-5xl md:text-7xl font-bold tracking-wider bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ${currentFonts.title} transition-all duration-300 hover:scale-105 hover:brightness-150`}>
                ARTIC
              </h1>
            </Link>
            <p className={`text-gray-300 text-xs md:text-lg mt-4 ${currentFonts.subtitle}`}>
              Enter show details and create your Artic
            </p>
            <Link href="/privacy" className="cursor-pointer inline-block mt-4">
              <p className={`text-[8px] md:text-xs font-bold tracking-wider bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ${currentFonts.subtitle} hover:brightness-150`}>
                PRIVACY POLICY
              </p>
            </Link>
          </div>

          {/* Form and Album Search Grid */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* LEFT SIDE: FORM */}
            <div className="bg-gray-800/30 rounded-lg p-6 md:p-8 backdrop-blur-sm border border-white/5 space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                <input type="text" name="artist" value={formData.artist} onChange={handleInputChange} placeholder="ARTIST NAME" required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${currentFonts.input}`} />
              </div>

              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input type="text" name="concert" value={formData.concert} onChange={handleInputChange} placeholder="CONCERT/TOUR NAME" required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${currentFonts.input}`} />
              </div>

              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
                <input type="text" name="section" value={formData.section} onChange={handleInputChange} placeholder="SECTION" required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${currentFonts.input}`} />
              </div>

              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
                <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} placeholder="VENUE" required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${currentFonts.input}`} />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${currentFonts.input}`} />
              </div>

              <button type="button" onClick={handleSubmit} disabled={loading} className={`w-full py-4 bg-[rgb(184,24,24)] hover:bg-[rgb(158,178,177)] text-white text-[10px] md:text-xs font-semibold rounded-lg transform active:scale-95 transition-all shadow-lg ${currentFonts.button}`}>
                {loading ? "PROCESSING..." : "GENERATE BLANK ARTIC"}
              </button>
            </div>

            {/* RIGHT SIDE: ALBUM COVER */}
            <div className="bg-gray-800/30 rounded-lg p-6 md:p-8 backdrop-blur-sm border border-white/5 space-y-6 flex flex-col">
              <div className="relative">
                <DiscAlbum className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-400" />
                <input type="text" value={albumName} onChange={(e) => setAlbumName(e.target.value)} placeholder="ALBUM NAME" required className={`w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-[10px] md:text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${currentFonts.input}`} />
              </div>

              <button type="button" onClick={returnAlbumCover} disabled={albumLoading || !albumName.trim()} className={`w-full py-4 bg-[rgb(184,24,24)] hover:bg-[rgb(158,178,177)] text-white text-[10px] md:text-xs font-semibold rounded-lg transform active:scale-95 transition-all shadow-lg ${currentFonts.button}`}>
                {albumLoading ? 'SEARCHING...' : 'ADD ALBUM COVER'}
              </button>

              <div className="flex-1 flex justify-center items-center min-h-[200px]">
                {albumData && albumData.results && albumData.results.length > 0 ? (
                  <img src={albumData.results[0].artworkUrl100.replace('100x100', '600x600')} alt="Album cover" className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-2xl object-cover border border-white/10" />
                ) : (
                  <p className="text-gray-500 text-[8px] uppercase tracking-widest">No album selected</p>
                )}
              </div>
            </div>
          </div>

          {/* MAIN ACTION BUTTON */}
          <div className="w-full max-w-xl pb-12">
            <button type="button" onClick={handleArticSubmit} disabled={loading} className={`w-full py-5 bg-[rgb(184,24,24)] hover:bg-[rgb(158,178,177)] text-white text-[10px] md:text-sm font-semibold rounded-lg transform active:scale-95 transition-all shadow-2xl ${currentFonts.button}`}>
              {loading ? "PROCESSING..." : "GENERATE ARTIC WITH ALBUM"}
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
              <div className="absolute inset-0 h-12 w-12 text-yellow-400 animate-ping opacity-50"><Sparkles /></div>
            </div>
            <h2 className={`text-xl md:text-2xl text-white tracking-widest animate-pulse ${currentFonts.subtitle}`}>DEVELOPING MEMORIES...</h2>
          </div>
        )}

        {/* Pop-up Image Effect */}
        {isAnimating && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 animate-fade-in cursor-pointer" onClick={handleClose} />
            <div className="relative z-[110] animate-pop-up flex flex-col items-center justify-center w-full max-w-2xl">
              {imageUrl && (
                <div className="animate-wiggle flex flex-col items-center">
                  <div className="relative">
                    <button onClick={handleClose} className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors z-[120] shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <img src={imageUrl} alt="AI Result" className="rounded-lg shadow-[0_0_80px_rgba(255,255,255,0.2)] border border-white/10 max-h-[60vh] w-auto object-contain" />
                  </div>
                  <button onClick={handleDownload} className={`mt-10 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full flex items-center gap-3 transform transition-all hover:scale-110 shadow-lg ${currentFonts.button}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    SAVE ARTIC
                  </button>
                  <p className="mt-4 text-white/40 text-[10px] tracking-widest uppercase">Click background to exit</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-60"></div>
      </div>
    </>
  );
}