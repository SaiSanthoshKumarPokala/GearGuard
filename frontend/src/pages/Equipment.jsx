import { useEffect, useState } from "react";
import API from "../services/api";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);

useEffect(() => {
  API.get("/equipment")
    .then(res => setEquipment(res.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Equipment</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(eq => (
            <tr key={eq._id}>
              <td className="border p-2">{eq.name}</td>
              <td className="border p-2">{eq.department}</td>
              <td className="border p-2">{eq.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
