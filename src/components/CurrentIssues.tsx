import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const issues = [
  {
    course: 'DESN 100',
    color: 'from-red-500 to-orange-500',
    problems: [
      'Discover is seen to be read intuition',
      'Develop is seen to be construction',
      'In unobservable/untenable emotion - they are seen to match courses',
      'Create a habit and experimentations missing analogue - impairs knowledge & skills development & customer relations'
    ],
    label: 'Warning: Unmeasurable'
  },
  {
    course: 'DESN 200',
    color: 'from-yellow-500 to-amber-500',
    problems: [
      'Establish a practice of drawing',
      'Combine exploration to apply refinements',
      'Demonstrate interpretive/art explorations and possible art effects',
      'Develop visual thinking skills'
    ],
    label: 'Issue: Affects Curriculum'
  },
  {
    course: 'DESN 216',
    color: 'from-green-500 to-emerald-500',
    problems: [
      'Apply essential use of',
      'Issue: Affected previous versions',
      'Make specific actions'
    ],
    label: 'Issue: Needs Revision'
  }
];

export function CurrentIssues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-white mb-2">Current Issues (Before)</h2>
          <p className="text-white/60">Identified challenges in previous SLO versions</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {issues.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${issue.color} rounded-2xl p-6 shadow-2xl border border-white/20 h-full`}
              >
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  {issue.label}
                </div>
                
                <h3 className="text-white mb-6">{issue.course}</h3>
                
                <div className="space-y-3">
                  {issue.problems.map((problem, pIndex) => (
                    <motion.div
                      key={pIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.15 + pIndex * 0.1 }}
                      className="flex gap-2 items-start bg-black/20 rounded-lg p-3"
                    >
                      <AlertTriangle className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90 text-sm">{problem}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Resolved indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2 shadow-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-xl px-6 py-4">
            <p className="text-green-400">✓ All issues addressed in the revised SLOs</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
