import React, { useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
// import Feedback from '../feedback';
const MainDash = (props) => {
  const { sidebarData } = props;
  // const {pageTitle, setpageTitle} = useState("Some Page");
  console.log("Sidedbar Data:", sidebarData);
  const [mainDashClass, setmainDashClass] = useState("MainDish-container");   

   const pageTitle = ["Dashboard", "Feedback", "Unanswered Question", "Change Password"];
  return (
    <div className="MainDash">
      <h1>{pageTitle[sidebarData]}</h1>
      <div className={sidebarData == 0 ? "MainDish-container-active": "MainDish-container"}>
      <Cards  />
      {/* <Table sidebarData= {sidebarData} /> */}
    </div>

    <div className={sidebarData == 1 ? ("feeback-container-active"): "feedback-container"}>
      <Table sidebarData= {sidebarData} />
{/* 
    </div>
    <div className={sidebarData == 2 ? "unanswered-container-active": "unanswered-container"}>
    <Table sidebarData= {sidebarData} /> */}
    </div>
    <div className={sidebarData == 3 ? "errors-container-active": "errors-container"}>
    </div>

    </div>
  );
};

export default MainDash;
