import React, { Component } from 'react';
import { Modal, Button, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import serializeForm from 'form-serialize';
import { editPost } from '../actions';
import * as PostApi from '../util/PostApi';

const mapStateToProps = state => {
	return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch(editPost(post))
  };
};

class ModalEdit  extends Component {
		constructor(props, context) {
    		super(props, context);

    		this.handleShow = this.handleShow.bind(this);
    		this.handleClose = this.handleClose.bind(this);

    		this.state = {
				show: false
    		};
 		 }

  		handleClose() {
   		this.setState({ show: false });
  		}

  		handleShow() {
    		this.setState({ show: true });
  		}
		
		handleSubmit = (e) => {
			e.preventDefault()
			const post = serializeForm(e.target, { hash: true });
			
			PostApi.edit(this.props.post.id, post).then((res) => {
				this.props.editPost(res);
				this.setState({ show: false });
				this.props.onUpdatePost(res);
			});
		}
		
		render(){
			return (
				<div>				
					<Button bsStyle="primary" className="left" onClick={this.handleShow}>
						<Glyphicon glyph="edit" /> Editar
					</Button>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header>
						<Modal.Title>O que você esta pensando?</Modal.Title>
						</Modal.Header>
						<form onSubmit={this.handleSubmit}>
							<Modal.Body>
								<FormGroup controlId="title">
									<ControlLabel>Título:</ControlLabel>
									<FormControl name="title" id="title" defaultValue={this.props.post.title} type="text" />
								</FormGroup>
								<FormGroup controlId="body">
									<ControlLabel>Conteúdo</ControlLabel>
									<FormControl name="body" defaultValue={this.props.post.body} componentClass="textarea" id="body"/>
								</FormGroup>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.handleClose}>Fechar</Button>
								<Button type="submit" bsStyle="primary">Editar</Button>
							</Modal.Footer>
						</form>
					</Modal>
				</div>
			);
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);