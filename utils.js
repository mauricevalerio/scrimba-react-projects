function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function clearDomChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export { capitalizeFirstLetter, clearDomChildren }