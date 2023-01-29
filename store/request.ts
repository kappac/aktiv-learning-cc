import { API_TOKEN, API_URL } from '@env';
import { ajax } from 'rxjs/ajax';

const basicUrl = `${API_URL}?key=${API_TOKEN}`;
export default (query: string, page: number = 1, perPage: number = 20) =>
	ajax.getJSON(`${basicUrl}&q=${query}&page=${page}&per_page=${perPage}`);
