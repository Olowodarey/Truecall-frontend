import Image from 'next/image';
import UnifiedBackground from './UnifiedBackground';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Unified Background */}
      <UnifiedBackground 
        variant="hero"
        showParticles={true}
        showDecorative={true}
        showNetworkLines={true}
        particleCount={300}
        opacity={0.6}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              BLOCKCHAIN BETTING
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Provably Fair.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  Fully On-Chain.
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                TrueCall is a verifiably monthly events backed by the 
                Bitcoin network. No intermediaries, just luck.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Launch App
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          <div className="relative">
            {/* 3D Blockchain visualization placeholder */}
            <div className="relative w-full h-96 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4 p-8">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded transform rotate-45 animate-pulse ${
                        i % 3 === 0 ? 'bg-orange-500' : i % 3 === 1 ? 'bg-yellow-400' : 'bg-orange-600'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}