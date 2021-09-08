window.onload = load;

function load() {

  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".menu");
  const menuNav = document.querySelector(".menu__nav");
  let logo = document.querySelector('.header__logo');
  logo.addEventListener('click', logoScroll)
  function logoScroll(){
    document.documentElement.scroll({top: 0,behavior: 'smooth'});
    return
  }

 // Слайдер в Галлерее
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 3,
    freeMode: true,
    pagination: {
      clickable: true,
    },
  });
  burger.addEventListener("click", toggleMenu);
  // Функция мобильного меню

  function toggleMenu() {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
    menuNav.classList.toggle("active");
    let nav = document.querySelector('.header__nav');
    if(nav.classList.contains('active')){
      document.body.classList.add('lock')
    }else{
      document.body.classList.remove('lock')
    }
  }
  // Стиль Эктив для ссылок навигации при скролле к блоку

  function scrollTo() {
    let scrollDistance = window.scrollY;
    let header = document.querySelector(".header");
    scrollDistance > 100
      ? header.classList.add("active")
      : header.classList.remove("active");
    if (window.innerWidth > 992) {
      document.querySelectorAll(".section").forEach((el, i) => {
        if (el.offsetTop - header.clientHeight <= scrollDistance) {
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
  document.addEventListener("scroll", scrollTo);

  const bg = document.querySelector(".calc-img-2");
  const item1 = document.querySelector(".item-1");
  const item2 = document.querySelector(".item-2");
  let repairCheckbox = document.querySelectorAll(".checkbox__item");
  repairCheckbox.forEach((el) => el.addEventListener("click", changeCheckbox));

  // Стили для чекбоксов в калькуляторе
  function changeCheckbox(e) {
    console.log(e.target.parentNode);
    if (e.target.parentNode.classList.contains("item-1")) {
      item2.classList.remove("active");
      item1.classList.add("active");
      bg.classList.add("active");
    } else if (e.target.parentNode.classList.contains("item-2")) {
      item1.classList.remove("active");
      item2.classList.add("active");
      bg.classList.remove("active");
    }
  }

  const product = document.querySelectorAll(".gallery-icons");
  Array.from(product).forEach((el) => {
    el.addEventListener("click", showImg);
  });
  // Функция показа большой картинки в блоке "Галлерея" работает от Data аттрибутов (BigImg)
  function showImg(event) {
    event = event || window.event;
    let iconImg = event.Target || event.srcElement;
    if (iconImg.tagName == "IMG") {
      let bigImg = iconImg.getAttribute("data");
      document.getElementById(bigImg).src = iconImg.getAttribute("src");
    }
  }
  const rangeSlider = document.querySelector(".slider-progress");
  const areaValue = document.getElementById("areaValue");
  const minusPlus = document.querySelectorAll(".minusPlus");
  let total = document.getElementById("total");
  const conditionRepair = document.getElementById("condition");
  const typeRepair = document.getElementById("type");
  const selects = document.querySelectorAll(".selects");

  let valueBatthrom = 1;
  let valueRoom = 1;

  rangeSlider.addEventListener("input", changeArea);
  Array.from(selects).forEach((el) =>
    el.addEventListener("change", changeArea)
  );
  minusPlus.forEach((el) => el.addEventListener("click", valueButtons));
  // Функция калькулятора
  function changeArea(e) {
    areaValue.textContent = rangeSlider.value;
      let num = Number(rangeSlider.value) * (Number(conditionRepair.value) +
      Number(typeRepair.value) +
      (valueBatthrom * 500 + valueRoom * 500));
      num = numeral(num).format('0,0[.]00 ₽');
    return total.textContent = num;
  }

  const bathroom = document.getElementById("bathroom");
  const room = document.getElementById("room");
  // Калькулятор функция по кнопкам
  function valueButtons(e) {
    if (e.target.classList.contains("meter__minus")) {
      rangeSlider.value--;
      areaValue.textContent = rangeSlider.value;
    } else if (e.target.classList.contains("meter__plus")) {
      rangeSlider.value++;
      areaValue.textContent = rangeSlider.value;
    } else if (e.target.classList.contains("room__minus") && valueRoom > 1) {
      valueRoom--;
      room.textContent = valueRoom;
    } else if (e.target.classList.contains("room__plus") && valueRoom < 10) {
      valueRoom++;
      room.textContent = valueRoom;
    } else if (
      e.target.classList.contains("bathroom__minus") &&
      valueBatthrom > 1
    ) {
      valueBatthrom--;
      bathroom.textContent = valueBatthrom;
    } else if (
      e.target.classList.contains("bathroom__plus") &&
      valueBatthrom < 10
    ) {
      valueBatthrom++;
      bathroom.textContent = valueBatthrom;
    }
    // Вовзвращает значение функции калькулятора
    return changeArea();
  }

// Функция скролл к блоку
document.querySelectorAll('a[href^="#"').forEach(link => {
  link.addEventListener('click', scroll);
  });
  // Скролл к блоку
  function scroll(e) {
    e.preventDefault();
    if(window.innerWidth >= 1050){
      let href = this.getAttribute('href').substring(1);
      let scrollTarget = document.getElementById(href);
      let topOffset = document.querySelector('.header').offsetHeight;
      let elementPosition = scrollTarget.getBoundingClientRect().top;
      let offsetPosition = elementPosition - topOffset;
    window.scrollBy({top: offsetPosition,behavior: 'smooth'});
    }else{
    let href = this.getAttribute('href').substring(1);
    let scrollTarget = document.getElementById(href);
    let elementPosition = scrollTarget.getBoundingClientRect().top;
    let offsetPosition = elementPosition - 40;
    window.scrollBy({top: offsetPosition,behavior: 'smooth'});
    return toggleMenu();
    }
    
  }
  // Маска для  телефона!!!!!!!!
  function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);
  
    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length <= 4) {
        this.value = "";
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "+7(___) ___ - __ - __";
      }
  
    }
    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);

    }
  }
  
  maskPhone('.telephone');
}
