'use client';
import Link from "next/link";

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

export default function Home() {
    return (
        <>
          {/* Google Fonts - Add these fonts to your project */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
                    className={`h-full w-auto object-contain duration-1000`}
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className={`h-full w-auto object-contain duration-1000`}
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className={`h-full w-auto object-contain duration-1000`}
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className={`h-full w-auto object-contain duration-1000`}

                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className={`h-full w-auto object-contain duration-1000`}

                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className={`h-full w-auto object-contain duration-1000`}

                />
            </div>
    
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-red-300 rounded-full transition-all duration-1000`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
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
    
            </div>
          </div>
    
          {/* Main Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center p-2">
            <div className="w-full max-w-5xl">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-center mb-15">
                    <Link href="/" className="cursor-pointer">
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
                        Artic Privacy Policy
                        </h1>
                    </Link>
                </div>
                <div className="max-w-3xl mx-auto p-8 bg-white text-gray-800 font-sans leading-relaxed border border-gray-200 rounded-xl shadow-sm my-10">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8 italic">Last Updated: December 2025</p>

                    <p className="mb-6">
                        This app is a hobbyist project designed with <strong>Privacy by Design</strong>. 
                        Our goal is to let you create art without collecting your personal data.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Data We Do Not Collect</h2>
                        <ul className="list-disc ml-6 space-y-2">
                        <li><strong>No Image Storage:</strong> We do not store the images you generate. They are processed in real-time and delivered directly to your browser.</li>
                        <li><strong>No Accounts:</strong> We do not require sign-up, so we do not collect names, emails, or passwords.</li>
                        <li><strong>No Cookies:</strong> We do not use tracking cookies or advertising pixels.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">2. How Data is Processed</h2>
                        <p className="mb-4">To generate your poster, we use pass-through services that do not persist your data:</p>
                        <ul className="list-disc ml-6 space-y-2">
                        <li><strong>Cloudflare:</strong> Your request travels through Cloudflare and their secure global network. Cloudflare does not store your image data.</li>
                        <li><strong>fal.ai:</strong> We send your prompt to fal.ai. We use <em>Sync Mode</em>, which instruct fal.ai to delete the image data instantly upon delivery.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Your Rights (GDPR)</h2>
                        <p>
                        Because we do not store your data, there is no Personal Data for us to delete or modify. 
                        For questions about this stateless architecture, contact the developer at: 
                        <span className="text-blue-600">abhiamishra0@gmail.com</span>.
                        </p>
                    </section>

                    <footer className="pt-6 border-t text-sm text-gray-500">
                        <p>&copy; 2025 Artic. Built for the love of music and privacy.</p>
                    </footer>
                </div>
            </div>
          </div>
    
          {/* Additional atmospheric effects */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-60"></div>
        </div>
        </div>
        </>
      );
}
