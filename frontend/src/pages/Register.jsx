import { useNavigate } from 'react-router-dom';
export default function Register() {
    return (
        <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="/image/Home.jpg"
        alt="Home Background"
        className="absolute inset-0 w-full h-full object-cover brightness-20"
      />
      <div className="absolute inset-0 mt-10 flex justify-center z-10">
        <div className="bg-white p-10 rounded-xl shadow-lg w-[700px]">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">Register</h1>
            <div className="flex gap-4 py-5">
        {/* First Name */}
            <div className="flex flex-col w-1/2">
                <p className="mb-1 text-m">First Name</p>
                <input
                type="text"
                className="p-3 border border-gray-300 rounded"
                placeholder="Enter your first name"
                />
            </div>

            {/* Last Name */}
            <div className="flex flex-col w-1/2">
                <p className="mb-1 text-m">Last Name</p>
                <input
                type="text"
                className="p-3 border border-gray-300 rounded"
                placeholder="Enter your last name"
                />
            </div>
            </div>
            <p className="py-3">Email</p>
            <input type="email"
            className="w-full p-3 border border-gray-300 rounded mb-4 "
            placeholder="Enter your email"
            />
            <p className="py-3">Password</p>
            <input type="password"
            className="w-full p-3 border border-gray-300 rounded mb-4"
            placeholder="Enter your password"
            />
            <div className="py-8">
            <button className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition " onClick={()=>{
                Navigate("/BookTable");
            }}>
                Register
            </button>
            </div>
        </div>
        </div>
      </div>
    );
}