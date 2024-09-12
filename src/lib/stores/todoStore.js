import { writable } from "svelte/store"

// create a store to save all todos, getting input from localStorage if set
export const todo = writable(JSON.parse(localStorage.getItem('todo')) || JSON.parse('[]'))

// updating array in localStorage if store gets updated
todo.subscribe((value) => localStorage.setItem('todo', JSON.stringify(value)))