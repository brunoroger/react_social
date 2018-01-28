import React, { Component } from 'react';
import { Navbar, Grid } from 'react-bootstrap';
import ListPost from './ListPost';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

class App extends Component {
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
      		<ListPost></ListPost>
      	</Grid>
      </div>
    );
  }
}

export default App;