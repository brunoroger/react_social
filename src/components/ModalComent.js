import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import uuidv1 from "uuid";
import serializeForm from 'form-serialize';
import { addComment } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(addComment(comment))
  };
};

class ModalComent  extends Component {
		constructor(props, context) {
    		super(props, context);

    		this.handleShow = this.handleShow.bind(this);
    		this.handleClose = this.handleClose.bind(this);

    		this.state = {
				show: false,
				idPost: props.idPost
    		};
 		 }

  		handleClose() {
   		this.setState({ ...this.state, show: false });
  		}

  		handleShow() {
    		this.setState({ ...this.state, show: true });
  		}
		
		handleSubmit = (e) => {
			e.preventDefault()
			const comment = serializeForm(e.target, { hash: true });
			comment.id = uuidv1();
			comment.parentId = this.state.idPost;
			this.props.addComment(comment);
			this.setState({ ...this.state, show: false });
		}
		
		render(){
			return (
				<div>				
					<Button bsStyle="primary" onClick={this.handleShow}>Comentar</Button>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header>
							<Modal.Title>Comentário</Modal.Title>
						</Modal.Header>
						<form onSubmit={this.handleSubmit}>
							<Modal.Body>
								<FormGroup controlId="author">
									<ControlLabel>Nome:</ControlLabel>
									<FormControl name="author" id="author" type="text" />
								</FormGroup>
								<FormGroup controlId="body">
									<ControlLabel>Comentário</ControlLabel>
									<FormControl name="body" componentClass="textarea" id="body"/>
								</FormGroup>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.handleClose}>Fechar</Button>
								<Button type="submit" bsStyle="primary">Cadastrar</Button>
							</Modal.Footer>
						</form>
					</Modal>
				</div>
			);
		}
}

export default connect(null, mapDispatchToProps)(ModalComent);