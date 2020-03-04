//= ../../../../node_modules/picturefill/dist/picturefill.js
//= ../../../../node_modules/bowser/bundled.js
//= ../../../../node_modules/jquery/dist/jquery.js
//= ../../../../node_modules/enquire.js/dist/enquire.js
//= components/slider.js
//= components/hamburger.js

window.addEventListener("load", function() {
    // PARSE USER AGENT
    var result = bowser.getParser(navigator.userAgent).getResult();
   
    // BROWSER INFO
    console.log(result.browser.name);
    console.log(result.browser.version);
    console.log(result.engine);
   
    // OPERATING SYSTEM
    console.log(result.os.name);
    console.log(result.os.version);
    console.log(result.os.versionName);
   
    // PLATFORM
    console.log(result.platform.type);

    if (result.browser.name === 'Internet Explorer') {
        $('.social__icon').addClass('ie');
        $('.news__date').addClass('ie');
        $('.copyright').addClass('ie');
        $('.copyright__text').addClass('ie');
    };

    if (result.browser.name === 'Microsoft Edge') {
        $('.news__date').addClass('edge');
    };

  });


$(document).ready(function() {
	var loc = window.location.pathname;
    if (loc !== '/') {
        $('.nav__item').find('a').each(function() {
            $(this).toggleClass('nav__link--active', $(this).attr('href') ==    loc);
         });
    
    console.log(loc);
}


var popUp = 'zoomIn'; 

$signin = $('.signin');

enquire.register('screen and (max-width: 767px)', {
    match : function() {
        console.log('test');

        $($signin).addClass('mobile');
        if ($signin.hasClass(popUp)) {
            $signin.removeClass(popUp);
        }

    },
    unmatch : function() {
        $($signin).removeClass('mobile');
        if ($signin.hasClass(popUp)) {
            $signin.removeClass(popUp);
        }
    }
 
  });

  enquire.register('screen and (min-width: 768px)', {
    match : function() {
        console.log('test1');
        if ($signin.hasClass(popUp)) {
            $signin.removeClass(popUp);
        }
    }

  });

$('.nav__link--login').on('click', function(event) {
    event.preventDefault();

    if ($signin.hasClass(popUp)) {
        $signin.removeClass(popUp);
    }

    $($signin).toggleClass('signin--visible');


    if (!$signin.hasClass('mobile')) {
            $($signin).addClass(popUp);
    };

    

    $('.nav__link').removeClass('nav__link--visible');
    $('.hamburger').removeClass('is-active');
})

$('.signin__close').on('click', function(event) {
    event.preventDefault();

    $('.signin').removeClass('signin--visible');

})

})




  
