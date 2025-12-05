import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function OverviewGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-blue-600 text-white px-6 py-3 inline-block mb-6 rounded-lg">
            OVERVIEW
          </div>
          <ul className="space-y-4">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3"
            >
              <span className="text-blue-600 text-2xl leading-none">•</span>
              <span className="text-gray-800">
                Revised SLOs for three foundational courses (DESN 100, 200, and 216)
              </span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3"
            >
              <span className="text-blue-600 text-2xl leading-none">•</span>
              <span className="text-gray-800">
                Addressed unmeasurable language and inconsistencies
              </span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3"
            >
              <span className="text-blue-600 text-2xl leading-none">•</span>
              <span className="text-gray-800">
                Established a clearer foundation for PLO alignment
              </span>
            </motion.li>
          </ul>
        </motion.div>

        {/* Guiding Principles */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-emerald-600 text-white px-6 py-3 inline-block mb-6 rounded-lg">
            GUIDING PRINCIPLES
          </div>
          <ul className="space-y-3">
            {[
              'Measurable Observable Verbs',
              'PLO-Minded Drafts of Student Outcomes',
              'Design Appropriate Foundational Knowledge',
              'Course Consistent same pedagogy',
              'Writing that includes Methods'
            ].map((principle, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 rounded-lg border-l-4 border-emerald-500 text-gray-800 cursor-pointer transition-shadow hover:shadow-md"
              >
                {principle}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
