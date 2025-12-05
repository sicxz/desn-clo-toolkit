import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import {
  Sparkles, Key, BookOpen, Target, Loader2, Copy, Check,
  RefreshCw, ChevronDown, AlertCircle, Lock, Zap, Settings
} from 'lucide-react';

// Design System Colors from Style Guide
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

const PLO_OPTIONS = [
  { id: 1, title: 'Visual Vocabulary', desc: 'Fluency in design language' },
  { id: 2, title: 'Technical Skills', desc: 'Proficiency in design tools' },
  { id: 3, title: 'Design Methodologies', desc: 'Apply design systems & methods' },
  { id: 4, title: 'Design Process', desc: 'Engage in research, ideation, prototyping' },
  { id: 5, title: 'Career Readiness', desc: 'Communication, professionalism, problem-solving' },
  { id: 6, title: 'Well-Being', desc: 'Principles for self, others, community' },
];

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'], baseUrl: 'https://api.openai.com/v1/chat/completions' },
  { id: 'anthropic', name: 'Anthropic', models: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022'], baseUrl: 'https://api.anthropic.com/v1/messages' },
  { id: 'openrouter', name: 'OpenRouter', models: ['openai/gpt-4o', 'anthropic/claude-sonnet-4', 'google/gemini-pro'], baseUrl: 'https://openrouter.ai/api/v1/chat/completions' },
];

const BLOOM_VERBS = {
  remember: ['Define', 'Identify', 'List', 'Name', 'Recall', 'Recognize', 'State'],
  understand: ['Classify', 'Describe', 'Discuss', 'Explain', 'Interpret', 'Summarize', 'Translate'],
  apply: ['Apply', 'Demonstrate', 'Execute', 'Implement', 'Produce', 'Solve', 'Use'],
  analyze: ['Analyze', 'Compare', 'Contrast', 'Differentiate', 'Examine', 'Organize', 'Relate'],
  evaluate: ['Assess', 'Critique', 'Evaluate', 'Judge', 'Justify', 'Recommend', 'Support'],
  create: ['Compose', 'Construct', 'Create', 'Design', 'Develop', 'Formulate', 'Generate'],
};

interface GeneratedCLO {
  text: string;
  plos: number[];
  bloomLevel: string;
  verb: string;
}

