import { motion } from 'motion/react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="text-yellow-400 mb-2">EWU DESIGN PROGRAM</div>
          <h1 className="text-5xl mb-4">SLO Revision</h1>
          <div className="text-blue-200">
            Student Learning Outcomes Revision: DESN 100, 200, and 216
          </div>
          <div className="text-blue-300 text-sm mt-2">Foundational Courses</div>
        </motion.div>
      </div>
    </motion.header>
  );
}
