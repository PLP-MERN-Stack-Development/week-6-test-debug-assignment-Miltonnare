import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function BugCard({ bug }) {
  return (
    <div className="bug-card">
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <StatusBadge priority={bug.priority} />
      <Link to={`/bug/${bug._id}/edit`}>Edit</Link>
    </div>
  );
}
