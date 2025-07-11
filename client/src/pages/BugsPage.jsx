import { useEffect, useState } from 'react';
import axios from '../api/axios';
import BugCard from '../components/BugCard';
import { Link } from 'react-router-dom';

export default function BugsPage() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/bugs')
      .then(res => {
        setBugs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load bugs.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">All Reported Bugs</h2>
          <Link to="/bug/create" className="btn-primary">
            + Report Bug
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-600">Loading bugs...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bugs.length === 0 ? (
          <p className="text-gray-600">No bugs reported yet.</p>
        ) : (
          <ul className="space-y-3">
            {bugs.map((bug) => (
              <li key={bug._id}>
                <BugCard bug={bug} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
