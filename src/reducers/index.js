import {
	ADD_POST
} from '../actions';

function post(state {}, action){
	switch(action.type){
		case ADD_POST :
			return {
				...state,
				...action.post
			};
		default :
			return state;
	}
}

export default post;