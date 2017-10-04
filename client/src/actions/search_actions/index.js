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

export const testFetch = (payload, params) => {
	return {
		type: searchConstants.TEST_FETCH,
		payload: payload,
		params: params
	};
};

export const testSearch = () => async dispatch => {
	try {
		dispatch(setTestLoading(true));
		const payload = await AsyncManager.getRequest(
			'https://swapi.co/api/planets/1/?format=wookiee'
		);
		dispatch(testFetch(payload, params));
		dispatch(setTestLoading(false));
	} catch (error) {
		// dispatch some error action
	}
};
