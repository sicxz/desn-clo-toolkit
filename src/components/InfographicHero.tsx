import { CheckCircle2, Compass, Wrench } from 'lucide-react';
import { PLO_DEFINITIONS, PLO_SOURCE, STAGE_GUIDANCE, STAGE_LABELS, type ProgressionStage } from '../data/ploMap';

const stageOrder: ProgressionStage[] = ['L', 'P', 'M'];

function stageClass(stage: ProgressionStage) {
  if (stage === 'L') return 'level-chip level-learn';
  if (stage === 'P') return 'level-chip level-practice';
  return 'level-chip level-mastery';
}

const principles = [
  'Measurable language',
  'Direct PLO alignment',
  "Bloom's level fit",
  'Cross-section consistency',
  'Clear assessment evidence',
];

export function InfographicHero() {
  return (
    <section id="framework" className="section section--muted">
      <div className="container stack-lg">
        <header className="section-head section-head--center">
          <span className="eyebrow">CLO Framework</span>
          <h2 className="h2">DESN Program Outcomes Alignment</h2>
          <p className="lead">
            Simplified reference aligned to the DESN PLO map for consistent CLO language and program-level mapping.
          </p>
        </header>

        <div className="grid framework-grid">
          <article className="card" style={{ padding: '20px' }}>
            <h3 className="h4" style={{ marginTop: 0 }}>
              PLO Definitions and Coverage
            </h3>

            <div className="mapping-mobile-list" style={{ marginTop: '12px' }}>
              {PLO_DEFINITIONS.map((plo) => (
                <div key={plo.id} className="card" style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'flex-start' }}>
                    <strong>
                      {plo.id}. {plo.title}
                    </strong>
                    <div className="stage-chip-row">
                      {stageOrder.map((stage) => (
                        <span
                          key={`${plo.id}-${stage}`}
                          className={`${stageClass(stage)} stage-chip ${plo.mapCoverage.includes(stage) ? '' : 'is-inactive'}`}
                        >
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="small" style={{ marginTop: '6px' }}>
                    {plo.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="table-wrap mapping-table" style={{ marginTop: '12px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">PLO</th>
                    <th scope="col">Description</th>
                    <th scope="col">Map Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {PLO_DEFINITIONS.map((plo) => (
                    <tr key={plo.id}>
                      <td>
                        <strong>{plo.id}</strong>
                        <div className="body-subtle">{plo.title}</div>
                      </td>
                      <td className="body-muted">{plo.description}</td>
                      <td>
                        <div className="stage-chip-row">
                          {stageOrder.map((stage) => (
                            <span
                              key={`${plo.id}-${stage}`}
                              className={`${stageClass(stage)} stage-chip ${
                                plo.mapCoverage.includes(stage) ? '' : 'is-inactive'
                              }`}
                            >
                              {stage}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card" style={{ padding: '20px' }}>
            <h3 className="h4" style={{ marginTop: 0 }}>
              Progression Key (L / P / M)
            </h3>
            <div className="stack" style={{ marginTop: '12px' }}>
              {stageOrder.map((stage) => (
                <div key={stage} className="card" style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className={stageClass(stage)}>
                      {stage} · {STAGE_LABELS[stage]}
                    </span>
                  </div>
                  <p className="body-muted" style={{ margin: 0 }}>
                    {STAGE_GUIDANCE[stage]}
                  </p>
                </div>
              ))}
            </div>

            <p className="small" style={{ marginTop: '16px' }}>
              Aligned to {PLO_SOURCE.fileName} ({PLO_SOURCE.revisedLabel}). Coverage chips above reflect non-AY entries
              in the core-course map.
            </p>
          </article>
        </div>

        <article className="card" style={{ padding: '20px' }}>
          <h3 className="h4" style={{ marginTop: 0 }}>
            Guiding Principles for Effective CLOs
          </h3>
          <div className="grid grid-5 principle-grid" style={{ marginTop: '14px' }}>
            {principles.map((principle) => (
              <div key={principle} className="card">
                <CheckCircle2 className="inline-icon" style={{ color: '#1a7f37' }} />
                <p className="h4" style={{ marginBottom: 0 }}>
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid grid-2">
          <div className="card" style={{ padding: '16px' }}>
            <h4 className="h4" style={{ marginTop: 0 }}>
              <Compass className="inline-icon" style={{ marginRight: '6px' }} />
              Curriculum Alignment
            </h4>
            <p className="body-muted" style={{ margin: 0 }}>
              Use each CLO to support one to three PLOs so course assessment results roll up to program-level evidence.
            </p>
          </div>

          <div className="card" style={{ padding: '16px' }}>
            <h4 className="h4" style={{ marginTop: 0 }}>
              <Wrench className="inline-icon" style={{ marginRight: '6px' }} />
              Section Consistency
            </h4>
            <p className="body-muted" style={{ margin: 0 }}>
              Different sections of the same course should use equivalent CLO language and shared assessment standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
