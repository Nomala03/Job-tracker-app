import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center text-gray-700 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to Job-Jotter</h1>
        <p className="text-lg mb-6">
          Keep track of all your job applications in one place. Monitor your progress — see which jobs are pending, accepted, or rejected.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition">
            Get Started
          </Link>
          <Link to="/login" className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
