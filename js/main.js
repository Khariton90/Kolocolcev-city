window.onload = load;

function load() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".menu");
  const menuNav = document.querySelector(".menu__nav");
  burger.addEventListener("click", toggleMenu);
  function toggleMenu() {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    menuNav.classList.toggle("active");
  }
  function scrollTo() {
    let scrollDistance = window.scrollY;
    let header = document.querySelector(".header");
    scrollDistance > 100 ? header.classList.add('active') : header.classList.remove('active')
    if (window.innerWidth > 992) {
      document.querySelectorAll(".section").forEach((el, i) => {
        if (
          el.offsetTop - header.clientHeight <=
          scrollDistance
        ) {
          document.querySelectorAll(".menu__link").forEach((el) => {
            if (el.classList.contains("active")) {
              el.classList.remove("active");
            }
          });

          document.querySelectorAll(".menu__link")[i].classList.add("active");
        }
      });
    }
  }
  document.addEventListener('scroll',scrollTo );
  const calc = document.querySelector(".calc-repair");
  const bg = document.querySelector(".calc-img-2");
  calc.addEventListener("click", bag);

  function bag() {
    bg.classList.toggle("active");
  }

  const product = document.querySelectorAll(".gallery-icons");
  Array.from(product).forEach((el) => {
    el.addEventListener("click", showImg);
  });
  function showImg(event) {
    event = event || window.event;
    let iconImg = event.Target || event.srcElement;
    if (iconImg.tagName == "IMG") {
      let bigImg = iconImg.getAttribute("data");
      document.getElementById(bigImg).src = iconImg.getAttribute("src");
    }
  }
}
