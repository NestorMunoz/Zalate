"use strict";

;(function () {

  var form = $("#contact-form");

  /* --- CHANGE LISTENERS --- */
  $(form).find(".input").on("change", function (evt) {
    var $input = $(evt.target);
    var $next_input = $input.parent().next(".step");
    var is_valid = is_form_valid();
    if (!is_valid && $next_input.length > 0) {
      focus_step($next_input);
    } else {
      validate_form();
    }
  });

  /* --- ON-CLICK LISTENER --- */
  $(".path-step").on("click", function (evt) {
    var $current_circle = $(evt.target);
    focus_indicator($current_circle);
    var position = $current_circle.index(".path-step") + 1;
    focus_step($(".step:nth-child(" + position + ")"));
  });

  /* --- SET ACTIVE CLASS ON FOCUSED STEP --- */
  function focus_step($el) {
    $(".step.active").removeClass("active");
    $el.addClass("active");
    $el.find(".input").focus();
    var position = $el.index(".step") * 2 + 1;
    // const position = $(this).data("position");
    $(".path-step.active").removeClass("active");
    $(".path-step:nth-child(" + position + ")").addClass("active");
  }

  /* --- SET ACTIVE CLASS ON FOCUSED PATH-STEP --- */
  function focus_indicator($el) {
    $(".path-step.active").removeClass("active");
    $el.addClass("active");
  }

  /* --- SUBMIT VALIDATED FORM OR RETURN INVALID FOCUSED STEP ELEMENT --- */
  function validate_form() {
    if (is_form_valid(form)) {
      sendForm();
    } else {
      var $el = form.find(".input:invalid").first().parent();
      focus_step($el);
    }
  }

  /* --- VALIDATE FORM --- */
  function is_form_valid() {
    return document.querySelector("#contact-form").checkValidity();
  }

  //VALIDATE TEXTAREA
  $(".step textarea").on("keydown", function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      $(evt.target).blur();
    }
  });

  /* --- AJAX EMAIL --- */
  var email = "c4r4.d3.p3d0@gmail.com";
  $("#contact-form").on("submit", function (evt) {
    evt.preventDefault();
    sendForm($(this));
    return false;
  });

  function sendForm() {
    var $form = form;
    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.formObject(),
      dataType: "json",
      success: function success() {
        $form.slideUp();
        $("#info-contact").html("Enviamos tu mensaje, pronto nos pondremos en contacto.");
      }
    });
  }
})();