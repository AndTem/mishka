var mainNav = document.querySelector('.main-nav');
var menuHamburderButton = document.querySelector('.hamburger-button');

mainNav.classList.remove('main-nav--nojs');
menuHamburderButton.classList.remove('hamburger-button--nojs');

menuHamburderButton.addEventListener('click', function() {
  menuHamburderButton.classList.toggle('hamburger-button--open');
  mainNav.classList.toggle('main-nav--closed');
});

window.onhashchange = function () {
  if (!mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.toggle('main-nav--closed');
  }
};
