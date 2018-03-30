import React, { Component } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import uuidv1 from "uuid";
import serializeForm from 'form-serialize';
import * as CommentsApi from '../util/CommentsApi';
import ModalComent from './ModalComent';
import Comment from "./Comment";

const mapStateToProps = state => {
	return { comment: state.comment };
};

class ModalListComent  extends Component {
		constructor(props, context) {
    		super(props, context);

    		this.handleShow = this.handleShow.bind(this);
    		this.handleClose = this.handleClose.bind(this);

    		this.state = {
				show: false,
				comments: []
    		};
 		 }

  		handleClose() {
			this.setState({ ...this.state, show: false });
  		}

  		handleShow() {
    		this.setState({ ...this.state, show: true });
  		}
		
		componentDidMount(){
			CommentsApi.getAll(this.props.idPost).then((comments) => {
				this.setState({...this.state, comments });
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
				<Button className="left" bsStyle="link" onClick={this.handleShow}>Comentários</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
    				<Modal.Header>
      				<Modal.Title>Comentários</Modal.Title>
    				</Modal.Header>
    				<Modal.Body>
						{this.state.comments && this.state.comments.filter(c => !c.deleted).map(el => (
							<Row key={el.id}>
								<Comment comment={el} onUpdate={this.onUpdate} onRemove={this.onRemove}></Comment>
							</Row>
						))}
    				</Modal.Body>
    				<Modal.Footer>
						<ModalComent onAdd={this.onAdd}></ModalComent>
						<Button className="right" onClick={this.handleClose}>Fechar</Button>
    				</Modal.Footer>
				</Modal>
				</div>
			);
		}
}

export default connect(mapStateToProps)(ModalListComent);