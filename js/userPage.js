
// describe-more-btn click events
const moreBtn = document.querySelector('.describe-more-btn');
const describe = document.querySelector('.intro-wrapper .describe');

moreBtn.onclick = () => {
  describe.style.webkitLineClamp = 'initial';
  moreBtn.style.display = 'none';
}


// 選項按鈕切換
const menuBox = document.querySelector('.menu-bar-box');

menuBox.addEventListener('click', (e) =>{
  const items = menuBox.querySelectorAll('.menu-box-tool')
  const projectBanner = document.querySelector('.projects-banner');
  let scrollValue = 0;
  if (e.target.classList.contains('experience')) {
    scrollValue = 0;
  }
  if (e.target.classList.contains('projects')) {
    scrollValue = projectBanner.clientWidth;
  }
  if (e.target.classList.contains('resume')) {
    scrollValue = projectBanner.clientWidth * 2;
  }

  postBanner.scrollTo({
    left: scrollValue,
    behavior: 'smooth'
  })

  setTimeout(() => {
    items.forEach((item) => {
      item.classList.remove('active');
    })
    e.target.classList.add('active');
  }, 500)
})

// 點擊experience貼文跳出視窗並顯示正確貼文
const experienceGridPost = document.querySelector('.experience-grid-post')
const experienceModal = document.querySelector('.experience-modal');
const experiencePostContainer = experienceModal.querySelector('.post-container');

experienceGridPost.addEventListener('click', (e) =>{
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

// 點擊project貼文跳出視窗並顯示正確貼文
const projectsGridPost = document.querySelector('.projects-grid-post');
const projectsModal = document.querySelector('.projects-modal');
const projectPostContainer = projectsModal.querySelector('.post-container');

projectsGridPost.addEventListener('click', (e) =>{
  e.preventDefault();
  const target = e.target
  if (target.classList.contains('post')) {
    const currentPost = document.getElementById(`${target.classList[1]}`)
    projectsModal.style.transform = 'scale(1, 1)';
    projectsModal.style.opacity = '1';
    projectPostContainer.scrollTo({
      top: currentPost.offsetTop - 60
    });
  }
});

const backIcons = document.querySelectorAll('.back-icon');
// 點擊視窗中back按鈕關閉視窗
backIcons.forEach((backIcon) => {
  backIcon.onclick = () => {
    experienceModal.style.transform = 'scale(0, 0)';
    experienceModal.style.opacity = '0';
    projectsModal.style.transform = 'scale(0, 0)';
    projectsModal.style.opacity = '0';
  }
})

// menu-post的滑動效果
const postBanner = document.querySelector('.post-banner');
let postCurrentIndex = 0;

const updateMenuBox = () => {
  const menusBox = document.querySelectorAll('.menu-box-tool');
  menusBox.forEach((menuBox, index) => {
    if (index === postCurrentIndex) {
      menuBox.classList.add('active');
    } else {
      menuBox.classList.remove('active');
    }
  })
}

postBanner.addEventListener('scroll', () => {
  postCurrentIndex = Math.round(postBanner.scrollLeft / postBanner.clientWidth);
  updateMenuBox();
});

postBanner.scrollLeft = 0;