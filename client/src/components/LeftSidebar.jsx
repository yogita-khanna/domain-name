import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const LeftSidebar = () => {
  let navigate = useNavigate();
  const handleLogout = async () => {
      navigate('/')
  };

  return (
    <div className='w-[100%] h-[650px] bg-blue-800 p-4'>
      <h1 className="p-3 font-bold text-white text-xl">Hosting Services</h1>
      <div className="p-2 font-semibold text-white text-lg">
        {/* <h5 className="p-2 hover:bg-gray-600 rounded">Credentials</h5> */}
        <h5 className="p-2 hover:bg-gray-600 rounded">
          <Link to='/data'>
            Domains
          </Link>
        </h5>
        <h5 className="p-2 hover:bg-gray-600 rounded">
          <Link to='/csv'>
            Tools
          </Link>
        </h5>
        <h5 className="p-2 hover:bg-gray-600 rounded">
          <Link to='/register'>Register</Link>
        </h5>
        <h5 className="p-2 hover:bg-gray-600 rounded">
          <Link to='/login'>Login</Link>
        </h5>
      </div>
    </div>
  );
};

export default LeftSidebar;
