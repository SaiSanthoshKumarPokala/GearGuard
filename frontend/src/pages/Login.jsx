export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input className="border p-2 w-full mb-3" placeholder="Email" />
      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </div>
  );
}
