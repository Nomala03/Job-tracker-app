import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {loginUser} from '../api/api';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(username, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full space-y-4"
        >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">Login</h1>
          {error && (
            <p className="mb-4 text-red-500 text-center font-semibold">{error}</p>
          )}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          Log In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 underline">
            Register
          </Link>
        </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
