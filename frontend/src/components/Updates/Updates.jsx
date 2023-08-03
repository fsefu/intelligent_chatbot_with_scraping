import {React,useState} from "react";
import "./Updates.css";
import { UpdatesData } from "../../Data/Data";
import broken_img from "../../imgs/broken_link.png";
import train_img from "../../imgs/train.png";
import server_img from "../../imgs/server_error.png";
import TimeAgo from '../Time/timeAgo'
import TrainHandlers from "../Dialog/triainHandlers";

const Updates = () => {
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [enentShow, setenentShow] = useState(false);
  let lastTrainingUpdate = null;
  let lastServerUpdateNews = null;
  let lastServerUpdateEvents = null;
  let lastBrokenUpdate = null;
  let lastServerDown = null;
  let lastServerDownEvent = null;

  UpdatesData.forEach((update) => {
    // console.log(update.description)

    if (update.type === "Training") {
      lastTrainingUpdate = update;

    } 
    
    else if (update.name === "Broken Events") {
      lastServerUpdateNews = update;
      console.log("Desc: ",lastTrainingUpdate.description)

    
    }else if(update.name === "Broken News"){
      lastServerUpdateEvents = update;

    }
     else if (update.name === "Broken") {
      lastBrokenUpdate = update;
    }
    else if(update.name ==="Server News"){
      lastServerDown=update;
    }
    else if(update.name ==="Server Events"){
      lastServerDownEvent=update;
    }
  });
  const handleAnswerButton = () => {
    // console.log("THis is his id>>> ", id);
    // setSelectedQuestionId(id);
    // setSelectedQuestion(question);
    setShowAnswerPopup((prevState) => !prevState);
  };
  
  return (
    <div className="Updates">
      {lastTrainingUpdate && (
        <div className="update">
          <img src={train_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastTrainingUpdate.type}</span>
              <a  className="train-link" onClick={handleAnswerButton}>
              <span> {lastTrainingUpdate.description}</span>
              </a>

            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastTrainingUpdate.dates)}/>}</span>
          </div>
          {showAnswerPopup &&
         <TrainHandlers open={true} 
         handleAnswerButton={handleAnswerButton} 
        //  selectedQuestionId={selectedQuestionId}
        //  selectedQuestion = {selectedQuestion}
         />}
        </div>
      )}

      {lastServerUpdateNews && (
        <div className="update">
          <img src={server_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastServerUpdateNews.type}</span>
              <span> {lastServerUpdateNews.description}</span>
            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastServerUpdateNews.dates)}/>}</span>
          </div>
        </div>
      )}
      {lastServerUpdateEvents && (
        <div className="update">
          <img src={server_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastServerUpdateEvents.type}</span>
              <span> {lastServerUpdateEvents.description}</span>
            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastServerUpdateEvents.dates)}/>}</span>
          </div>
        </div>
      )}

      {lastBrokenUpdate && (
        <div className="update">
          <img src={broken_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastBrokenUpdate.type}</span>
              <span> {lastBrokenUpdate.description}</span>
            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastBrokenUpdate.dates)}/>}</span>

          </div>
        </div>
      )}
     { lastServerDown&& (
        <div className="update">
          <img src={broken_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastServerDown.type}</span>
              <span> {lastServerDown.description}</span>
            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastServerDown.dates)}/>}</span>

          </div>
        </div>
      )}
      { lastServerDownEvent&& (
        <div className="update">
          <img src={broken_img} alt="profile" />
          <div className="noti">
            <div style={{ marginBottom: "0.5rem" }}>
              <span>{lastServerDownEvent.type}</span>
              <span> {lastServerDownEvent.description}</span>
            </div>
            <span>{<TimeAgo  timestamp = {Date.parse(lastServerDownEvent.dates)}/>}</span>

          </div>
        </div>
      )}
    </div>

  );
};

export default Updates;

