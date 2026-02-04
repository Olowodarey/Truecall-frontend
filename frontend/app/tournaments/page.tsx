import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnifiedBackground from '../../components/UnifiedBackground';

export default function TournamentsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Page Background */}
      <UnifiedBackground 
        variant="section"
        showParticles={true}
        showNetworkLines={true}
        particleCount={200}
        opacity={0.4}
        className="fixed inset-0 -z-10"
      />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tournaments
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join competitive blockchain gaming tournaments with provably fair outcomes
              and transparent prize distribution.
            </p>
          </div>
          
          {/* Tournament content would go here */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Active Tournaments</h2>
              <p className="text-gray-300">
                Browse and join currently active tournaments with real-time updates
                and live leaderboards.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
              <p className="text-gray-300">
                Register for upcoming tournaments and get notified when they start.
                Set your strategy and prepare for competition.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}