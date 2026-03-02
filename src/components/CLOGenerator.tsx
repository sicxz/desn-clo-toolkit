import { useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Key,
  Loader2,
  Lock,
  RefreshCw,
  Settings,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { PLO_DEFINITIONS, PLO_SOURCE } from '../data/ploMap';

const PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    baseUrl: 'https://api.openai.com/v1/chat/completions',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022'],
    baseUrl: 'https://api.anthropic.com/v1/messages',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    models: ['openai/gpt-4o', 'anthropic/claude-sonnet-4', 'google/gemini-pro'],
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
  },
] as const;

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

function parseGeneratedCLOs(raw: string): GeneratedCLO[] {
  const trimmed = raw.trim();
  const withoutFences = trimmed
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  const firstBracket = withoutFences.indexOf('[');
  const lastBracket = withoutFences.lastIndexOf(']');

  const payload =
    firstBracket !== -1 && lastBracket !== -1
      ? withoutFences.slice(firstBracket, lastBracket + 1)
      : withoutFences;

  const parsed = JSON.parse(payload);
  if (!Array.isArray(parsed)) {
    throw new Error('Model response was not a JSON array.');
  }

  return parsed.map((item) => ({
    text: String(item.text ?? '').trim(),
    plos: Array.isArray(item.plos)
      ? item.plos
          .map((plo: unknown) => Number(plo))
          .filter((plo: number) => Number.isFinite(plo) && plo > 0)
      : [],
    bloomLevel: String(item.bloomLevel ?? '').trim(),
    verb: String(item.verb ?? '').trim(),
  }));
}

