$(document).ready(function(){
    $(".menu-toggle").click(function(){
      $("body").addClass("toggle");
      $(".closed-menu").click(function(){
        $("body").removeClass("toggle");
      });
    });

    // $(".price-card").click(function(){
    //   $(this).addClass("active").siblings().removeClass("active")
    // });

})
  

 AOS.init();


gsap.registerPlugin(ScrollTrigger);

gsap.from(".solution-content", {
  y: 100,
  opacity: 0.5,
  ease: "none",
  scrollTrigger: {
    trigger: ".solution-content",
    start: "top 85%",
    end: "top 40%",
    scrub: true,
    // markers: true
  }
});


gsap.from(".mind-img img", {
  scale: 0,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".mind-img",
    start: "top 80%",
    end: "top 30%",
    scrub: true,
    // markers: true
  }
});


// const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".how-we-got-content",
//     start: "top 75%",
//     end: "center 50%",
//     scrub: true,
//     // markers:true
//   }
// });

// tl.from(".how-we-got-content h2", {
//   y: 100,
//   opacity: 0
// })
// .from(".how-we-got-content > p", {
//   y: 80,
//   opacity: 0
// }, "-=0.2")
// .from(".how-we-got-content .qoute", {
//   y: 60,
//   opacity: 0,
//   scale: 0.9
// }, "-=0.2");

