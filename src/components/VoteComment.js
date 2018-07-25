import React, { Component } from 'react';
import { Button, Glyphicon  } from 'react-bootstrap';
import * as CommentsApi from '../util/CommentsApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class VoteComment  extends Component {
		state = {
			option: null
		}
		
		votedUp = () => {
			CommentsApi.voted(this.props.id, UP_VOTE).then((res) => {
				this.setState({ option: UP_VOTE });
				this.props.onVoted(res);
			});
		};
		
		votedDown = () => {
			CommentsApi.voted(this.props.id, DOWN_VOTE).then((res) => {
				this.setState({ option: DOWN_VOTE });
				this.props.onVoted(res);
			});
		};

		render(){
			return (
				<div>				
					<Button className="left" onClick={this.votedUp}><Glyphicon glyph="thumbs-up" /></Button>
					<Button className="left" disabled={this.props.voteScore <= 0} onClick={this.votedDown}><Glyphicon glyph="thumbs-down" /></Button>
				</div>
			);
		}
}

export default VoteComment;