export function CLOGenerator() {
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]['id']>('openai');
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

  const selectedProvider = useMemo(() => {
    return PROVIDERS.find((candidate) => candidate.id === provider) ?? PROVIDERS[0];
  }, [provider]);

  const buildSystemPrompt = () => {
    const ploDescriptions = selectedPLOs
      .map((id) => {
        const plo = PLO_DEFINITIONS.find((item) => item.id === id);
        return plo ? `PLO ${id}: ${plo.title} - ${plo.description}` : null;
      })
      .filter(Boolean)
      .join('\n');

    const bloomLevel =
      courseLevel === 'foundational'
        ? 'Remember, Understand, Apply'
        : courseLevel === 'intermediate'
        ? 'Apply, Analyze'
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

Return ONLY the JSON array, no additional text.`;
  };

  const generateCLOs = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key.');
      return;
    }

    if (!courseName.trim()) {
      setError('Please enter a course name.');
      return;
    }

    if (selectedPLOs.length === 0) {
      setError('Select at least one target PLO.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedCLOs([]);

    const systemPrompt = buildSystemPrompt();
    const userPrompt = `Generate ${numOutcomes} Course Learning Outcomes (CLOs) for the following course:\n\nCourse Code: ${
      courseCode || 'N/A'
    }\nCourse Name: ${courseName}\nCourse Description: ${
      courseDescription || 'A design course focusing on foundational skills and applied methods.'
    }\n\nRemember to:\n- Start each CLO with an action verb appropriate for ${courseLevel}-level coursework\n- Map each CLO to relevant PLOs from the provided list\n- Ensure outcomes are measurable and assessable`;

    try {
      let response: Response;
      let rawContent = '';

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

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || 'API request failed.');
        }

        rawContent = data.content?.[0]?.text ?? '';
      } else {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
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

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || 'API request failed.');
        }

        rawContent = data.choices?.[0]?.message?.content ?? '';
      }

      const parsed = parseGeneratedCLOs(rawContent).filter((clo) => clo.text.length > 0);
      if (parsed.length === 0) {
        throw new Error('Generation succeeded, but no CLOs were returned in a usable format.');
      }

      setGeneratedCLOs(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate CLOs.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedCLOs.length) {
      return;
    }

    const text = generatedCLOs
      .map(
        (clo, index) =>
          `${index + 1}. ${clo.text}\n   PLOs: ${clo.plos.join(', ') || 'N/A'} | Bloom's Level: ${
            clo.bloomLevel || 'N/A'
          } | Verb: ${clo.verb || 'N/A'}`,
      )
      .join('\n\n');

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const togglePLO = (id: number) => {
    setSelectedPLOs((previous) => {
      return previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id].sort((a, b) => a - b);
    });
  };

  return (
    <section id="generator" className="section section--muted">
      <div className="container stack-lg">
        <header className="section-head section-head--center">
          <span className="eyebrow eyebrow--success">
            <Sparkles className="inline-icon" />
            AI-powered tool
          </span>
          <h2 className="h2">CLO Generator</h2>
          <p className="lead">
            Generate measurable, PLO-aligned outcomes with your own API key. Keys remain in your browser session and are
            never persisted by this app.
          </p>
        </header>

        <form
          className="card tool-panel"
          onSubmit={(event) => {
            event.preventDefault();
            void generateCLOs();
          }}
        >
          <section className="tool-section">
            <div className="section-title-row">
              <h3 className="section-title">
                <Settings className="inline-icon" /> API Configuration
              </h3>
              <p className="section-note">Provider, model, and key settings</p>
            </div>

            <div className="form-grid form-grid-3">
              <div className="field">
                <label htmlFor="provider">Provider</label>
                <select
                  id="provider"
                  className="select"
                  value={provider}
                  onChange={(event) => {
                    const value = event.target.value as (typeof PROVIDERS)[number]['id'];
                    setProvider(value);
                    const nextProvider = PROVIDERS.find((item) => item.id === value);
                    if (nextProvider) {
                      setModel(nextProvider.models[0]);
                    }
                  }}
                >
                  {PROVIDERS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="model">Model</label>
                <select
                  id="model"
                  className="select"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                >
                  {selectedProvider.models.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="api-key" className="field-inline-label">
                  <Lock className="inline-icon" /> API Key
                </label>
                <div className="secret-wrap">
                  <input
                    id="api-key"
                    className="input"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                    placeholder={`Enter your ${selectedProvider.name} API key`}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="secret-toggle"
                    onClick={() => setShowApiKey((value) => !value)}
                    aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                  >
                    <Key className="inline-icon" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <div className="section-title-row">
              <h3 className="section-title">Course Information</h3>
              <p className="section-note">Describe the course context for output quality</p>
            </div>

            <div className="form-grid form-grid-2">
              <div className="field">
                <label htmlFor="course-code">Course Code</label>
                <input
                  id="course-code"
                  className="input"
                  value={courseCode}
                  onChange={(event) => setCourseCode(event.target.value)}
                  placeholder="e.g., DESN 100"
                />
              </div>

              <div className="field">
                <label htmlFor="course-name">Course Name *</label>
                <input
                  id="course-name"
                  className="input"
                  value={courseName}
                  onChange={(event) => setCourseName(event.target.value)}
                  placeholder="e.g., Drawing for Communication"
                  required
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: '16px' }}>
              <label htmlFor="course-description">Course Description</label>
              <textarea
                id="course-description"
                className="textarea"
                value={courseDescription}
                onChange={(event) => setCourseDescription(event.target.value)}
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div className="form-grid form-grid-2" style={{ marginTop: '16px' }}>
              <div className="field">
                <label>Course Level</label>
                <div className="choice-row">
                  {(['foundational', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`choice-button ${courseLevel === level ? 'is-active' : ''}`}
                      onClick={() => setCourseLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Number of CLOs</label>
                <div className="choice-row">
                  {[3, 4, 5, 6].map((count) => (
                    <button
                      key={count}
                      type="button"
                      className={`choice-button ${numOutcomes === count ? 'is-active' : ''}`}
                      onClick={() => setNumOutcomes(count)}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <div className="section-title-row">
              <h3 className="section-title">
                <Target className="inline-icon" /> Target PLOs
              </h3>
              <p className="section-note">
                Select one or more outcomes aligned to {PLO_SOURCE.fileName} ({PLO_SOURCE.revisedLabel})
              </p>
            </div>

            <div className="plo-grid">
              {PLO_DEFINITIONS.map((plo) => {
                const isActive = selectedPLOs.includes(plo.id);
                return (
                  <button
                    key={plo.id}
                    type="button"
                    className={`plo-button ${isActive ? 'is-active' : ''}`}
                    onClick={() => togglePLO(plo.id)}
                  >
                    <div className="plo-button-top">
                      <span className="plo-number">{plo.id}</span>
                      <div>
                        <strong>{plo.title}</strong>
                        <div className="small">{plo.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="tool-section">
            {error ? (
              <div className="error-box" role="alert">
                <AlertCircle className="inline-icon" /> {error}
              </div>
            ) : null}

            <button type="submit" className="button button-primary" disabled={isGenerating || !apiKey || !courseName}>
              {isGenerating ? (
                <>
                  <Loader2 className="inline-icon" />
                  Generating CLOs...
                </>
              ) : (
                <>
                  <Zap className="inline-icon" />
                  Generate Course Learning Outcomes
                </>
              )}
            </button>

            {generatedCLOs.length > 0 ? (
              <div style={{ marginTop: '20px' }}>
                <div className="section-title-row" style={{ marginBottom: '12px' }}>
                  <h4 className="h4" style={{ margin: 0 }}>
                    Generated CLOs
                  </h4>
                  <div className="result-actions">
                    <button type="button" className="button" onClick={() => void generateCLOs()}>
                      <RefreshCw className="inline-icon" />
                      Regenerate
                    </button>
                    <button type="button" className="button button-primary" onClick={() => void copyToClipboard()}>
                      {copied ? <Check className="inline-icon" /> : <Copy className="inline-icon" />}
                      {copied ? 'Copied' : 'Copy All'}
                    </button>
                  </div>
                </div>

                <div className="result-list">
                  {generatedCLOs.map((clo, index) => (
                    <article key={`${clo.text}-${index}`} className="result-card">
                      <p className="result-title">
                        <strong>{index + 1}.</strong> {clo.text}
                      </p>
                      <div className="meta-row">
                        <span className="badge badge-accent">PLOs: {clo.plos.join(', ') || 'N/A'}</span>
                        <span className="badge badge-warning">Bloom: {clo.bloomLevel || 'N/A'}</span>
                        <span className="badge badge-success">Verb: {clo.verb || 'N/A'}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </form>
      </div>
    </section>
  );
}
