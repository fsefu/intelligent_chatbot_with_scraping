const express = require('express');
const router = express.Router();
const pool = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const selectQuery = 'SELECT * FROM unanswered_que WHERE status = "unanswered" ORDER BY date DESC';
    const feedbackQuery = 'SELECT * FROM feedback_table ORDER BY date DESC';
    const updateQuery = 'SELECT * FROM updates WHERE description <> "no"';
    const un_result = await pool.query(selectQuery);
    const feed_result = await pool.query(feedbackQuery);
    const update_result = await pool.query(updateQuery);
    // console.log("Unresult: ",un_result);
    // console.log("feedResult:", feed_result[0].length);
    // console.log("updateResult:", update_result[0]);
    // const data = un_result[0]; // Retrieve the data from the result
     const data = {"unanswered": un_result[0], "feedbacks":feed_result[0], "updates":update_result[0]};

    //  console.log("This is data:",data)
    res.status(200).json(data);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Error retrieving data from unanswered_que table' });
  }
});

module.exports = router;
