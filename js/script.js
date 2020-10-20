'use strict';

// меню
(function () {
  var menu = document.querySelector('.navigation');
  var menuBtn = document.querySelector('.header__nav-btn');
  var btnSvg = document.querySelector('.ham1');

  menuBtn.addEventListener('click', function () {
    menu.classList.toggle('navigation--show');
    menuBtn.classList.toggle('header__nav-btn--active');
    btnSvg.classList.toggle('active');
  });
})();

if (document.querySelector('.banner')) {
  //слайдер
  $(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 1,
      dots: false,
      nav: true
    });
  });
};

if (document.querySelector('.filter')) {
  // фильтр
  $(function(){
    $( "#slider-range" ).slider({
      range: true,
      min: 1500,
      max: 100000,
      step: 500,
      values: [ 10000, 60000 ],
      slide: function( event, ui ) {
        $( "#price" ).val( "от ₽ " + ui.values[ 0 ] + " - до ₽ " + ui.values[ 1 ] );
      }
    });
    $( "#price" ).val( "от ₽ " + $( "#slider-range" ).slider( "values", 0 ) +
    " - до ₽ " + $( "#slider-range" ).slider( "values", 1 ) );
  });

  var filter = document.querySelector('.filter');
  var filterItem = filter.querySelectorAll('.filter__item');
  var filterOpen = document.querySelector('.filter__open');
  var filterClose = filter.querySelector('.filter__btn-close');

  filterItem.forEach(function (item) {
    var filterTitle = item.querySelector('.filter__title');
    var checkboxBox = item.querySelector('.filter__checkboxs');

    filterTitle.addEventListener('click', function () {
      item.classList.toggle('filter__item--open');
    });
  });

  filterOpen.addEventListener('click', function () {
    filter.classList.add('filter--open');
  });

  filterClose.addEventListener('click', function () {
    filter.classList.remove('filter--open');
  });
};
