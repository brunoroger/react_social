import React, { Component } from 'react';
import { Button, Glyphicon  } from 'react-bootstrap';
import * as PostApi from '../util/PostApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Vote  extends Component {
		state = {
			option: null
		}
		
		voted = () => {
			if(this.state.option === UP_VOTE){
				PostApi.voted(this.props.id, DOWN_VOTE).then((res) => {
					this.setState({ option: DOWN_VOTE });
					this.props.onVoted(res);
				});
			}else{
				PostApi.voted(this.props.id, UP_VOTE).then((res) => {
					this.setState({ option: UP_VOTE });
					this.props.onVoted(res);
				});
			}
		};
		
		render(){
			return (
				<div>				
					<Button className="left" onClick={this.voted}><Glyphicon glyph="thumbs-up" /> {this.state.option === UP_VOTE ? 'Descurtir' : 'Curtir'}</Button>
				</div>
			);
		}
}

export default Vote;