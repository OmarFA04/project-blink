import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlinkOverlay from './components/BlinkOverlay';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        
        {/* Center the BlinkOverlay absolutely */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="pointer-events-auto">
            <BlinkOverlay />
          </div>
        </div>

        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-6">
                {/* Eye is now positioned globally */}
              </div>
            } />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;