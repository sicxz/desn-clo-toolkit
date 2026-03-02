import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const courses = [
  {
    code: 'DESN 100',
    title: 'Drawing for Communication',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 2, 4, 5)',
    before: [
      'Discover how drawing can be interpreted and refined',
      'Develop an understanding of 3-D form',
      'Demonstrate problem-solving and representational drawing',
      'Create a habit of experimentation and iteration',
    ],
    after: [
      'Identify visually communicated elements of observational drawing',
      'Demonstrate foundational drawing techniques for sketching and ideation',
      'Translate ideas into pictorial form using visual methods',
      'Explain design elements and principles in context',
    ],
  },
  {
    code: 'DESN 200',
    title: 'Visual Thinking and Making',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 3, 4, 5, 6)',
    before: [
      'Establish a practice of drawing',
      'Combine exploration to apply refinement',
      'Demonstrate interpretive art explorations',
      'Develop visual thinking skills',
    ],
    after: [
      'Analyze works of design using selected design frameworks',
      'Develop and document iterative ideation processes',
      'Construct functional prototypes using varied materials',
      'Articulate observations about visual work using design vocabulary',
    ],
  },
  {
    code: 'DESN 216',
    title: 'Digital Foundations',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 2, 3, 4, 5)',
    before: [
      'Differentiate between raster and vector',
      'Apply essential use of tools',
      'Issue: Affected previous versions',
      'Make specific actions',
    ],
    after: [
      'Differentiate between raster and vector graphic formats',
      'Produce raster and vector graphics to industry standards',
      'Produce digital compositions using color theory principles',
      'Communicate design decisions using discipline-specific vocabulary',
    ],
  },
];

export function SLOComparison() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <section id="comparison" className="section section--muted">
      <div className="container">
        <header className="section-head section-head--center">
          <h2 className="h2">Student Learning Outcomes: Before and After</h2>
          <p className="lead">
            Compare old and revised outcome statements for three core courses to see measurable language and stronger
            alignment in practice.
          </p>
        </header>

        <div className="tab-list" role="tablist" aria-label="Comparison mode">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'before'}
            className={`tab-button ${activeTab === 'before' ? 'is-active is-active-danger' : ''}`}
            onClick={() => setActiveTab('before')}
          >
            <AlertCircle className="inline-icon" />
            Current Issues (Before)
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'after'}
            className={`tab-button ${activeTab === 'after' ? 'is-active is-active-success' : ''}`}
            onClick={() => setActiveTab('after')}
          >
            <CheckCircle2 className="inline-icon" />
            Revised SLOs (After)
          </button>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article key={course.code} className="card course-card">
              <header>
                <h3 className="h4" style={{ marginTop: 0 }}>
                  {course.code}
                </h3>
                <p style={{ margin: 0 }}>{course.title}</p>
                <p className="small" style={{ marginTop: '6px' }}>
                  {course.credits} · {course.mapping}
                </p>
              </header>

              <div className="outcome-list">
                {(activeTab === 'before' ? course.before : course.after).map((item) => (
                  <div key={item} className={`outcome-item ${activeTab === 'before' ? 'is-before' : 'is-after'}`}>
                    {activeTab === 'before' ? (
                      <AlertCircle className="inline-icon" style={{ color: '#cf222e' }} />
                    ) : (
                      <CheckCircle2 className="inline-icon" style={{ color: '#1a7f37' }} />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
