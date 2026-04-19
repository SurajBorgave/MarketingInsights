import { Target, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import InsightCard from '../components/InsightCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
  return (
    <motion.div 
      className="page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="page-header" variants={itemVariants}>
        <h1>Marketing Intelligence Hub</h1>
        <p>Strategic analysis of 2,240 customers to optimize Marketing ROI and Revenue Forecasting.</p>
      </motion.div>

      <motion.div style={{ marginBottom: '40px' }} variants={itemVariants}>
        <InsightCard 
          subtitle="Executive Summary"
          title="The Core Objective"
          content="How do we transform raw customer data into profit? This project analyzes demographics, spending habits, and campaign historical responses to build models that predict future behavior. Our objective is to reduce marketing waste by precisely targeting high-potential leads while maintaining a scalable, modern database architecture."
          color="var(--purple)"
        />
      </motion.div>

      <motion.div className="grid-3" variants={itemVariants}>
        <div className="glass-panel" style={{ borderBottom: '4px solid var(--cyan)' }}>
          <TrendingUp size={32} color="var(--cyan)" style={{ marginBottom: '16px' }} />
          <h3>Revenue Prediction</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Moving beyond reactive reporting to proactive forecasting using supervised regression modeling.</p>
        </div>
        
        <div className="glass-panel" style={{ borderBottom: '4px solid var(--purple)' }}>
          <Target size={32} color="var(--purple)" style={{ marginBottom: '16px' }} />
          <h3>Market Personas</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Mapping hidden traits to identify distinct spending groups for hyper-personalized campaigns.</p>
        </div>
        
        <div className="glass-panel" style={{ borderBottom: '4px solid #00ff66' }}>
          <BarChart3 size={32} color="#00ff66" style={{ marginBottom: '16px' }} />
          <h3>Agile Infrastructure</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Leveraging modern NoSQL storage to handle complex, evolving customer datasets with zero downtime.</p>
        </div>
      </motion.div>
      
      <motion.div className="glass-panel" style={{ marginTop: '24px' }} variants={itemVariants}>
        <h2>Strategic Impact Statement</h2>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span className="badge cyan">MODEL ACCURACY: 81.5%</span>
          <span className="badge purple">CUSTOMER SEGMENTS: 4 KEY PERSONAS</span>
          <span className="badge cyan">ARCHITECTURE: MONGODB AGGREGATION</span>
        </div>
        <p style={{ marginTop: '20px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
          Data Science is not about charts—it's about decisions. By the end of our analysis (Assignments 8-10), we've proven that customer income and family structure can predict spending with 81% reliability, and that clustering customers into distinct personas allows for a fundamental shift from generic 'one-size-fits-all' marketing to high-precision strategic targeting.
        </p>
      </motion.div>
    </motion.div>
  );
}
