import { useEffect, useState } from "react";
import API from "../services/api";

export default function Kanban() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then(res => setRequests(res.data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {["New", "In Progress", "Repaired", "Scrap"].map(status => (
        <div key={status} className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">{status}</h2>
          {requests
            .filter(r => r.status === status)
            .map(r => (
              <div key={r._id} className="bg-white p-2 mt-2 rounded shadow">
                {r.subject}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
