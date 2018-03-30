import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import ModalAdd from './ModalAdd';
import { removePost } from '../actions';
import Post from './Post';

const mapStateToProps = state => {
	return {
		post: state.post,
		categories: state.categories
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removePost: idPost => dispatch(removePost(idPost))
	};
};

const ConnectedListPost = ({post, categories, removePost}) => (
	<div>    		
		<Row>
			<Col md={ 12 }>
				<ModalAdd></ModalAdd>
			</Col>
		</Row>
		<br/>
		{categories.map(cat => (
			<div key={cat.path}>
				<h1>{cat.name}</h1>
				{post.filter(el => !el.deleted && el.category === cat.path ).map(el => (
					<Row key={el.id}>
						<Post removePost={removePost} post={el}/>
					</Row>
				))}
			</div>
		))}
	</div>
);

const ListPost = connect(mapStateToProps, mapDispatchToProps)(ConnectedListPost);

export default ListPost;