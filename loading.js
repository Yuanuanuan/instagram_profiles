document.addEventListener('DOMContentLoaded', function() {
  const text = new SplitType('.loading-text');
  const squares = document.querySelectorAll('.square');

  const loadingAnimation = gsap.timeline()
  
  loadingAnimation
    .from('.char', {
      scale: 2,
      opacity: 0,
      duration: .4,
      delay: .5,
      stagger: .04,
    })
    .from(squares, {opacity: 0})

  const squareAnimation = gsap.timeline({repeat: -1});

  squareAnimation
    .from(squares, {
      y:20, duration: .3, stagger: 0.05
    })
    .to(squares, {
      y:20, duration: .3, stagger: 0.05
    }, '<0.4')
});