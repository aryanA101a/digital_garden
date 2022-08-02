  // function post_coinhive(formValues) {
  //     //console.log(formValues);
  //     //console.log(typeof(formValues));
  //     $.post("verify_coinhive", formValues,
  //       function(data, status){
  //         if(status == "success") {
  //           alert("Thanks for supporting us! =) \nIf you wish to support us some more, please reload this page and repeat the process");
  //         } else {
  //           alert("Something went wrong =( try reloading the page and repeat the process \nif you have a AdBlocker, disable it and try again. ");
  //         }

  //         $("#submit_hash").prop( "disabled", true );

  //       });
  // }

  // function myCaptchaCallback(token) {
  //   console.log("token", token);
  //   post_coinhive("coinhive-captcha-token="+token);
  // }

  function showans(ref, id) {
    $('#' + id).addClass('font-weight-bold text-success');
    $('#'+ id +'-txt').show();
    $('#'+ id +'-bk').hide();
    $(ref).hide();
  }

  function showtxtans(ref, id) {
    $('#' + id).show();
    $(ref).hide();
  }


(function($) {
  "use strict"; // Start of use strict
  $('[data-toggle="tooltip"]').tooltip()

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();

    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });



})(jQuery); // End of use strict