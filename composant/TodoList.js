import { CreatElement } from "../fonction/DOM.js"

/**
 * @typedef {object} Todo 
 * @property {Number} "id" 
 * @property {String} "title"
 * @property {boolean} "completed"
 */
export class TodoList {
    #todos = []

    constructor (todos) {
        this.#todos = todos 
    }

    appendTo (element) {
        const tpl = document.getElementById ("tpl-todolist").content.cloneNode(true)
        element.append (tpl)
        const list = document.querySelector (".list-group")
        for (let i of this.#todos) {
            const unaTodo = new ListItem (i)
            unaTodo.appendToo (list)
        }
        const formInput = document.querySelector ("form")
        formInput.addEventListener ("submit", e => {
            e.preventDefault ()
            const title = new FormData (e.currentTarget).get ("title").toString ().trim ()
            if (title === "") {
                return
            }
            const ObjetTodo = {
                title: title, 
                completed : false,
                id : Date.now ()
            }
            const unaTodo = new ListItem (ObjetTodo)
            unaTodo.appendToo (list)
        })
    }
}

class ListItem {

    #element

    constructor (todo) {
        const li = CreatElement ("li", {class: "todo list-group-item d-flex align-items-center"})
        const checkbox = CreatElement ("input", {class: "form-check-input", id: `todo-${todo.id}`, type: "checkbox", checked: todo.completed ? '': null})
        const checkboxLabel = CreatElement ("label", {class: "ms-2 form-check-label", for: `todo-${todo.id}`})
        checkboxLabel.innerText = todo.title
        const button = CreatElement ("button", {class:"ms-auto btn btn-danger btn-sm"})
        const icon = CreatElement ("i", {class:"bi-trash"})
        button. append (icon)
        li.append (checkbox, checkboxLabel, button)
        this.#element = li

        button.addEventListener ("click", e => {
            this.#element.remove ()
        })
    }

    appendToo (element) {
        element.append (this.#element)
    }
}