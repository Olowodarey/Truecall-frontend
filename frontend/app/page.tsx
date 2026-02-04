import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import TournamentsSection from '../components/TournamentsSection';
import ArchitectureSection from '../components/ArchitectureSection';
import Footer from '../components/Footer';
import UnifiedBackground from '../components/UnifiedBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Global Background */}
      <UnifiedBackground 
        variant="minimal"
        showParticles={false}
        className="fixed inset-0 -z-10"
      />
      <Header />
      <HeroSection />
      <StatsSection />
      <TournamentsSection />
      <ArchitectureSection />
      <Footer />
    </div>
  );
}
