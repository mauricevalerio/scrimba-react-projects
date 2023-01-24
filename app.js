import { capitalizeFirstLetter, clearDomChildren } from './utils.js'
import { colorSchemeApi } from './apiConfig.js'

const schemeModesArray = ['monochrome', 'monochrome-dark', 'monochrome-light', 'analogic', 'complement', 'analogic-complement',
    'triad', 'quad']

function getDropDownHtml() {
    let dropdownTemplate = document.createElement('template')

    schemeModesArray.forEach(scheme => {
        dropdownTemplate.innerHTML += `
        <option value="${scheme}">${capitalizeFirstLetter(scheme)}</option>
        `
    })
    document.getElementById('color-scheme-dropdown').append(dropdownTemplate.content)
}

getDropDownHtml()

function getColorSchemeHtml(colorSchemeData) {
    colorSchemeData.colors.forEach(color => {
        document.getElementById('color-scheme-container').innerHTML += `
        <div>
            <div class="color-container" style="background-color:${color.hex.value}"></div>
            <p>${color.hex.value}</p>
        </div>
        `
    })
}

function handleformSubmit(e) {
    e.preventDefault()

    clearDomChildren(document.getElementById('color-scheme-container'))

    colorSchemeApi(new FormData(document.getElementById('color-scheme-form'))) //passes form data
        .then(data => {
            getColorSchemeHtml(data)
        })
}

function handleDarkMode() {
    const darkElements = ['.toggle-mode-inner', '.toggle-mode-outer', '.color-scheme-dropdown', 'button', 'body']
    console.log(darkElements)
    darkElements.forEach(element => {
        document.querySelector(`${element}`).classList.toggle('dark')
    })

    for (let p of document.querySelectorAll('p')) {
        p.classList.toggle('dark')
    }
}

document.getElementById('color-scheme-form').addEventListener('submit', handleformSubmit)

document.getElementById('toggle-mode-outer').addEventListener('click', handleDarkMode)

colorSchemeApi(new FormData(document.getElementById('color-scheme-form'))) //generates default data
    .then(data => {
        getColorSchemeHtml(data)
    })