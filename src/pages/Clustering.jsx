import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import InsightCard from '../components/InsightCard';

export default function Clustering() {
  const [activePersona, setActivePersona] = useState("Elite Buyers");
  const colors = {"Elite Buyers": "#00f3ff", "Budget Families": "#ff00aa", "Young Professionals": "#b900ff", "Value Shoppers": "#00ff66"};
  
  const strategies = {
    "Elite Buyers": "High net worth & High spending. Strategy: Exclusive membership, early access to premium wines, and white-glove service events.",
    "Budget Families": "Large households with conservative spending. Strategy: Bulk discounts, family bundle packs, and loyalty points for essentials.",
    "Young Professionals": "Moderate income but frequent buyers. Strategy: Convenience-focused marketing, subscription models, and tech-friendly web offers.",
    "Value Shoppers": "Low overall engagement. Strategy: Retargeting campaigns, deep clearance discounts, and 'Flash Sale' notifications to trigger dormant buyers."
  };

  const plotData = Object.keys(colors).map(clusterName => {
    const points = data.clusters.filter(c => c.Cluster === clusterName);
    return {
      x: points.map(p => p.Income),
      y: points.map(p => p.Spending),
      z: points.map(p => p.Age),
      type: 'scatter3d',
      mode: 'markers',
      name: clusterName,
      marker: { size: 4, color: colors[clusterName], opacity: 0.8 }
    };
  });

  const radarDataRaw = data.radar.find(r => r.persona === activePersona);
  const radarObj = [
    { subject: 'Wines', A: radarDataRaw?.Wines || 0 },
    { subject: 'Meats', A: radarDataRaw?.Meats || 0 },
    { subject: 'Sweets', A: radarDataRaw?.Sweets || 0 },
    { subject: 'Gold', A: radarDataRaw?.Gold || 0 },
    { subject: 'Fish', A: radarDataRaw?.Fish || 0 },
    { subject: 'Fruits', A: radarDataRaw?.Fruits || 0 },
  ];

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <h1>Precision Customer Segmentation</h1>
        <p>Assignment 9: K-Means Clustering for Hyper-Personalized Marketing</p>
      </div>

      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <InsightCard 
          subtitle="Strategic Clustering (Ass 9)"
          title="From Mass Marketing to Personalization"
          content="Traditional marketing treats all customers the same. Our Assignment 9 segmentation engine grouped 2,240 customers into 4 distinct clusters based on their Income, Age, and Spending behaviors. This allows us to target each group with specific products they are statistically more likely to buy, maximizing conversion and customer retention."
          color="var(--purple)"
        />
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ height: '550px', display: 'flex', flexDirection: 'column' }}>
          <h3>3D Segment Space</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>Exploring the 3-Dimensional boundaries of customer personas.</p>
          <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
            <Plot
              data={plotData}
              layout={{ 
                autosize: true, 
                scene: { 
                  xaxis: { title: 'Income', color: '#8a8a9e', gridcolor: '#333' }, 
                  yaxis: { title: 'Spend', color: '#8a8a9e', gridcolor: '#333' }, 
                  zaxis: { title: 'Age', color: '#8a8a9e', gridcolor: '#333' },
                  bgcolor: 'rgba(0,0,0,0)'
                },
                paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
                margin: { l: 0, r: 0, b: 0, t: 30 },
                legend: { font: { color: '#fff' }, orientation: 'h', y: -0.1 }
              }}
              useResizeHandler={true}
              style={{ width: '100%', height: '100%' }}
              config={{ displayModeBar: false }}
            />
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Persona Strategic Analysis</h3>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '20px 0' }}>
            {Object.keys(colors).map(persona => (
              <button 
                key={persona}
                onClick={() => setActivePersona(persona)}
                style={{
                  background: activePersona === persona ? `${colors[persona]}33` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activePersona === persona ? colors[persona] : 'rgba(255,255,255,0.1)'}`,
                  color: activePersona === persona ? '#fff' : 'var(--text-muted)',
                  padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s ease'
                }}
              >
                {persona}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarObj}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Radar name={activePersona} dataKey="A" stroke={colors[activePersona]} fill={colors[activePersona]} fillOpacity={0.5} />
                <Tooltip contentStyle={{ background: 'rgba(10, 10, 15, 0.9)', border: '1px solid #333' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activePersona}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', marginTop: '20px', borderLeft: `4px solid ${colors[activePersona]}` }}
            >
              <h4 style={{ color: colors[activePersona], marginBottom: '8px' }}>Marketing Strategy</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{strategies[activePersona]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
