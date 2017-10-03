import searchConstants from '../constants/search_constants';

const initialState = {
	isSearching: false
};

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case searchConstants.GET_SEARCH_REQUEST:
			updated.isSearching = true;

			return updated;

		default:
			return updated;
	}
};
