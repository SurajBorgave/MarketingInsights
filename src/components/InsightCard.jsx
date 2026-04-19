import { motion } from 'framer-motion';

export default function InsightCard({ title, subtitle, content, metric, metricLabel, color = "var(--cyan)" }) {
  return (
    <motion.div 
      className="glass-panel" 
      whileHover={{ y: -5, borderColor: color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div>
          <h4 style={{ color: color, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '4px' }}>{subtitle}</h4>
          <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
        </div>
        {metric && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: color }}>{metric}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{metricLabel}</div>
          </div>
        )}
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
        {content}
      </p>
    </motion.div>
  );
}
