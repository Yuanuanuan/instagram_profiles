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

fetchData({ page: 1 });