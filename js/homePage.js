// make a view user info function on limit news
const limitItems = document.querySelector('.limit-news-container');
const loading = document.querySelector('.loading');
const loadingSuccess = document.querySelector('.loading-success');

limitItems.addEventListener('click', (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.target.parentElement.style.background = 'transparent';
  }
})

// make a love it function
const loveBtn = document.querySelectorAll('.love')

loveBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const numBar = e.target.parentElement.parentElement.parentElement.querySelector('.like-bar > div > span')
    
    if (e.target.classList.contains('love')) {
      e.target.classList.toggle('active');
    }

    if (e.target.classList.contains('active')) {
      numBar.innerText = Number(numBar.innerText) + 1;
    } else {
      numBar.innerText = Number(numBar.innerText) - 1;
    }
  })
})

// make a save it function
const saveIcon = document.querySelectorAll('.save')

saveIcon.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    if (e.target.classList.contains('save')) {
      e.target.classList.toggle('active');
    }
  })
})

// 當文章超過兩行時才顯示更多按紐
const footer = document.querySelectorAll('.footer');

footer.forEach((article) => {
  const content = article.querySelector('.content');
  const moreBtn = article.querySelector('.more-btn');
  const paragraph = article.querySelector('p');
  
  if (content.clientHeight > 30) {
    moreBtn.style.display = 'block';

    paragraph.addEventListener('click', () =>{
      content.style.webkitLineClamp = 'initial'; // 移除行数限制
      moreBtn.style.display = 'none';
    });
    
    moreBtn.addEventListener('click', () => {
      content.style.webkitLineClamp = 'initial';
      moreBtn.style.display = 'none';
    });
  } else {
    moreBtn.style.display = 'none';
  }
});

window.onload = () => {
  loading.style.display = 'none';
  loadingSuccess.style.display = '1';

  // 製作照片換頁功能 (.continue-design-post)
  const contentImages = document.querySelectorAll('.content-image');

  contentImages.forEach((post) => {
    const container = post.querySelector('.post-images');
    const images = container.querySelectorAll('img');
    const dotsContainer = post.querySelector('.dots');
    let currentIndex = 0;

    // 初始化藍點
    for (let i = 1; i <= images.length; i++) {
      if (images.length === 1) return
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dotsContainer.appendChild(dot);
    }

    // 更新藍點狀態
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
          if (index === currentIndex) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
    }

    container.addEventListener('scroll', () => {
      currentIndex = Math.round(container.scrollLeft / container.clientWidth);
      updateDots();
    });

    // 初始化圖片和藍點
    container.scrollLeft = 0;
    dotsContainer.querySelector('.dot').classList.add('active');
  })
}

// 螢幕到達PC 改成點擊切換圖片
const contentImages = document.querySelectorAll('.content-image');

contentImages.forEach((post) => {
  const container = post.querySelector('.post-images');
  const images = container.querySelectorAll('img');
  const leftArrow = post.querySelector('.left-arrow');
  const rightArrow = post.querySelector('.right-arrow');
  let imageIndex = 0;

  if (images.length <= 1 && leftArrow && rightArrow) {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
  }

  if (imageIndex === 0 && leftArrow) {
    leftArrow.style.display = 'none';
  }

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('left-arrow')) {
      imageIndex = Math.max(imageIndex - 1, 0);
    } else if (e.target.classList.contains('right-arrow')) {
      imageIndex = Math.min(imageIndex + 1, images.length - 1);
    }
    updateImage();
  })

  const updateImage = () => {
    if (imageIndex === 0) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'flex';
    } else if (imageIndex === images.length - 1) {
      leftArrow.style.display = 'flex';
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = 'flex';
      rightArrow.style.display = 'flex';
    }
    images[imageIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start'})
  }
})

// limit-news 改成點擊切換圖片
const limitNews = document.querySelector('.limit-news-container')
const limitBox = document.querySelector('.limit-news-box')
const leftArrow = limitNews.querySelector('.left-arrow');
const rightArrow = limitNews.querySelector('.right-arrow');
let newsIndex = 0;

leftArrow.style.display = 'none';

limitBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('left-arrow')) {
    limitBox.scrollLeft -= 300;
  } else if (e.target.classList.contains('right-arrow')) {
    limitBox.scrollLeft += 300;
  }
})

limitBox.addEventListener('scroll', (e) => {
  if (limitBox.scrollLeft === 0) {
    leftArrow.style.display = 'none';
  } else if (limitBox.scrollLeft === 532) {
    rightArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex';
  }
  console.log(limitBox.scrollLeft);
  console.log(limitBox.scrollWidth);
})
