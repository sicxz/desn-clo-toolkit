import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Table2 } from 'lucide-react';

const referenceData = [
  {
    course: 'DESN 100',
    keyVerbs: 'Identify, Demonstrate, Translate, Explain',
    mappedPLOs: '1, 2, 4, 5',
    color: 'bg-blue-500/20 border-blue-500/50'
  },
  {
    course: 'DESN 200',
    keyVerbs: 'Analyze, Create, Construct, Articulate, Reflect',
    mappedPLOs: '1, 2, 4, 5, 6',
    color: 'bg-teal-500/20 border-teal-500/50'
  },
  {
    course: 'DESN 216',
    keyVerbs: 'Differentiate, Produce, Apply, Communicate',
    mappedPLOs: '1, 2, 3, 4, 5',
    color: 'bg-purple-500/20 border-purple-500/50'
  }
];

export function QuickReference() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 px-4 mb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Table2 className="w-10 h-10 text-teal-400" />
          </div>
          <h2 className="text-white mb-2">Quick Reference: SLO Summary by Course</h2>
          <p className="text-white/60">At-a-glance comparison of key verbs and PLO mappings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white/10 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              Course
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              Key SLO Verbs
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-white"
            >
              Mapped PLOs
            </motion.div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            {referenceData.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  x: 10
                }}
                className={`grid grid-cols-3 gap-4 p-6 ${row.color} border transition-all duration-300`}
              >
                <div className="text-white">{row.course}</div>
                <div className="text-white/80 text-sm">{row.keyVerbs}</div>
                <div>
                  <div className="flex flex-wrap gap-2">
                    {row.mappedPLOs.split(', ').map((plo, pIndex) => (
                      <motion.span
                        key={pIndex}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 + pIndex * 0.05 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="bg-white/20 px-3 py-1 rounded-full text-white text-sm"
                      >
                        {plo}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-white/50 text-sm">
            Document prepared for EWU Design Department curriculum review
          </p>
        </motion.div>

        {/* Floating back to top button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-12 mx-auto block px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-teal-500/50 transition-shadow"
        >
          Back to Top ↑
        </motion.button>
      </div>
    </div>
  );
}
