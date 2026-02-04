import UnifiedBackground from './UnifiedBackground';

export default function StatsSection() {
  const stats = [
    {
      value: "$14,203,940",
      label: "TOTAL VALUE LOCKED (TVL)",
      icon: "💰"
    },
    {
      value: "84,232",
      label: "ACTIVE WALLETS",
      icon: "👥"
    },
    {
      value: "2.4M STX",
      label: "REWARDS DISTRIBUTED",
      icon: "🎯"
    }
  ];

  return (
    <section className="relative py-16">
      {/* Unified Background */}
      <UnifiedBackground 
        variant="section"
        showParticles={true}
        particleCount={100}
        opacity={0.3}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}