import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Regression from './pages/Regression';
import Clustering from './pages/Clustering';
import MongoDB from './pages/MongoDB';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regression" element={<Regression />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/mongodb" element={<MongoDB />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
