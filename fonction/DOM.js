/**
 * @param {string} tagName 
 * @param {object} attributs 
 * @returns {HTMLElement}
 */

export function CreatElement (tagName, attributs = {}) {
    const balise = document.createElement (tagName)
    for (let [key, value] of Object.entries (attributs)) {
        if (value !== null)
        balise.setAttribute (key, value)
    }

    return balise 
}