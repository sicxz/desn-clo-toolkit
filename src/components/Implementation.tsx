import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { FileCheck, ClipboardCheck, MessageSquare, Sparkles } from 'lucide-react';

const recommendations = [
  {
    number: 1,
    icon: FileCheck,
    title: 'Syllabus Standardization',
    description: 'Common template across courses',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    number: 2,
    icon: ClipboardCheck,
    title: 'Assessment Alignment',
    description: 'Map PLO to assignment',
    color: 'from-purple-500 to-pink-600'
  },
  {
    number: 3,
    icon: MessageSquare,
    title: 'Language Consistency',
    description: 'Use exact PLO language',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    number: 4,
    icon: Sparkles,
    title: "Bloom's Taxonomy Foundations",
    description: 'Lower-division = higher-order',
    color: 'from-orange-500 to-red-600'
  }
];

export function Implementation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-white text-center mb-4"
        >
          Implementation Recommendations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-center mb-16"
        >
          Strategic steps for successful rollout
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.3 + index * 0.1,
                type: 'spring',
                stiffness: 200 
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${rec.color} rounded-2xl p-6 h-full shadow-xl border border-white/20 overflow-hidden`}>
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  {/* Number badge */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  >
                    <span className="text-white text-xl">{rec.number}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2 
                    }}
                    className="mb-4"
                  >
                    <rec.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-white mb-2">{rec.title}</h3>
                  <p className="text-white/80 text-sm">{rec.description}</p>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 shadow-2xl border border-white/20"
          >
            <p className="text-white text-lg mb-2">Ready to implement?</p>
            <p className="text-white/80">Document prepared for EWU Design Department curriculum review.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
