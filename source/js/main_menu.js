let navList = document.querySelector(".nav__list"),
    menuOpen = document.querySelector(".menu_open"),
    navBurgerOpen = document.querySelector('.nav__burger-open'),
    nav = document.querySelector('.nav');

nav.addEventListener("click", function () {
  // if(navList !== null){
  //   navList.classList.remove("menuOpen");
  // }

  navList.classList.toggle("menu_open");
  navBurgerOpen.classList.toggle("menu_close");
});
