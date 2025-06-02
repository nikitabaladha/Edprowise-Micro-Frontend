// (function ($) {
//   "use strict";

//   $(".select").niceSelect();

//   // Toggle mobile navigation
//   function toggleMobileNavigation() {
//     var navbar = $(".navigation-holder");
//     var openBtn = $(".mobail-menu .open-btn");
//     var xbutton = $(".mobail-menu .navbar-toggler");

//     openBtn.on("click", function (e) {
//       e.stopImmediatePropagation();
//       navbar.toggleClass("slideInn");
//       xbutton.toggleClass("x-close");
//       return false;
//     });
//   }

//   // Function for toggle class for small menu
//   function toggleClassForSmallNav() {
//     var windowWidth = window.innerWidth;
//     var mainNav = $("#navbar > ul");

//     if (windowWidth <= 991) {
//       mainNav.addClass("small-nav");
//     } else {
//       mainNav.removeClass("small-nav");
//     }
//   }

//   toggleClassForSmallNav();

//   $(window).on("load", function () {
//     setTimeout(function () {
//       toggleMobileNavigation();
//     }, 1000);
//   });
// })(window.jQuery);

(function ($) {
  "use strict";

  $(".select").niceSelect();

  function toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".mobail-menu .open-btn");
    var xbutton = $(".mobail-menu .navbar-toggler");

    openBtn.on("click", function (e) {
      e.stopImmediatePropagation();
      navbar.toggleClass("slideInn");
      xbutton.toggleClass("x-close");
      return false;
    });
  }

  // Function for toggle class for small menu
  function toggleClassForSmallNav() {
    var windowWidth = window.innerWidth;
    var mainNav = $("#navbar > ul");

    if (windowWidth <= 991) {
      mainNav.addClass("small-nav");
    } else {
      mainNav.removeClass("small-nav");
    }
  }

  toggleClassForSmallNav();

  $(window).on("load", function () {
    setTimeout(function () {
      toggleMobileNavigation();
    }, 1000);
  });
})(window.jQuery);
