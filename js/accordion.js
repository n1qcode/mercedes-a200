'use strict'

const lists = document.querySelectorAll('.feature-sub');
const btns = document.querySelectorAll('.feature__link');

// for (let i = 0; i < btns.length; i++) {
//     btns[i].addEventListener('click', () => {
//         console.log(btns[i])
//     })
// }

btns.forEach((btnItem, index) => {

    btnItem.addEventListener('click', () => {

        btns.forEach((btnItem) => {

            btnItem.classList.remove('feature__link_active');

        })

        btnItem.classList.add('feature__link_active');

        lists.forEach((listItem) => listItem.classList.add('hidden'));

        lists[index].classList.remove('hidden');

    })

})