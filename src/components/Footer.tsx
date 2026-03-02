import { ExternalLink, GraduationCap } from 'lucide-react';

const links = [
  { label: 'EWU Design', url: '#' },
  { label: "Bloom's Taxonomy Reference", url: 'https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/' },
  { label: 'Assessment Resources', url: '#' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span className="brand-mark" aria-hidden="true">
              <GraduationCap className="inline-icon" />
            </span>
            <div>
              <strong>EWU Design Department</strong>
              <p className="small" style={{ margin: 0 }}>
                SLO Curriculum Guide
              </p>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
                {link.url.startsWith('http') ? <ExternalLink className="inline-icon" style={{ marginLeft: '4px' }} /> : null}
              </a>
            ))}
          </nav>
        </div>

        <p className="footer-note">
          This resource helps design faculty create measurable, PLO-aligned course outcomes for consistent assessment
          and accreditation evidence.
        </p>

        <p className="small" style={{ marginTop: '8px' }}>
          Prepared for EWU Design Department curriculum review.
        </p>
      </div>
    </footer>
  );
}
