import React, { Component } from 'react';
import { Modal, Button, Row, Col, Well } from 'react-bootstrap';
import { connect } from "react-redux";
import * as CommentsApi from '../util/CommentsApi';
import ModalEditComent from "./ModalEditComent";
import { removeComment } from '../actions';

const mapStateToProps = state => {
	return { comment: state.comment };
};

const mapDispatchToProps = dispatch => {
	return {
		removeComment: idComment => dispatch(removeComment(idComment))
	};
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
   		this.setState({ show: false });
  		}

  		handleShow() {
    		this.setState({ show: true });
  		}
		
		componentDidMount(){
			CommentsApi.getAll(this.props.idPost).then((comments) => {
				this.setState({...this.state, comments });
			});
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
						{this.state.comments && this.state.comments.filter(c => !c.deleted).map(el => (
							<Row key={el.id}>
								<Col md={ 12 }>
									<Well>
										<h4>{el.author}</h4>
										<p>{el.body}</p>
										<p>
											<Button onClick={() => {this.props.removeComment(el.id)}}>Remover Comentário</Button>
											<ModalEditComent comment={el}></ModalEditComent>
										</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalListComent);