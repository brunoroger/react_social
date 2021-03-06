import React, { Component } from 'react';
import { connect } from "react-redux";
import { Navbar, Grid } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import * as CategoriesApi from '../util/CategoriesApi';
import * as PostApi from '../util/PostApi';
import ListPost from './ListPost';
import PostDetails from './PostDetails';
import { addCategorie, addPost } from '../actions';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import '../index.css'

const mapDispatchToProps = dispatch => {
	return {
		addCategorie: categorie => dispatch(addCategorie(categorie)),
		addPost: post => dispatch(addPost(post))
	};
};

class App extends Component {
  componentDidMount(){
	CategoriesApi.getAll().then((categories) => {
		categories.map(cat => {
			this.props.addCategorie(cat);
			
			return cat;
		});
	});
	
	PostApi.getAll().then((posts) => {
		posts.map(post => {
			this.props.addPost(post);
			
			return post;
		});
	});
  }
  
  render() {
    return (
    	<div>
      	<Navbar>
      		<Navbar.Header>
    			<Navbar.Brand>
      				<a>React Social</a>
    			</Navbar.Brand>
  			</Navbar.Header>
      	</Navbar>
      	<Grid>
          <Route exact path="/" component={ListPost}/>
          <Route path="/post/:id" component={PostDetails}/>
      	</Grid>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);