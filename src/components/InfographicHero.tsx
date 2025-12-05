import { useInView } from 'motion/react';
import { useRef } from 'react';

// Design System Colors from Style Guide
const colors = {
  success: '#10D800',
  info: '#168BFF',
  warning: '#F5A623',
  content1: '#1C1C1C',
  content2: '#5B5757',
  content3: '#969696',
  border: '#E8E8E8',
  background: '#F7F7F7',
  white: '#FFFFFF',
};

// PLO Data with progression endpoints
const ploData = [
  { id: 1, title: 'Visual Vocabulary', desc: 'Fluency in design language', endpoint: 'learn', color: colors.success },
  { id: 2, title: 'Technical Skills', desc: 'Proficiency in design tools', endpoint: 'practice', color: colors.success },
  { id: 3, title: 'Design Methodologies', desc: 'Apply design systems & methods', endpoint: 'practice', color: colors.info },
  { id: 4, title: 'Design Process', desc: 'Engage in research, ideation, prototyping', endpoint: 'mastery', color: colors.info },
  { id: 5, title: 'Career Readiness', desc: 'Communication, professionalism, problem-solving', endpoint: 'mastery', color: colors.content2 },
  { id: 6, title: 'Well-Being', desc: 'Principles for self, others, community', endpoint: 'mastery', color: colors.success, holistic: true },
];

