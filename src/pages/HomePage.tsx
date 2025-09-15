import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative pt-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to Blink</h1>
        </div>
      </div>
    </>
  );
}

export default HomePage;