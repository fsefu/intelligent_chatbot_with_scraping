
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './feedback.css'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

class Feedback extends Component {
    state = {
        likeed: false,
        disliked: false,
        feedbackInput: '',
    }

    handleLikeClick = () => {
        const { liked, disliked } = this.state;
        // alert("Thank you for your feedback!");
        if (liked === false) {
            this.setState({ disliked: false })
            this.setState({ liked: true });
        }
    };

    handleDislikeClick = () => {
        const { liked, disliked } = this.state;
        if (disliked === false) {
            this.setState({ disliked: true })
            this.setState({ liked: false });
        }
    };
    render() {
        return (
            <div >

                <Popup
                    trigger={
                        <div className="feedback">
                            <button onClick={this.handleLikeClick} disabled={this.state.liked}>
                                {this.state.liked ? <FaThumbsUp color="green" /> : <FaThumbsUp />}
                            </button>
                            <button onClick={this.handleDislikeClick} disabled={this.state.disliked}>
                                {this.state.disliked ? <FaThumbsDown color="red" /> : <FaThumbsDown />}
                            </button>
                        </div>}

                    position="top center">
                    <form action="" method="post">
                        <input type="text"
                            name="feeback"
                            id="feedback"
                            value={this.state.feedbackInput}
                            placeholder='Write your feedback?' />
                 <div className="checkbox-labael">
                        <label style={{ display: 'inline-block', verticalAlign: 'middle',lineHeight: '1.5'}}>
                            <input type="checkbox" name='incorrect' id='incorrect' style={{ verticalAlign: 'middle' }} />
                            This isn't true
                        </label>
                        <label style={{ display: 'inline-block', verticalAlign: 'middle',lineHeight: '1.5' }}>
                            <input type="checkbox" name='dont' id='dont' style={{ verticalAlign: 'middle' }} />
                            I didn't understand the response.
                        </label>
                        </div>
                        
                        <button className='feedback_button' type="submit">Submit</button>
                    </form>
                </Popup>
            </div>
        );
    }
}

export default Feedback;