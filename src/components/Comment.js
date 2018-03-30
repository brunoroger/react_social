import React, { Component } from 'react';
import { Col, Well, Button, Glyphicon } from 'react-bootstrap';
import ModalEditComent from './ModalEditComent';
import * as CommentsApi from '../util/CommentsApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Comment  extends Component {
	state = {
		option: UP_VOTE
	};
	
	voted = (id) => {
		if(this.state.option === UP_VOTE){
			CommentsApi.voted(id, DOWN_VOTE).then(() => {
				this.setState({ option: DOWN_VOTE });
			});
		}else{
			CommentsApi.voted(id, UP_VOTE).then(() => {
				this.setState({ option: UP_VOTE });
			});
		}
	};
	
	render(){
		return (
			<Col md={ 12 }>
				<Well>
					<h4>{this.props.comment.author}</h4>
					<p>{this.props.comment.body}</p>
					<p>
						<ModalEditComent onUpdate={this.props.onUpdate} comment={this.props.comment}></ModalEditComent>
						<Button className="left" bsStyle="danger" onClick={() => {this.props.onRemove(this.props.comment.id)}}><Glyphicon glyph="remove" /> Remover Comentário</Button>
						<Button onClick={() => { this.voted(this.props.comment.id); }}><Glyphicon glyph="thumbs-up" /> {this.state.option === UP_VOTE ? 'Curtir' : 'Descurtir'}</Button>
					</p>
				</Well>
			</Col>
		);
	}
}

export default Comment;