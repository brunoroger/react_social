import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import RemovePost from './RemovePost';
import VotePost from './VotePost';
import ModalEdit from './ModalEdit';

class PostItem  extends Component {
	state = {
		dateFormat: null
	}
	
	componentDidMount(){
		const date = new Date(this.props.post.timestamp);

		this.setState({ dateFormat: ('0'+ date.getDate()).substr(-2)  + "/" + ('0'+ (date.getMonth()+1)).substr(-2) + "/" + date.getFullYear() });
	}

	onVoted = (post) => {
		this.props.editPost(post);
	}

	render(){
		return (
			<Col md={ 12 }>
				<Jumbotron>
					<Row>
						<Col md={ 12 }>
							<h2>{this.props.post.title}</h2>
							<h3>{this.props.post.author}</h3>
							<p>
								{this.props.post.body}
							</p>
						</Col>
					</Row>
					<Row>
						<Col md={ 6 }>
							<h4 className="left"><small>Postado em {this.state.dateFormat} - {this.props.post.voteScore > 0 ? this.props.post.voteScore : 0} Curtidas - {this.props.post.commentCount > 0 ? this.props.post.commentCount : 0} Comentários</small></h4>
							<a href={ "/post/" + this.props.post.id } className="left margin-top">Ver mais >></a>
						</Col>
						<Col md={ 6 }>
							<VotePost id={this.props.post.id} voteScore={this.props.post.voteScore} onVoted={this.onVoted}></VotePost>
							<ModalEdit post={this.props.post} onUpdatePost={this.props.editPost}></ModalEdit>
							<RemovePost idPost={this.props.post.id} onRemove={this.props.removePost}></RemovePost>
						</Col>
					</Row>
				</Jumbotron>
			</Col>
		);
	}
}

export default PostItem;