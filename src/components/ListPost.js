import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { connect } from "react-redux";
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalComent from './ModalComent';
import ModalListComent from './ModalListComent';

const mapStateToProps = state => {
	return { post: state.post };
};

const ConnectedListPost = ({post}) => (
	<div>    		
		<Row>
			<Col md={ 12 }>
				<ModalAdd></ModalAdd>
			</Col>
		</Row>
		<br/>
		{post.map(el => (
			<Row key={el.id}>
				<Col md={ 12 }>
					<Jumbotron>
						<h2>{el.title}</h2>
						<h3>{el.author}</h3>
						<p>
							{el.body}
						</p>
						<ModalEdit post={el}></ModalEdit>
						<ModalComent idPost={el.id}></ModalComent>
						<ModalListComent idPost={el.id} ></ModalListComent>
					</Jumbotron>
				</Col>
			</Row>
		))}
	</div>
);

const ListPost = connect(mapStateToProps)(ConnectedListPost);

export default ListPost;