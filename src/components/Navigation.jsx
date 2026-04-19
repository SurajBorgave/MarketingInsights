import { NavLink } from 'react-router-dom';
import { Home, LineChart, PieChart, Database } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sidebar">
      <div className="brand">
        <Database className="brand-icon" size={28} />
        Mktg.Nexus
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home className="icon" size={20} />
          Overview
        </NavLink>
        <NavLink to="/regression" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LineChart className="icon" size={20} />
          Regression (Ass 8)
        </NavLink>
        <NavLink to="/clustering" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <PieChart className="icon" size={20} />
          Clustering (Ass 9)
        </NavLink>
        <NavLink to="/mongodb" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Database className="icon" size={20} />
          NoSQL Data (Ass 10)
        </NavLink>
      </div>
    </nav>
  );
}
