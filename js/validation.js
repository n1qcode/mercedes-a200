'use strict'

// import {form} from "./sendForm";
const form = document.querySelector('.form-test-drive');
const fields = document.querySelectorAll('.field')

const generateError = (text) => {
    const error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
}

const removeValidation = () => {
    const errors = form.querySelectorAll('.error')

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
}

const checkFieldsPresence = () => {
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            console.log('field is blank', fields[i])
            const error = generateError('Поле не заполнено')
            form[i].parentElement.insertBefore(error, fields[i].nextSibling)
        }
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault()

    removeValidation()

    checkFieldsPresence()

})