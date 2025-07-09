import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBugForm } from '../hooks/useBugForm';

export default function UpdateBugPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, setForm, handleChange, submitBug, loading, error } = useBugForm();
  // Fetch bug data and set form
  React.useEffect(() => {
    fetchBug();
    // eslint-disable-next-line
  }, [id]);

  async function fetchBug() {
    try {
      const res = await import('../api/axios').then(m => m.default.get(`/bugs/${id}`));
      setForm({
        title: res.data.title || '',
        description: res.data.description || '',
        priority: res.data.priority || '',
      });
    } catch {
      // Optionally handle error
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBug('put', `/bugs/${id}`, () => navigate(-1));
  };

  return (
    <div className="container">
      <h2>Update Bug</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <select name="priority" value={form.priority} onChange={handleChange} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {error && <div style={{color:'red'}}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
      </form>
    </div>
  );
}
