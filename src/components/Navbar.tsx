
// import { Link } from 'react-router-dom'; // Optional if using React Router

function Navbar() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">MyWebsite</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-400 transition">Home</a>
        <a href="#" className="hover:text-blue-400 transition">About</a>
        <a href="#" className="hover:text-blue-400 transition">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
