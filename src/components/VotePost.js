import React, { Component } from 'react';
import { Button, Glyphicon  } from 'react-bootstrap';
import * as PostApi from '../util/PostApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class VotePost  extends Component {
		state = {
			option: null
		}
		
		votedUp = () => {
			PostApi.voted(this.props.id, UP_VOTE).then((res) => {
				this.setState({ option: UP_VOTE });
				this.props.onVoted(res);
			});
		};
		
		votedDown = () => {
			PostApi.voted(this.props.id, DOWN_VOTE).then((res) => {
				this.setState({ option: DOWN_VOTE });
				this.props.onVoted(res);
			});
		};

		render(){
			return (
				<div>				
					<Button className="left" onClick={this.votedUp}><Glyphicon glyph="thumbs-up" /></Button>
					<Button className="left" onClick={this.votedDown}><Glyphicon glyph="thumbs-down" /></Button>
				</div>
			);
		}
}

export default VotePost;