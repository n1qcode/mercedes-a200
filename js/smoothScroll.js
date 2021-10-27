'use strict'

const linksHead = document.querySelectorAll('.menu-list__link');
const mainScroll = document.querySelector('.main__scroll');
const newArray = [...linksHead, mainScroll];
const burgerMirror = document.querySelector('.humburger-menu');
const menuElemMirror = document.querySelector('.menu');

newArray.forEach(link => {

    link.addEventListener('click', (event) => {

        event.preventDefault();

        const ID = event.target.getAttribute('href').substr(1);

            document.getElementById(ID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

        burgerMirror.classList.remove('humburger-menu-active')
        menuElemMirror.classList.remove('menu-active')

    })
})