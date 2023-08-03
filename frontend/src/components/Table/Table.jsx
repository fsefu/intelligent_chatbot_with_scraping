// App.js (React component)
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Feedback from '../feedback';
import AnswerForm from '../Answer/answer';
import UpdatesAll from '../Updates/updatesAll';
import TimeAgo from "../Time/timeAgo";


function BasicTable(props) {
  const { sidebarData } = props;
  const [rows, setRows] = useState([]);
  const [feedbackRows, setfeedbackRows] = useState([]);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    // Fetch data from the server

    fetch("http://127.0.0.1:8000/get_data")
      .then((response) => response.json())
      .then((data) => {
        setRows(data.unanswered);
        setfeedbackRows(data.feedbacks);
        console.log("In table Fetch Data:", data.feedbacks);
      }
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  let renderedRows = [];
  if (sidebarData === 0 || sidebarData === 2) {
    renderedRows = rows;
  } else if (sidebarData === 1) {
    renderedRows = feedbackRows;
  }

  const makeStyle = (status) => {
    if (status === 'answered') {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if (status === 'unanswered') {
      return {
        background: '#ffadad8f',
        color: 'red',
      }
    }
    else {
      return {
        background: '#59bfff',
        color: 'white',
      }
    }
  };

  const handleAnswerButton = (id, question) => {
    console.log("THis is his id>>> ", id);
    setSelectedQuestionId(id);
    setSelectedQuestion(question);
    setShowAnswerPopup((prevState) => !prevState);
  };
  
  if (sidebarData == 0 || sidebarData == 2) {

    return (

      <div className="Table">
        <h3>Recent Unanswered Question</h3>
        <div className="scrollable-container">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >    <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>QuestionID</TableCell>
                  <TableCell align="left">Unanswered Question</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Status</TableCell>

                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>

                {renderedRows.reverse().map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.unanswered_que }</TableCell>
                    <TableCell align="left">  <TimeAgo timestamp = {Date.parse(row.date)}/>  </TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(row.status)}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="Details" >
                      <button onClick={()=>handleAnswerButton(row.id, row.unanswered_que)}   className="answer-button">Answer</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* {isOpen && <AnswerForm open={isOpen} handleAnswerButton={handleAnswerButton} />} */}
        {showAnswerPopup &&
         <AnswerForm open={true} 
         handleAnswerButton={handleAnswerButton} 
         selectedQuestionId={selectedQuestionId}
         selectedQuestion = {selectedQuestion}
         />}

        {/* {isOpen && <AnswerForm open={isOpen} />} */}
        {/* {showAnswerPopup ? <Answer/> : null} */}

      </div>
    );
  }

  if (sidebarData == 1) {
    return (
      <div className="Table">
        <h3>Recent Feedbacks</h3>
        <div className="scrollable-container">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >    <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>QuestionID</TableCell>
                  <TableCell align="left">Feedback</TableCell>
                  <TableCell align="left">Date</TableCell>
                  {/* <TableCell align="left">Status</TableCell> */}
                  {/* <TableCell align="left">Liked</TableCell>
              <TableCell align="left">Disliked</TableCell> */}
                  <TableCell align="left">Incorrect</TableCell>
                  <TableCell align="left">Don't Understand</TableCell>
                  <TableCell align="left">Un Clear</TableCell>

                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>

                {renderedRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.feedback}</TableCell>
                    <TableCell align="left"><TimeAgo timestamp = {Date.parse(row.date)}/></TableCell>
                    <TableCell align="left">{row.liked}</TableCell>
                    {/* <TableCell align="left">{row.disliked}</TableCell>
                  <TableCell align="left">{row.incorrect}</TableCell> */}
                    <TableCell align="left">{row.dontUnderstand}</TableCell>
                    <TableCell align="left">{row.unclear}</TableCell>


                    {/* <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>
                      {row.status}
                    </span>
                  </TableCell> */}
                    {/* <TableCell align="left" className="Details">
                      Details
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

  if (sidebarData == 3) {
    return (
      <div>
        <UpdatesAll/>
      </div>
    );
  }
}

export default BasicTable;
