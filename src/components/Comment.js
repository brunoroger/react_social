import React, { Component } from 'react';
import { Row, Col, Well, Button, Glyphicon } from 'react-bootstrap';
import VoteComment from './VoteComment';
import ModalEditComent from './ModalEditComent';

class Comment  extends Component {

	render(){
		return (
			<Col md={ 12 }>
				<Well>
					<Row>
						<Col md={12}>
							<h4>{this.props.comment.author}</h4>
							<p>{this.props.comment.body}</p>
						</Col>
					</Row>
					<Row>
						<Col md={2}>
							<h4 className="left"><small>{this.props.comment.voteScore} Curtidas</small></h4>
						</Col>
						<Col md={10}>
							<p>
								<ModalEditComent onUpdate={this.props.onUpdate} comment={this.props.comment}></ModalEditComent>
								<Button className="left" bsStyle="danger" onClick={() => {this.props.onRemove(this.props.comment.id)}}><Glyphicon glyph="remove" /> Remover Comentário</Button>
								<VoteComment id={this.props.comment.id} onVoted={(res)=>{ this.props.onUpdate(this.props.comment.id, res); }} voteScore={this.props.comment.voteScore}></VoteComment>
							</p>
						</Col>
					</Row>
					<div className="clear"></div>
				</Well>
			</Col>
		);
	}
}

export default Comment;