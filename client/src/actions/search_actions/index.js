import searchConstants from '../../constants/search_constants';

export function getSearchRequest() {
	return {
		type: searchConstants.GET_SEARCH_REQUEST
	};
}
