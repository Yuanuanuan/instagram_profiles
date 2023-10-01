const limitItems = document.querySelector('.limit-news-container');
const toggleIcon = document.querySelectorAll('.toggle-icon');

const loading = document.querySelector('.loading');
const loadingSuccess = document.querySelector('.loading-success');

// make a moon-sun toggle function 
toggleIcon.forEach((item) => {
  item.addEventListener('click', (e) => {
    const moonIcon = item.querySelector('.moon-icon');
    const sunIcon = item.querySelector('.sun-icon');
    const body = document.body;
    if (!e.target.classList.contains('toggle-icon')) return;
  
    if (body.classList.contains('light-mode')) {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  })
})

// make a view user info function on limit news
limitItems.addEventListener('click', (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.target.parentElement.style.background = 'transparent';
  }
})

// make a love it function
const loveBtn = document.querySelectorAll('.love')

loveBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('love')) {
      e.target.classList.toggle('active');
    }
  })
})

window.onload = () => {
  loading.style.display = 'none';
  loadingSuccess.style.display = '1';

  // 初始化圖片和藍點
  container.scrollLeft = 0;
  dotsContainer.querySelector('.dot').classList.add('active');
}

// 當文章超過兩行時才顯示更多按紐
const footer = document.querySelectorAll('.footer');

footer.forEach((article) => {
  const content = article.querySelector('.content');
  const moreBtn = article.querySelector('.more-btn');
  
  if (content.clientHeight > 30) {
    moreBtn.style.display = 'block';
    
    moreBtn.addEventListener('click', () => {
      content.style.webkitLineClamp = 'initial'; // 移除行数限制
      moreBtn.style.display = 'none';
    });
  } else {
    moreBtn.style.display = 'none';
  }
});


// 製作照片換頁功能 (.continue-design-post)
const container = document.querySelector('.continue-design-post');
const images = document.querySelectorAll('.continue-design-post img');
const dotsContainer = document.querySelector('.dots');
let currentIndex = 0;

// 初始化藍點
for (let i = 0; i < images.length; i++) {
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
    currentIndex = Math.round(container.scrollLeft / window.innerWidth);
    updateDots();
});

// 切換頁面功能
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
        item.style.display = 'none';
      })
      homeMain.style.display = 'block';
    }

    if (e.target.classList.contains('search-icon')) {
      mains.forEach((item) => {
        item.style.display = 'none';
      })
      searchMain.style.display = 'block';
    }

    if (e.target.classList.contains('message-icon')) {
      mains.forEach((item) => {
        item.style.display = 'none';
      })
      messageMain.style.display = 'block';
    }

    if (e.target.classList.contains('user-icon')) {
      mains.forEach((item) => {
        item.style.display = 'none';
      })
      userMain.style.display = 'block';
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

