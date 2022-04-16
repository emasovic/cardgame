import * as http from './http';

/******************      NEWS        ***********************/

export const getTopHeadlines = filter => {
	return http.get('top-headlines', filter);
};
