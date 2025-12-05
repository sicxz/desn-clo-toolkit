import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { AlertTriangle, XCircle, CheckCircle2, ArrowRight, Lightbulb, BookOpen, Target, Eye, TrendingUp, Users } from 'lucide-react';

// Design system colors from style guide
const colors = {
  success: '#10D800',
  info: '#168BFF',
  warning: '#F5A623',
  error: '#D0021B',
  content1: '#1C1C1C',
  content2: '#5B5757',
  content3: '#969696',
  icons: '#CCCCCC',
  border: '#E8E8E8',
  background: '#F7F7F7',
  white: '#FFFFFF',
};

const problems = [
  {
    id: 'unmeasurable',
    title: 'Unmeasurable Language',
    icon: Eye,
    color: colors.error,
    bgColor: '#FDEAEA',
    description: 'Vague verbs make it impossible to assess whether students have achieved the outcome.',
    badExamples: [
      { text: 'Understand the principles of design', issue: '"Understand" cannot be observed or measured' },
      { text: 'Appreciate visual aesthetics', issue: '"Appreciate" is internal and subjective' },
      { text: 'Know the history of graphic design', issue: '"Know" offers no evidence of learning' },
    ],
    goodExamples: [
      { text: 'Identify and apply the principles of design in compositions', verb: 'Identify, Apply' },
      { text: 'Critique visual works using established aesthetic frameworks', verb: 'Critique' },
      { text: 'Trace the evolution of graphic design movements and their influences', verb: 'Trace' },
    ],
    keyInsight: 'Use Bloom\'s Taxonomy action verbs: Identify, Analyze, Create, Evaluate, Demonstrate, Compare, Construct, Critique',
  },
  {
    id: 'inconsistent',
    title: 'Section Inconsistency',
    icon: Users,
    color: colors.warning,
    bgColor: '#FEF6E8',
    description: 'When different sections of the same course have different outcomes, assessment and accreditation become impossible.',
    badExamples: [
      { text: 'Section A: "Create digital artwork"', issue: 'Vague scope, no standards mentioned' },
      { text: 'Section B: "Master Adobe Creative Suite"', issue: 'Tool-focused, not outcome-focused' },
      { text: 'Section C: "Explore creative expression"', issue: 'Unmeasurable, no clear deliverable' },
    ],
    goodExamples: [
      { text: 'All sections: "Produce digital compositions using industry-standard raster and vector tools"', verb: 'Consistent' },
      { text: 'All sections use identical SLO language with same assessment rubrics', verb: 'Standardized' },
      { text: 'Course coordinator reviews ensure alignment across instructors', verb: 'Governed' },
    ],
    keyInsight: 'Same course = Same outcomes. Students in any section should achieve equivalent competencies.',
  },
  {
    id: 'misaligned',
    title: 'Weak PLO Alignment',
    icon: Target,
    color: colors.info,
    bgColor: '#E8F3FF',
    description: 'Course outcomes must map clearly to Program Learning Outcomes, showing how courses contribute to the degree\'s goals.',
    badExamples: [
      { text: 'SLO exists in isolation with no PLO mapping', issue: 'Cannot demonstrate program coherence' },
      { text: 'Forced mapping: "This relates to PLO 3 somehow"', issue: 'Weak or artificial connections' },
      { text: 'All SLOs map to same PLO', issue: 'Missing coverage of program outcomes' },
    ],
    goodExamples: [
      { text: 'Each SLO explicitly references 1-3 relevant PLOs', verb: 'Explicit' },
      { text: 'Curriculum map shows progression across courses', verb: 'Mapped' },
      { text: 'Assessment data aggregates to show PLO achievement', verb: 'Measurable' },
    ],
    keyInsight: 'SLOs are the building blocks. PLOs are the house. Every brick must have a purpose in the structure.',
  },
];

const beforeAfterExamples = [
  {
    course: 'DESN 100',
    before: 'Discover how Drawing can be interpreted and refined',
    after: 'Demonstrate foundational drawing techniques for sketching and ideation',
    improvement: 'Changed vague "discover" to measurable "demonstrate" with specific scope',
  },
  {
    course: 'DESN 200',
    before: 'Establish a practice of drawing',
    after: 'Develop and document iterative ideation processes and methods',
    improvement: 'Added specificity: what practice, how documented, what methods',
  },
  {
    course: 'DESN 216',
    before: 'Apply essential use of tools',
    after: 'Produce digital compositions using color theory principles',
    improvement: 'Defined the output and the knowledge being applied',
  },
];

