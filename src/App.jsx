import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import DataScienceSimulator from './pages/DataScienceSimulator';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulator" element={<DataScienceSimulator />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
