import React, { Component } from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import ModalAdd from './ModalAdd';
import { removePost } from '../actions';
import PostItem from './PostItem';

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

class ListPost extends Component {
	
	state = {
		categorySel: ""
	};
	
	onChange = (e) => {
		this.setState({ categorySel: e.target.value });
	};
	
	render(){
		return (
			<div>    		
				<Row>
					<Col md={ 4 }>
						<FormControl componentClass="select" name="filterCategory" id="filterCategory" onChange={ this.onChange }>
							<option value="">Categorias</option>
							{this.props.categories.map(cat => (
								<option key={cat.path} value={cat.path}>{cat.name}</option>
							))}
						</FormControl>
					</Col><Col md={ 8 }>
						<ModalAdd></ModalAdd>
					</Col>
				</Row>
				<br/>
				{this.props.post.filter(el => !el.deleted && (el.category === this.state.categorySel || this.state.categorySel === "") ).map(el => (
					<Row key={el.id}>
						<PostItem removePost={removePost} post={el}/>
					</Row>
				))}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);