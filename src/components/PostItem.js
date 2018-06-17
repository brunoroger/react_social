import React, { Component } from 'react';
import { Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import * as PostApi from '../util/PostApi';
import ModalEdit from './ModalEdit';
import ModalListComent from './ModalListComent';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class PostItem  extends Component {
	state = {
		option: UP_VOTE
	}
	
	voted = (id) => {
		if(this.state.option === UP_VOTE){
			PostApi.voted(id, DOWN_VOTE).then(() => {
				this.setState({ option: DOWN_VOTE });
			});
		}else{
			PostApi.voted(id, UP_VOTE).then(() => {
				this.setState({ option: UP_VOTE });
			});
		}
	};
	
	render(){
		return (
			<Col md={ 12 }>
				<Jumbotron>
					<h2>{this.props.post.title}</h2>
					<h3>{this.props.post.author}</h3>
					<p>
						{this.props.post.body}
					</p>
					<Button bsStyle="link" className="left">Ver mais >></Button>
				</Jumbotron>
			</Col>
		);
	}
}

export default PostItem;