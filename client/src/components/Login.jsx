import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [Pw, setPw] = useState('');


  function sendToreg(){
    navigate('/register')
  }
  const handleChange = async () => {
      const response = await axios.post(
        "https://domain-name-five.vercel.app/user/login",
        {email:email, password:Pw}
      );
      console.log(response.data);

    if(response.data.success === true){
     localStorage.setItem('user', String(response.data.user.username));
      navigate('/data');
    }else{

      navigate('/register')
    }

      // if errror or not authorised
 
  };

  return (
<div className="flex flex-col items-center justify-center h-screen">
  <h1 className="text-4xl font-semibold mb-8 text-slate-500">Login</h1>
  <div className="w-80">
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
      className="bg-blue-500 m-3 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
    >
      Login
    </button>
    <button
      onClick={sendToreg}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
    >
      Signup
    </button>
  </div>
</div>
  )
}

export default Login;