const limitItems = document.querySelector('.limit-news-container');
const toggleIcon = document.querySelector('.toggle-icon');

// make a moon-sun toggle function 
toggleIcon.addEventListener('click', (e) => {
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
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
    console.log(e.target);
    if (e.target.classList.contains('love')) {
      e.target.classList.toggle('active');
    }
  })
})

const imageContainer = document.querySelector('.continue-design-post');
const images = document.querySelectorAll('.continue-design-post img');
let currentIndex = 0;
let startX = null;
let currentX = null;
let isDragging = false;
let animationFrameId;

imageContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
  cancelAnimationFrame(animationFrameId);
});

imageContainer.addEventListener('touchmove', (e) => {
  if (isDragging) {
    currentX = e.touches[0].clientX;

    // 移动图片
    const diffX = currentX - startX;
    images[currentIndex].style.transform = `translateX(${diffX}px)`;

    // 移动下一张图片（右边）
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImageOffset = diffX + imageContainer.clientWidth;
    
    images[nextIndex].style.transform = `translateX(${nextImageOffset}px)`;
  }
});

imageContainer.addEventListener('touchend', () => {
  if (isDragging) {
    isDragging = false;
    const diffX = currentX - startX;

    // 如果移动距离超过容器宽度的一半，切换到下一张图片
    if (Math.abs(diffX) > imageContainer.clientWidth / 2) {
      currentIndex = (diffX > 0) ? (currentIndex - 1 + images.length) % images.length : (currentIndex + 1) % images.length;
    }

    // 动画过渡到新的索引位置
    const targetX = -currentIndex * imageContainer.clientWidth;
    const easing = 0.2; // 缓动效果
    function animate() {
      const currentTranslateX = parseFloat(images[currentIndex].style.transform.split('(')[1]);
      const deltaX = (targetX - currentTranslateX) * easing;
      images.forEach((image, index) => {
        image.style.transform = `translateX(${currentTranslateX + deltaX}px)`;
      });
      if (Math.abs(deltaX) > 0.5) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    animate();
  }
});