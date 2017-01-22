var app;

$(document).ready(function(){
  app = {
    init: function() {
      app.handleScrollLinks();
      $(window).on('scroll', app.checkIfInView);
      $(window).on('scroll resize', app.checkIfInView);
      $(window).trigger('scroll');
      document.getElementById('myGmail').addEventListener('click', app.copyText);
    },
    copyText: function(e) {
      var val = document.getElementById('myGmail');
      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(val);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      document.execCommand("Copy", false, null);
    },
    handleScrollLinks: function() {
      $("a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        }
      });
    },
    handleSkillsAnimate: function() {
      $('.skillbar').each(function() {
        $(this).find('.skillbar-bar').animate({
          width:$(this).attr('data-percent')
        }, 1500);
      });
    },
    checkIfInView: function() {
      var window_height = $(window).height();
      var window_top_position = $(window).scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      $('.skillbar').each(function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            app.handleSkillsAnimate();
        //   $element.addClass('in-view');
        // } else {
        //   $element.removeClass('in-view');
        }
      });
    }
  };
});