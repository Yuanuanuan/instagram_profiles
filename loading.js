document.addEventListener('DOMContentLoaded', function() {
  const loadingText = document.querySelector('.loading-text');
  const text = new SplitType('.loading-text');
  const squares = document.querySelectorAll('.square');

  loadingText.style.opacity = '1';

  const loadingAnimation = gsap.timeline()
  
  loadingAnimation
    .to('.char', {
      scale: 1,
      opacity: 1,
      duration: .6,
      stagger: .04,
      yoyo: true
    })
    .to(squares, {opacity: 1})

  const squareAnimation = gsap.timeline({repeat: -1});

  squareAnimation
    .from(squares, {
      y:20, duration: .3, stagger: 0.05
    })
    .to(squares, {
      y:20, duration: .3, stagger: 0.05
    }, '<0.4')
});