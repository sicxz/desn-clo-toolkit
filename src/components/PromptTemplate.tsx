import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Copy, FileText, MessageSquare } from 'lucide-react';
import { PLO_DEFINITIONS, PLO_DEFINITIONS_TEXT, PLO_SOURCE } from '../data/ploMap';

const BASE_PROMPT = `You are an expert curriculum designer specializing in writing measurable Course Learning Outcomes (CLOs) for higher education design programs.

I need you to write CLOs for the following course:

**Course Code:** [ENTER COURSE CODE, e.g., DESN 100]
**Course Name:** [ENTER COURSE NAME, e.g., Drawing for Communication]
**Course Level:** [foundational / intermediate / advanced]
**Course Description:** [ENTER BRIEF DESCRIPTION OF WHAT THE COURSE COVERS]

**Target PLOs (select from list below):** [ENTER NUMBERS, e.g., 1, 2, 4, 5]

---

## Program Learning Outcomes Reference:
${PLO_DEFINITIONS_TEXT}

---

## Requirements for Each CLO:
1. MEASURABLE: Use action verbs from Bloom's Taxonomy
2. SPECIFIC: Clearly state what the student will be able to do
3. ASSESSABLE: The outcome must be observable and can be evaluated
4. PLO-ALIGNED: Each CLO must explicitly connect to 1-3 of the target PLOs
5. CONSISTENT: Use parallel structure and consistent language

---

Please generate [4-6] Course Learning Outcomes and include:
1. Complete CLO statement
2. Aligned PLO(s)
3. Bloom's Taxonomy level`;

const QUICK_VARIATIONS = [
  {
    title: 'Foundational Course Template',
    description: 'For 100-200 level introductory courses',
    additions:
      "Focus on Remember, Understand, and Apply levels. Students are building baseline concepts and practical foundations.",
  },
  {
    title: 'Intermediate Course Template',
    description: 'For 300 level courses building on foundations',
    additions:
      'Focus on Apply and Analyze levels. Students should show transferable skill use and analytical judgment.',
  },
  {
    title: 'Advanced/Capstone Template',
    description: 'For 400+ level and senior courses',
    additions: 'Focus on Analyze, Evaluate, and Create levels with synthesis, critique, and original output expectations.',
  },
];

export function PromptTemplate() {
  const [copied, setCopied] = useState(false);
  const [expandedVariation, setExpandedVariation] = useState<number | null>(null);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const copyPrompt = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="prompt-template" className="section">
      <div className="container stack-lg">
        <header className="section-head section-head--center">
          <span className="eyebrow">
            <MessageSquare className="inline-icon" />
            DIY option
          </span>
          <h2 className="h2">Prompt Template</h2>
          <p className="lead">
            Prefer your own AI workspace? Use this standardized prompt to generate aligned CLO drafts in ChatGPT,
            Claude, Gemini, or other LLM tools.
          </p>
        </header>

        <article className="card prompt-frame">
          <div className="prompt-header">
            <h3 className="section-title" style={{ margin: 0 }}>
              <FileText className="inline-icon" /> Universal CLO Generation Prompt
            </h3>

            <button type="button" className="button button-primary" onClick={() => void copyPrompt(BASE_PROMPT)}>
              {copied ? <Check className="inline-icon" /> : <Copy className="inline-icon" />}
              {copied ? 'Copied' : 'Copy Prompt'}
            </button>
          </div>

          <div className="prompt-preview">
            <div className="prompt-preview-head">
              <span className="small">Prompt Preview</span>
              <button type="button" className="button" onClick={() => setShowFullPrompt((value) => !value)}>
                {showFullPrompt ? 'Show Less' : 'Show Full Prompt'}
                {showFullPrompt ? <ChevronUp className="inline-icon" /> : <ChevronDown className="inline-icon" />}
              </button>
            </div>

            <pre className={`prompt-code ${showFullPrompt ? 'is-expanded' : 'is-collapsed'}`}>{BASE_PROMPT}</pre>
          </div>

          <div className="instructions">
            <strong>How to use this prompt</strong>
            <ol>
              <li>Copy the prompt block.</li>
              <li>Paste into your preferred AI tool.</li>
              <li>Replace placeholder values with course details.</li>
              <li>Review generated CLOs for consistency across sections.</li>
              <li>Adjust verbs and mapping where faculty consensus requires it.</li>
            </ol>
          </div>
        </article>

        <section>
          <h3 className="h3">Quick Variations by Course Level</h3>
          <div className="quick-grid">
            {QUICK_VARIATIONS.map((variation, index) => (
              <article key={variation.title} className="card quick-card">
                <h4 className="h4" style={{ marginTop: 0 }}>
                  {variation.title}
                </h4>
                <p className="small" style={{ marginTop: 0 }}>
                  {variation.description}
                </p>

                <div className="quick-actions">
                  <button
                    type="button"
                    className="button"
                    onClick={() => setExpandedVariation((value) => (value === index ? null : index))}
                  >
                    {expandedVariation === index ? 'Hide Addition' : 'Show Addition'}
                    {expandedVariation === index ? (
                      <ChevronUp className="inline-icon" />
                    ) : (
                      <ChevronDown className="inline-icon" />
                    )}
                  </button>

                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => void copyPrompt(`${BASE_PROMPT}\n\nAdditional context:\n${variation.additions}`)}
                  >
                    <Copy className="inline-icon" />
                    Copy This Version
                  </button>
                </div>

                {expandedVariation === index ? (
                  <div className="addition-box">
                    <strong>Add to prompt:</strong> {variation.additions}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="card" style={{ padding: '20px' }}>
          <h3 className="h4" style={{ marginTop: 0 }}>
            PLO Quick Reference
          </h3>

          <div className="reference-grid" style={{ marginTop: '12px' }}>
            {PLO_DEFINITIONS.map((plo) => (
              <div key={plo.id} className="reference-item">
                <span className="plo-number" aria-hidden="true">
                  {plo.id}
                </span>
                <span>
                  {plo.title} - {plo.description}
                </span>
              </div>
            ))}
          </div>
          <p className="small" style={{ marginTop: '12px' }}>
            Source alignment: {PLO_SOURCE.fileName} ({PLO_SOURCE.revisedLabel})
          </p>
        </section>
      </div>
    </section>
  );
}
