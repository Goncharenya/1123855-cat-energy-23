let navList = document.querySelector('.nav__list'),
    menuOpen = document.querySelector('.menu__open'),
    navBurgerOpen = document.querySelector('.nav__burger-open'),
    nav = document.querySelector('.nav');

navList.classList.remove("menu__open");
navBurgerOpen.classList.remove("menu__hidden");

nav.addEventListener("click", function () {
  // if(navList !== null){
  //   navList.classList.remove("menuOpen");
  // }
  navList.classList.toggle("menu__open");
  navBurgerOpen.classList.toggle("menu__close");
});
