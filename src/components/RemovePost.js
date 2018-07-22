import React, { Component } from 'react';
import { Button, Glyphicon,  } from 'react-bootstrap';
import { connect } from "react-redux";
import { removePost } from '../actions';
import * as PostApi from '../util/PostApi';

const mapDispatchToProps = dispatch => {
  return {
    removePost: idPost => dispatch(removePost(idPost))
  };
};

class RemovePost  extends Component {
		onRemovePost = () => {
			PostApi.remove(this.props.idPost);
			this.props.removePost(this.props.idPost);
			this.props.onRemove(this.props.idPost);
		}
		
		render(){
			return (
				<div>				
					<Button bsStyle="danger" className="left" onClick={this.onRemovePost}><Glyphicon glyph="remove" /> Remover Post</Button>
				</div>
			);
		}
}

export default connect(null, mapDispatchToProps)(RemovePost);