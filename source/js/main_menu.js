let navList = document.querySelector(".nav__list"),
    menuOpen = document.querySelector(".menu_open"),
    navBurgerOpen = document.querySelector('.nav__burger-open'),
    nav = document.querySelector('.nav');


// function MobileMenu() {
//   navList.classList.add(menuOpen);
// }

nav.addEventListener("click", function () {
  // if(navList !== null){
  //   navList.classList.remove("menuOpen");
  // }

  navList.classList.toggle("menu_open")
});
