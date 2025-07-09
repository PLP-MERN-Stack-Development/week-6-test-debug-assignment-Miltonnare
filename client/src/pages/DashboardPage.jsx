import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load projects.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          <Link
            to="/create-project"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Project
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading projects...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">No projects yet.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p._id} className="p-4 border rounded hover:shadow">
                <Link to={`/project/${p._id}`} className="text-lg text-blue-700 hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
