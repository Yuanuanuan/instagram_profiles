const limitItems = document.querySelector('.limit-news-container');
const toggleIcon = document.querySelectorAll('.toggle-icon');

const loading = document.querySelector('.loading');
const loadingSuccess = document.querySelector('.loading-success');

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

// user page 的選項按鈕切換
const menuBox = document.querySelector('.menu-bar-box');

menuBox.addEventListener('click', (e) =>{
  const items = menuBox.querySelectorAll('div')
  items.forEach((item) => {
    item.classList.remove('active');
  })
  e.target.classList.add('active');
})

const loadingModal = document.querySelector('.loading-modal');
const auth = "qxWbhXu3WCyLDTgXfBDPFPHHPHXxdKqnvn6E5MiGTKTyFLrMKH5lTPcf";

// fetch data
const fetchData = ({ page }) => {
  const initialURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=30`;

  loadingModal.style.display = 'block'
  setTimeout(() => {
    loadingModal.style.display = 'none';
  }, 800)
  fetch(initialURL, { headers: { Authorization: auth }})
    .then (res => {
      return res.json();
    })
    .then (data => {
      data.photos.forEach((photo) => {
        const image = `
        <div class="result-image">
          <img src=${photo.src.medium} alt="images">
        </div>
        `;

        document.querySelector('.search-result').insertAdjacentHTML('beforeend', image);
      })
    })
    .then(() => {
      fetchPage ++;
    })
}

const searchData = ({ page, input}) => {
  const url = `https://api.pexels.com/v1/search?query=${input}&per_page=30&page=${page}`

  loadingModal.style.display = 'block';

  fetch(url, { headers: { Authorization: auth }})
    .then (res => {
      return res.json();
    })
    .then (data => {
      data.photos.forEach((photo) => {
        const image = `
        <div class="result-image">
          <img src=${photo.src.medium} alt="images">
        </div>
        `;

        document.querySelector('.search-result').insertAdjacentHTML('beforeend', image);
      })
    })
    .then(() => {
      loadingModal.style.display = 'none';
      searchPage ++;
    })
}

// 搜尋功能
const searchInput = document.querySelector('.search-input');
let searchPage = 1;

searchInput.addEventListener('input', (e) => {
  searchBar.innerHTML = '';
  if (e.target.value !== '') {
    searchData({ page: searchPage, input: e.target.value });
  } else {
    fetchData({ page: 1})
    fetchPage = 2;
  }
})

// 當滑到最底就抓取新資料
const searchBar = document.querySelector('.search-result');
let fetchPage = 2;

searchBar.addEventListener('scroll', (e) =>{
  if (searchBar.scrollHeight - searchBar.scrollTop === searchBar.clientHeight) {
    if (e.target.parentElement.parentElement.querySelector('.search-input').value !== '') {
      searchData({page: searchPage, input: e.target.parentElement.parentElement.querySelector('.search-input').value});
      return;
    }
    fetchData({ page: fetchPage });
  }
});

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

// 點擊貼文跳出視窗並顯示正確貼文
const gridPost = document.querySelector('.grid-post')
const experienceModal = document.querySelector('.experience-modal');
const experiencePostContainer = experienceModal.querySelector('.post-container');

gridPost.addEventListener('click', (e) =>{
  e.preventDefault();
  const target = e.target
  if (target.classList.contains('post')) {
    const currentPost = document.getElementById(`${target.classList[1]}`)
    experienceModal.style.transform = 'scale(1, 1)';
    experienceModal.style.opacity = '1';
    experiencePostContainer.scrollTo({
      top: currentPost.offsetTop - 60
    });
  }
});

const backIcon = document.querySelector('.back-icon');
// 點擊視窗中back按鈕關閉視窗
backIcon.onclick = () => {
  experienceModal.style.transform = 'scale(0, 0)';
  experienceModal.style.opacity = '0';
}



fetchData({ page: 1 });