export function InfographicHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Column positions
  const cols = {
    plo: 60,
    descStart: 100,
    descEnd: 380,
    progressStart: 420,
    learn: 520,
    practice: 640,
    mastery: 760,
  };

  return (
    <section
      ref={ref}
      style={{
        background: colors.background,
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${colors.success}15`,
              borderRadius: '100px',
              marginBottom: '16px'
            }}
          >
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: colors.success,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              CLO Framework
            </span>
          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            color: colors.content1,
            lineHeight: '110%',
            marginBottom: '12px',
            fontFamily: 'Fraunces, Georgia, serif'
          }}>
            Program Learning Outcomes
            <span style={{ display: 'block', fontStyle: 'italic', color: colors.success }}>
              Reference
            </span>
          </h1>

          <p style={{
            fontSize: '16px',
            color: colors.content2,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: '160%'
          }}>
            A comprehensive guide to creating measurable, PLO-aligned Course Learning Outcomes
            that drive student success.
          </p>
        </header>

        {/* PLO Reference Chart */}
        <div
          style={{
            background: colors.white,
            borderRadius: '20px',
            padding: '40px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            marginBottom: '40px',
          }}
        >
          <svg
            viewBox="0 0 820 480"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          >
            {/* Header Row */}
            <g>
              {/* Column Headers */}
              <text x={cols.plo} y="30" textAnchor="middle" fill={colors.content3} fontSize="11" fontWeight="600" letterSpacing="0.08em">
                PLO
              </text>
              <text x={(cols.descStart + cols.descEnd) / 2} y="30" textAnchor="middle" fill={colors.content3} fontSize="11" fontWeight="600" letterSpacing="0.08em">
                DESCRIPTION
              </text>
              <text x={(cols.learn + cols.mastery) / 2} y="30" textAnchor="middle" fill={colors.content3} fontSize="11" fontWeight="600" letterSpacing="0.08em">
                PROGRESSION LEVEL
              </text>

              {/* Progression Labels */}
              <g transform="translate(0, 55)">
                <circle cx={cols.learn} cy="0" r="16" fill={`${colors.success}15`} />
                <text x={cols.learn} y="5" textAnchor="middle" fill={colors.success} fontSize="13" fontWeight="700">L</text>

                <circle cx={cols.practice} cy="0" r="16" fill={`${colors.info}15`} />
                <text x={cols.practice} y="5" textAnchor="middle" fill={colors.info} fontSize="13" fontWeight="700">P</text>

                <circle cx={cols.mastery} cy="0" r="16" fill={`${colors.content1}15`} />
                <text x={cols.mastery} y="5" textAnchor="middle" fill={colors.content1} fontSize="13" fontWeight="700">M</text>
              </g>

              {/* Subtle connecting line */}
              <line x1={cols.learn + 20} y1="55" x2={cols.mastery - 20} y2="55" stroke={colors.border} strokeWidth="2" strokeDasharray="4,4" />
            </g>

            {/* Horizontal divider */}
            <line x1="20" y1="90" x2="800" y2="90" stroke={colors.border} strokeWidth="1" />

            {/* PLO Rows */}
            {ploData.map((plo, index) => {
              const y = 130 + index * 58;
              const barStart = cols.progressStart;
              const barEnd = plo.endpoint === 'learn' ? cols.learn : plo.endpoint === 'practice' ? cols.practice : cols.mastery;
              const barWidth = barEnd - barStart;

              return (
                <g key={plo.id}>
                  {/* Alternating row background */}
                  {index % 2 === 1 && (
                    <rect x="20" y={y - 24} width="780" height="52" rx="8" fill={colors.background} opacity="0.5" />
                  )}

                  {/* PLO Number Badge */}
                  <rect x={cols.plo - 20} y={y - 16} width="40" height="32" rx="8" fill={plo.color} />
                  <text x={cols.plo} y={y + 6} textAnchor="middle" fill="white" fontSize="16" fontWeight="700">
                    {plo.id}
                  </text>

                  {/* Title & Description */}
                  <text x={cols.descStart} y={y - 2} fill={colors.content1} fontSize="14" fontWeight="600">
                    {plo.title}
                  </text>
                  <text x={cols.descStart} y={y + 16} fill={colors.content3} fontSize="12">
                    {plo.desc}
                  </text>

                  {/* Progress Bar Track */}
                  <rect
                    x={barStart}
                    y={y - 6}
                    width={cols.mastery - barStart + 20}
                    height="12"
                    rx="6"
                    fill={colors.background}
                  />

                  {/* Progress Bar Fill */}
                  <rect
                    x={barStart}
                    y={y - 6}
                    width={barWidth + 20}
                    height="12"
                    rx="6"
                    fill={plo.color}
                  />

                  {/* End marker dot */}
                  <circle cx={barEnd} cy={y} r="8" fill={plo.color} />
                  <circle cx={barEnd} cy={y} r="4" fill={colors.white} />

                  {/* Level markers on track */}
                  <circle cx={cols.learn} cy={y} r="2" fill={plo.endpoint === 'learn' ? colors.white : colors.border} />
                  <circle cx={cols.practice} cy={y} r="2" fill={plo.endpoint === 'practice' || plo.endpoint === 'mastery' ? (barEnd >= cols.practice ? colors.white : colors.border) : colors.border} />
                  <circle cx={cols.mastery} cy={y} r="2" fill={plo.endpoint === 'mastery' ? colors.white : colors.border} />
                </g>
              );
            })}

            {/* Legend at bottom */}
            <g transform="translate(0, 440)">
              <rect x="20" y="0" width="780" height="30" rx="8" fill={colors.background} />
              <text x="40" y="20" fill={colors.content3} fontSize="11">
                <tspan fontWeight="600" fill={colors.success}>L = Learn</tspan>
                <tspan dx="16" fill={colors.content3}>Foundation</tspan>
                <tspan dx="32" fontWeight="600" fill={colors.info}>P = Practice</tspan>
                <tspan dx="16" fill={colors.content3}>Application</tspan>
                <tspan dx="32" fontWeight="600" fill={colors.content1}>M = Mastery</tspan>
                <tspan dx="16" fill={colors.content3}>Synthesis & Evaluation</tspan>
              </text>
            </g>
          </svg>
        </div>

        {/* Key Insights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {[
            {
              label: 'Learn',
              letter: 'L',
              color: colors.success,
              desc: 'Foundation building through knowledge acquisition and comprehension',
              count: '1 PLO'
            },
            {
              label: 'Practice',
              letter: 'P',
              color: colors.info,
              desc: 'Application and analysis through hands-on skill development',
              count: '2 PLOs'
            },
            {
              label: 'Mastery',
              letter: 'M',
              color: colors.content1,
              desc: 'Synthesis and evaluation demonstrating expertise',
              count: '3 PLOs'
            },
          ].map((stage) => (
            <div
              key={stage.label}
              style={{
                background: colors.white,
                borderRadius: '16px',
                padding: '24px',
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                borderTop: `4px solid ${stage.color}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: stage.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '22px',
                  fontWeight: 700,
                }}>
                  {stage.letter}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: colors.content1,
                    margin: 0
                  }}>
                    {stage.label}
                  </h3>
                  <span style={{
                    fontSize: '13px',
                    color: stage.color,
                    fontWeight: 600
                  }}>
                    {stage.count}
                  </span>
                </div>
              </div>
              <p style={{
                fontSize: '14px',
                color: colors.content2,
                lineHeight: '150%',
                margin: 0
              }}>
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guiding Principles */}
        <div
          style={{
            background: colors.white,
            borderRadius: '20px',
            padding: '32px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: colors.content1,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              width: '4px',
              height: '24px',
              background: colors.success,
              borderRadius: '2px'
            }} />
            Guiding Principles for Effective CLOs
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px'
          }}>
            {[
              { title: 'Measurable', desc: 'Observable evidence of learning' },
              { title: 'PLO-Aligned', desc: 'Direct mapping to outcomes' },
              { title: "Bloom's", desc: 'Appropriate cognitive level' },
              { title: 'Consistent', desc: 'Same course, same CLOs' },
              { title: 'Assessable', desc: 'Clear evaluation methods' },
            ].map((principle) => (
              <div
                key={principle.title}
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  borderRadius: '12px',
                  background: colors.background,
                  border: `1px solid ${colors.border}`
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: colors.success,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: colors.content1,
                  marginBottom: '4px'
                }}>
                  {principle.title}
                </h4>
                <p style={{
                  fontSize: '12px',
                  color: colors.content3,
                  lineHeight: '140%',
                  margin: 0
                }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
