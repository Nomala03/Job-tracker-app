import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../api/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await createUser({ username, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
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
          className="w-full p-3 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded mb-6"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 underline">
            Log In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
