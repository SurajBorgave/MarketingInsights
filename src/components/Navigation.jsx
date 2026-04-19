import { NavLink } from 'react-router-dom';
import { Home, Lightbulb, Activity } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="sidebar">
      <div className="brand" style={{ fontSize: '1.2rem' }}>
        <Activity className="brand-icon" size={28} />
        Data Science Analytics
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home className="icon" size={20} />
          Executive Overview
        </NavLink>
        <NavLink to="/simulator" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Lightbulb className="icon" size={20} />
          Predictive Analytics Engine
        </NavLink>
      </div>
    </nav>
  );
}
