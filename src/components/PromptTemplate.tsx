import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Copy, Check, FileText, Edit3, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

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

const PLO_DEFINITIONS = `PLO 1: Visual Vocabulary - Fluency in design language (knowledge-based outcomes)
PLO 2: Technical Skills - Proficiency in design tools (software-based outcomes)
PLO 3: Design Methodologies - Apply design systems & methods (design-thinking based outcomes)
PLO 4: Design Process - Engage in research, ideation, prototyping (process-based outcomes)
PLO 5: Career Readiness - Communication, professionalism, problem-solving (professional outcomes)
PLO 6: Well-Being - Principles for self, others, community (holistic outcome)`;

const BASE_PROMPT = `You are an expert curriculum designer specializing in writing measurable Course Learning Outcomes (CLOs) for higher education design programs.

I need you to write CLOs for the following course:

**Course Code:** [ENTER COURSE CODE, e.g., DESN 100]
**Course Name:** [ENTER COURSE NAME, e.g., Drawing for Communication]
**Course Level:** [foundational / intermediate / advanced]
**Course Description:** [ENTER BRIEF DESCRIPTION OF WHAT THE COURSE COVERS]

**Target PLOs (select from list below):** [ENTER NUMBERS, e.g., 1, 2, 4, 5]

---

## Program Learning Outcomes Reference:
${PLO_DEFINITIONS}

---

## Requirements for Each CLO:

1. **MEASURABLE**: Use action verbs from Bloom's Taxonomy
   - Foundational courses: Remember, Understand, Apply verbs
   - Intermediate courses: Apply, Analyze verbs
   - Advanced courses: Analyze, Evaluate, Create verbs

2. **SPECIFIC**: Clearly state what the student will be able to do

3. **ASSESSABLE**: The outcome must be observable and can be evaluated

4. **PLO-ALIGNED**: Each CLO must explicitly connect to 1-3 of the target PLOs

5. **CONSISTENT**: Use parallel structure and consistent language

---

## Bloom's Taxonomy Action Verbs:

**Remember:** Define, Identify, List, Name, Recall, Recognize, State
**Understand:** Classify, Describe, Discuss, Explain, Interpret, Summarize, Translate
**Apply:** Apply, Demonstrate, Execute, Implement, Produce, Solve, Use
**Analyze:** Analyze, Compare, Contrast, Differentiate, Examine, Organize, Relate
**Evaluate:** Assess, Critique, Evaluate, Judge, Justify, Recommend, Support
**Create:** Compose, Construct, Create, Design, Develop, Formulate, Generate

---

Please generate [4-6] Course Learning Outcomes for this course. For each CLO, provide:
1. The complete CLO statement (starting with an action verb)
2. Which PLO(s) it aligns to
3. The Bloom's Taxonomy level

Format your response clearly with numbered outcomes.`;

const QUICK_VARIATIONS = [
  {
    title: 'Foundational Course Template',
    description: 'For 100-200 level introductory courses',
    additions: `Focus on Remember, Understand, and Apply levels of Bloom's Taxonomy. Students are building foundational knowledge and basic skills.`,
  },
  {
    title: 'Intermediate Course Template',
    description: 'For 300 level courses building on foundations',
    additions: `Focus on Apply and Analyze levels of Bloom's Taxonomy. Students should demonstrate application and begin critical analysis.`,
  },
  {
    title: 'Advanced/Capstone Template',
    description: 'For 400+ level and senior courses',
    additions: `Focus on Analyze, Evaluate, and Create levels of Bloom's Taxonomy. Students should synthesize knowledge and create original work.`,
  },
];

