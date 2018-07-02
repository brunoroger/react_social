import React, { Component } from 'react';
import { Col, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as PostApi from '../util/PostApi';

const UP_VOTE = 'upVote';
const DOWN_VOTE = 'downVote';

class PostItem  extends Component {
	state = {
		dateFormat: null
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
	
	componentDidMount(){
		const date = new Date(this.props.post.timestamp);

		this.setState({ dateFormat: ('0'+ date.getDate()).substr(-2)  + "/" + ('0'+ (date.getMonth()+1)).substr(-2) + "/" + date.getFullYear() });
	}

	render(){
		return (
			<Col md={ 12 }>
				<Jumbotron>
					<h2>{this.props.post.title}</h2>
					<h3>{this.props.post.author}</h3>
					<p>
						{this.props.post.body}
					</p>
					<h4 className="left"><small>Postado em {this.state.dateFormat} - {this.props.post.voteScore > 0 ? this.props.post.voteScore : 0} Curtidas</small></h4>
					<Link to={ "/post/" + this.props.post.id } className="left margin-top">Ver mais >></Link>
				</Jumbotron>
			</Col>
		);
	}
}

export default PostItem;