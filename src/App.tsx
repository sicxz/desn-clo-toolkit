import { HeroSection } from './components/HeroSection';
import { InfographicHero } from './components/InfographicHero';
import { WhyCLOsFail } from './components/WhyCLOsFail';
import { SLOComparison } from './components/SLOComparison';
import { CLOGenerator } from './components/CLOGenerator';
import { PromptTemplate } from './components/PromptTemplate';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Hero - Full viewport intro */}
      <div style={{ width: '100%' }}>
        <HeroSection />
      </div>

      {/* Framework Overview - The infographic with PLO reference */}
      <div style={{ width: '100%' }}>
        <InfographicHero />
      </div>

      {/* Educational Section - Why old CLOs fail */}
      <div style={{ width: '100%' }}>
        <WhyCLOsFail />
      </div>

      {/* Before/After Comparison - Course-specific examples */}
      <div style={{ width: '100%' }}>
        <SLOComparison />
      </div>

      {/* AI Generator - The interactive tool */}
      <div style={{ width: '100%' }}>
        <CLOGenerator />
      </div>

      {/* Prompt Template - DIY option */}
      <div style={{ width: '100%' }}>
        <PromptTemplate />
      </div>

      {/* Footer */}
      <div style={{ width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
