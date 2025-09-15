import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md p-4 mx-4 mt-4 rounded-xl flex justify-between items-center shadow-lg">
      <div className="text-xl">
        <Link to="/">Blink</Link>
      </div>
      <div className="flex gap-6">
        <Link to="/homepage" className="hover:text-black transition">Home</Link>
        <Link to="/projects" className="hover:text-black transition">Projects</Link>
        <Link to="/resume" className="hover:text-black transition">Resume</Link>
      </div>
    </nav>
  );
}

export default Navbar;