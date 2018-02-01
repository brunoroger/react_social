import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import ModalAdd from './ModalAdd';
import ModalComent from './ModalComent';
import ModalListComent from './ModalListComent';

class ListPost  extends Component {
	render() {
    	return (
			<div>    		
    		<Row>
    			<Col md={ 12 }>
    				<ModalAdd></ModalAdd>
    			</Col>
    		</Row>
    		<br/>
    		<Row>
    			<Col md={ 12 }>
    				<Jumbotron>
  						<h2>Título da Postagem</h2>
  						<p>
    						Conteúdo da postagem
  						</p>
  						<p>
    						<ModalComent></ModalComent>
    						<ModalListComent></ModalListComent>
  						</p>
					</Jumbotron>
    			</Col>
    		</Row>
    		</div>
    	);
	 };
}

export default ListPost;