import UnifiedBackground from './UnifiedBackground';

export default function ArchitectureSection() {
  const features = [
    {
      icon: "🔄",
      title: "Transparent Execution",
      description: "Every transaction and result is executed on-chain, ensuring complete transparency and verifiability."
    },
    {
      icon: "🛡️",
      title: "Smart Contract Security",
      description: "Audited smart contracts ensure that funds are secure and game outcomes are tamper-proof."
    },
    {
      icon: "✅",
      title: "Verifiable Randomness",
      description: "Utilizing VRF to ensure provably fair and random outcomes for all gaming events."
    }
  ];

  return (
    <section className="relative py-20">
      {/* Unified Background */}
      <UnifiedBackground 
        variant="section"
        showParticles={true}
        particleCount={80}
        opacity={0.2}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="text-orange-400 text-sm uppercase tracking-wide mb-4">
            ARCHITECTURE
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Built on Stacks Blockchain
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}