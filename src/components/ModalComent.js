import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class ModalComent  extends Component {
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
					<Button bsStyle="primary" onClick={this.handleShow}>Comentar</Button>
					<Modal show={this.state.show} onHide={this.handleClose}>
						<Modal.Header>
							<Modal.Title>Comentário</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form>
								<FormGroup controlId="nome">
									<ControlLabel>Nome:</ControlLabel>
									<FormControl id="nome" type="text" />
								</FormGroup>
								<FormGroup controlId="comentario">
								<ControlLabel>Comentário</ControlLabel>
								<FormControl componentClass="textarea" id="comentario"/>
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

export default ModalComent;