export function WhyCLOsFail() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('unmeasurable');

  const activeProblem = problems.find(p => p.id === activeTab)!;

  return (
    <section ref={ref} style={{ background: colors.white, padding: '96px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: '#FDEAEA',
            color: colors.error,
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '9999px',
            marginBottom: '16px',
            border: `1px solid ${colors.error}20`
          }}>
            <AlertTriangle style={{ width: '16px', height: '16px' }} />
            Understanding the Problem
          </span>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 700,
            color: colors.content1,
            marginBottom: '16px',
            fontFamily: 'Fraunces, Georgia, serif',
            lineHeight: '110%'
          }}>
            Why Traditional CLOs Fail
          </h2>
          <p style={{
            fontSize: '18px',
            color: colors.content2,
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: '160%'
          }}>
            Before we can write better outcomes, we need to understand what's wrong with the old ones.
            These three issues undermine assessment, accreditation, and student success.
          </p>
        </motion.div>

        {/* Problem Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}
        >
          {problems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => setActiveTab(problem.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.2s ease',
                background: activeTab === problem.id ? colors.content1 : colors.white,
                color: activeTab === problem.id ? colors.white : colors.content2,
                border: activeTab === problem.id ? 'none' : `1px solid ${colors.border}`,
                cursor: 'pointer',
                boxShadow: activeTab === problem.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <problem.icon style={{ width: '20px', height: '20px', color: activeTab === problem.id ? colors.white : problem.color }} />
              {problem.title}
            </button>
          ))}
        </motion.div>

        {/* Active Problem Detail */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: colors.white,
            borderRadius: '24px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            marginBottom: '80px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          {/* Problem Header */}
          <div style={{ padding: '32px', borderBottom: `1px solid ${colors.border}`, backgroundColor: activeProblem.bgColor }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: activeProblem.color,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <activeProblem.icon style={{ width: '32px', height: '32px', color: colors.white }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: colors.content1,
                  marginBottom: '8px',
                  fontFamily: 'Fraunces, Georgia, serif'
                }}>
                  {activeProblem.title}
                </h3>
                <p style={{ fontSize: '16px', color: colors.content2, lineHeight: '150%' }}>{activeProblem.description}</p>
              </div>
            </div>
          </div>

          {/* Examples Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: colors.border }}>
            {/* Bad Examples */}
            <div style={{ background: colors.background, padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <XCircle style={{ width: '24px', height: '24px', color: colors.error }} />
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.error, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problematic</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeProblem.badExamples.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: colors.white,
                      border: `1px solid ${colors.error}30`,
                      borderRadius: '12px',
                      padding: '16px'
                    }}
                  >
                    <p style={{ color: colors.content1, marginBottom: '8px', fontWeight: 500 }}>"{ex.text}"</p>
                    <p style={{ color: colors.error, fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <AlertTriangle style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px' }} />
                      {ex.issue}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Good Examples */}
            <div style={{ background: colors.background, padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <CheckCircle2 style={{ width: '24px', height: '24px', color: colors.success }} />
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.success, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Effective</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeProblem.goodExamples.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: colors.white,
                      border: `1px solid ${colors.success}30`,
                      borderRadius: '12px',
                      padding: '16px'
                    }}
                  >
                    <p style={{ color: colors.content1, marginBottom: '8px', fontWeight: 500 }}>"{ex.text}"</p>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      background: `${colors.success}15`,
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: colors.success
                    }}>{ex.verb}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div style={{
            padding: '24px 32px',
            background: `${colors.warning}10`,
            borderTop: `1px solid ${colors.warning}30`
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <Lightbulb style={{ width: '24px', height: '24px', color: colors.warning, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontWeight: 700, color: colors.warning, marginBottom: '4px', fontSize: '14px' }}>Key Insight</h5>
                <p style={{ color: colors.content2, lineHeight: '150%' }}>{activeProblem.keyInsight}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before & After Transformation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: `${colors.success}15`,
              color: colors.success,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '9999px',
              marginBottom: '16px',
              border: `1px solid ${colors.success}30`
            }}>
              <TrendingUp style={{ width: '16px', height: '16px' }} />
              Real Transformations
            </span>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: colors.content1,
              fontFamily: 'Fraunces, Georgia, serif'
            }}>
              Before & After: See the Difference
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {beforeAfterExamples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  background: colors.white,
                  borderRadius: '16px',
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ background: colors.background, padding: '16px 24px', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontWeight: 700, color: colors.content1 }}>{example.course}</span>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center' }}>
                    {/* Before */}
                    <div style={{
                      background: `${colors.error}08`,
                      border: `1px solid ${colors.error}20`,
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.error, fontWeight: 700, marginBottom: '8px' }}>Before</div>
                      <p style={{ color: colors.content2, fontStyle: 'italic' }}>"{example.before}"</p>
                    </div>

                    {/* Arrow */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${colors.error}, ${colors.success})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ArrowRight style={{ width: '24px', height: '24px', color: colors.white }} />
                    </div>

                    {/* After */}
                    <div style={{
                      background: `${colors.success}08`,
                      border: `1px solid ${colors.success}20`,
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.success, fontWeight: 700, marginBottom: '8px' }}>After</div>
                      <p style={{ color: colors.content1, fontWeight: 500 }}>"{example.after}"</p>
                    </div>
                  </div>

                  {/* Improvement Note */}
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: colors.content3 }}>
                    <BookOpen style={{ width: '16px', height: '16px', flexShrink: 0, marginTop: '2px', color: colors.info }} />
                    <span><strong style={{ color: colors.info }}>What changed:</strong> {example.improvement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
