import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function ImplementationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const recommendations = [
    {
      number: 1,
      title: 'Syllabus Standardization',
      description: 'Common template across courses'
    },
    {
      number: 2,
      title: 'Assessment Alignment',
      description: 'Map PLO to assignment'
    },
    {
      number: 3,
      title: 'Language Consistency',
      description: 'Use exact PLO language'
    },
    {
      number: 4,
      title: "Bloom's Taxonomy Foundations",
      description: 'Lower-division = higher-order'
    }
  ];

  return (
    <div ref={ref} className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          Implementation Recommendations
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-yellow-400 text-blue-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl"
              >
                {rec.number}
              </motion.div>
              <h3 className="text-lg mb-2">{rec.title}</h3>
              <p className="text-blue-200 text-sm">{rec.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Reference Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-white text-gray-900 rounded-lg overflow-hidden shadow-xl"
        >
          <div className="bg-blue-700 text-white p-4">
            <h3 className="text-xl">Quick Reference: SLO Summary by Course</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left">Course</th>
                  <th className="px-6 py-4 text-left">Key SLO Verbs</th>
                  <th className="px-6 py-4 text-left">Mapped PLOs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  whileHover={{ backgroundColor: '#eff6ff' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-blue-600">DESN 100</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Identify, Demonstrate, Translate, Explain
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {['1', '2', '4', '5'].map((num) => (
                        <span
                          key={num}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  whileHover={{ backgroundColor: '#f0fdfa' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-teal-600">DESN 200</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Analyze, Create, Construct, Articulate, Reflect
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {['1', '2', '4', '5', '6'].map((num) => (
                        <span
                          key={num}
                          className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 }}
                  whileHover={{ backgroundColor: '#faf5ff' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-purple-600">DESN 216</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Differentiate, Produce, Apply, Communicate
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {['1', '2', '3', '4', '5'].map((num) => (
                        <span
                          key={num}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-8 text-blue-200 text-sm"
        >
          Document prepared for EWU Design Department curriculum review
        </motion.div>
      </div>
    </div>
  );
}
