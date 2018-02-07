import {
	ADD_RECIPE,
	ADD_COMMENT
} from '../actions';

const initialState = {
	post: []
};

function post(state = initialState, action){
	const {author, title, body} = action;
	
	switch(action.type){
		case ADD_RECIPE :
			return {
				...state,
				[post]: action
			};
		default :
			return state;
	}
}

export default combineReducers({
	post
});