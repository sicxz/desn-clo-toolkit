import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, ExternalLink, Heart } from 'lucide-react';

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

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const links = [
    { label: 'EWU Design', url: '#' },
    { label: 'Bloom\'s Taxonomy Reference', url: 'https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/' },
    { label: 'Assessment Resources', url: '#' },
  ];

  return (
    <footer ref={ref} style={{ background: colors.content1, color: colors.white }}>
      {/* Top Border Gradient */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${colors.success}, ${colors.info})` }} />

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '64px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center' }}
        >
          {/* Logo/Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.success,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap style={{ width: '24px', height: '24px', color: colors.white }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>EWU Design Department</div>
              <div style={{ fontSize: '14px', color: colors.content3 }}>SLO Curriculum Guide</div>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: colors.content3, maxWidth: '560px', margin: '0 auto 32px', lineHeight: '160%', fontSize: '15px' }}>
            This resource was developed to help design faculty create measurable,
            PLO-aligned Course Learning Outcomes that support student success and
            meet accreditation standards.
          </p>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: colors.icons,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = colors.white}
                onMouseOut={(e) => e.currentTarget.style.color = colors.icons}
              >
                {link.label}
                {link.url.startsWith('http') && <ExternalLink style={{ width: '14px', height: '14px' }} />}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: colors.content2, marginBottom: '32px', opacity: 0.3 }} />

          {/* Bottom Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '13px',
              color: colors.content3
            }}
          >
            <span>Prepared for EWU Design Department curriculum review</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Made with <Heart style={{ width: '14px', height: '14px', color: colors.error }} /> for design education
            </span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
