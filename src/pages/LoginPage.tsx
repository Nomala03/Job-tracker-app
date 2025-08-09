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
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
