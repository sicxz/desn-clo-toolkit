import { HeroSection } from './components/HeroSection';
import { InfographicHero } from './components/InfographicHero';
import { WhyCLOsFail } from './components/WhyCLOsFail';
import { SLOComparison } from './components/SLOComparison';
import { CLOGenerator } from './components/CLOGenerator';
import { PromptTemplate } from './components/PromptTemplate';
import { Footer } from './components/Footer';

const navItems = [
  { href: '#overview', label: 'Overview' },
  { href: '#framework', label: 'Framework' },
  { href: '#diagnostics', label: 'Diagnostics' },
  { href: '#comparison', label: 'Before / After' },
  { href: '#generator', label: 'Generator' },
  { href: '#prompt-template', label: 'Prompt' },
];

export default function App() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="topbar">
          <a href="#overview" className="brand">
            <span className="brand-mark">EWU</span>
            <span>Design CLO Toolkit</span>
          </a>

          <nav className="topnav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="topnav-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">
        <HeroSection />
        <InfographicHero />
        <WhyCLOsFail />
        <SLOComparison />
        <CLOGenerator />
        <PromptTemplate />
      </main>

      <Footer />
    </div>
  );
}
