var app;

$(document).ready(function(){
  app = {
    init: function() {
      app.handleScrollLinks();
      app.handleSkillsAnimate();
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
        }, 4000);
      });
    }
  };
});