import {getData} from "./fonction/api.js"
import {CreatElement} from "./fonction/DOM.js"
import {TodoList} from "./composant/TodoList.js"

try {
    const data = await getData ("https://jsonplaceholder.typicode.com/todos?_limit=5")
    const list = new TodoList (data)
    list.appendTo (document.getElementById ("todolist"))

} catch (erreur){
    const alertElement = CreatElement ("div", {class : "alert alert-danger m-2", role : "alert"})
    alertElement.innerHTML = `${erreur.name} : ${erreur.message}`
    document.body.prepend (alertElement)
    console.erreur (erreur)
}

