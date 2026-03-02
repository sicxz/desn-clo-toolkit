import { ArrowDown, Lightbulb, Sparkles, Target } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: 'Diagnose weak outcomes',
    text: 'Identify unmeasurable language, section inconsistency, and weak program alignment.',
    badgeClass: 'badge badge-danger',
  },
  {
    icon: Target,
    title: 'Align to program outcomes',
    text: 'Use a consistent PLO mapping model so course-level outcomes support program goals.',
    badgeClass: 'badge badge-accent',
  },
  {
    icon: Sparkles,
    title: 'Generate stronger CLOs',
    text: 'Use the integrated AI workflow to produce measurable, assessable, Bloom-aligned outcomes.',
    badgeClass: 'badge badge-success',
  },
];

export function HeroSection() {
  return (
    <section id="overview" className="section section--plain">
      <div className="container hero-layout">
        <div>
          <span className="eyebrow eyebrow--accent">EWU Design Department Curriculum Guide</span>
          <h1 className="h1">Writing Better Learning Outcomes</h1>
          <p className="lead">
            A practical curriculum toolkit for writing measurable, PLO-aligned Course Learning Outcomes that are
            consistent across sections and easier to assess.
          </p>

          <div className="kicker-row">
            <a href="#generator" className="button button-primary">
              Open CLO Generator
            </a>
            <a href="#framework" className="button">
              Review PLO Framework
            </a>
          </div>

          <p className="small" style={{ marginTop: '16px' }}>
            Built for faculty working on accreditation, assessment, and curriculum consistency.
          </p>
        </div>

        <aside className="card hero-panel" aria-label="Guide highlights">
          <h2 className="h4" style={{ marginTop: 0 }}>
            What You Can Do Here
          </h2>
          <ul className="feature-list">
            {features.map((feature) => (
              <li key={feature.title}>
                <span className={feature.badgeClass}>
                  <feature.icon className="inline-icon" />
                </span>
                <div>
                  <strong>{feature.title}</strong>
                  <span>{feature.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="kicker-row" style={{ marginTop: '20px' }}>
            <span className="badge">6 Program Outcomes</span>
            <span className="badge">4-6 CLOs per course</span>
            <span className="badge">Bloom-aligned</span>
          </div>

          <a href="#framework" className="button" style={{ marginTop: '20px' }}>
            <ArrowDown className="inline-icon" />
            Scroll to framework
          </a>
        </aside>
      </div>
    </section>
  );
}
