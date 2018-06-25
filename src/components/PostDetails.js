import React, { Component } from 'react';
import { Panel,Tabs,Tab,Row,Col } from 'react-bootstrap';
import * as PostApi from '../util/PostApi';

class PostDetails  extends Component {
	state = {
		post: {
			id: 0,
			timestamp: 0,
			title: null,
			author: null,
			body: null,
			category: null,
			voteScore: 0,
			deleted: null,
			commentCount: 0
		}
	}

	componentDidMount(){
		PostApi.get(this.props.match.params.id).then((post) => {
			this.setState({ post });
		});
	}

	render(){
		return (
			<div>
				<Panel bsStyle="primary">
    				<Panel.Heading>
      					<Panel.Title componentClass="h3">{this.state.post.title}</Panel.Title>
    				</Panel.Heading>
    				<Panel.Body>
    					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						  <Tab eventKey={1} title="Detalhes">
						    <Row>
						    	<Col md={ 12 }>
						    		{this.state.post.body}
						    	</Col>
						    </Row>
						  </Tab>
						  <Tab eventKey={2} title="Comentários">
						    Comentários
						  </Tab>
						</Tabs>
    				</Panel.Body>
  				</Panel>
			</div>
		);
	}
}

export default PostDetails;