import React, { Component } from 'react';
import { Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import * as PostApi from '../util/PostApi';
import ModalEdit from './ModalEdit';
import ModalListComent from './ModalListComent';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class Post  extends Component {
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
					<ModalEdit post={this.props.post}></ModalEdit>
					<Button bsStyle="danger" className="left" onClick={() => {
						PostApi.remove(this.props.post.id).then(() => {
							this.props.removePost(this.props.post.id);
						});
					}}><Glyphicon glyph="remove" /> Remover Post</Button>
					<Button className="left" onClick={() => { this.voted(this.props.post.id); }}><Glyphicon glyph="thumbs-up" /> {this.state.option === UP_VOTE ? 'Curtir' : 'Descurtir'}</Button>
					<ModalListComent idPost={this.props.post.id} ></ModalListComent>
				</Jumbotron>
			</Col>
		);
	}
}

export default Post;