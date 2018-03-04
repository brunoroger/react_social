import React, { Component } from 'react';
import { Modal, Button, Row, Col, Well } from 'react-bootstrap';

class ModalListComent  extends Component {
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
				<Button bsStyle="link" onClick={this.handleShow}>Comentários</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
    				<Modal.Header>
      				<Modal.Title>Comentários</Modal.Title>
    				</Modal.Header>
    				<Modal.Body>
    					<Row>
    						<Col md={ 12 }>
    							<Well>
    								<h4>Autor</h4>
    								<p>Conteúdo</p>
    							</Well>
    						</Col>
    					</Row>
    				</Modal.Body>
    				<Modal.Footer>
      				<Button onClick={this.handleClose}>Fechar</Button>
    				</Modal.Footer>
				</Modal>
				</div>
			);
		}
}

export default ModalListComent;