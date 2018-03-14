import React, { Component } from 'react';
import { Modal, Button, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import serializeForm from 'form-serialize';
import { editPost } from '../actions';

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
			post.id = this.props.post.id;
			this.props.editPost(post);
			this.setState({ show: false });
		}
		
		render(){
			return (
				<div>				
					<Button bsStyle="primary" className="right" onClick={this.handleShow}>
						<Glyphicon glyph="edit" /> Editar
					</Button>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header>
						<Modal.Title>O que você esta pensando?</Modal.Title>
						</Modal.Header>
						<form onSubmit={this.handleSubmit}>
							<Modal.Body>
								<FormGroup controlId="author">
									<ControlLabel>Nome:</ControlLabel>
									<FormControl name="author" id="author" defaultValue={this.props.post.author} type="text" />
								</FormGroup>
								<FormGroup controlId="title">
									<ControlLabel>Título:</ControlLabel>
									<FormControl name="title" id="title" defaultValue={this.props.post.title} type="text" />
								</FormGroup>
								<FormGroup controlId="category">
								  <ControlLabel>Categoria:</ControlLabel>
								  <FormControl componentClass="select" name="category" id="category" defaultValue={this.props.post.category}>
									<option value="">Selecione</option>
									{this.props.categories.map(el => (
										<option key={el.path} value={el.path}>{el.name}</option>
									))}
								  </FormControl>
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