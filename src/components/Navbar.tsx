function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md p-4 mx-4 mt-4 rounded-xl flex justify-between items-center shadow-lg">
      <div className="text-xl">Blink</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-black transition">Home</a>
        <a href="#" className="hover:text-black transition">About</a>
        <a href="#" className="hover:text-black transition">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;