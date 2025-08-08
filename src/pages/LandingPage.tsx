import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to JobTrackr</h1>
        <p className="text-lg mb-6">
          Keep track of all your job applications in one place. Monitor your progress — see which jobs are pending, accepted, or rejected.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200">
            Get Started
          </Link>
          <Link to="/login" className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
