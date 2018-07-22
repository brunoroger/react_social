import React, { Component } from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';
import { connect } from "react-redux";
import ModalAdd from './ModalAdd';
import { removePost, editPost } from '../actions';
import PostItem from './PostItem';

const mapStateToProps = state => {
	return {
		post: state.post,
		categories: state.categories
	};
};

const mapDispatchToProps = dispatch => {
	return {
		editPost:   post => dispatch(editPost(post)),
		removePost: idPost => dispatch(removePost(idPost))
	};
};

class ListPost extends Component {
	
	state = {
		categorySel: "",
		order: "vote"
	};
	
	onChangeCategory = (e) => {
		this.setState({ categorySel: e.target.value });
	};
	
	onChangeOrder = (e) => {
		this.setState({ order: e.target.value });
	};

	render(){
		return (
			<div>    		
				<Row>
					<Col md={ 4 }>
						<FormControl componentClass="select" name="filterCategory" id="filterCategory" onChange={ this.onChangeCategory }>
							<option value="">Categorias</option>
							{this.props.categories.map(cat => (
								<option key={cat.path} value={cat.path}>{cat.name}</option>
							))}
						</FormControl>
					</Col>
					<Col md={ 4 }>
						<FormControl componentClass="select" name="filterOrder" id="filterOrder" onChange={ this.onChangeOrder }>
							<option value="vote">Ordernar por Curtidas</option>
							<option value="date">Ordernar por Data de Criação</option>
						</FormControl>
					</Col>
					<Col md={ 4 }>
						<ModalAdd></ModalAdd>
					</Col>
				</Row>
				<br/>
				{this.props.post.filter(el => !el.deleted && (el.category === this.state.categorySel || this.state.categorySel === "") )
				.sort((a, b) => {
					if(this.state.order === 'vote'){
						return a.voteScore < b.voteScore;
					}else{
						return a.timestamp > b.timestamp;
					}
				})
				.map(el => (
					<Row key={el.id}>
						<PostItem editPost={this.props.editPost} removePost={this.props.removePost} post={el}/>
					</Row>
				))}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);