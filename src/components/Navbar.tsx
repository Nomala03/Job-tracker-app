import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
  

    const handleLogout = () => {
      navigate('/login');
    };

    return (
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold px-4">
          Job Tracker
        </Link> 
          <div className="flex items-center gap-4">
          <Link to="/home" className="hover:underline text-white text-xl">Home</Link>
          <Link to="/add-job" className="hover:underline text-white text-xl">Add Job</Link>
        
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    );
};

export default Navbar