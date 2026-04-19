import { Target, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import InsightCard from '../components/InsightCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
  return (
    <motion.div className="page-container" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="page-header" variants={itemVariants}>
        <h1>Predictive Analytics Engine</h1>
        <p>A Data Science Application focusing on Machine Learning and Behavioral Classification.</p>
      </motion.div>

      <motion.div style={{ marginBottom: '40px' }} variants={itemVariants}>
        <InsightCard 
          subtitle="Data Science Subject Objective"
          title="Develop a Predictive Analytics Application"
          content="This project serves as a comprehensive Data Science integration application. Leveraging a robust dataset of 2,240 records, we utilize advanced Machine Learning techniques—specifically linking non-linear Polynomial Regression (for continuous expenditure forecasting) perfectly with Unsupervised K-Means clustering (for rigid categorical classification)—into one concurrent Predictive Analytics Engine."
          color="var(--cyan)"
        />
      </motion.div>

      <motion.div className="grid-3" variants={itemVariants}>
        <div className="glass-panel" style={{ borderBottom: '4px solid var(--cyan)' }}>
          <TrendingUp size={32} color="var(--cyan)" style={{ marginBottom: '16px' }} />
          <h3>Regression Intelligence</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Multivariate predictive modeling yielding ~81% accuracy on total financial expenditure.</p>
        </div>
        
        <div className="glass-panel" style={{ borderBottom: '4px solid var(--purple)' }}>
          <Target size={32} color="var(--purple)" style={{ marginBottom: '16px' }} />
          <h3>K-Means Algorithms</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Spatial partitioning identifying unique purchasing clusters disguised within raw multidimensional data.</p>
        </div>
        
        <div className="glass-panel" style={{ borderBottom: '4px solid #00ff66' }}>
          <Cpu size={32} color="#00ff66" style={{ marginBottom: '16px' }} />
          <h3>Concurrent Prediction</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>Both models execute in tandem, evaluating dynamic parameters to output comprehensive behavioral profiles.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
