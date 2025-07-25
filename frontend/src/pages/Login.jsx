import { useNavigate } from 'react-router-dom';
export default function Login() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="/image/Home.jpg"
        alt="Home Background"
        className="absolute inset-0 w-full h-full object-cover brightness-20"
      />

      {/* Centered White Box */}
      <div className="absolute inset-0 mt-10 flex justify-center z-10">
        <div className="bg-white p-10 rounded-xl shadow-lg w-[600px]">
          {/* Your form content here */}
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">Login</h1>
          {/* Add form fields, buttons, etc. here */}
          <p className="py-5">Username or Email</p>
            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded mb-4"
                placeholder="Enter your username or email"
            />
            <p className="py-5">Password</p>
            <input 
            type="password"
            className="w-full p-3 border border-gray-300 rounded mb-4"
            placeholder="Enter your password"
            /> 
            <p className="text-blue-800 py-5"> Forget Password?</p>
            <button className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition" onClick={()=>{
                Navigate("/BookTable");
            }}>
                sign in 
            </button>
            <p className="text-center text-gray-600 mt-4 py-5">
              Don't have an account? <a href="/Register" className="text-blue-800 hover:underline">Register</a>
              </p>
        </div>
      </div>
    </div>
  );
}
