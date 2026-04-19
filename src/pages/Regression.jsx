import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import data from '../data.json';
import InsightCard from '../components/InsightCard';

export default function Regression() {
  const [income, setIncome] = useState(60000);
  const [age, setAge] = useState(40);
  const [kids, setKids] = useState(1);

  // Multivariate mock regression logic
  const projectedSpend = Math.max(0, parseInt((0.015 * income) - (5.5 * age) - (200 * kids) + 300));

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1>Strategic Expenditure Forecasting</h1>
        <p>Assignment 8: Predicting Customer Lifetime Value through Supervised Learning</p>
      </div>

      <div style={{ marginTop: '24px', marginBottom: '32px' }}>
        <InsightCard 
          subtitle="Model Reliability (Ass 8)"
          title="Polynomial Predictive Accuracy"
          metric="81.56%"
          metricLabel="R² Score"
          content="Linear models are useful, but our Assignment 8 research proved that Polynomial Regression (Degree 2) captures the complex, non-linear relationships of marketing data significantly better. With over 81% of variance explained, we can reliably forecast a customer's total spending based on just three variables."
          color="var(--cyan)"
        />
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3>Revenue Simulation Engine</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Adjust the customer profile below to see how different life stages and financial levels impact predicted expenditure.
          </p>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--cyan)' }}>Yearly Income</span>
              <span>${income.toLocaleString()}</span>
            </div>
            <input type="range" min="20000" max="150000" step="1000" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--purple)' }}>Customer Age</span>
              <span>{age} years</span>
            </div>
            <input type="range" min="18" max="80" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ accentColor: 'var(--purple)' }}/>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#00ff66' }}>Dependents (Kids + Teens)</span>
              <span>{kids}</span>
            </div>
            <input type="range" min="0" max="4" step="1" value={kids} onChange={(e) => setKids(Number(e.target.value))} />
          </div>

          <motion.div 
            style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', marginTop: 'auto' }}
            animate={{ scale: [1, 1.02, 1] }}
            key={projectedSpend}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Forecasted Spend</div>
            <div style={{ fontSize: '3rem', fontWeight: '800', marginTop: '8px', color: '#fff', textShadow: '0 0 20px rgba(0,243,255,0.5)' }}>${projectedSpend.toLocaleString()}</div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ height: '350px' }}>
            <h3 style={{ marginBottom: '24px' }}>Income vs Spending Distribution</h3>
            <ResponsiveContainer width="100%" height="85%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Income" name="Income" stroke="var(--text-muted)" tickFormatter={(val) => `$${val/1000}k`} />
                <YAxis dataKey="Spending" name="Spend" stroke="var(--text-muted)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0a0a0f', border: '1px solid #333' }} />
                <Scatter name="Customers" data={data.regression} fill="var(--cyan)" shape="circle" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <InsightCard 
            subtitle="Business Insight"
            title="The 'Dependents' Factor"
            content="Our model highlights a critical takeaway: For every additional dependent (kid/teen), there is a significant drop in predicted luxury spend (Wines/Gold), as household budgets shift toward essentials. This allows marketers to swap luxury offers for 'essential bundle' offers for large families."
            color="#00ff66"
          />
        </div>
      </div>
    </motion.div>
  );
}
