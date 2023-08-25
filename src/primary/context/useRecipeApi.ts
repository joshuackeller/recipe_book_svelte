import { PUBLIC_API_URL } from '$env/static/public';
import axios from 'axios';
import { token } from '../stores/token';
import { get } from 'svelte/store';

const useRecipeApi = () => {
	const tokenValue = get(token);

	return axios.create({
		baseURL: PUBLIC_API_URL,
		headers: {
			Authorization: tokenValue
		}
	});
};

export default useRecipeApi;
