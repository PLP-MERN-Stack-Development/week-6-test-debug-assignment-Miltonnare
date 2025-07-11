import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    setLoading(true);
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
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!form.title) {
      setFormError('Title is required');
      return;
    }
    axios.post('/projects', form)
      .then(() => {
        setShowForm(false);
        setForm({ title: '', description: '' });
        fetchProjects();
      })
      .catch(() => setFormError('Failed to create project'));
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Project
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleFormSubmit} className="mb-6 space-y-2">
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded"
            />
            {formError && <div className="text-red-600">{formError}</div>}
            <div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2">Create</button>
              <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}
        {/* Quick links to other pages */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <Link to="/bugs" className="btn-primary">View All Bugs</Link>
          <Link to="/bug/create" className="btn-primary">Report New Bug</Link>
          <Link to="/dashboard" className="btn-primary">Dashboard</Link>
          <Link to="/register" className="btn-primary">Register</Link>
          <Link to="/login" className="btn-primary">Login</Link>
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
              <li key={p._id} className="p-4 border rounded hover:shadow bg-slate-50">
                <Link to={`/project/${p._id}`} className="project-link">
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
