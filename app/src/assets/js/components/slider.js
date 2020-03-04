//= ../../../../../node_modules/slick-carousel/slick/slick.js

$(document).ready(function(){
  $sliderReviews = $('.reviews__slider');
    $sliderReviews.slick({
      arrows: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true
  });

  $featuresSlider = $('.features__inner');

enquire.register('screen and (max-width: 767px)', {
  match : function() {
    if ( !$featuresSlider.hasClass('slick-initialized') ) {
      $featuresSlider.slick({
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true
      });
    }
  }, 
  unmatch : function() {
    if ( $featuresSlider.hasClass('slick-initialized') ) {
      $featuresSlider.slick('unslick');
    }
  }
});


$(".reviews__slider-arrow-left").on("click", function(event) {
  event.preventDefault();

  $sliderReviews.slick('slickPrev');
});

$(".reviews__slider-arrow-right").on("click", function(event) {
  event.preventDefault();

  $sliderReviews.slick('slickNext');
});

  });
