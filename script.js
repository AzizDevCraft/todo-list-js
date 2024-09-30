class TodoList {

    #todos = []

    constructor (todos) {
        this.#todos = todos
    }

    appendTodo (todo){

    }
}

/**
 * elle cree des element html avec directement des attributs
 * @param {HTMLElementTagNameMap} tag 
 * @param {object} attributs
 * @param {HTMLElement} content 
 */

function createHTML (tag, attributs = {}, content="") {
    const ele = document.createElement (tag)
    for (let [key, value] of Object.entries (attributs)) {
        ele.setAttribute (key, value)
    }
    ele.innerHTML = content 
    return ele
}

function barre (id) {
    const input = document.querySelector (`#${id}`)
    input.addEventListener ("change", e => {
        const label = document.querySelector (`label[for=${id}]`)
        if (e.currentTarget.checked) {
            label.style.textDecoration = "line-through"
        }else {
            label.style.textDecoration = "none"
        }
    })
}

function remove (classe) {
    const todo = document.querySelector (`.${classe}`)
    todo.querySelector (".poubelle").addEventListener ("click", e => {
        console.log (e.currentTarget)
        todo.remove ()
    })
}

function changed (selector) {
    
}

barre ("tache1")
remove ("todo-item")

/*
.addEventListener ("click", e => {
        console.log (e.currentTarget)
        e.currentTarget.remove ()
    })
        */