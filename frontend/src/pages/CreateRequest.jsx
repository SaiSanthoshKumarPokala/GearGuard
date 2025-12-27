import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateRequest() {
    const [equipment, setEquipment] = useState([]);
    const [form, setForm] = useState({
        subject: "",
        type: "Corrective",
        equipment: "",
        scheduledDate: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        API.get("/equipment").then(res => setEquipment(res.data));
    }, []);

    const submitHandler = async e => {
        e.preventDefault();

        await API.post("/requests", {
            subject: form.subject,
            type: form.type,
            equipment: form.equipment,
            scheduledDate: form.scheduledDate
        });

        navigate("/kanban");
    };

    return (
        <>
            <form onSubmit={submitHandler} className="max-w-md space-y-4">
                <h1 className="text-xl font-bold">Create Maintenance Request</h1>

                <input
                    className="border p-2 w-full"
                    placeholder="Subject"
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                />

                <select
                    className="border p-2 w-full"
                    onChange={e => setForm({ ...form, type: e.target.value })}
                >
                    <option>Corrective</option>
                    <option>Preventive</option>
                </select>

                <select
                    className="border p-2 w-full"
                    onChange={e => setForm({ ...form, equipment: e.target.value })}
                >
                    <option>Select Equipment</option>
                    {equipment.map(eq => (
                        <option key={eq._id} value={eq._id}>
                            {eq.name}
                        </option>
                    ))}
                </select>

                {form.type === "Preventive" && (
                    <input
                        type="date"
                        className="border p-2 w-full"
                        onChange={e =>
                            setForm({ ...form, scheduledDate: e.target.value })
                        }
                    />
                )}

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
        </>

    );
}
