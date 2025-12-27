import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex gap-6">
      <Link to="/kanban">Kanban</Link>
      <Link to="/equipment">Equipment</Link>
      <Link to="/request/new">New Request</Link>
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}
