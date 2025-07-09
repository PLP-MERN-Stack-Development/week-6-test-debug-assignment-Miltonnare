import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function CreateBugPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send project ID in the request body to /bugs endpoint
    axios.post('/bugs', { ...form, projectId: id })
      .then(() => navigate(`/project/${id}`))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Create Bug</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <select name="priority" onChange={handleChange} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
