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
   		this.setState({ ...this.state, show: false });
  		}

  		handleShow() {
    		this.setState({ ...this.state, show: true });
  		}
		
		handleSubmit = (e) => {
			this.props.onAdd(e);
			this.setState({ ...this.state, show: false });
		};
		
		render(){
			return (
				<div>				
					<Button className="right" bsStyle="primary" onClick={this.handleShow}>Comentar</Button>
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

export default ModalComent;