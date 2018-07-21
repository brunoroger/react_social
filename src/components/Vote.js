import React, { Component } from 'react';
import { Modal, Button, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import serializeForm from 'form-serialize';
import * as PostApi from '../util/PostApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Vote  extends Component {
		state = {
			option: null
		}
		
		voted = () => {
			if(this.state.option === UP_VOTE){
				PostApi.voted(this.props.id, DOWN_VOTE).then(() => {
					this.setState({ option: DOWN_VOTE });
				});
			}else{
				PostApi.voted(this.props.id, UP_VOTE).then(() => {
					this.setState({ option: UP_VOTE });
				});
			}

			this.props.onVoted(this.props.id);
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