import React, { Component } from 'react';
import { Panel,Tabs,Tab,Row,Col } from 'react-bootstrap';
import uuidv1 from "uuid";
import serializeForm from 'form-serialize';
import * as PostApi from '../util/PostApi';
import * as CommentsApi from '../util/CommentsApi';
import ModalEdit from './ModalEdit';
import ModalComent from './ModalComent';
import Comment from "./Comment";
import RemovePost from './RemovePost';
import VotePost from './VotePost';

class PostDetails  extends Component {
	state = {
		post: {
			id: null,
			timestamp: 0,
			title: null,
			author: null,
			body: null,
			category: null,
			voteScore: 0,
			deleted: null,
			commentCount: 0
		},
		comments: []
	}

	componentDidMount(){
		this.refresh(this.props.match.params.id);
	}

	refresh = (id) => {
		PostApi.get(id).then((post) => {
			this.setState({ post });
			CommentsApi.getAll(post.id).then((comments) => {
				this.setState({...this.state, comments });
			});
		});
	};

	onVoted = (post) => {
		this.setState({ post });
	}

	onRemovePost = () => {
		window.location.href = "/";
	};

	onUpdatePost = (post) => {
		this.setState({...this.state, post: post });
	};

	onAdd = (e) => {
			e.preventDefault()
			const comment = serializeForm(e.target, { hash: true });
			comment.id = uuidv1();
			comment.parentId = this.state.post.id;
			comment.timestamp = Date.now();
			
			CommentsApi.add(comment).then((res) => {
				const post = this.state.post;
				post.commentCount = post.commentCount + 1;

				this.setState({ ...this.state, post, comments: [ ...this.state.comments, res ] });
			});
		};
		
		onUpdate = (id, comment) => {
			CommentsApi.edit(id, comment).then((res) => {
				const updateComment = this.state.comments.map(item => {
					if(item.id === id){
						return {...item, ...res};
					}else{
						return item;
					}
				});
				
				this.setState({ ...this.state, comments: updateComment });
			});
		};
		
		onRemove = (id) => {
			CommentsApi.remove(id).then(() => {
				const deletedComment = this.state.comments.map(item => {
					if(item.id === id){
						return {...item, deleted: true };
					}else{
						return item;
					}
				});
				const post = this.state.post;
				post.commentCount = post.commentCount - 1;

				this.setState({ ...this.state, post, comments: deletedComment });
			});
		};

	render(){
		return (
			<div>
			<Row>
				<a href="/" className="left margin-bottom">&lsaquo;&lsaquo; Voltar</a>
			</Row>
			{this.state.post.id && !this.state.post.deleted ?
				<Row>
					<Panel bsStyle="primary">
	    				<Panel.Heading>
	      					<Panel.Title componentClass="h3">{this.state.post.title}</Panel.Title>
	    				</Panel.Heading>
	    				<Panel.Body>
	    					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
							  <Tab eventKey={1} title="Detalhes">
							    <Row>
							    	<Col md={ 12 }>
							    		<p>{this.state.post.body}</p>
							    	</Col>
							    </Row>
							    <Row>
							    	<Col md={ 6 }>
							    		<p><b>Autor:</b> {this.state.post.author}</p>
							    	</Col>
							    	<Col md={ 6 }>
							    		<p><b>Categoria:</b> {this.state.post.category}</p>
							    	</Col>
							    	<Col md={ 6 }>
							    		<p><b>Curtidas:</b> {this.state.post.voteScore > 0 ? this.state.post.voteScore : 0}</p>
							    	</Col>
							    	<Col md={ 6 }>
							    		<VotePost id={this.state.post.id} voteScore={this.state.post.voteScore} onVoted={this.onVoted}></VotePost>
							    		<ModalEdit post={this.state.post} onUpdatePost={this.onUpdatePost}></ModalEdit>
							    		<RemovePost onRemove={this.onRemovePost}></RemovePost>
							    	</Col>
							    </Row>
							  </Tab>
							  <Tab eventKey={2} title={ this.state.post.commentCount +" Comentários"}>
							  	{this.state.comments && this.state.comments.filter(c => !c.deleted).map(el => (
									<Row key={el.id}>
										<Comment comment={el} onUpdate={this.onUpdate} onRemove={this.onRemove}></Comment>
									</Row>
								))}
								<Row>
									<Col md={ 12 }>
										<ModalComent onAdd={this.onAdd}></ModalComent>
									</Col>
								</Row>
							  </Tab>
							</Tabs>
	    				</Panel.Body>
	  				</Panel>
	  			</Row>
			:<h1>404 - Post não Encontrado!</h1>}
			</div>
		);
	}
}

export default PostDetails;