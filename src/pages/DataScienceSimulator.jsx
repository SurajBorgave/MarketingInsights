import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data.json';
import InsightCard from '../components/InsightCard';

export default function DataScienceSimulator() {
  const [income, setIncome] = useState(65000);
  const [age, setAge] = useState(35);
  const [kids, setKids] = useState(1);

  // 1. REGRESSION LOGIC (Ass 8)
  const projectedSpend = Math.max(0, parseInt((0.015 * income) - (5.5 * age) - (200 * kids) + 300));

  // 2. K-MEANS CLASSIFICATION LOGIC (Ass 9)
  let predictedPersona = "Value Shoppers";
  if (income > 65000 && projectedSpend > 1000) {
    predictedPersona = "Elite Buyers";
  } else if (income <= 65000 && kids > 0) {
    predictedPersona = "Budget Families";
  } else if (income > 45000 && projectedSpend > 500 && age < 45) {
    predictedPersona = "Young Professionals";
  }

  // Configurations
  const colors = {"Elite Buyers": "#00f3ff", "Budget Families": "#ff00aa", "Young Professionals": "#b900ff", "Value Shoppers": "#00ff66"};
  const strategies = {
    "Elite Buyers": "High net worth & High spending. Focus on exclusive premium wines and white-glove service events.",
    "Budget Families": "Conservative spanning across a large household. Focus on bulk discount bundle packs for essentials.",
    "Young Professionals": "Moderate income but highly frequent buyers. Recommend subscription models and convenience packages.",
    "Value Shoppers": "Low overall engagement probability. Trigger re-engagement flows through deep clearance discounts."
  };

  // 3. RADAR MAPPING
  const radarDataRaw = data.radar.find(r => r.persona === predictedPersona);
  const radarObj = [
    { subject: 'Wines', A: radarDataRaw?.Wines || 0 },
    { subject: 'Meats', A: radarDataRaw?.Meats || 0 },
    { subject: 'Sweets', A: radarDataRaw?.Sweets || 0 },
    { subject: 'Gold', A: radarDataRaw?.Gold || 0 },
    { subject: 'Fish', A: radarDataRaw?.Fish || 0 },
    { subject: 'Fruits', A: radarDataRaw?.Fruits || 0 },
  ];

  // 4. 3D SPATIAL DATA
  const plotData = Object.keys(colors).map(clusterName => {
    const points = data.clusters.filter(c => c.Cluster === clusterName);
    return {
      x: points.map(p => p.Income),
      y: points.map(p => p.Spending),
      z: points.map(p => p.Age),
      type: 'scatter3d',
      mode: 'markers',
      name: clusterName,
      marker: { size: 3, color: colors[clusterName], opacity: clusterName === predictedPersona ? 0.9 : 0.2 }
    };
  });
  
  // Add User Simulation Point to Plotly mapping
  plotData.push({
    x: [income], y: [projectedSpend], z: [age],
    type: 'scatter3d', mode: 'markers', name: 'YOUR SIMULATION',
    marker: { size: 12, color: '#ffffff', symbol: 'diamond', line: { width: 2, color: colors[predictedPersona] } }
  });

  return (
    <motion.div className="page-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="page-header">
        <h1>Predictive Analytics Pipeline</h1>
        <p>Combining Machine Learning Regression and Heuristic Clustering</p>
      </div>

      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <InsightCard 
          subtitle="Unified Engine Logic"
          title="Concurrent Processing Simulation"
          content="This feature dynamically links Assignment 8 and 9. Adjusting the demographic sliders instantly passes the parameters through a supervised regression model to predict absolute spending. That output is immediately funneled into an unsupervised classification pipeline to categorize the virtual profile into a marketing persona, revealing their specific predicted purchases in the Radar Chart."
          color="var(--cyan)"
        />
      </div>

      <div className="grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* SLIDERS PANEL */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>1. Machine Learning Input Parameters</h3>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--cyan)' }}>Yearly Income</span><span>${income.toLocaleString()}</span>
              </div>
              <input type="range" min="20000" max="150000" step="1000" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--purple)' }}>Customer Age</span><span>{age} years</span>
              </div>
              <input type="range" min="18" max="80" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ accentColor: 'var(--purple)' }}/>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#00ff66' }}>Dependents (Kids + Teens)</span><span>{kids}</span>
              </div>
              <input type="range" min="0" max="4" step="1" value={kids} onChange={(e) => setKids(Number(e.target.value))} />
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="glass-panel" style={{ borderLeft: `6px solid ${colors[predictedPersona]}`, flex: 1 }}>
            <h3 style={{ marginBottom: '24px' }}>2. Predicted Outputs</h3>
            
            <motion.div key={projectedSpend} animate={{ scale: [1, 1.02, 1] }} style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Regression Prediction (Ass 8)</div>
              <div style={{ fontSize: '3rem', fontWeight: '800', margin: '4px 0', textShadow: `0 0 20px ${colors[predictedPersona]}44` }}>
                ${projectedSpend.toLocaleString()}
              </div>
            </motion.div>

            <motion.div key={predictedPersona} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cluster Classification (Ass 9)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: colors[predictedPersona], margin: '4px 0' }}>
                {predictedPersona}
              </div>
              <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px' }}>
                <strong>Recommended Action:</strong> {strategies[predictedPersona]}
              </p>
            </motion.div>
          </div>
        </div>

        {/* VISUALS PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '8px' }}>3. Radar Profile Calculation</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>Showing predicted purchasing biases based on {predictedPersona} historical data.</p>
            
            <div style={{ flex: 1, minHeight: '200px' }}>
              <AnimatePresence mode="popLayout">
                <motion.div key={predictedPersona} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarObj}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                      <Radar name={predictedPersona} dataKey="A" stroke={colors[predictedPersona]} fill={colors[predictedPersona]} fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '16px' }}>4. 3D Spatial Validation </h3>
            <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
              <Plot
                data={plotData}
                layout={{ 
                  autosize: true, 
                  scene: { xaxis: { title: 'Inc.' }, yaxis: { title: 'Spnd' }, zaxis: { title: 'Age' }, bgcolor: 'rgba(0,0,0,0)'},
                  paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
                  margin: { l: 0, r: 0, b: 0, t: 20 },
                  legend: { font: { color: '#fff' } }
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
