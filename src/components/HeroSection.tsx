import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { ArrowDown, Sparkles, BookOpen, Target, Lightbulb } from 'lucide-react';

// Design system colors from style guide
const colors = {
  success: '#10D800',
  info: '#168BFF',
  warning: '#F5A623',
  error: '#D0021B',
  content1: '#1C1C1C',
  content2: '#5B5757',
  content3: '#969696',
  icons: '#CCCCCC',
  border: '#E8E8E8',
  background: '#F7F7F7',
  white: '#FFFFFF',
};

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    { icon: Lightbulb, label: 'Why traditional CLOs fail', color: colors.error },
    { icon: Target, label: 'Connect course to program goals', color: colors.info },
    { icon: Sparkles, label: 'Create CLOs with AI assistance', color: colors.success },
  ];

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.white,
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}
    >
      {/* Subtle Background Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.success}08 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.info}08 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: '9999px',
              fontSize: '13px',
              color: colors.content2,
              marginBottom: '32px',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: colors.success,
                animation: 'pulse 2s infinite',
              }}
            />
            EWU Design Department Curriculum Guide
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 700,
            color: colors.content1,
            marginBottom: '24px',
            lineHeight: '105%',
            fontFamily: 'Fraunces, Georgia, serif',
          }}
        >
          <span style={{ display: 'block' }}>Writing Better</span>
          <span
            style={{
              display: 'block',
              background: `linear-gradient(135deg, ${colors.success}, ${colors.info})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Learning Outcomes
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '18px',
            color: colors.content2,
            maxWidth: '640px',
            margin: '0 auto 48px',
            lineHeight: '160%',
          }}
        >
          A comprehensive guide to creating measurable, PLO-aligned Course Learning Outcomes
          that drive student success and satisfy accreditation requirements.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto 64px',
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'left',
                cursor: 'default',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <feature.icon style={{ width: '24px', height: '24px', color: feature.color }} />
              </div>
              <p style={{ fontSize: '14px', color: colors.content2, fontWeight: 500, lineHeight: '140%' }}>{feature.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: colors.content3,
          }}
        >
          <span style={{ fontSize: '13px' }}>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown style={{ width: '20px', height: '20px' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
