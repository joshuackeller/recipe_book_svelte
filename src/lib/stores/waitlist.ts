// src/stores/waitlist.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Set the stored value or a sane default.
export const waitlist = writable<boolean>(
	browser ? localStorage.getItem('waitlist') === 'true' : false
);

// Anytime the store changes, update the local storage value.
waitlist.subscribe((value) => {
	if (browser) {
		if (typeof value !== 'boolean') {
			localStorage.removeItem('waitlist');
		} else {
			return (localStorage.waitlist = value);
		}
	}
});
