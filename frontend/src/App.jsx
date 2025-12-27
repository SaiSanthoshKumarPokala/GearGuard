import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Kanban from "./pages/Kanban";
import Equipment from "./pages/Equipment";
import CreateRequest from "./pages/CreateRequest";
import CalendarView from "./pages/CalendarView";
import Login from "./pages/Login";

// Layout
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="p-6">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/kanban" />} />

          {/* Core Pages */}
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/request/new" element={<CreateRequest />} />
          <Route path="/calendar" element={<CalendarView />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* 404 */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
