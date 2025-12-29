'use client';
import Link from "next/link";

const fonts = {
    orbitron: 'font-["Orbitron",monospace]',
    righteous: 'font-["Righteous",cursive]',
    bungee: 'font-["Bungee",cursive]',
    monoton: 'font-["Monoton",cursive]',
    creepster: 'font-["Creepster",cursive]',
    blackOpsOne: 'font-["Black_Ops_One",cursive]',
    pressStart: 'font-["Press_Start_2P",cursive]',
    audiowide: 'font-["Audiowide",cursive]',
    herbus: 'font-["Herbus",cursive]',
};

const currentFonts = {
  title: fonts.monoton,
  subtitle: fonts.pressStart,
  input: fonts.pressStart,
  button: fonts.pressStart,
};

export default function Home() {
    return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Righteous&family=Bungee&family=Monoton&family=Creepster&family=Black+Ops+One&family=Press+Start+2P&family=Audiowide&display=swap" rel="stylesheet" />
          
          <style jsx>{`
            @keyframes wiggle {
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
    
          <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
              
              {/* Circus Tent PNG Background - Responsive */}
              <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 md:h-64 flex items-end justify-center overflow-hidden">
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="h-full w-auto object-contain duration-1000"
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="h-full w-auto object-contain duration-1000"
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="h-full w-auto object-contain duration-1000"
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="hidden sm:block h-full w-auto object-contain duration-1000"
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="hidden md:block h-full w-auto object-contain duration-1000"
                />
                <img 
                    src="/circus-tent.png" 
                    alt="Circus tents" 
                    className="hidden lg:block h-full w-auto object-contain duration-1000"
                />
              </div>
    
              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-red-300 rounded-full transition-all duration-1000"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
    
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
    
            {/* Main Content - Responsive */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="w-full max-w-5xl">
                {/* Header - Responsive */}
                <div className="mb-6 sm:mb-8 md:mb-12">
                  <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-15">
                    <Link href="/" className="cursor-pointer">
                      <h1 
                        style={{ wordSpacing: '0.2em' }} 
                        className={`
                          text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
                          font-bold tracking-wider text-center
                          bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
                          ${currentFonts.title}
                          transition-all duration-300 ease-out
                          hover:scale-105 hover:brightness-150
                          hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]
                          cursor-default select-none
                          px-2
                        `}
                      >
                        Privacy Policy
                      </h1>
                    </Link>
                  </div>
                </div>
                
                {/* Privacy Content - Mobile Responsive */}
                <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white text-gray-800 font-sans leading-relaxed border border-gray-200 rounded-xl shadow-sm my-6 sm:my-8 md:my-10">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 border-b pb-3 sm:pb-4">
                    Privacy Policy
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 italic">
                    Last Updated: December 2025
                  </p>

                  <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                    This app is a hobbyist project designed with <strong>Privacy by Design</strong>. 
                    Our goal is to let you create art without collecting your personal data.
                  </p>

                  <section className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                      1. Data We Do Not Collect
                    </h2>
                    <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
                      <li>
                        <strong>No Image Storage:</strong> We do not store the images you generate. They are processed in real-time and delivered directly to your browser.
                      </li>
                      <li>
                        <strong>No Accounts:</strong> We do not require sign-up, so we do not collect names, emails, or passwords.
                      </li>
                      <li>
                        <strong>No Cookies:</strong> We do not use tracking cookies or advertising pixels.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                      2. How Data is Processed
                    </h2>
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                      To generate your poster, we use pass-through services that do not persist your data:
                    </p>
                    <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
                      <li>
                        <strong>Cloudflare:</strong> Your request travels through Cloudflare and their secure global network. Cloudflare does not store your image data.
                      </li>
                      <li>
                        <strong>fal.ai:</strong> We send your prompt to fal.ai. We use <em>Sync Mode</em>, which instruct fal.ai to delete the image data instantly upon delivery.
                      </li>
                    </ul>
                  </section>

                  <section className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                      3. Your Rights (GDPR)
                    </h2>
                    <p className="text-sm sm:text-base">
                      Because we do not store your data, there is no Personal Data for us to delete or modify. 
                      For questions about this stateless architecture, contact the developer at: 
                      <a href="mailto:abhiamishra0@gmail.com" className="text-blue-600 hover:underline ml-1 break-all">
                        abhiamishra0@gmail.com
                      </a>.
                    </p>
                  </section>

                  <footer className="pt-4 sm:pt-6 border-t text-xs sm:text-sm text-gray-500">
                    <p>&copy; 2025 Artic. Built for the love of music and privacy.</p>
                  </footer>
                </div>
              </div>
            </div>
    
            {/* Bottom gradient bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-60"></div>
          </div>
        </>
    );
}