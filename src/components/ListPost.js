import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap';

class ListPost  extends Component {
	render() {
    	return (
			<div>    		
    		<Row>
    			<Col md={ 12 }>
    				<Button bsStyle="primary" className="right">
    					<Glyphicon glyph="plus" />
    				</Button>
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
    						<Button bsStyle="primary">Comentar</Button>
    						<Button bsStyle="link">Comentarios</Button>
  						</p>
					</Jumbotron>
    			</Col>
    		</Row>
    		</div>
    	);
	 };
}

export default ListPost;