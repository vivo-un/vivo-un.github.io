var app;

$(document).ready(function(){
  app = {
    init: function() {
      app.handleScrollLinks();
      $(window).on('scroll', app.chec);
      $(window).on('scroll resize', app.checkForAnimations);
      // $(window).trigger('scroll');
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
      document.getElementById('tooltipText').style.visibility = 'visible';
      setTimeout(function(){
        document.getElementById('tooltipText').style.visibility = 'hidden';
      }, 1000);
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
    highlightCurrentSectionInNavBar: function(window_height, adjustedHeight, window_top_position, window_bottom_position) {
      $('.topic').each(function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        var topic = $element.attr('id');

        if ((element_bottom_position >= window_top_position*1.1) &&
            (element_top_position <= window_top_position*1.1)) {
          $('#nav-' + topic).addClass('topic-active');
        } else {
          $('#nav-' + topic).removeClass('topic-active');
        }
      });
    },
    checkIfSkillsInView: function(window_height, adjustedHeight, window_top_position, window_bottom_position){
      $('.skillbar').each(function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            app.handleSkillsAnimate();
        }
      });
    },
    checkForAnimations: function() {
      var window_height = $(window).height();
      var adjustedHeight = window_height * 0.3;
      var window_top_position = $(window).scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      var $nav = $('#main-nav');
      if ($(this).scrollTop() > adjustedHeight) {
        $nav.addClass('light-nav');
      } else {
        $nav.removeClass('light-nav');
      }
      app.highlightCurrentSectionInNavBar(window_height, adjustedHeight, window_top_position, window_bottom_position);
      app.checkIfSkillsInView(window_height, adjustedHeight, window_top_position, window_bottom_position);
    }
  };
});