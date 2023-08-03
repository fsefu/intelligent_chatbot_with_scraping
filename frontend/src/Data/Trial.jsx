import React, { Component } from "react";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import axios from "axios";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { Table } from "@mui/material/Table";
import BasicTable from "../components/Table/table";
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards/Cards";
import Updates from "../components/Updates/Updates";
import Trial from "./Trial";
// import Sidebar from '../../src1/components/Sidebar';
 


class Trial extends Component {
  

  state = {
    SidebarData: [
      {
        icon: UilEstate,
        heading: "Dashboard",
      },
      {
        icon: UilClipboardAlt,
        heading: "Orders",
      },
      {
        icon: UilUsersAlt,
        heading: "Customers",
      },
      {
        icon: UilPackage,
        heading: "Products",
      },
      {
        icon: UilChart,
        heading: "Analytics",
      },
    ],
    cardsData: [
      {
        title: "Unanswered Question",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: this.state.unansBarValue,
        value: "25,970",
        png: UilUsdSquare,
        series: [
          {
            name: "Sales",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
      },

      {
        title: "Revenue",
        color: {
          backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
       
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
          {
            name: "Revenue",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },

      {
        title: "Expenses",
        color: {
          backGround:
            "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
          {
            name: "Expenses",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
    ],
   rows:[],
   UpdatesData : [
    {
      img: img1,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      img: img2,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      img: img3,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ],
  trial:3

  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/get_data")
      .then((response) => {
        const data = response.data;
        console.log("Unanswered Questions:", data);
        const unansweredCount = data.length;
        console.log("Number of Unanswered Questions:", unansweredCount);
        this.setState({ unansBarValue: unansweredCount });
        this.updateCardsData(unansweredCount);
        // const rows = data;

        // <BasicTable rows={rows} />;
        if (Array.isArray(data)) {
          data.forEach((item) => {
            this.unansData(item.id, item.unanswered_que, item.date, item.status);
            console.log("Question:", item.unanswered_que);
            console.log("Date:", item.date);
            console.log("------");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unansData(id, unanswered, date, status) {
    console.log("statuss:>> ", status);
  }

  updateCardsData(unansweredCount) {
    const { cardsData } = this.state;
    cardsData.forEach((card) => {
      if (card.title === "Unanswered Question") {
        card.barValue = unansweredCount;
      }
    });
    this.setState({ cardsData });
  }

  

  render() {
    const { SidebarData, cardsData , UpdatesData} = this.state;
    // const { cardsData } = this.props;

    return (
      <div>
        {/* <Trial data= {"hello"}/> */}
        <Cards cardsData={this.state.cardsData} />
        <Sidebar SidebarData = {this.state.SidebarData}/>
        {/* <Sidebar SidebarData = {this.state.trial} /> */}
        {/* <Sidebar SidebarData={SidebarData} /> */}
        {/* <Sidebar SidebarData={SidebarData} /> */}
    
        <Updates UpdatesData = {"this.state.UpdatesData"}/>
        {/* Sidebar */}
        {/* {SidebarData.map((item, index) => (
          <div key={index}>
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))} */}

        {/* Analytics Cards */}
        {/* {cardsData.map((card, index) => (
          <div key={index}>
            <span>{card.title}</span>
            <div style={card.color}></div>
            <span>{card.barValue}</span>
            <span>{card.value}</span>
            <card.png />
            {card.series.map((series, index) => (
              <div key={index}>
                <span>{series.name}</span>
                <span>{series.data}</span>
              </div>
            ))}
          </div>
        ))} */}

        {/* Recent Update Card */}
        {/* {UpdatesData.map((update, index) => (
          <div key={index}>
            <img src={update.img} alt="update" />
            <span>{update.name}</span>
            <span>{update.noti}</span>
            <span>{update.time}</span>
          </div>
        ))} */}
      </div>
    );
  }
}

export default Trial;
