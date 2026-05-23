const tags = ['Усі', 'Музика', 'Веб', 'Ігри', 'Новини', 'Подкасти', 'Програмування'];

const videos = [
  {
    title: 'Вивчаємо JavaScript за 40 хвилин',
    channel: 'Code Start UA',
    views: '154 тис. переглядів',
    age: '2 тижні тому',
    duration: '40:12',
    tag: 'Програмування',
    thumbnail: 'https://picsum.photos/seed/js-course/640/360',
    avatar: 'https://picsum.photos/seed/code-start/80/80',
    embedUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg'
  },
  {
    title: 'Lofi mix для роботи та навчання',
    channel: 'Chill Beats',
    views: '2,1 млн переглядів',
    age: '3 місяці тому',
    duration: '1:12:08',
    tag: 'Музика',
    thumbnail: 'https://picsum.photos/seed/lofi-video/640/360',
    avatar: 'https://picsum.photos/seed/chill-beat/80/80',
    embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk'
  },
  {
    title: 'Що нового у веб-розробці 2026',
    channel: 'Frontend UA',
    views: '88 тис. переглядів',
    age: '5 днів тому',
    duration: '16:45',
    tag: 'Веб',
    thumbnail: 'https://picsum.photos/seed/web-2026/640/360',
    avatar: 'https://picsum.photos/seed/frontend-ua/80/80',
    embedUrl: 'https://www.youtube.com/embed/3JluqTojuME'
  },
  {
    title: 'Найкращі моменти кіберспорту',
    channel: 'Game Portal',
    views: '605 тис. переглядів',
    age: '1 тиждень тому',
    duration: '10:03',
    tag: 'Ігри',
    thumbnail: 'https://picsum.photos/seed/esport-highlights/640/360',
    avatar: 'https://picsum.photos/seed/game-portal/80/80',
    embedUrl: 'https://www.youtube.com/embed/6Dh-RL__uN4'
  },
  {
    title: 'Головні новини дня: коротко',
    channel: 'Новини 24',
    views: '32 тис. переглядів',
    age: '8 годин тому',
    duration: '7:29',
    tag: 'Новини',
    thumbnail: 'https://picsum.photos/seed/news-short/640/360',
    avatar: 'https://picsum.photos/seed/news24/80/80',
    embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ'
  },
  {
    title: 'Подкаст: як стартувати в IT',
    channel: 'UA Tech Talks',
    views: '120 тис. переглядів',
    age: '1 місяць тому',
    duration: '52:10',
    tag: 'Подкасти',
    thumbnail: 'https://picsum.photos/seed/it-podcast/640/360',
    avatar: 'https://picsum.photos/seed/ua-tech-talks/80/80',
    embedUrl: 'https://www.youtube.com/embed/hJP5GqnTrNo'
  }
];

const chipsRoot = document.getElementById('chips');
const videoGrid = document.getElementById('videoGrid');
const videoTemplate = document.getElementById('videoCardTemplate');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const playerModal = document.getElementById('playerModal');
const playerFrame = document.getElementById('playerFrame');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalBackdrop = document.getElementById('closeModalBackdrop');

let activeTag = 'Усі';
let searchQuery = '';

function openVideo(embedUrl) {
  playerFrame.src = `${embedUrl}?autoplay=1`;
  playerModal.classList.add('open');
  playerModal.setAttribute('aria-hidden', 'false');
}

function closeVideo() {
  playerModal.classList.remove('open');
  playerModal.setAttribute('aria-hidden', 'true');
  playerFrame.src = '';
}

function renderTags() {
  chipsRoot.innerHTML = '';

  tags.forEach((tag) => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeTag === tag ? 'active' : ''}`;
    chip.textContent = tag;

    chip.addEventListener('click', () => {
      activeTag = tag;
      renderTags();
      renderVideos();
    });

    chipsRoot.appendChild(chip);
  });
}

function getFilteredVideos() {
  return videos.filter((video) => {
    const matchTag = activeTag === 'Усі' || video.tag === activeTag;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || `${video.title} ${video.channel}`.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });
}

function renderVideos() {
  videoGrid.innerHTML = '';

  const filtered = getFilteredVideos();

  if (filtered.length === 0) {
    videoGrid.innerHTML = '<p>Нічого не знайдено. Спробуйте інший запит.</p>';
    return;
  }

  filtered.forEach((video) => {
    const card = videoTemplate.content.cloneNode(true);
    const videoCard = card.querySelector('.video-card');

    card.querySelector('.thumb').src = video.thumbnail;
    card.querySelector('.duration').textContent = video.duration;
    card.querySelector('.channel-avatar').src = video.avatar;
    card.querySelector('.title').textContent = video.title;
    card.querySelector('.channel').textContent = video.channel;
    card.querySelector('.stats').textContent = `${video.views} • ${video.age}`;

    videoCard.addEventListener('click', () => openVideo(video.embedUrl));
    videoCard.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openVideo(video.embedUrl);
      }
    });

    videoGrid.appendChild(card);
  });
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchQuery = searchInput.value;
  renderVideos();
});

closeModalBtn.addEventListener('click', closeVideo);
closeModalBackdrop.addEventListener('click', closeVideo);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && playerModal.classList.contains('open')) {
    closeVideo();
  }
});

renderTags();
renderVideos();
