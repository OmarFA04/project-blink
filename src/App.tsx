
import "./App.css";
import Navbar from "./components/Navbar";
import BlinkOverlay from "./components/BlinkOverlay";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative">
      <Navbar />
      <BlinkOverlay />
    </div>
  );
}

export default App;
