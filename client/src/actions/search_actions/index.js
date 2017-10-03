import searchConstants from '../../constants/search_constants';
import AsyncManager from '../../services/AsyncManager';

export function getSearchRequest() {
	return {
		type: searchConstants.GET_SEARCH_REQUEST
	};
}

export function setTestLoading(bool) {
	return {
		type: searchConstants.TEST_LOADING,
		payload: bool
	};
}

export function testSearch() {
	return dispatch => {
		dispatch(setTestLoading(true));
		return dispatch(
			AsyncManager.getRequest(
				'https://swapi.co/api/planets/1/?format=wookiee',
				null,
				searchConstants.TEST_FETCH,
				() => {
					dispatch(setTestLoading(false));
				}
			)
		);
	};
}