export function PromptTemplate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [copied, setCopied] = useState(false);
  const [expandedVariation, setExpandedVariation] = useState<number | null>(null);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} style={{ background: colors.white, padding: '96px 24px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
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
            background: colors.background,
            color: colors.content2,
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '9999px',
            marginBottom: '16px',
            border: `1px solid ${colors.border}`
          }}>
            <MessageSquare style={{ width: '16px', height: '16px' }} />
            DIY Option
          </span>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 700,
            color: colors.content1,
            marginBottom: '16px',
            fontFamily: 'Fraunces, Georgia, serif',
            lineHeight: '110%'
          }}>
            Prompt Template
          </h2>
          <p style={{
            fontSize: '18px',
            color: colors.content2,
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: '160%'
          }}>
            Prefer using your own AI tool? Copy this expert-crafted prompt and use it with
            ChatGPT, Claude, Gemini, or any LLM of your choice.
          </p>
        </motion.div>

        {/* Main Prompt Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            background: colors.white,
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            marginBottom: '48px'
          }}
        >
          {/* Card Header */}
          <div style={{
            background: colors.content1,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText style={{ width: '24px', height: '24px', color: colors.white }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.white }}>Universal CLO Generation Prompt</h3>
            </div>
            <button
              onClick={() => copyPrompt(BASE_PROMPT)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                background: copied ? colors.success : 'rgba(255,255,255,0.15)',
                color: colors.white,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>

          {/* Prompt Content */}
          <div style={{ padding: '24px' }}>
            <div style={{
              background: colors.background,
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: colors.content2 }}>Prompt Preview</span>
                <button
                  onClick={() => setShowFullPrompt(!showFullPrompt)}
                  style={{
                    fontSize: '14px',
                    color: colors.info,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showFullPrompt ? 'Show Less' : 'Show Full Prompt'}
                  {showFullPrompt ? <ChevronUp style={{ width: '16px', height: '16px' }} /> : <ChevronDown style={{ width: '16px', height: '16px' }} />}
                </button>
              </div>
              <div style={{
                padding: '16px',
                overflow: 'auto',
                transition: 'all 0.3s ease',
                maxHeight: showFullPrompt ? '600px' : '256px'
              }}>
                <pre style={{
                  fontSize: '13px',
                  color: colors.content2,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  lineHeight: '160%',
                  margin: 0
                }}>
                  {BASE_PROMPT}
                </pre>
              </div>
            </div>

            {/* Instructions */}
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: `${colors.warning}10`,
              border: `1px solid ${colors.warning}30`,
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Edit3 style={{ width: '20px', height: '20px', color: colors.warning, flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontWeight: 700, color: colors.content1, marginBottom: '8px', fontSize: '14px' }}>How to Use This Prompt</h4>
                  <ol style={{ color: colors.content2, fontSize: '14px', margin: 0, paddingLeft: '20px', lineHeight: '180%' }}>
                    <li>Copy the prompt above</li>
                    <li>Paste it into your preferred AI chat tool (ChatGPT, Claude, Gemini, etc.)</li>
                    <li>Replace the bracketed placeholders with your course information</li>
                    <li>Review and refine the generated CLOs as needed</li>
                    <li>Ensure consistency across all sections of the same course</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Variations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: colors.content1,
            marginBottom: '24px',
            textAlign: 'center',
            fontFamily: 'Fraunces, Georgia, serif'
          }}>
            Quick Variations by Course Level
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {QUICK_VARIATIONS.map((variation, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  background: colors.white,
                  borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}` }}>
                  <h4 style={{ fontWeight: 700, color: colors.content1, marginBottom: '4px', fontSize: '16px' }}>{variation.title}</h4>
                  <p style={{ fontSize: '13px', color: colors.content3 }}>{variation.description}</p>
                </div>
                <div style={{ padding: '20px' }}>
                  <button
                    onClick={() => setExpandedVariation(expandedVariation === i ? null : i)}
                    style={{
                      fontSize: '14px',
                      color: colors.info,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginBottom: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {expandedVariation === i ? 'Hide' : 'Show'} Addition
                    {expandedVariation === i ? <ChevronUp style={{ width: '16px', height: '16px' }} /> : <ChevronDown style={{ width: '16px', height: '16px' }} />}
                  </button>
                  {expandedVariation === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        background: colors.background,
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '13px',
                        color: colors.content2,
                        marginBottom: '12px',
                        lineHeight: '150%'
                      }}
                    >
                      <strong>Add to prompt:</strong><br />
                      {variation.additions}
                    </motion.div>
                  )}
                  <button
                    onClick={() => copyPrompt(`${BASE_PROMPT}\n\n---\n\n**Additional Context:**\n${variation.additions}`)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: colors.background,
                      color: colors.content1,
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: `1px solid ${colors.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Copy style={{ width: '16px', height: '16px' }} />
                    Copy This Version
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PLO Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '48px',
            background: `${colors.info}08`,
            borderRadius: '16px',
            border: `1px solid ${colors.info}20`,
            padding: '32px'
          }}
        >
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: colors.content1,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: colors.info,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText style={{ width: '16px', height: '16px', color: colors.white }} />
            </span>
            PLO Quick Reference
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {PLO_DEFINITIONS.split('\n').map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: colors.info,
                  color: colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {i + 1}
                </span>
                <span style={{ color: colors.content2, lineHeight: '150%' }}>{line.split(': ').slice(1).join(': ')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
