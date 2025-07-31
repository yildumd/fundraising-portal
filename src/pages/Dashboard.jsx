import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/user.json")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user.name} 👋</h2>
      <p className="mb-2">Referral Code: <span className="font-mono text-blue-600">{user.referralCode}</span></p>
      <p className="mb-4">Total Donations Raised: <span className="font-semibold text-green-700">${user.donations}</span></p>

      <div className="bg-white p-4 rounded shadow max-w-md">
        <h3 className="text-lg font-bold mb-2">🎁 Rewards</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Raise $100 – Get a Bronze Badge</li>
          <li>Raise $500 – Get a Silver Badge</li>
          <li>Raise $1000 – Get a Gold Badge</li>
        </ul>
      </div>
    </div>
  );
}