import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { FileText, BookOpen, MessageSquare, Pencil, CheckCircle2 } from 'lucide-react';

const overviewItems = [
  {
    icon: FileText,
    title: 'Revised SLOs for three foundational courses',
    description: 'DESN 100, 200, and 216'
  },
  {
    icon: BookOpen,
    title: 'Unmeasurable language inconsistencies',
    description: 'Identified and addressed'
  },
  {
    icon: MessageSquare,
    title: 'Established a PLO foundation',
    description: 'Clear learning pathway'
  }
];

const guidingPrinciples = [
  { title: 'Measurable Observable Verbs', icon: CheckCircle2, color: 'from-emerald-400 to-teal-500' },
  { title: 'PLO-Minded Drafts of Student Outcomes', icon: CheckCircle2, color: 'from-teal-400 to-cyan-500' },
  { title: 'Design Appropriate Foundational Knowledge', icon: CheckCircle2, color: 'from-cyan-400 to-blue-500' },
  { title: 'Course Consistent same pedagogy', icon: CheckCircle2, color: 'from-blue-400 to-indigo-500' },
  { title: 'Writing that includes Methods', icon: CheckCircle2, color: 'from-indigo-400 to-purple-500' }
];

export function OverviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-white text-center mb-16"
        >
          Overview & Guiding Principles
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-6">
              Overview
            </div>
            <div className="space-y-6">
              {overviewItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300"
                >
                  <item.icon className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white">{item.title}</div>
                    <div className="text-white/60">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Guiding Principles */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg inline-block mb-6">
              Guiding Principles
            </div>
            <div className="grid gap-4">
              {guidingPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${principle.color} p-4 rounded-xl text-white flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <principle.icon className="w-6 h-6 flex-shrink-0" />
                  <span>{principle.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
