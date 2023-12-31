// src/stores/token.js
import { writable } from 'svelte/store'
import { browser } from '$app/environment'


// Set the stored value or a sane default.
export const token = writable<string | null | undefined>(browser ? localStorage.getItem("token") : undefined)

// Anytime the store changes, update the local storage value.
token.subscribe((value) => {
    if(browser) {
        if(value === null || value === "null" || value === undefined || value === "undefined") {
            localStorage.removeItem("token")
        } else {
            return localStorage.token = value
        }
    }
})
