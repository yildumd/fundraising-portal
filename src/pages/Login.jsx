import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Intern Portal</h1>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login as Yildum
      </button>
    </div>
  );
}