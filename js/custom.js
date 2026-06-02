$(document).ready(function(){
    $(".menu-toggle").click(function(){
      $("body").addClass("toggle");
      $(".closed-menu").click(function(){
        $("body").removeClass("toggle");
      });
    });

   

$('.learn-more').click(function(){

    $(this).toggleClass('active');

    $(this).next(".hidden-content").slideToggle(500);

});



$(".readmore-btn").click(function () {
  var $btn = $(this);
  var $wrapper = $btn.closest(".readmore-text");

  $wrapper.find(".more-content").toggle();
  $wrapper.find(".dots").toggle();

  if ($btn.text().trim() === "Read More") {
    $btn.text("Read Less");
  } else {
    $btn.text("Read More");
  }
});
    
});




// swiper slider 

// let swiper = new Swiper(".bookSwiper", {

//   slidesPerView: 1,
//   spaceBetween: 20,
//   loop: true,
//   speed: 800,

//   pagination: {
//     el: ".book-pagination",
//     clickable: true,
//   },

//   navigation: {
//     nextEl: ".book-next",
//     prevEl: ".book-prev",
//   },

//   breakpoints: {

//     768: {
//       slidesPerView: 2,
//       spaceBetween: 25,
//     },

//     1024: {
//       slidesPerView: 3,
//       spaceBetween: 40,
//     }

//   }

// });


// testimonial slider 

let testimonialswiper = new Swiper(".testimonialSlider", {

    slidesPerView:1,
    spaceBetween:20,
    loop:true,
    speed:800,

    autoplay:{
        delay:4000,
        disableOnInteraction:false,
    },

    pagination:{
        el:".testimonial-pagination",
        clickable:true,
    },

    navigation:{
        nextEl:".testimonial-next",
        prevEl:".testimonial-prev",
    },
      breakpoints: {

      768: {
        spaceBetween: 25,
      },

      1024: {
        spaceBetween: 30,
      },

      1200: {
        spaceBetween: 40,
      }
      ,
      

    }
    

});



document.querySelectorAll(".book-slider-unique").forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 5,
    // centeredSlides: true,
    loop: true,
    rewind: true,
    grabCursor: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    pagination: {
      el: slider.querySelector(".book-slider-pagination"),
      clickable: true,
    },

    breakpoints: {
      0: {
        spaceBetween: 5,
        // centeredSlides: false,
      },
      576: {
        spaceBetween: 5,
        // centeredSlides: true,
      },
      992: {
        spaceBetween: 5,
        // centeredSlides: true,
      }
    }
  });
});


const swiper = new Swiper('.bookSwiper', {
    loop: true,

    navigation: {
        nextEl: '.book-next',
        prevEl: '.book-prev',
    },
});

let contactFrom = document.querySelector(".contact-form");
let submissionMsg = document.querySelector(".submission-thankyou");

if (contactFrom && submissionMsg) {

  contactFrom.addEventListener("submit", function(e){

    e.preventDefault();

    console.log("form submitted");

    contactFrom.style.display = "none";
    submissionMsg.style.display = "block";

  });

}

 AOS.init();