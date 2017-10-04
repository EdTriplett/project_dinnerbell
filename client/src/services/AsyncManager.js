import superagent from 'superagent';
import _ from 'lodash';

const _get = async (url, params = null) => {
	try {
		const response = await superagent
			.get(url)
			.set('Accept', 'application/json')
			.query(params);

		return response.body;
	} catch (e) {
		throw e;
	}
};

const _post = async (url, params = null) => {
	try {
		const response = await superagent
			.post(url)
			.set('Accept', 'application/json')
			.send(params);

		return response.body;
	} catch (e) {
		throw e;
	}
};

export default {
	getRequest: (path, params, actionType, cb) => async dispatch => {
		try {
			const payload = await _get(path, params);

			console.log(payload, 'this is the response body');

			dispatch({
				type: actionType,
				payload: payload,
				params: params
			});

			if (_.isFunction(cb)) {
				cb(payload);
			}

			return payload;
		} catch (e) {
			throw e;
		}
	},

	postRequest: (path, params, actionType, cb) => async dispatch => {
		try {
			const payload = await _post(path, params);

			dispatch({
				type: actionType,
				payload: payload
			});

			if (_.isFunction(cb)) {
				cb(payload);
			}

			return payload;
		} catch (e) {
			throw e;
		}
	}
};
