import { useEffect, useState } from "react";
import API from "../services/api";

export default function CalendarView() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        API.get("/requests").then(res =>
            setRequests(res.data.filter(r => r.type === "Preventive"))
        );
    }, []);

    return (
        <>
            <h1 className="text-xl font-bold mb-4">
                Preventive Maintenance Calendar
            </h1>

            <ul className="space-y-2">
                {requests.map(r => (
                    <li key={r._id} className="border p-2 rounded">
                        {r.subject} — {r.scheduledDate?.slice(0, 10)}
                    </li>
                ))}
            </ul>
        </>
    );
}
