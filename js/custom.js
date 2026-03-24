(function ($) {

    "use strict";

  // PRE loader
  $(window).on("load", function () {
    $(".preloader").fadeOut(800);
  });

  // Parallax Js (guarded so page still works when plugin is unavailable)
  function initParallax() {
    if (!$.fn.parallax) {
      return;
    }

    $("#home").parallax("100%", 0.3);
    $("#about").parallax("20%", 0.3);
    $("#work").parallax("40%", 0.3);
    $("#contact").parallax("60%", 0.3);
    $("#footer").parallax("80%", 0.3);
  }

  // WOW animation (guarded for graceful degradation)
  function initAnimations() {
    if (typeof WOW === "undefined") {
      return;
    }

    new WOW({ mobile: false }).init();
  }

  function initSmoothSectionLinks() {
    $("a[href^='#']").on("click", function (event) {
      var targetId = $(this).attr("href");
      var $target = $(targetId);

      if (!$target.length || targetId === "#") {
        return;
      }

      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $target.offset().top - 20
        },
        600
      );
    });
  }

  function initImageHoverLift() {
    $(".work-thumb").on("mouseenter", function () {
      $(this).stop(true, true).animate({ marginTop: "-6px" }, 180);
    });

    $(".work-thumb").on("mouseleave", function () {
      $(this).stop(true, true).animate({ marginTop: "0px" }, 180);
    });
  }

  function initContactFormFeedback() {
    var $contactForm = $("#contact-form");

    if (!$contactForm.length) {
      return;
    }

    $contactForm.on("submit", function (event) {
      event.preventDefault();

      var name = $.trim($contactForm.find("input[name='name']").val() || "");
      var email = $.trim($contactForm.find("input[name='email']").val() || "");
      var message = $.trim($contactForm.find("textarea[name='message']").val() || "");
      var emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      $contactForm.find(".form-feedback").remove();

      if (!name || !emailIsValid || message.length < 10) {
        $contactForm.append(
          '<p class="form-feedback" style="color:#d93025;margin-top:12px;">Completeaza corect campurile: nume, email valid si un mesaj de minim 10 caractere.</p>'
        );
        return;
      }

      $contactForm.append(
        '<p class="form-feedback" style="color:#1b8f3a;margin-top:12px;">Multumim! Mesajul tau a fost pregatit pentru trimitere.</p>'
      );
      $contactForm[0].reset();
    });
  }

  $(function () {
    initParallax();
    initAnimations();
    initSmoothSectionLinks();
    initImageHoverLift();
    initContactFormFeedback();
  });

})(jQuery);
