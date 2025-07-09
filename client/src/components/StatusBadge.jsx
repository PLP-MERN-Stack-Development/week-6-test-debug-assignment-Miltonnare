export default function StatusBadge({ priority }) {
  const colors = {
    Low: 'green',
    Medium: 'orange',
    High: 'red',
  };

  return (
    <span style={{ color: colors[priority] || 'black' }}>
      {priority}
    </span>
  );
}
