// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import  update from "../imgs/update.png";
import axios from "axios";
// import { formatDistance } from 'date-fns';

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";


// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import broken from "../imgs/broken_link.png";
import server from "../imgs/server_error.png";
import update_img from "../imgs/update.png";
// import { Table } from '@mui/material/Table';
// import { Table } from '@mui/material/Table';
import { Table } from '@mui/material/Table';
import BasicTable from "../components/Table/Table";
import Feedback from '../components/feedback';

// Sidebar Data

let unansBarValue = 0;
let feedbackBarValue = 0;
let updatesBarValue = 0;
let agoTime = 0;
let feedback_agoTime = 0;
let updates_agoTime = 0;
let updates_data = [];
let no_up = []

export function unansData(id, unanswered, date, status){
  console.log("statuss:>> ",status);
}

export let UpdatesData = [];

axios.get("http://127.0.0.1:8000/get_data")
  .then(response => {
    const data = response.data.unanswered;
    const feedback_data = response.data.feedbacks;
     updates_data = response.data.updates;
    // console.log("updates Data>>> ",updates_data);
    const dates = data.map(item => new Date(item.date));
    const feedback_date = feedback_data.map(item => new Date(item.date));
    const updates_date = updates_data.map(item => new Date(item.dates));

     const unsanswered_time = dates[0];
     const Feedback_time = feedback_date[0];
     const update_time = updates_date[updates_data.length - 1];

    unansBarValue = data.length;
    feedbackBarValue = feedback_data.length;
    updatesBarValue = updates_data.length;

    agoTime = unsanswered_time.getTime();
    feedback_agoTime = Feedback_time.getTime();
    updates_agoTime = update_time.getTime();
    updateCardsData(unansBarValue,feedbackBarValue, agoTime,feedback_agoTime , updatesBarValue, updates_agoTime);
    no_up = [1, 2,3]
    UpdatesData = updates_data;
    // <BasicTable rows = {rows}/>
    if (Array.isArray(data)) {
      data.forEach(item => {
        unansData(item.id,item.unanswered_que,item.date, item.status)
        console.log('Question:', item.unanswered_que);
        console.log('Date:', item.date);
        console.log('------');
      });
    }
  })
  .catch(error => {
    console.log(error);
  });




const updateCardsData = (unansBarValue,feedbackBarValue, agoTime, feedback_agoTime,updatesBarValue, updates_agoTime) => {
  cardsData.forEach((card) => {
    
    if (card.title === "Unanswered Question") {
      card.barValue = unansBarValue;
      card.ago = agoTime;
    }
    if (card.title === "Feedback") {
      card.barValue = feedbackBarValue;
      card.ago = feedback_agoTime;
    }
    
    if (card.title === "Updates") {
      card.barValue = updatesBarValue;
      card.ago = updates_agoTime;
    }

  });
};
// Analytics Cards Data

export const cardsData = [
  {
    title: "Unanswered Question",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: unansBarValue,
    value: "Pending",
    ago:agoTime,
    // ago: formatDistance(subDays(new Date(), agoTime), new Date(), { addSuffix: true }),
    // ago:formatDistance(agoTime, { addSuffix: true }),
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  
  {
    title: "Feedback",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "Pending",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  
  {
    title: "Updates",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "Pending",
    png: update,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
// const updateData = (unansBarValue,feedbackBarValue, agoTime, feedback_agoTime) => {
//   UpdatesData.forEach((update) => {
    
//     if (update.name === "Training") {
//       // update.noti = unansBarValue;
//       // update.ago = agoTime;
//       update.img = update_img;
//     }
//     if (update.name === "Server") {
//       // update.noti = unansBarValue;
//       // update.ago = agoTime;
//       update.img = server;
//     }
//     if (update.name === "Broken") {
//       // update.noti = unansBarValue;
//       // update.ago = agoTime;
//       update.img = broken;
//     }

//   });
// };

// export const UpdatesData = [
//   {
//     img: img1,
//     name: "Trainig",
//     noti: description,
//     time: dates,
//   }
 
// ];



// export const UpdatesData = updates_data.forEach((update) => {
//   let img;

//   if (update.type === "Training") {
//     img = update_img;
//   } else if (update.name === "Server") {
//     img = server;
//   } else if (update.name === "Broken") {
//     img = broken;
//   }

//   return {
//     img: img,
//     name: update.type,
//     noti: update.description,
//     time: update.dates,
//   };
// });



// export const UpdatesData = no_up;

// export const UpdatesData = updates_data.map((item) => {
//   // Return the desired properties of each item in a new object
//   return {
//     id: item.id,
//     type: item.type,
//     name: item.name,
//     description: item.description,
//     solved: item.solved,
//     dates: item.dates
//   };
// });






