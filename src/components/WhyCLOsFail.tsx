import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, Target, Users, Eye } from 'lucide-react';

const problems = [
  {
    id: 'unmeasurable',
    title: 'Unmeasurable Language',
    icon: Eye,
    badExamples: [
      { text: 'Understand the principles of design', issue: '"Understand" is not observable.' },
      { text: 'Appreciate visual aesthetics', issue: '"Appreciate" is subjective and internal.' },
      { text: 'Know the history of graphic design', issue: 'No measurable demonstration target.' },
    ],
    goodExamples: [
      { text: 'Identify and apply principles of design in compositions', verb: 'Identify, Apply' },
      { text: 'Critique visual work using an established framework', verb: 'Critique' },
      { text: 'Trace the evolution of graphic design movements', verb: 'Trace' },
    ],
    insight:
      "Use Bloom's action verbs (identify, analyze, evaluate, create) so each outcome can be observed and assessed.",
  },
  {
    id: 'inconsistent',
    title: 'Section Inconsistency',
    icon: Users,
    badExamples: [
      { text: 'Section A: "Create digital artwork"', issue: 'Vague scope and standards.' },
      { text: 'Section B: "Master Adobe Creative Suite"', issue: 'Tool-centered, not outcome-centered.' },
      { text: 'Section C: "Explore creative expression"', issue: 'No clear measurable deliverable.' },
    ],
    goodExamples: [
      { text: 'All sections use identical CLO language and rubric criteria', verb: 'Standardized' },
      { text: 'Course coordinator validates section-level alignment', verb: 'Governed' },
      { text: 'Equivalent outcomes across instructors and terms', verb: 'Consistent' },
    ],
    insight:
      'Same course should mean equivalent student competencies, regardless of section or instructor assignment.',
  },
  {
    id: 'misaligned',
    title: 'Weak PLO Alignment',
    icon: Target,
    badExamples: [
      { text: 'Outcome listed without PLO mapping', issue: 'No program contribution evidence.' },
      { text: 'Forced mapping to unrelated PLO', issue: 'Weak curriculum logic.' },
      { text: 'All CLOs mapped to one PLO only', issue: 'Coverage gaps across program outcomes.' },
    ],
    goodExamples: [
      { text: 'Each CLO maps to 1-3 relevant PLOs', verb: 'Explicit' },
      { text: 'Course-level assessments roll up to program-level analysis', verb: 'Traceable' },
      { text: 'Curriculum map demonstrates progressive competency growth', verb: 'Coherent' },
    ],
    insight: 'CLOs are the measurable path by which courses contribute to degree-level outcomes and accreditation evidence.',
  },
] as const;

const beforeAfterExamples = [
  {
    course: 'DESN 100',
    before: 'Discover how drawing can be interpreted and refined.',
    after: 'Demonstrate foundational drawing techniques for sketching and ideation.',
    improvement: 'Replaced a vague verb with an observable action and clearer scope.',
  },
  {
    course: 'DESN 200',
    before: 'Establish a practice of drawing.',
    after: 'Develop and document iterative ideation processes and methods.',
    improvement: 'Added measurable output and process criteria.',
  },
  {
    course: 'DESN 216',
    before: 'Apply essential use of tools.',
    after: 'Produce digital compositions using color theory principles.',
    improvement: 'Specified output quality and applied design knowledge.',
  },
];

export function WhyCLOsFail() {
  const [activeTab, setActiveTab] = useState<(typeof problems)[number]['id']>('unmeasurable');

  const activeProblem = useMemo(() => {
    return problems.find((problem) => problem.id === activeTab) ?? problems[0];
  }, [activeTab]);

  return (
    <section id="diagnostics" className="section">
      <div className="container stack-lg">
        <header className="section-head section-head--center">
          <span className="eyebrow eyebrow--danger">
            <AlertTriangle className="inline-icon" />
            Understanding the problem
          </span>
          <h2 className="h2">Why Traditional CLOs Fail</h2>
          <p className="lead">
            These are the three recurring breakdowns we see in current course outcomes and why they disrupt
            assessment, alignment, and accreditation reporting.
          </p>
        </header>

        <div>
          <div className="tab-list" role="tablist" aria-label="CLO problem categories">
            {problems.map((problem) => (
              <button
                key={problem.id}
                type="button"
                role="tab"
                aria-selected={activeTab === problem.id}
                className={`tab-button ${activeTab === problem.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(problem.id)}
              >
                <problem.icon className="inline-icon" />
                {problem.title}
              </button>
            ))}
          </div>

          <article className="card" style={{ padding: '20px' }}>
            <h3 className="h3" style={{ marginTop: 0 }}>
              {activeProblem.title}
            </h3>

            <div className="example-columns">
              <section className="card example-panel" aria-label="Problematic examples">
                <h4 style={{ margin: 0, color: '#cf222e' }}>Problematic</h4>
                <div className="example-list" style={{ marginTop: '12px' }}>
                  {activeProblem.badExamples.map((example) => (
                    <div key={example.text} className="example-item bad">
                      <p>
                        <strong>{example.text}</strong>
                      </p>
                      <p className="body-muted">{example.issue}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card example-panel" aria-label="Improved examples">
                <h4 style={{ margin: 0, color: '#1a7f37' }}>Effective</h4>
                <div className="example-list" style={{ marginTop: '12px' }}>
                  {activeProblem.goodExamples.map((example) => (
                    <div key={example.text} className="example-item good">
                      <p>
                        <strong>{example.text}</strong>
                      </p>
                      <p>
                        <span className="badge badge-success">{example.verb}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="key-insight" role="note">
              <strong style={{ display: 'block', marginBottom: '6px' }}>Key insight</strong>
              <span className="body-muted">{activeProblem.insight}</span>
            </div>
          </article>
        </div>

        <div>
          <span className="eyebrow eyebrow--success">Real Transformations</span>
          <h3 className="h3">Before and After Outcome Rewrites</h3>

          <div className="before-after-list">
            {beforeAfterExamples.map((example) => (
              <article key={example.course} className="card before-after-card">
                <h4 className="h4" style={{ marginTop: 0 }}>
                  {example.course}
                </h4>

                <div className="before-after-grid">
                  <div className="example-item bad">
                    <strong>Before</strong>
                    <p className="body-muted" style={{ marginTop: '6px' }}>
                      {example.before}
                    </p>
                  </div>

                  <ArrowRight className="inline-icon" aria-hidden="true" />

                  <div className="example-item good">
                    <strong>After</strong>
                    <p style={{ marginTop: '6px' }}>{example.after}</p>
                  </div>
                </div>

                <p className="small" style={{ marginTop: '12px' }}>
                  <BookOpen className="inline-icon" /> <strong>What changed:</strong> {example.improvement}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
