import Link from 'next/link';
import UnifiedBackground from './UnifiedBackground';

export default function TournamentsSection() {
  const tournaments = [
    {
      title: "Grand Prize Pool",
      description: "The monthly flagship event. Highest volume conference finals.",
      prizePool: "10,000 STX",
      status: "FEATURED",
      timeLeft: "2d 4h",
      participants: "1,234",
      bgColor: "from-orange-600/20 to-red-600/20",
      statusColor: "bg-orange-500"
    },
    {
      title: "Speed Protocol",
      description: "Lightning fast. Fastest and most competitive chain bets.",
      prizePool: "5,000 STX",
      status: "PRIZE POOL",
      timeLeft: "5d 12h",
      participants: "856",
      bgColor: "from-blue-600/20 to-purple-600/20",
      statusColor: "bg-blue-500"
    },
    {
      title: "Community Governance",
      description: "Propose voting and rewards. Choose the future of the platform.",
      prizePool: "2,500 STX",
      status: "PROPOSAL",
      timeLeft: "7d 8h",
      participants: "432",
      bgColor: "from-purple-600/20 to-pink-600/20",
      statusColor: "bg-purple-500"
    }
  ];

  return (
    <section className="relative py-20">
      {/* Unified Background */}
      <UnifiedBackground 
        variant="section"
        showParticles={true}
        particleCount={120}
        opacity={0.25}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Upcoming Tournaments
          </h2>
          <Link 
            href="/tournaments" 
            className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2"
          >
            View all →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, index) => (
            <div 
              key={index}
              className={`relative bg-gradient-to-br ${tournament.bgColor} border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group cursor-pointer`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`${tournament.statusColor} text-white text-xs px-2 py-1 rounded uppercase font-semibold`}>
                    {tournament.status}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {tournament.prizePool}
                    </div>
                    <div className="text-xs text-gray-400">PRIZE POOL</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tournament.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {tournament.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-white font-semibold">{tournament.timeLeft}</div>
                    <div className="text-gray-400">TIME LEFT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{tournament.participants}</div>
                    <div className="text-gray-400">ENTRIES</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors text-sm font-semibold">
                    Register Now
                  </button>
                  <button className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors text-sm">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}