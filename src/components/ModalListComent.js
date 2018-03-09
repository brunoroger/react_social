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
			console.log(this.props.comment);
			return (
				<div>				
				<Button bsStyle="link" onClick={this.handleShow}>Comentários</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
    				<Modal.Header>
      				<Modal.Title>Comentários</Modal.Title>
    				</Modal.Header>
    				<Modal.Body>
						{this.props.comment && this.props.comment.map(el => (
							<Row key={el.id}>
								<Col md={ 12 }>
									<Well>
										<h4>{el.author}</h4>
										<p>{el.body}</p>
									</Well>
								</Col>
							</Row>
						))}
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