export default function RequestCard({ request }) {
  return (
    <div className="bg-white p-3 rounded shadow mt-2">
      <h3 className="font-semibold">{request.subject}</h3>
      <p className="text-sm text-gray-600">
        {request.equipment?.name}
      </p>
    </div>
  );
}
