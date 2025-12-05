import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, BookOpen, Wrench, Target } from 'lucide-react';

const levels = [
  { number: 1, label: 'Visual Vocabulary', sublabel: 'knowledge-based outcomes', icon: BookOpen, color: 'bg-blue-500' },
  { number: 2, label: 'Technical Skills', sublabel: 'software-based outcomes', icon: Wrench, color: 'bg-teal-500' },
  { number: 3, label: 'Design Methodologies', sublabel: 'design-thinking based outcomes', icon: Target, color: 'bg-purple-500' },
];

const progression = [
  { label: 'L (Learn)', color: 'bg-emerald-500' },
  { label: 'P (Practice)', color: 'bg-blue-500' },
  { label: 'M (Mastery)', color: 'bg-purple-500' },
];

export function ProgressionFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-white text-center mb-16"
        >
          Program Learning Outcomes Reference
        </motion.h2>

        {/* PLO Levels */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="bg-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-8">
              PLO Description
            </div>

            <div className="space-y-6">
              {levels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className={`${level.color} w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                    {level.number}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/10 p-2 rounded-lg"
                  >
                    <level.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-white">{level.label}</div>
                    <div className="text-white/60 text-sm">{level.sublabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progression Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-white text-center mb-8">Progression</h3>
          
          <div className="flex items-center justify-center gap-4">
            {progression.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${step.color} px-8 py-4 rounded-xl text-white shadow-lg`}
                >
                  {step.label}
                </motion.div>
                
                {index < progression.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <ArrowRight className="w-8 h-8 text-white/50" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
