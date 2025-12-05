import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Pencil, Eye, Map, Palette } from 'lucide-react';

const courses = [
  {
    code: 'DESN 100',
    title: 'Drawing for Communication',
    subtitle: '4 Credits | SLO Mapping: (1, 2, 4, 5)',
    color: 'from-blue-500 to-blue-700',
    icon: Pencil,
    outcomes: [
      'Identify visually communicated elements',
      'Demonstrate foundational drawing techniques',
      'Translate ideas into pictorial form',
      'Explain design elements and principles'
    ]
  },
  {
    code: 'DESN 200',
    title: 'Visual Thinking and Making',
    subtitle: '4 Credits | SLO Mapping: (1, 3, 4, 5, 6)',
    color: 'from-teal-500 to-teal-700',
    icon: Eye,
    outcomes: [
      'Analyze works of design using design frameworks',
      'Develop and document ideation processes',
      'Construct functional prototypes',
      'Articulate observations about visual work'
    ]
  },
  {
    code: 'DESN 216',
    title: 'Digital Foundations',
    subtitle: '4 Credits | SLO Mapping: (1, 2, 3, 4, 5)',
    color: 'from-purple-500 to-purple-700',
    icon: Palette,
    outcomes: [
      'Produce raster and vector graphics',
      'Produce digital compositions',
      'Apply color theory principles',
      'Communicate work using design vocabulary'
    ]
  }
];

export function SLOCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-white text-center mb-4"
        >
          Revised Student Learning Outcomes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-center mb-16"
        >
          After comprehensive review and alignment
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              <motion.div
                animate={{
                  rotateY: hoveredCard === index ? 5 : 0,
                  scale: hoveredCard === index ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`bg-gradient-to-br ${course.color} rounded-2xl p-6 shadow-2xl h-full border border-white/20`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: hoveredCard === index ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/20 p-3 rounded-lg"
                  >
                    <course.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-white/90">{course.code}</div>
                  </div>
                </div>

                <h3 className="text-white mb-2">{course.title}</h3>
                <p className="text-white/70 text-sm mb-6">{course.subtitle}</p>

                <div className="space-y-3">
                  {course.outcomes.map((outcome, oIndex) => (
                    <motion.div
                      key={oIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.15 + oIndex * 0.1 }}
                      className="flex gap-2 items-start"
                    >
                      <motion.div
                        animate={{
                          scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ delay: oIndex * 0.1 }}
                        className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-2"
                      />
                      <p className="text-white/90 text-sm">{outcome}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Animated corner decoration */}
                <motion.div
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0,
                    scale: hoveredCard === index ? 1 : 0,
                  }}
                  className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
