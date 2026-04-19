import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import { Terminal, DatabaseZap, Code, Archive } from 'lucide-react';
import InsightCard from '../components/InsightCard';

export default function MongoDB() {
  const [queryState, setQueryState] = useState('idle');
  const [displayData, setDisplayData] = useState([]);
  const [typedCommand, setTypedCommand] = useState('');
  
  const fullCommand = "> db.customers.aggregate([\n  { $match: { 'financials.annual_income': { $gt: 50000 } } },\n  { $project: { 'profile.education': 1, 'financials.total_spend': 1 } },\n  { $limit: 3 }\n])";

  const handleQuery = () => {
    if (queryState !== 'idle') return;
    setQueryState('typing');
    setTypedCommand('');
    setDisplayData([]);
  };

  useEffect(() => {
    if (queryState === 'typing') {
      let i = 0;
      const interval = setInterval(() => {
        setTypedCommand(fullCommand.substring(0, i));
        i++;
        if (i > fullCommand.length) {
          clearInterval(interval);
          setQueryState('fetching');
        }
      }, 20);
      return () => clearInterval(interval);
    }
    
    if (queryState === 'fetching') {
      const timer = setTimeout(() => {
        setDisplayData(data.nosql.slice(0, 3));
        setQueryState('done');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [queryState]);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="page-header">
        <h1>Scalable Analytics Infrastructure</h1>
        <p>Assignment 10: Deploying Global Marketing Data onto Flexible NoSQL Document Stores</p>
      </div>

      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <InsightCard 
          subtitle="Data Architecture (Ass 10)"
          title="Why NoSQL for Modern Marketing?"
          content="Traditional relational databases struggle with high-velocity marketing data where new fields (like TikTok engagement or specific campaign emoji reactions) are added constantly. Assignment 10 demonstrated how MongoDB's document-based JSON structure allows for 'Schema-on-Read' flexibility, enabling our marketing teams to pivot and add new customer attributes without costly database migrations."
          color="#00ff66"
        />
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Archive color="#00ff66" size={28} />
            <h3>Agile Data Aggregator</h3>
          </div>
          
          <div className="terminal" style={{ marginBottom: '24px', flex: 1, minHeight: '200px' }}>
            {queryState === 'idle' ? (
              <span style={{ color: 'var(--text-muted)' }}>Ready for execution. Click 'Run' to simulate PyMongo processing...</span>
            ) : (
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {typedCommand}
                {queryState === 'typing' && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>}
              </span>
            )}
            
            {queryState === 'fetching' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '16px', color: 'var(--cyan)' }}>
                [Network] querying mongo_cluster_nodes...
              </motion.div>
            )}
            {queryState === 'done' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '16px', color: '#00ff66' }}>
                [Success] 3 results yielded from 2,240 document scan.
              </motion.div>
            )}
          </div>
          
          <motion.button 
            onClick={queryState === 'done' ? () => setQueryState('idle') : handleQuery}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 102, 0.3)' }}
            style={{
              background: 'linear-gradient(45deg, rgba(0, 255, 102, 0.2), rgba(0, 243, 255, 0.2))',
              border: '1px solid rgba(0, 255, 102, 0.4)', color: '#00ff66',
              padding: '16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', width: '100%'
            }}
          >
            {queryState === 'done' ? <Code size={20} /> : <Terminal size={20} />}
            {queryState === 'idle' ? "EXECUTE PIPELINE" : queryState === 'done' ? "FLUSH CONSOLE" : "PIPELINE RUNNING..."}
          </motion.button>
        </div>

        <div className="glass-panel" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '16px' }}>JSON Aggregation Result</h3>
          <AnimatePresence mode="wait">
            {displayData.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center' }}>
                Pipeline inactive.
              </motion.div>
            ) : (
              <motion.pre key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '16px', borderRadius: '8px', color: '#b900ff', fontSize: '0.8rem', border: '1px solid rgba(185, 0, 255, 0.2)' }}
              >
                {JSON.stringify(displayData, null, 2)}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
