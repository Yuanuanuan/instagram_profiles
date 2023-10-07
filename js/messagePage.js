// 表單發送事件
const form = document.querySelector('.message-form');
const envelope = document.querySelector('.envelope-wrapper');
const errorModal = document.querySelector('.error-modal');

// 表單發送動畫
const formAnimation = gsap.timeline({ paused: true});
const envelopeTop = envelope.querySelector('.envelope .top');
formAnimation
  .from('.envelope', {
    y:200, 
    opacity: 0, 
    duration: .4
  })
  .to(envelopeTop, { 
    rotateX: 180, 
    transformOrigin: 'top center',
    duration: 0.2,
    onComplete: () => {
      envelopeTop.style.zIndex = -1;
    }
  })
  .from('.paper-content', {
    y: -700, 
    opacity: 1, 
    duration: .8,
    onComplete: () => {
      envelopeTop.style.zIndex = 4;
    }
  })
  .to(envelopeTop, { 
    rotateX: 0, 
    transformOrigin: 'top center', 
    duration: 0.4,
  })
  .from('.seal-img', {scale: 3, opacity: 0, duration: .5})
  .to('.envelope', {scale: 1.1, duration: .3})
  .to('.envelope', {scale: 0.2, duration: .2})
  .to('.envelope', {x: 300, y:-300, opacity: 0, duration: .5}, '<0.05')

const errorAnimationOpen = gsap.timeline({ paused: true});
const errorAnimationClose = gsap.timeline({ paused: true});

errorAnimationOpen
  .from(errorModal, {scale: 0, opacity: 1})

errorAnimationClose
  .to(errorModal, {scale: 0, opacity: 0, onComplete: () => {
    errorModal.style.display = 'none';
  }})


const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_8qaiibp', 'template_ucqxl5s', '#form-contact', 'AZypWk84gXVbQ92zP')
    .then((res) => {
      envelope.style.display = 'block';
      formAnimation.play();
      formAnimation.restart();
      form.reset();
    }, () => {
      errorModal.style.display = 'block';
      errorAnimationOpen.restart();

      setTimeout(() => {
        errorAnimationClose.restart();
      }, 1000)
    })
}

form.addEventListener('submit', sendEmail);