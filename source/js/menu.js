var mainNav = document.querySelector('.main-nav');
var menuHamburderButton = document.querySelector('.hamburger-button');

mainNav.classList.remove('main-nav--nojs');

menuHamburderButton.addEventListener('click', function() {
  console.log(mainNav.classList);
  mainNav.classList.toggle('main-nav--closed');
});

window.onhashchange = function () {
  if (!mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.toggle('main-nav--closed');
  }
};
