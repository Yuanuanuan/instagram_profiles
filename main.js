import './js/userPage.js'
import './js/homePage.js'
import './js/searchPage.js'

const toggleIcon = document.querySelectorAll('.toggle-icon');

// make a moon-sun toggle function 
toggleIcon.forEach((item) => {
  item.addEventListener('click', (e) => {
    const moonIcon = document.querySelectorAll('.moon-icon');
    const sunIcon = document.querySelectorAll('.sun-icon');
    const body = document.body;
    if (!e.target.classList.contains('toggle-icon')) return;
  
    if (body.classList.contains('light-mode')) {
      moonIcon.forEach((item) => {
        item.style.display = 'none';
      })
      sunIcon.forEach((item) => {
        item.style.display = 'block';
      })
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      moonIcon.forEach((item) => {
        item.style.display = 'block';
      })
      sunIcon.forEach((item) => {
        item.style.display = 'none';
      })
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  })
})

// nav-bar切換頁面功能
const mains = document.querySelectorAll('.main');
const homeMain = document.getElementById('home-main');
const searchMain = document.getElementById('search-main');
const messageMain = document.getElementById('message-main');
const userMain = document.getElementById('user-main');

const nav = document.querySelector('nav');
const modal = document.querySelector('.modal')

nav.addEventListener('click', (e) => {
  if (e.target instanceof SVGElement) {
    const items = nav.querySelectorAll('svg');
    items.forEach((item) => {
      item.classList.remove('active');
    })

    if (e.target.classList.contains('home-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      homeMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.classList.contains('search-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      searchMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.classList.contains('message-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      messageMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.classList.contains('user-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      userMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.classList.contains('add-post-icon')) {
      modal.style.transform = 'scale(1, 1)';
      modal.style.opacity = '1';
    } else {
      modal.style.transform = 'scale(0, 0)';
      modal.style.opacity = '0';
    }

    e.target.classList.add('active');
  }
})

modal.addEventListener('click', () => {
  modal.style.transform = 'scale(0, 0)';
  modal.style.opacity = '0';
})

// 表單發送事件
const form = document.querySelector('.message-form');
const envelope = document.querySelector('.envelope-wrapper');

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
  .to('.envelope', {scale: 1.1, duration: .3})
  .to('.envelope', {scale: 0.2, duration: .2})
  .to('.envelope', {x: 300, y:-300, opacity: 0, duration: .5}, '<0.05')

form.addEventListener('click', (e) =>{
  e.preventDefault();
  envelope.style.display = 'block';
  formAnimation.play();
  formAnimation.restart();
  form.reset();
});