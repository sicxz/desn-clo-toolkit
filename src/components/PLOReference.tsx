import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const PLO_DATA = [
  {
    id: 1,
    title: "Visual Vocabulary",
    desc: "Fluency in design language",
    color: "bg-[#66C2A5]",
    textColor: "text-[#66C2A5]",
    description: "knowledge-based outcomes"
  },
  {
    id: 2,
    title: "Technical Skills",
    desc: "Proficiency in design tools",
    color: "bg-[#41B6C4]",
    textColor: "text-[#41B6C4]",
    description: "software-based outcomes"
  },
  {
    id: 3,
    title: "Design Methodologies",
    desc: "Apply design systems & methods",
    color: "bg-[#2C7FB8]",
    textColor: "text-[#2C7FB8]",
    description: "design-thinking based outcomes"
  },
  {
    id: 4,
    title: "Design Process",
    desc: "Engage in research, ideation, prototyping",
    color: "bg-[#253494]",
    textColor: "text-[#253494]",
    description: "process-based outcomes"
  },
  {
    id: 5,
    title: "Career Readiness",
    desc: "Communication, professionalism, problem-solving",
    color: "bg-[#081D58]",
    textColor: "text-[#081D58]",
    description: "professional outcomes"
  }
];

export function PLOReference() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Main Title */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Program Learning Outcomes Reference
          </h2>
        </div>

        <div className="p-6 relative grid grid-cols-1 lg:grid-cols-[60px_minmax(300px,1fr)_1.5fr] gap-x-6 gap-y-8">
            
            {/* Headers Row */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full bg-gray-700 text-white font-bold py-2 rounded text-center text-sm shadow-sm">
                PLO
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
               <div className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded text-center text-sm shadow-sm max-w-md">
                Description
              </div>
            </div>
            {/* Empty header for flow column - labels are in SVG */}
            <div className="hidden lg:block"></div>

            {/* SVG Flow Visualization (Spans Rows 2-6) */}
            {/* Placed here in source order but positioned via grid */}
            <div className="hidden lg:block relative w-full h-full pointer-events-none" style={{ gridColumn: '3', gridRow: '2 / 7' }}>
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 500 550" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#66C2A5" />
                            <stop offset="25%" stopColor="#41B6C4" />
                            <stop offset="50%" stopColor="#2C7FB8" />
                            <stop offset="75%" stopColor="#253494" />
                            <stop offset="100%" stopColor="#081D58" />
                        </linearGradient>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                        </marker>
                    </defs>

                    {/* The River Path */}
                    <motion.path
                        d={`
                           M 20 50 
                           H 180 
                           C 220 50, 220 150, 260 150
                           H 300
                           C 340 150, 340 250, 380 250
                           H 420
                           C 460 250, 460 350, 480 350
                           L 500 450
                        `} 
                        fill="none"
                        stroke="url(#riverGradient)"
                        strokeWidth="80"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Connectors from text to river */}
                    {/* Row 1 (Y ~ 50) */}
                    <line x1="-20" y1="50" x2="20" y2="50" stroke="#66C2A5" strokeWidth="2" strokeDasharray="4 4" />
                    
                    {/* Row 2 (Y ~ 150) */}
                    <line x1="-20" y1="150" x2="200" y2="150" stroke="#41B6C4" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Row 3 (Y ~ 250) */}
                    <line x1="-20" y1="250" x2="300" y2="250" stroke="#2C7FB8" strokeWidth="2" strokeDasharray="4 4" />
                    
                    {/* Row 4 (Y ~ 350) */}
                    <line x1="-20" y1="350" x2="380" y2="350" stroke="#253494" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Row 5 (Y ~ 450) */}
                    <line x1="-20" y1="450" x2="420" y2="450" stroke="#081D58" strokeWidth="2" strokeDasharray="4 4" />

                    {/* Labels (L, P, M) */}
                    <g className="font-bold text-gray-700" style={{ fontSize: '16px' }}>
                        <text x="180" y="30" textAnchor="middle">L (Learn)</text>
                        <line x1="180" y1="35" x2="180" y2="50" stroke="currentColor" strokeWidth="1" />

                        <text x="300" y="130" textAnchor="middle">P (Practice)</text>
                        <line x1="300" y1="135" x2="300" y2="150" stroke="currentColor" strokeWidth="1" />

                        <text x="450" y="230" textAnchor="middle">M (Mastery)</text>
                        <line x1="450" y1="235" x2="450" y2="250" stroke="currentColor" strokeWidth="1" />
                    </g>
                </svg>
            </div>

            {/* PLO Rows Content */}
            {PLO_DATA.map((plo, index) => (
              <div key={plo.id} className="contents group">
                
                {/* Number */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-white ${plo.color} shadow-md z-10 mx-auto my-auto`}
                >
                  {plo.id}
                </motion.div>

                {/* Description Card */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-4 rounded-xl text-white ${plo.color} shadow-md flex items-center min-h-[100px]`}
                >
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">{plo.title}</div>
                    <div className="text-white/90 font-medium leading-snug">{plo.desc}</div>
                    <div className="mt-2 text-xs text-white/70 bg-black/10 inline-block px-2 py-0.5 rounded uppercase tracking-wider">
                        {plo.description}
                    </div>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="ml-4 opacity-50">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* PLO 6 - Bottom Row spanning width */}
            <div className="col-span-1 lg:col-span-3 mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 }}
                        className="w-14 h-14 rounded-xl flex flex-shrink-0 items-center justify-center text-2xl font-bold text-white bg-[#66C2A5] shadow-md"
                    >
                        6
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, width: "0%" }}
                        animate={isInView ? { opacity: 1, width: "100%" } : {}}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="w-full bg-[#66C2A5]/90 p-4 rounded-xl text-white flex flex-col md:flex-row md:items-center shadow-md"
                    >
                        <span className="font-bold text-lg mr-2">Well-Being:</span>
                        <span className="text-white/90 font-medium">Principles for self, others, community</span>
                        <div className="hidden md:block flex-1 h-px bg-white/30 mx-4"></div>
                        <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded text-white/80">Holistic Outcome</span>
                    </motion.div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}
