import { writable } from "svelte/store"
import {v4 as uuidv4} from 'uuid'

// create a store to save all todos
export const todo = writable(JSON.parse(localStorage.todo) || [])

todo.subscribe((value) => localStorage.todo = JSON.stringify(value))