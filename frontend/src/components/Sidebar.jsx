import React, { useState } from "react";
import httpClient from "../httpClient";
import "./Sidebar.css";
import Logo from "../imgs/robot.svg";
// import { UilSignOutAlt } from "@iconscout/react-unicons";
import {
  UilEstate,
  UilFeedback,
  UilCommentAltQuestion,
  UilServerConnection,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import update from '../imgs/update.png';
// import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = ({ handleSidebarData }) => {
  const [selected, setSelected] = useState(0);
  const [selectdPage, setselectdPage] = useState(0);
  // console.log("Selected Icon:",selected );
  if(selected){

  }

  const [expanded, setExpaned] = useState(true)

  const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      icon: UilFeedback,
      heading: "Feedbacks",
    },
    {
      icon: UilCommentAltQuestion,
      heading: "Unanswered Question",
    },
    {
      icon: UilServerConnection,
      heading: 'Change Password'
    },
    // {
    //   icon: UilChart,
    //   heading: 'Analytics'
    // },
  ];
    const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  function logoutHandle(){
    console.log("clicked");
     localStorage.clear("token");
     window.location.href = "http://localhost:3000/login";
  }
  
  console.log(window.innerWidth)

  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Cha<span>tb</span>ot
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                setSelected(index);
                handleSidebarData(index); // Pass the item to the parent component
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem"  style={{top:"592px"}} onClick={logoutHandle}>
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;


