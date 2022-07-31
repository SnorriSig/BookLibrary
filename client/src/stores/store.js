import { exclude_internal_props } from "svelte/internal";
import { readable, writable } from "svelte/store";

export const isLoggedIn = writable(false);

export const email = readable("snor0259@stud.kea.dk")

export const cart = writable([])

export const user = writable({})