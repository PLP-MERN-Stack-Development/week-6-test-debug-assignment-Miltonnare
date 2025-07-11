import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import BugCard from '../components/BugCard';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/bugs/project/${id}`)
      .then(res => {
        setBugs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load bugs for this project.');
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Project Bugs</h2>
          <Link to={`/project/${id}/bug/create`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Report Bug
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-600">Loading bugs...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bugs.length === 0 ? (
          <p className="text-gray-600">No bugs reported for this project yet.</p>
        ) : (
          <ul className="space-y-3">
            {bugs.map((bug) => (
              <li key={bug._id} className="p-4 border rounded hover:shadow">
                <BugCard bug={bug} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 