import Navbar from "../components/Navbar";

function ResumePage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative pt-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 relative">Resume</h1>
        <p className="text-lg text-center text-gray-600 relative">
          My professional experience and skills...
        </p>
      </div>
    </div>
    </>
  );
}

export default ResumePage;