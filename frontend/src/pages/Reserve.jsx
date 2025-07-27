import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { X, Store, Users, Calendar, History, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Reserve() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

// Inside your component

useEffect(() => {
  const token = localStorage.getItem('token');

  // If redirected from login and token exists
  if (location.state?.fromAuth && token) {
    const reservationData = location.state.reservationData || {};
    const { branch, party_size, reservation_date, reservation_time } = reservationData;

    // Pre-fill form state if needed
    if (branch) setSelectedBranch(branch);
    if (party_size) setSelectedPeople(party_size);
    if (reservation_date) setSelectedDate(new Date(reservation_date));
    if (reservation_time) setSelectedTime(reservation_time);

    // ✅ If reservation was already successful, show success screen
    if (location.state.reservationSuccess) {
      setReservationSuccess(true);
    } else {
      // 🔄 Otherwise, auto-submit reservation again
      handleReservationSubmit({
        branch,
        party_size,
        reservation_date,
        reservation_time,
      });
    }
  }

  // 🧼 Optional: Clear state on unmount to prevent re-triggering
  return () => {
    window.history.replaceState({}, document.title);
  };
}, [location]);


  const branches = ['Golden Corral Riverside', 'Golden Corral Town Square'];
  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
  ];

  const handleFindAvailability = () => {
    if (!selectedBranch || !selectedPeople || !selectedDate || !selectedTime) {
      setError('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    const reservationData = {
      branch: selectedBranch,
      party_size: selectedPeople,
      reservation_date: selectedDate.toISOString().split('T')[0],
      reservation_time: selectedTime,
    };

    if (!token) {
      setError('You must log in to complete your reservation');
      navigate('/Login', {
        state: {
          fromReserve: true,
          reservationData,
          redirectTo: '/Reserve',
        },
        replace: true,
      });
      return;
    }

    handleReservationSubmit(reservationData);
  };

  const handleReservationSubmit = async (reservationData) => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.post('http://localhost:5000/api/reservations', reservationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setReservationSuccess(true);
    } catch (err) {
      console.error('Reservation error:', err);

      if (err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/Login', {
          state: {
            fromReserve: true,
            reservationData,
            tokenExpired: true,
            redirectTo: '/Reserve',
          },
          replace: true,
        });
      } else {
        setError(
          err.response?.data?.message || err.message || 'Failed to make reservation'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (reservationSuccess) {
    return (
      <div className="relative h-screen w-full bg-gray-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/Home.jpg"
            alt="Restaurant"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Reservation Confirmed!</h2>
            <div className="mb-6 text-left space-y-2">
              <p>
                <span className="font-semibold">Branch:</span> {selectedBranch}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selectedDate?.toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {selectedTime}
              </p>
              <p>
                <span className="font-semibold">Guests:</span> {selectedPeople}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <img
        src="/image/Home.jpg"
        alt="Home Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 space-y-4">
        {/* Branch Selector */}
        <button
          onClick={() => setShowBranchModal(true)}
          className="w-full max-w-md px-8 py-5 text-xl bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-blue-50 transition flex items-center gap-3"
        >
          <Store className="w-6 h-6" />
          {selectedBranch || "Choose Golden Corral's Branch"}
        </button>

        {/* Guest Selector */}
        <button
          onClick={() => setShowGuestModal(true)}
          className="w-full max-w-md px-8 py-5 text-xl bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-blue-50 transition flex items-center gap-3"
        >
          <Users className="w-6 h-6" />
          {selectedPeople
            ? `${selectedPeople} Guest${selectedPeople > 1 ? "s" : ""}`
            : "Number of Guests"}
        </button>

        {/* Date Picker */}
        <div className="w-full max-w-md px-8 py-3 text-xl bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-blue-50 transition flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full focus:outline-none"
            placeholderText="Select a date"
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
        </div>

        {/* Time Selector */}
        <button
          onClick={() => setShowTimeModal(true)}
          className="w-full max-w-md px-8 py-3 text-xl bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-blue-50 transition flex items-center gap-3"
        >
          <History className="w-6 h-6" />
          {selectedTime || "Select Time"}
        </button>

        {/* Find Availability Button */}
        <button
          onClick={handleFindAvailability}
          className="w-full max-w-md px-8 py-3 text-xl bg-blue-800 text-white rounded-md hover:bg-blue-900 transition"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Find Availability"}
        </button>
      </div>

      {/* Branch Modal */}
      {showBranchModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowBranchModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-center mb-4">
              Choose Golden Corral's Branch
            </h2>
            <hr className="mb-4" />
            <ul className="space-y-3">
              {branches.map((branch, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded text-black"
                  onClick={() => {
                    setSelectedBranch(branch);
                    setShowBranchModal(false);
                  }}
                >
                  {branch}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Guest Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-center">Guests</h2>
              <button
                onClick={() => setShowGuestModal(false)}
                className="text-gray-500 hover:text-black text-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setSelectedPeople((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-black rounded-full text-lg hover:bg-gray-300"
                >
                  –
                </button>
                <span className="text-lg font-semibold">{selectedPeople}</span>
                <button
                  onClick={() => setSelectedPeople((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-black rounded-full text-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowGuestModal(false)}
              className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Time Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowTimeModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-center mb-4">Choose Time</h2>
            <hr className="mb-4" />
            <ul className="space-y-3">
              {timeSlots.map((time) => (
                <li
                  key={time}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded text-black"
                  onClick={() => {
                    setSelectedTime(time);
                    setShowTimeModal(false);
                  }}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {error}
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Processing your reservation...</p>
          </div>
        </div>
      )}
    </div>
  );
}
