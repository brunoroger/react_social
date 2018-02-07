export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';

export function addPost({author, title, body}){
	return {
		type: ADD_POST,
		author,
		title,
		body
	};
}

export function addComment({author, comment}){
	return {
		type: ADD_COMMENT,
		author,
		comment
	};
}