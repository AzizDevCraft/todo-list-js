export async function getData (url) {
    const reponse = await fetch (url, {
        headers : {"accept" : "application/json"}
    })
    if (reponse.ok) {
        return reponse.json ()
    }else {
        throw new SyntaxError ("serveur ne répond pas, impossible de charger les éléments !")
    }   
}
