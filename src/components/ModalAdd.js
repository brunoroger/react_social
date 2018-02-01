import React, { Component } from 'react';
import { Modal, Button, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class ModalAdd  extends Component {
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
		
		render(){
			return (
				<div>				
				<Button bsStyle="primary" className="right" onClick={this.handleShow}>
    				<Glyphicon glyph="plus" />
    			</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
    				<Modal.Header>
      				<Modal.Title>O que você esta pensando?</Modal.Title>
    				</Modal.Header>
    				<Modal.Body>
    					<form>
    						<FormGroup controlId="nome">
    							<ControlLabel>Nome:</ControlLabel>
    							<FormControl id="nome" type="text" />
    						</FormGroup>
    						<FormGroup controlId="titulo">
    							<ControlLabel>Título:</ControlLabel>
    							<FormControl id="titulo" type="text" />
    						</FormGroup>
    						<FormGroup controlId="conteudo">
      						<ControlLabel>Conteúdo</ControlLabel>
      						<FormControl componentClass="textarea" id="conteudo"/>
    						</FormGroup>
    					</form>
    				</Modal.Body>
    				<Modal.Footer>
      				<Button onClick={this.handleClose}>Fechar</Button>
      				<Button bsStyle="primary">Cadastrar</Button>
    				</Modal.Footer>
				</Modal>
				</div>
			);
		}
}

export default ModalAdd;