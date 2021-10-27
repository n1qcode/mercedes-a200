'use strict'

const modalBtn = document.querySelectorAll('.more');
const modal = document.querySelector('.modal');


for (let mdl of modalBtn) {
    mdl.addEventListener('click', () => {
        modal.classList.remove('hidden')
    })

    // ниже представлено решение - делигирование
    modal.addEventListener('click', (event) => {

        const target = event.target;

        if (target.classList.contains('modal__close') || target.classList.contains('overlay')) {
            modal.classList.add('hidden')
        }

    })

    // как выглядел бы код без делигирования показано ниже

    // const modalClose = document.querySelector('.modal__close');
    // const back = document.querySelector('.overlay')
    // modalClose.addEventListener('click', () => {
    //     modal.classList.add('hidden')
    // })
    //
    // back.addEventListener('click', () => {
    //     modal.classList.add('hidden')
    // })
}