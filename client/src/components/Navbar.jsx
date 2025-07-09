import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear auth
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center shadow">
      <div className="flex-1 flex items-center gap-4">
        <Link to="/dashboard" className="text-xl font-bold hover:underline">
          Bug Tracker
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link to="/create-project" className="hover:underline text-lg">
          New Project
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
