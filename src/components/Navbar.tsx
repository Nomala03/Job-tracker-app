import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/login');
    };

    return (
      <nav className=" bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold px-4">
          Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/home" className="hover:text-gray-300">Home</Link>
          <Link to="/add-job" className="hover:text-gray-300">Add Job</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    );
};

export default Navbar