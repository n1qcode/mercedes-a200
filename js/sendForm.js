'use strict'

const form = document.querySelector('.form-test-drive');

const fields = document.querySelectorAll('.field');

const inputName = document.querySelector('.input-name');
const inputMail = document.querySelector('.input-mail');
const inputPhone = document.querySelector('.input-phone');

const inputsAll = document.querySelector('.input-name, .input-mail, .input-phone');

const generateError = (text) => {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
}

const removeValidation = () => {
    const errors = form.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
}


//НИЖЕ ФРАГМЕНТ КОДА ВАЛИДАЦИИ

// ниже рабочая валидация для всех полей! работает как надо!!!
const checkFieldsEmpty = () => {
    checkFieldName();
    checkFieldMail();
    checkFieldPhone();
    if(checkFieldNameResult()) {return true}
    if(checkFieldMailResult()) {return true}
    if(checkFieldPhoneResult()) {return true}
    if(checkNumName()) {return true}
    if(checkRegMail()) {return true}
}

const checkNumName = () => {
    const regex = /\d/g;
    return regex.test(inputName.value) ? inputName.parentElement.insertBefore(generateError('Имя не должно содержать цифр'), inputName.nextSibling) : false;
}

const checkRegMail = () => {
    const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return !reg.test(inputMail.value) ? inputMail.parentElement.insertBefore(generateError('Электронная почта указана не корректно'), inputMail.nextSibling) : false;
}

const checkFieldName = () => {
    return !inputName.value ? inputName.parentElement.insertBefore(generateError('Поле не заполнено'), inputName.nextSibling) : false;
}
const checkFieldMail = () => {
    return !inputMail.value ? inputMail.parentElement.insertBefore(generateError('Поле не заполнено'), inputMail.nextSibling) : false;
}
const checkFieldPhone = () => {
    return !inputPhone.value ? inputPhone.parentElement.insertBefore(generateError('Поле не заполнено'), inputPhone.nextSibling) : false;
}

const checkFieldNameResult = () => {
    return !inputName.value;
}
const checkFieldMailResult = () => {
    return !inputMail.value;
}
const checkFieldPhoneResult = () => {
    return !inputPhone.value;
}
//выше рабочая валидация для всех полей! работает как надо!!!


// выполняет для каждого поля по очереди проверку, отправляет только после того как все поля будут заполнены
// const checkFieldsPresence = () => {
//     let checkFieldsPresenceEmpty;
//     for (let i = 0; i < fields.length; i++) {
//         if (!fields[i].value) {
//             const error = generateError('Поле не заполнено');
//             form[i].parentElement.insertBefore(error, fields[i].nextSibling);
//             return checkFieldsPresenceEmpty = true;
//         }
//     }
//
// }

// выполняет проверку сразу для всех полей, но есть баг - если заполнить последнее поле, отправляет данные, даже если остальные поля пустые
// const fieldEmptyCheck = (fields) => {
//     return !fields.value ?  fields.parentElement.insertBefore(generateError('Поле не заполнено'), fields.nextSibling) : false;
// }
// //
// const checkFieldsPresence = () => {
//     let flagFieldEmpty;
//     for (let i = 0; i < fields.length; i++) {
//         flagFieldEmpty = fieldEmptyCheck(fields[i]);
//     }
//     return flagFieldEmpty;
// }

//ВЫШЕ ФРАГМЕНТ КОДА ВАЛИДАЦИИ


// отправка данные методом ajax, т.е. за счет preventDefault(), без перезагрузки
form.addEventListener('submit', (event) => {

    event.preventDefault();

    removeValidation();

    let data = {};


    //ниже использован метод деструктуризации
    for (let {name, value} of form.elements) {
        if (name) {
            data[name] = value;
        }
    }
    console.log(data)

if (!checkFieldsEmpty()) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            alert('Данные успешно отправлены на сервер!')
            form.reset()
            console.log(data);
        })
        .catch(error => {
            alert('Произошла ошибка, статус ' + error.message);
        })

    //при разработке чего-либо бэкэнд разработчик предоставляет endpoint - url адрес, который принимает данные и сохраняет их в базе данных

    //ниже пример кода без деструктуризации
    // for (let elem of form.elements) {
    //     if (elem.name) {
    //         console.log(elem.value);
    //     }
    // }
}
})