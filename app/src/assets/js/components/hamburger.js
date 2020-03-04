// Dropdown Menu
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.hamburger').classList.toggle('is-active');
    document.querySelector('.nav__link--active').classList.remove('.nav__link--active');
    var divs = document.querySelectorAll('.nav__link');
        for (var i = 0; i < divs.length; i++) {
            divs[i].classList.toggle('nav__link--visible');
    }
})
