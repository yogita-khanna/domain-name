import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [Pw, setPw] = useState('');

  const navigate = useNavigate();
  function sendToreg(){
    navigate('/login')
  }

  const handleChange = async () => {
    console.log(name, email, Pw);  // Ensure correct variable names
  
    try {
      const response = await axios.post(
        "https://domain-name-five.vercel.app/user/register",
        { username: name, email: email, password: Pw }  // Use correct field names
      );
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error("Error registering user:", error.response.data);
    }
  };
  

  return (

<div className="flex flex-col items-center justify-center h-screen">
<h1 className="text-4xl font-semibold mb-8 text-slate-500">Register</h1>
  <div className="w-80">
    <input
      type="text"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
      className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
    />
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
    />
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPw(e.target.value)}
      className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
    />
    <button
      onClick={handleChange}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
    >
      Register
    </button>

    <button
      onClick={sendToreg}
      className="bg-blue-500 m-3 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
    >
      Login
    </button>
  </div>
</div>
  )
}

export default Signup;