export function CLOGenerator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4o');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseLevel, setCourseLevel] = useState<'foundational' | 'intermediate' | 'advanced'>('foundational');
  const [selectedPLOs, setSelectedPLOs] = useState<number[]>([1, 2, 4, 5]);
  const [numOutcomes, setNumOutcomes] = useState(4);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCLOs, setGeneratedCLOs] = useState<GeneratedCLO[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedProvider = PROVIDERS.find(p => p.id === provider)!;

  const buildSystemPrompt = () => {
    const ploDescriptions = selectedPLOs.map(id => {
      const plo = PLO_OPTIONS.find(p => p.id === id)!;
      return `PLO ${id}: ${plo.title} - ${plo.desc}`;
    }).join('\n');

    const bloomLevel = courseLevel === 'foundational' ? 'Remember, Understand, Apply'
      : courseLevel === 'intermediate' ? 'Apply, Analyze'
      : 'Analyze, Evaluate, Create';

    return `You are an expert curriculum designer specializing in writing measurable Course Learning Outcomes (CLOs) for higher education design programs.

CONTEXT:
You are writing CLOs for a ${courseLevel}-level course that must align to specific Program Learning Outcomes (PLOs).

PROGRAM LEARNING OUTCOMES TO ALIGN WITH:
${ploDescriptions}

REQUIREMENTS FOR EACH CLO:
1. MEASURABLE: Use action verbs from Bloom's Taxonomy (appropriate level: ${bloomLevel})
2. SPECIFIC: Clearly state what the student will be able to do
3. ASSESSABLE: The outcome must be observable and can be evaluated
4. PLO-ALIGNED: Each CLO must explicitly connect to 1-3 of the provided PLOs
5. CONSISTENT: Use parallel structure and consistent language

BLOOM'S TAXONOMY VERBS BY LEVEL:
- Remember: ${BLOOM_VERBS.remember.join(', ')}
- Understand: ${BLOOM_VERBS.understand.join(', ')}
- Apply: ${BLOOM_VERBS.apply.join(', ')}
- Analyze: ${BLOOM_VERBS.analyze.join(', ')}
- Evaluate: ${BLOOM_VERBS.evaluate.join(', ')}
- Create: ${BLOOM_VERBS.create.join(', ')}

For a ${courseLevel} course, focus on: ${bloomLevel} levels.

OUTPUT FORMAT:
Return a JSON array of CLOs. Each CLO should have:
- "text": The complete CLO statement starting with an action verb
- "plos": Array of PLO numbers this aligns to (e.g., [1, 4])
- "bloomLevel": The Bloom's level (e.g., "Apply")
- "verb": The action verb used

Example output:
[
  {
    "text": "Demonstrate foundational drawing techniques for sketching and ideation processes",
    "plos": [1, 4],
    "bloomLevel": "Apply",
    "verb": "Demonstrate"
  }
]

Return ONLY the JSON array, no additional text.`;
  };

  const generateCLOs = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }
    if (!courseName.trim()) {
      setError('Please enter a course name');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedCLOs([]);

    const systemPrompt = buildSystemPrompt();
    const userPrompt = `Generate ${numOutcomes} Course Learning Outcomes (CLOs) for the following course:

Course Code: ${courseCode || 'N/A'}
Course Name: ${courseName}
Course Description: ${courseDescription || 'A design course focusing on fundamental skills and concepts.'}

Remember to:
- Start each CLO with an action verb appropriate for ${courseLevel}-level coursework
- Map each CLO to relevant PLOs from the provided list
- Ensure outcomes are measurable and assessable`;

    try {
      let response;

      if (provider === 'anthropic') {
        response = await fetch(selectedProvider.baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model,
            max_tokens: 2048,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const content = data.content[0].text;
        const parsed = JSON.parse(content);
        setGeneratedCLOs(parsed);
      } else {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        };

        if (provider === 'openrouter') {
          headers['HTTP-Referer'] = window.location.origin;
          headers['X-Title'] = 'CLO Generator';
        }

        response = await fetch(selectedProvider.baseUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        setGeneratedCLOs(parsed);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate CLOs');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    const text = generatedCLOs.map((clo, i) =>
      `${i + 1}. ${clo.text}\n   PLOs: ${clo.plos.join(', ')} | Bloom's Level: ${clo.bloomLevel}`
    ).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePLO = (id: number) => {
    setSelectedPLOs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Style objects based on the style guide
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '110%',
    color: colors.content1,
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '110%',
    color: colors.content1,
    marginBottom: '8px',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '32px',
    borderBottom: `1px solid ${colors.border}`,
  };

  return (
    <section
      ref={ref}
      style={{
        padding: '80px 24px',
        backgroundColor: colors.background,
      }}
    >
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: `${colors.success}15`,
            borderRadius: '100px',
            marginBottom: '16px',
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: colors.success }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              color: colors.success,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              AI-Powered Tool
            </span>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 500,
            lineHeight: '110%',
            color: colors.content1,
            marginBottom: '12px',
            fontFamily: '"DM Sans", sans-serif',
          }}>
            CLO Generator
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '150%',
            color: colors.content2,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Generate measurable, PLO-aligned Course Learning Outcomes using AI.
            Bring your own API key from OpenAI, Anthropic, or OpenRouter.
          </p>
        </motion.div>

        {/* Main Generator Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {/* API Configuration */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: `${colors.info}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Settings style={{ width: '20px', height: '20px', color: colors.info }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: colors.content1, margin: 0 }}>
                  API Configuration
                </h3>
                <p style={{ fontSize: '13px', color: colors.content3, margin: 0 }}>
                  Your API key is never stored - it stays in your browser session only
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {/* Provider Select */}
              <div>
                <label style={labelStyle}>Provider</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={provider}
                    onChange={(e) => {
                      setProvider(e.target.value);
                      setModel(PROVIDERS.find(p => p.id === e.target.value)!.models[0]);
                    }}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      paddingRight: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    {PROVIDERS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: colors.content3,
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* Model Select */}
              <div>
                <label style={labelStyle}>Model</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      paddingRight: '40px',
                      cursor: 'pointer',
                    }}
                  >
                    {selectedProvider.models.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: colors.content3,
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* API Key */}
              <div>
                <label style={labelStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock style={{ width: '14px', height: '14px' }} />
                    API Key
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${selectedProvider.name} API key`}
                    style={{ ...inputStyle, paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      color: colors.content3,
                    }}
                  >
                    <Key style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: `${colors.success}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BookOpen style={{ width: '20px', height: '20px', color: colors.success }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 500, color: colors.content1, margin: 0 }}>
                Course Information
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Course Code</label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g., DESN 100"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Course Name *</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g., Drawing for Communication"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Course Description</label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Describe what students will learn in this course..."
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Course Level</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['foundational', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setCourseLevel(level)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        borderRadius: '8px',
                        border: `1px solid ${courseLevel === level ? colors.success : colors.border}`,
                        backgroundColor: courseLevel === level ? `${colors.success}10` : colors.white,
                        color: courseLevel === level ? colors.success : colors.content2,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Number of CLOs</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setNumOutcomes(num)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        borderRadius: '8px',
                        border: `1px solid ${numOutcomes === num ? colors.success : colors.border}`,
                        backgroundColor: numOutcomes === num ? `${colors.success}10` : colors.white,
                        color: numOutcomes === num ? colors.success : colors.content2,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PLO Selection */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: `${colors.warning}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Target style={{ width: '20px', height: '20px', color: colors.warning }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: colors.content1, margin: 0 }}>
                  Target PLOs
                </h3>
                <p style={{ fontSize: '13px', color: colors.content3, margin: 0 }}>
                  Select the Program Learning Outcomes to align with
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {PLO_OPTIONS.map((plo) => {
                const isSelected = selectedPLOs.includes(plo.id);
                return (
                  <button
                    key={plo.id}
                    onClick={() => togglePLO(plo.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: `2px solid ${isSelected ? colors.success : colors.border}`,
                      backgroundColor: isSelected ? `${colors.success}08` : colors.white,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 600,
                        flexShrink: 0,
                        backgroundColor: isSelected ? colors.success : colors.border,
                        color: isSelected ? colors.white : colors.content3,
                      }}>
                        {plo.id}
                      </span>
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: isSelected ? colors.content1 : colors.content2,
                          marginBottom: '2px',
                        }}>
                          {plo.title}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: colors.content3,
                        }}>
                          {plo.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button & Results */}
          <div style={{ padding: '32px' }}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: '20px',
                  padding: '14px 16px',
                  backgroundColor: `${colors.error}10`,
                  border: `1px solid ${colors.error}30`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: colors.error,
                  fontSize: '14px',
                }}
              >
                <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                {error}
              </motion.div>
            )}

            <button
              onClick={generateCLOs}
              disabled={isGenerating || !apiKey || !courseName}
              style={{
                width: '100%',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 500,
                color: colors.white,
                backgroundColor: isGenerating || !apiKey || !courseName ? colors.border : colors.success,
                border: 'none',
                borderRadius: '10px',
                cursor: isGenerating || !apiKey || !courseName ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
              }}
            >
              {isGenerating ? (
                <>
                  <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
                  Generating CLOs...
                </>
              ) : (
                <>
                  <Zap style={{ width: '20px', height: '20px' }} />
                  Generate Course Learning Outcomes
                </>
              )}
            </button>

            {/* Generated Results */}
            {generatedCLOs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '32px' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: colors.content1,
                    margin: 0,
                  }}>
                    Generated CLOs
                  </h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={generateCLOs}
                      style={{
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: colors.content2,
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <RefreshCw style={{ width: '14px', height: '14px' }} />
                      Regenerate
                    </button>
                    <button
                      onClick={copyToClipboard}
                      style={{
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: colors.white,
                        backgroundColor: colors.success,
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {copied ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                      {copied ? 'Copied!' : 'Copy All'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {generatedCLOs.map((clo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{
                        padding: '20px',
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <span style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: colors.success,
                          color: colors.white,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}>
                          {i + 1}
                        </span>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: '15px',
                            lineHeight: '150%',
                            color: colors.content1,
                            margin: '0 0 12px 0',
                          }}>
                            {clo.text}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                color: colors.content3,
                                letterSpacing: '0.05em',
                              }}>PLOs:</span>
                              {clo.plos.map((plo) => (
                                <span key={plo} style={{
                                  padding: '3px 8px',
                                  backgroundColor: `${colors.info}15`,
                                  color: colors.info,
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                }}>
                                  {plo}
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                color: colors.content3,
                                letterSpacing: '0.05em',
                              }}>Bloom's:</span>
                              <span style={{
                                padding: '3px 8px',
                                backgroundColor: `${colors.warning}15`,
                                color: colors.warning,
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 500,
                              }}>
                                {clo.bloomLevel}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                color: colors.content3,
                                letterSpacing: '0.05em',
                              }}>Verb:</span>
                              <span style={{
                                padding: '3px 8px',
                                backgroundColor: `${colors.success}15`,
                                color: colors.success,
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 500,
                              }}>
                                {clo.verb}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Spin animation for loader */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
