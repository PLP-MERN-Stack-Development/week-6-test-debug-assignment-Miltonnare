import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function BugCard({ bug }) {
  return (
    <div className="bug-card">
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <StatusBadge priority={bug.priority} />
      <div className="flex gap-2 mt-2">
        <Link to={`/bug/${bug._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
        <Link to={`/bug/${bug._id}/status`} className="text-green-600 hover:underline">Update Status</Link>
      </div>
    </div>
  );
}
