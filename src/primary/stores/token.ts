// src/stores/token.js
import { writable } from 'svelte/store'
import { browser } from '$app/environment'


// Set the stored value or a sane default.
export const token = writable<string | null | undefined>(browser ? localStorage.getItem("token") : undefined)

// Anytime the store changes, update the local storage value.
token.subscribe((value) => {
    if(browser && value !== "null" && value !== "undefined" && value !== "") {
        return localStorage.token = value
    }
})


export const signOut = () => {
    token.set(undefined)
}