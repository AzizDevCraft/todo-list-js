import { CreatElement } from "../fonction/DOM.js"

/**
 * @typedef {object} Todo 
 * @property {Number} "id" 
 * @property {String} "title"
 * @property {boolean} "completed"
 */
export class TodoList {
    #todos = []
    #listTodos = []

    constructor (todos) {
        this.#todos = todos 
    }

    appendTo (element) {
        const tpl = document.getElementById ("tpl-todolist").content.cloneNode(true)
        element.append (tpl)
        this.#listTodos = document.querySelector (".list-group")
        for (let i of this.#todos) {
            const unaTodo = new ListItem (i)
            unaTodo.appendToo (this.#listTodos)
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
            unaTodo.prependToo (this.#listTodos)
            e.currentTarget.reset()
        })

        element.querySelectorAll (".btn-group button").forEach(button => {
            button.addEventListener ("click", e => this.#toggleFilter (e) )
        })
    }

    /**
    * @param {PointerEvent} e
    */
    #toggleFilter (e) {
        e.preventDefault ()
        const filter = e.currentTarget.getAttribute ("data-filter")
        e.currentTarget.parentElement.querySelector(".active").classList.remove ("active")
        e.currentTarget.classList.add ("active")
        if (filter === "todo") {
            this.#listTodos.classList.add ("hide-completed")
            this.#listTodos.classList.remove ("hide-todo")
        }else if (filter === "done") {
            this.#listTodos.classList.add ("hide-todo")
            this.#listTodos.classList.remove ("hide-completed")
        }else {
            this.#listTodos.classList.remove ("hide-todo")
            this.#listTodos.classList.remove ("hide-completed")
        }
    }
}

class ListItem {

    #element

    constructor (todo) {
        const li = CreatElement ("li", {class: "todo list-group-item d-flex align-items-center"})
        this.#element = li
        const checkbox = CreatElement ("input", {class: "form-check-input", id: `todo-${todo.id}`, type: "checkbox", checked: todo.completed ? '': null})
        const checkboxLabel = CreatElement ("label", {class: "ms-2 form-check-label", for: `todo-${todo.id}`})
        checkboxLabel.innerText = todo.title
        const button = CreatElement ("button", {class:"ms-auto btn btn-danger btn-sm"})
        const icon = CreatElement ("i", {class:"bi-trash"})
        button. append (icon)
        li.append (checkbox, checkboxLabel, button)
        this.toggle (checkbox)

        button.addEventListener ("click", e => {
            this.#element.remove ()
        })

        checkbox.addEventListener ("change", e => this.toggle (e.currentTarget))
    }

    appendToo (element) {
        element.append (this.#element)
    }

    prependToo (element) {
        element.prepend (this.#element)
    }

    toggle (checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add ("is-completed")
        }else {
            this.#element.classList.remove ("is-completed")
        }
    }
}