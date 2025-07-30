import React, { useEffect, useState } from 'react';

function AdminReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token'); // your auth token storage
        const response = await fetch('http://localhost:5000/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading reservations...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-16 px-4 flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Reservation List</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-300 rounded-lg">
            <thead className="bg-blue-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">User ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Time</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Party Size</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Special Requests</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No reservations found
                  </td>
                </tr>
              )}
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.user_id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.reservation_date}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.reservation_time}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.party_size}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{reservation.special_requests || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminReservation;
