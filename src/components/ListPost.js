import React from 'react';
import { Row, Col, Jumbotron, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalComent from './ModalComent';
import ModalListComent from './ModalListComent';
import { removePost } from '../actions';

const mapStateToProps = state => {
	return { post: state.post };
};

const mapDispatchToProps = dispatch => {
	return {
		removePost: idPost => dispatch(removePost(idPost))
	};
};

const ConnectedListPost = ({post, removePost}) => (
	<div>    		
		<Row>
			<Col md={ 12 }>
				<ModalAdd></ModalAdd>
			</Col>
		</Row>
		<br/>
		{post.filter(el => !el.deleted ).map(el => (
			<Row key={el.id}>
				<Col md={ 12 }>
					<Jumbotron>
						<h2>{el.title}</h2>
						<h3>{el.author}</h3>
						<p>
							{el.body}
						</p>
						<Button onClick={() => {removePost(el.id)}}>Remover Post</Button>
						<ModalEdit post={el}></ModalEdit>
						<ModalComent idPost={el.id}></ModalComent>
						<ModalListComent idPost={el.id} ></ModalListComent>
					</Jumbotron>
				</Col>
			</Row>
		))}
	</div>
);

const ListPost = connect(mapStateToProps, mapDispatchToProps)(ConnectedListPost);

export default ListPost;