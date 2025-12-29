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
                {/* Show fewer tents on mobile */}
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
                {/* Hide extra tents on small screens */}
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
    
            {/* Main Content - Responsive padding and sizing */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
              <div className="w-full max-w-5xl">
                {/* Header - Responsive text size */}
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
                          What is Artic
                          </h1>
                      </Link>
                  </div>
                </div>
                
                {/* Content - Responsive text and spacing */}
                <div className="space-y-4 sm:space-y-6">
                  <p className={`text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg ${currentFonts.subtitle} leading-relaxed`}>
                      Fan of concerts and want to take a snapshot of it? 
                  </p>
                  
                  <p className={`text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg ${currentFonts.subtitle} leading-relaxed`}>
                      Artic is a simple way to store your memories from your concerts.
                  </p>
                  
                  <p className={`text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg ${currentFonts.subtitle} leading-relaxed`}>
                      Simply enter a few details about your live experience and receive an Artic - a snapshot frozen in time. 
                  </p>
                  
                  <p className={`text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg ${currentFonts.subtitle} leading-relaxed`}>
                      Designed to be shared, an Artic gives you a customized template of your experience. Add your own photos to capture your experience or use our own!
                  </p>
                </div>
              </div>
            </div>
    
            {/* Bottom gradient bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-60"></div>
          </div>
        </>
    );
}