const limitItems = document.querySelector('.limit-news-container');

limitItems.addEventListener('click', (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.target.parentElement.style.background = 'transparent';
  }
})
