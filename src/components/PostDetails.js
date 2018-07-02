import React, { Component } from 'react';
import { Panel,Tabs,Tab,Row,Col,Button,Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import uuidv1 from "uuid";
import serializeForm from 'form-serialize';
import * as PostApi from '../util/PostApi';
import * as CommentsApi from '../util/CommentsApi';
import ModalEdit from './ModalEdit';
import ModalComent from './ModalComent';
import Comment from "./Comment";

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
		PostApi.get(this.props.match.params.id).then((post) => {
			this.setState({ post });
			CommentsApi.getAll(post.id).then((comments) => {
				this.setState({...this.state, comments });
			});
		});
	}

	onAdd = (e) => {
			e.preventDefault()
			const comment = serializeForm(e.target, { hash: true });
			comment.id = uuidv1();
			comment.parentId = this.props.idPost;
			comment.timestamp = Date.now();
			
			CommentsApi.add(comment).then((res) => {
				this.setState({ ...this.state, comments: [ ...this.state.comments, res ] });
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
				
				this.setState({ ...this.state, comments: deletedComment });
			});
		};

	render(){
		return (
			<div>
			<Row>
				<Link to="/" className="left margin-bottom">&lsaquo;&lsaquo; Voltar</Link>
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
							    		<Button className="left"><Glyphicon glyph="thumbs-up" /> Curtir</Button>
							    		<ModalEdit post={this.state.post}></ModalEdit>
							    		<Button bsStyle="danger" className="left" onClick={() => {
											PostApi.remove(this.state.post.id);
										}}><Glyphicon glyph="remove" /> Remover Post</Button>
							    	</Col>
							    </Row>
							  </Tab>
							  <Tab eventKey={2} title="Comentários">
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