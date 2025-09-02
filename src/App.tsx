
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <Navbar />
      <h1 className="text-3xl font-bold">My Website</h1>
    </div>
  );
}

export default App;

