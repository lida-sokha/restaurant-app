import { useState } from "react";
import { X, Store, Users, Calendar, History } from "lucide-react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

export default function Reserve() {
    const navigate = useNavigate();
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");


  const branches = [
    "Golden Corral Riverside",
    "Golden Corral Town Square",
  ];
  const time ={
    "10:00 AM": "10:00 AM",
    "11:00 AM": "11:00 AM",
    "12:00 PM": "12:00 PM",
    "1:00 PM": "1:00 PM",
    "2:00 PM": "2:00 PM",
    "3:00 PM": "3:00 PM",
    "4:00 PM": "4:00 PM",
    "5:00 PM": "5:00 PM",
    "6:00 PM": "6:00 PM",
    "7:00 PM": "7:00 PM",
  }

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="/image/Home.jpg"
        alt="Home Background"
        className="absolute inset-0 w-full h-full object-cover brightness-20"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-10 space-y-3">

        {/* Branch Selector */}
        <button
          onClick={() => setShowBranchModal(true)}
          className="w-full max-w-md px-8 py-5 text-xl bg-white text-black border border-gray-300 rounded-md hover:bg-blue-100 flex  gap-3"
        >
          <Store className="w-6 h-6" />
          {selectedBranch || "Choose Golden Corral's Branch"}
        </button>

        {/* Guest Selector */}
        <button
          onClick={() => setShowGuestModal(true)}
          className="w-full max-w-md px-8 py-5 text-xl bg-white text-black border border-gray-300 rounded-md hover:bg-blue-100 flex gap-3"
        >
          <Users className="w-6 h-6" />
          {selectedPeople ? ` Number of People ${selectedPeople}` : "Number of People"}
        </button>

        <div className="w-full max-w-md px-8 py-3 text-xxl bg-white text-black border border-gray-300 rounded-md hover:bg-blue-100 flex items-center  gap-3">
            <Calendar className="w-6 h-6" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="px-15 py-2 text-xxl bg-white text-black border border-gray-300 rounded-md hover:bg-blue-100 flex items-center justify-center gap-3"
          placeholderText="Select a date"
        />
        </div>
        <button
            onClick={() => setShowTimeModal(true)}
            className="w-full max-w-md px-8 py-3 text-xl bg-white text-black border border-gray-300 rounded-md hover:bg-blue-100 flex items-center gap-3"
            >
        < History className="w-6 h-6" />
            {selectedTime ? `Selected Time: ${selectedTime}` : "Select a Time"}
            </button>
        <button 
  onClick={() => {
    if (selectedBranch && selectedPeople && selectedDate && selectedTime) {
      // Navigate to register page with optional state or query
      navigate("/Login"); // 🔁 You can change this to your register route
    } else {
      alert("Please fill in all fields.");
    }
  }}
  className="w-full max-w-md px-8 py-3 text-xl bg-blue-800 text-white rounded-md hover:bg-blue-800 transition"
>
  Find availability
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
            <h2 className="text-lg font-semibold text-center mb-4">Choose Golden Corral's Branch</h2>
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
                  onClick={() =>
                    setSelectedPeople((prev) => Math.max(1, prev - 1))
                  }
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
        {Object.values(time).map((t, index) => (
          <li
            key={index}
            className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded text-black"
            onClick={() => {
              setSelectedTime(t);
              setShowTimeModal(false);
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

    </div>
  );
}
