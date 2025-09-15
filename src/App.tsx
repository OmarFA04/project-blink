import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import BlinkOverlay from "./components/BlinkOverlay";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";
import HomePage from "./pages/HomePage";
import "./App.css";

function AppContent() {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* BlinkOverlay centered properly */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="pointer-events-auto">
          <BlinkOverlay />
        </div>
      </div>

      {/* Main content with fade effect */}
      <main className={`flex-1 pt-20 transition-opacity duration-200 ${overlayVisible ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;