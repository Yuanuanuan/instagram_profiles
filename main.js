import './js/userPage.js'
import './js/homePage.js'
import './js/searchPage.js'
import './js/messagePage.js'

const toggleIcon = document.querySelectorAll('.toggle-icon');

// make a moon-sun toggle function 
toggleIcon.forEach((item) => {
  item.addEventListener('click', (e) => {
    const toggleIconText = e.target.querySelector('.toggle-text');
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
      if (toggleIconText) {
        toggleIconText.innerText = 'Light Mode';
      }
    } else {
      moonIcon.forEach((item) => {
        item.style.display = 'block';
      })
      sunIcon.forEach((item) => {
        item.style.display = 'none';
      })
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      if (toggleIconText) {
        toggleIconText.innerText = 'Dark Mode';
      }
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
const addPostModal = document.querySelector('.add-post-modal')

nav.addEventListener('click', (e) => {
  if (e.target instanceof HTMLLIElement) {
    console.log(e.target.childNodes[1])
    const items = nav.querySelectorAll('svg');
    items.forEach((item) => {
      item.classList.remove('active');
    })

    if (e.target.childNodes[1].classList.contains('home-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      homeMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.childNodes[1].classList.contains('search-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      searchMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.childNodes[1].classList.contains('message-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      messageMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.childNodes[1].classList.contains('user-icon')) {
      mains.forEach((item) => {
        item.style.transform = 'scale(0, 1)';
      })
      userMain.style.transform = 'scale(1, 1)';
    }

    if (e.target.childNodes[1].classList.contains('add-post-icon')) {
      addPostModal.style.transform = 'scale(1, 1)';
      addPostModal.style.opacity = '1';
    } else {
      addPostModal.style.transform = 'scale(0, 0)';
      addPostModal.style.opacity = '0';
    }

    e.target.childNodes[1].classList.add('active');
  }
})

addPostModal.addEventListener('click', () => {
  addPostModal.style.transform = 'scale(0, 0)';
  addPostModal.style.opacity = '0';
})