import searchConstants from '../constants/search_constants';

const initialState = {
	isSearching: false,
	testing: false,
	testResults: null
};

export default (state = initialState, action = {}) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case searchConstants.GET_SEARCH_REQUEST:
			updated.isSearching = true;

			return updated;

		case searchConstants.TEST_LOADING:
			updated.testing = action.payload;

			return updated;

		case searchConstants.TEST_FETCH:
			updated.testResults = action.payload;

			return updated;

		default:
			return updated;
	}
};
