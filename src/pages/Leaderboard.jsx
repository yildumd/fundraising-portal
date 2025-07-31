const leaderboard = [
  { name: "Yildum David Jonah", code: "yildum2025", donations: 750 },
  { name: "Jane Doe", code: "jane2025", donations: 520 },
  { name: "John Smith", code: "john2025", donations: 420 },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">🏅 Leaderboard</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Rank</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Referral Code</th>
            <th className="py-2 px-4 border">Donations</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.code} className="text-center">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.code}</td>
              <td className="py-2 px-4 border">${user.donations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}