import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center text-gray-700 px-4 py-8">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to Job-Jotter</h1>
        <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
          Keep track of all your job applications in one place. Monitor your progress — see which jobs are pending, accepted, or rejected.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link to="/register" className="w-full sm:w-auto bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
            Get Started
          </Link>
          <Link to="/login" className="w-full sm:w-auto bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
