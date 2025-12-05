import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

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

const courses = [
  {
    code: 'DESN 100',
    title: 'Drawing for Communication',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 2, 4, 5)',
    color: colors.success,
    before: [
      'Discover how Drawing can be interpreted and refined',
      'Develop an understanding of 3-D form',
      'Demonstrate problem-solving and representational drawing',
      'Create a habit of experimentation and iteration'
    ],
    after: [
      'Identify visually communicated elements of observational drawing',
      'Demonstrate foundational drawing techniques for sketching and ideation',
      'Translate ideas into pictorial form using visual methods',
      'Explain the design elements and principles'
    ]
  },
  {
    code: 'DESN 200',
    title: 'Visual Thinking and Making',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 3, 4, 5, 6)',
    color: colors.info,
    before: [
      'Establish a practice of drawing',
      'Combine exploration to apply refinement',
      'Demonstrate interpretive art explorations',
      'Develop visual thinking skills'
    ],
    after: [
      'Analyze works of design using design frameworks and methodologies',
      'Develop and document iterative ideation processes and methods',
      'Construct functional prototypes using a variety of materials',
      'Articulate observations about a visual work of design'
    ]
  },
  {
    code: 'DESN 216',
    title: 'Digital Foundations',
    credits: '4 Credits',
    mapping: 'SLO Mapping: (1, 2, 3, 4, 5)',
    color: colors.content1,
    before: [
      'Differentiate between raster and vector',
      'Apply essential use of tools',
      'Issue: Affected previous versions',
      'Make specific actions'
    ],
    after: [
      'Differentiate between raster and vector graphic formats',
      'Produce raster and vector graphics to industry standards',
      'Produce digital compositions using color theory principles',
      'Communicate the work using appropriate design vocabulary'
    ]
  }
];

export function SLOComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <div ref={ref} style={{ background: colors.background, padding: '96px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: colors.content1,
            fontFamily: 'Fraunces, Georgia, serif',
            lineHeight: '110%'
          }}>
            Student Learning Outcomes: Before & After
          </h2>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('before')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              background: activeTab === 'before' ? colors.error : colors.white,
              color: activeTab === 'before' ? colors.white : colors.content2,
              border: activeTab === 'before' ? 'none' : `1px solid ${colors.border}`,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'before' ? '0 4px 12px rgba(208, 2, 27, 0.25)' : 'none'
            }}
          >
            <AlertCircle style={{ width: '20px', height: '20px' }} />
            Current Issues (Before)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('after')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              background: activeTab === 'after' ? colors.success : colors.white,
              color: activeTab === 'after' ? colors.white : colors.content2,
              border: activeTab === 'after' ? 'none' : `1px solid ${colors.border}`,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === 'after' ? '0 4px 12px rgba(16, 216, 0, 0.25)' : 'none'
            }}
          >
            <CheckCircle2 style={{ width: '20px', height: '20px' }} />
            Revised SLOs (After)
          </motion.button>
        </motion.div>

        {/* Course Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {courses.map((course, index) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              style={{
                background: colors.white,
                borderRadius: '16px',
                overflow: 'hidden',
                borderTop: `4px solid ${course.color}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: colors.content1, marginBottom: '4px', fontFamily: 'Fraunces, Georgia, serif' }}>{course.code}</div>
                  <div style={{ color: colors.content2, marginBottom: '4px', fontWeight: 500 }}>{course.title}</div>
                  <div style={{ fontSize: '13px', color: colors.content3 }}>{course.credits}</div>
                  <div style={{ fontSize: '13px', color: colors.content3 }}>{course.mapping}</div>
                </div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'before' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  {(activeTab === 'before' ? course.before : course.after).map(
                    (item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          padding: '12px',
                          borderRadius: '8px',
                          background: activeTab === 'before' ? `${colors.error}08` : `${colors.success}08`,
                          border: `1px solid ${activeTab === 'before' ? colors.error : colors.success}20`
                        }}
                      >
                        {activeTab === 'before' ? (
                          <AlertCircle style={{ width: '16px', height: '16px', color: colors.error, flexShrink: 0, marginTop: '2px' }} />
                        ) : (
                          <CheckCircle2 style={{ width: '16px', height: '16px', color: colors.success, flexShrink: 0, marginTop: '2px' }} />
                        )}
                        <span style={{ fontSize: '14px', color: colors.content2, lineHeight: '140%' }}>{item}</span>
                      </motion.div>
                    )
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
