import './App2.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function AdminComp() {
  const [user, setUser] = useState(null);
  const [sidebarData, setSidebarData] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if(token){
          fetch('http://127.0.0.1:8000/dashboard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token
            })
          })
            .then(response => 
              {
                if (response.ok) {
                  setUser(true);
                  return response.json();
                } else if (response.status === 400) {
                  navigate('/login');
                } else {
                  throw new Error("Something went wrong.");
                }
              }
            
            )

            .catch((error) => {
              navigate('/login');
              console.error('Error:', error);
            });
        }
        else{
          navigate('/login'); // Navigate to login if no token is found
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if(user === false || user === null || user.status === 401){
    navigate('/login');
    return null;
  }
  const handleSidebarData = (data) => {
    setSidebarData(data);
    console.log("Received data from Sidebar:", data);
  };

  return (
    <div>
      <div className="App">
        <div className="AppGlass">
        <Sidebar handleSidebarData={handleSidebarData} />
          <MainDash sidebarData={sidebarData} />
          < RightSide/>
          </div>
      </div>
    </div>
  );
}

export default AdminComp;
