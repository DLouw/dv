(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

//sessionStorage.setItem("firstLoad", "");
console.log(sessionStorage);

var controller = new ScrollMagic.Controller();

$(document).ready(function(){
    
    var parts = ['info', '@', 'digivate', '.', 'co.za'];
    
    $("#mailshow").click(function(){
        console.log("clicked");
        $("#mailaddress").prop("href", "mailto:" + parts.join(''));
        $("#mailaddress").text(parts.join(''));
    });
    
    //Scroll animations
    
    
    var whyusTween1 = TweenMax.from(".section-whyus .twn1", 1, {y: "300", opacity: 0, ease:Power2.easeOut});
    var whyusScene1 = new ScrollMagic.Scene({triggerElement:"#whyus"})
            .setTween(whyusTween1)
            .addTo(controller);
    
    var whyusTween2 = TweenMax.from(".section-whyus .twn2", 1, {opacity: 0, ease:Power2.easeOut}, 0.3);
    var whyusScene2 = new ScrollMagic.Scene({triggerElement:".section-whyus", triggerHook: "-0.55"})
            .setTween(whyusTween2)
            .addTo(controller);
    
    var featuresTween1 = TweenMax.from("#features .twn1", 1, {y: "300", opacity: 0, ease:Power2.easeOut});
    var featuresScene1 = new ScrollMagic.Scene({triggerElement:"#features"})
            .setTween(featuresTween1)
            .addTo(controller);
    
    
    var featuresTween2 = TweenMax.staggerFrom(".section-features .row1 .twn2", 1, {opacity: 0, ease:Power2.easeOut}, 0.5);
    var featuresScene2 = new ScrollMagic.Scene({triggerElement:".section-features .row1"})
            .setTween(featuresTween2)
            .addTo(controller);
    
    
    var bizoneTimeline = new TimelineMax();
    
    bizoneTimeline.staggerFrom(".section-bizone .twn1", 1, {opacity:0})
        .from(".section-bizone .twn2", 0.4, {opacity:0}, "+=0.6")
        .from(".section-bizone .twn3", 0.4, {opacity:0, y: 100}, "+=0.6")
        .from(".section-bizone .twn4", 0.4, {opacity:0, x:100}, "+=0.5");
    
    var bizoneScene = new ScrollMagic.Scene({triggerElement:".section-bizone .twn1"})
        .setTween(bizoneTimeline)
        .addTo(controller);
    
    var contactTween = new TweenMax.staggerFrom("#contact .icon", 0.9, {opacity: 0, x: 100}, 0.3);
    
    var contactScene = new ScrollMagic.Scene({triggerElement:"#contact"})
        .setTween(contactTween)
        .addTo(controller);
    
    //About page animation
    //What we do list 
//    var aboutTween = TweenMax.staggerFrom(".page-about .tw1", 1, {opacity: 0, scale: 1.5, ease:Power3.easeIn}, 0.2);
//    var featuresScene2 = new ScrollMagic.Scene({triggerElement:".section-whatwedo .do-list"})
//            .setTween(aboutTween)
//            .addTo(controller);
    
    
});

function splash(param) {
    if(sessionStorage.getItem("firstLoad") == "true"){
        $("#splash").hide();
        $("body").removeClass("no-scroll");
    } else{
        
        //Create timeline for header
        var headerTimeline = new TimelineMax({paused:"true", delay:0.5});

        headerTimeline.from(".section-header .twn1", 1, {opacity:0, y:100})
                      .from(".section-header .twn2", 0.4, {opacity:0}, "+=0.6")
                      .from(".section-header .twn3", 0.3, {opacity:0, scale:2, color:"#dc2430", ease:Power2.easeIn}, "+= -0.4")
                      .from(".section-header .twn4", 0.3, {opacity:0, scale:2, color:"#dc2430",ease:Power2.easeIn}, "+=0.4")
                      .from(".section-header .twn5", 0.3, {opacity:0, scale:2, color:"#dc2430",ease:Power2.easeIn}, "+=0.4")
                      .from(".section-header .twn6", 0.2, {opacity:0}, "+=0.8")
                      .from("#mainNav", 0.2, {opacity:0}, "+= -0.2")
                      .to(".section-header .twn6", 0.4, {borderColor: "#dc2430"}, "+=0.2");
        
        sessionStorage.setItem("firstLoad", "true");
        var time = param;
      
        setTimeout(function(){
           $("#splash").animate({opacity: 0}, 500, function(){
           $(this).hide();
           $("body").removeClass("no-scroll");
           headerTimeline.play();
          }); 
        }, time); 
    }
}