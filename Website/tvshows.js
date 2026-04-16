/* ══════════════════════════════════════════════════
   FILMHORIZON — tvshows.js
   ══════════════════════════════════════════════════ */

const MOVIES = [
  {
    id: 1, title: "Friends", year: 1994, rating: 8.9,
    genres: ["Sitcom","Comedy","Romance"], runtime: "10 Seasons",
    director: "David Crane & Marta Kauffman",
    poster: "https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/l0qVZIpXtIo7km9u5ehFaKXWi5m.jpg",
    trailer: "dX3k_QDnzp0",
    desc: "Six friends navigate love, life, and work in New York City over ten hilarious and heartfelt seasons.",
    badge: "Masterpiece"
  },
  {
    id: 2, title: "The Office", year: 2005, rating: 9.0,
    genres: ["Sitcom","Comedy","Documentary"], runtime: "9 Seasons",
    director: "Greg Daniels",
    poster: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/a6GDpTSFN5p3q8M4YlGNxjqe2vp.jpg",
    trailer: "LHOtME2DL4g",
    desc: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and general hilarities.",
    badge: "Top Rated"
  },
  {
    id: 3, title: "Planet Earth II", year: 2016, rating: 9.5,
    genres: ["Documentary"], runtime: "Mini-series",
    director: "Justin Anderson",
    poster: "earth.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/vvFuJ6N6VFiAE5KsAlPeGbFdkEe.jpg",
    trailer: "c8aFcHFu8QM",
    desc: "Sir David Attenborough presents a documentary series exploring how animals adapt to the most challenging environments on Earth.",
    badge: "Top Rated"
  },
  {
    id: 4, title: "Seinfeld", year: 1989, rating: 8.8,
    genres: ["Sitcom","Comedy"], runtime: "9 Seasons",
    director: "Jerry Seinfeld & Larry David",
    poster: "https://image.tmdb.org/t/p/w500/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/bwBmo4I3fqMSbvKTMBUSKwzGKJM.jpg",
    trailer: "llpDPNGRoGY",
    desc: "The continuing misadventures of neurotic New York City stand-up comedian Jerry Seinfeld and his equally neurotic New York friends.",
    badge: "Classic"
  },
  {
    id: 5, title: "Grey's Anatomy", year: 2005, rating: 7.6,
    genres: ["Drama","Medical","Romance"], runtime: "20 Seasons",
    director: "Shonda Rhimes",
    poster: "https://image.tmdb.org/t/p/w500/clnyhPqj1SNgpAdeSS6a6fwE6Bo.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/okFPDzRALUiHD36V5Ev5xrHvlIF.jpg",
    trailer: "Bbs-9cE88p0",
    desc: "A drama centered on the personal and professional lives of five surgical interns and their supervisors.",
    badge: null
  },
  {
    id: 6, title: "The Kapil Sharma Show", year: 2016, rating: 7.3,
    genres: ["Documentary"], runtime: "300 Episodes",
    director: "Alastair Fothergill",
    poster: "tkss.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/2jvMJzWEqFxT0MdxRvC8I5fWWNl.jpg",
    trailer: "1ZnrBGgBFDQ",
    desc: "David Attenborough presents a groundbreaking documentary series exploring habitats around the globe.",
    badge: "Comedy"
  },
  {
    id: 7, title: "Parks and Recreation", year: 2009, rating: 8.6,
    genres: ["Sitcom","Comedy","Documentary"], runtime: "7 Seasons",
    director: "Greg Daniels & Michael Schur",
    poster: "recreation.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/s5G7VK5aSdKnS0eMJFfHt1RRLQG.jpg",
    trailer: "a4xUJq4-SDE",
    desc: "The eagerly awaited return of the single-camera ensemble comedy. The show follows Leslie Knope, a mid-level bureaucrat in the Parks and Recreation Department.",
    badge: null
  },
  {
    id: 8, title: "Fargo", year: 2014, rating: 8.9,
    genres: ["Crime","Drama","Thriller"], runtime: "5 Seasons",
    director: "Noah Hawley",
    poster: "fargo.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/gzJnMBBBFsKFt4aYXzp5LqhKlUK.jpg",
    trailer: "ROsIqBc7AzA",
    desc: "Various chronicles of deception, intrigue, and murder in and around frozen Minnesota.",
    badge: "Emmy Winner"
  },
  {
    id: 9, title: "The Wire", year: 2002, rating: 9.3,
    genres: ["Crime","Drama","Thriller"], runtime: "5 Seasons",
    director: "David Simon",
    poster: "wire.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/tvFSznLuBaWM4Vc0eRMFLB74ZHT.jpg",
    trailer: "uPb_5C7CDgs",
    desc: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
    badge: "Top Rated"
  },
  {
    id: 10, title: "How I Met Your Mother", year: 2005, rating: 8.3,
    genres: ["Sitcom","Comedy","Romance"], runtime: "9 Seasons",
    director: "Carter Bays & Craig Thomas",
    poster: "https://image.tmdb.org/t/p/w500/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/b9ryRwpBjPUYk3m2MCUZeI4fGHo.jpg",
    trailer: "RWtMZkL8cTM",
    desc: "A father recounts to his children, through a series of flashbacks, the journey he and his four best friends took leading up to him meeting their mother.",
    badge: null
  },
  {
    id: 11, title: "Band of Brothers", year: 2001, rating: 9.4,
    genres: ["Drama","Documentary","Crime"], runtime: "10 Episodes",
    director: "Steven Spielberg & Tom Hanks",
    poster: "band.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/xTHltMrZPAJFLKeblMGJAMVBuOG.jpg",
    trailer: "JCBCBh3zWcQ",
    desc: "The story of Easy Company of the US Army 101st Airborne division and their mission in WWII Europe from Operation Overlord through V-J Day.",
    badge: "Classic"
  },
  {
    id: 12, title: "The Sopranos", year: 1999, rating: 9.2,
    genres: ["Crime","Drama"], runtime: "6 Seasons",
    director: "David Chase",
    poster: "sopranos.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/180O26w7M8cGFvfEDpwJUbmzQ7R.jpg",
    trailer: "JnKsFMk_eME",
    desc: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state.",
    badge: "Top Rated"
  },
  {
    id: 13, title: "It's Always Sunny in Philadelphia", year: 2005, rating: 8.7,
    genres: ["Sitcom","Comedy"], runtime: "16 Seasons",
    director: "Rob McElhenney",
    poster: "sunny.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/g0PnMiP3Ykxi6bLELnAqnkrwXw0.jpg",
    trailer: "oMIPNMw0X4w",
    desc: "Five friends with terrible moral fiber run a Philadelphia bar called Paddy's Pub while getting involved in various unsavory situations.",
    badge: null
  },
  {
    id: 14, title: "True Detective", year: 2014, rating: 9.0,
    genres: ["Crime","Drama","Mystery"], runtime: "4 Seasons",
    director: "Nic Pizzolatto",
    poster: "detective.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/6GQeVBCp0kJWzOfOg1FKgEHKn1q.jpg",
    trailer: "BO3HB9gVpRg",
    desc: "Anthology series in which the sordid underbelly of American society is explored through cases seen by various detectives.",
    badge: null
  },
  {
    id: 15, title: "Arrested Development", year: 2003, rating: 8.7,
    genres: ["Sitcom","Comedy"], runtime: "5 Seasons",
    director: "Mitchell Hurwitz",
    poster: "arrested.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/rMIhlEoJPpKFLGrBG5bECFTFBiX.jpg",
    trailer: "dCahkOV7bpk",
    desc: "A wealthy family discovers they are suddenly broke, and one son must try to keep the family together.",
    badge: "Cult Classic"
  },
];

/* ─── STATE ─────────────────────────────────────── */
let activeGenre  = "All";
let activeSort   = "rating";
let searchQuery  = "";
let isListView   = false;
let visibleCount = 15;
const PAGE_SIZE  = 12;

/* ════════════════════════════════════════════════
   PLAN / TRAILER LIMIT
════════════════════════════════════════════════ */
const FREE_TRAILER_LIMIT = 2;

function getUserPlan() {
  try {
    const s = localStorage.getItem('filmHorizon_plan') || sessionStorage.getItem('filmHorizon_plan');
    if (s) return s.toLowerCase();
    const u = JSON.parse(sessionStorage.getItem('filmHorizon_user') || '{}');
    return (u.plan || 'free').toLowerCase();
  } catch(e) { return 'free'; }
}

function isPaidUser() {
  const p = getUserPlan();
  return p !== 'free' && p !== '';
}

let trailerWatchCount = isPaidUser()
  ? 0
  : parseInt(sessionStorage.getItem('filmHorizon_trailer_count') || '0');

/* Show user's current plan label in navbar */
(function initUserProfile() {
  try {
    const u = JSON.parse(sessionStorage.getItem('filmHorizon_user') || '{}');
    const name = u.name || 'User';
    const plan = (u.plan || 'free').toLowerCase();
    const nameEl = document.querySelector('.profile-name');
    if (nameEl) nameEl.textContent = name;
    const avatarEl = document.querySelector('.profile-avatar');
    if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
    const planEl = document.getElementById('userPlanDisplay');
    if (planEl) {
      const planConfig = {
        free:     { label: 'FREE PLAN',    color: '#7070a0' },
        basic:    { label: 'BASIC PLAN',   color: '#4fc3f7' },
        students: { label: 'STUDENT PLAN', color: '#81c784' },
        premium:  { label: 'PREMIUM PLAN', color: '#f5c518' }
      };
      const cfg = planConfig[plan] || planConfig.free;
      planEl.textContent = cfg.label;
      planEl.style.color = cfg.color;
      planEl.style.fontWeight = 'bold';
    }
  } catch(e) {}
})();

/* ════════════════════════════════════════════════
   TRAILER MODAL — YouTube thumbnail + link
════════════════════════════════════════════════ */

/* Inject trailer modal styles once */
(function _injectTMStyles() {
  if (document.getElementById('_tmStyles')) return;
  const s = document.createElement('style');
  s.id = '_tmStyles';
  s.textContent = `
    #_trailerModal {
      position: fixed; inset: 0; z-index: 999999;
      display: flex; align-items: flex-end; justify-content: center;
      opacity: 0; transition: opacity .3s ease;
    }
    #_trailerModal._tm-open { opacity: 1; }
    ._tm-backdrop {
      position: absolute; inset: 0;
      background: rgba(0,0,0,.78); backdrop-filter: blur(7px); cursor: pointer;
    }
    ._tm-panel {
      position: relative; z-index: 2;
      width: 100%; max-width: 700px;
      background: #0d0d0f; border: 1px solid rgba(255,255,255,.08);
      border-radius: 22px 22px 0 0; overflow: hidden;
      transform: translateY(100%);
      transition: transform .38s cubic-bezier(.22,1,.36,1);
      box-shadow: 0 -20px 60px rgba(0,0,0,.85);
    }
    #_trailerModal._tm-open ._tm-panel { transform: translateY(0); }
    ._tm-header { padding: 18px 20px 12px; }
    ._tm-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    ._tm-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #e50914; text-transform: uppercase; display: flex; align-items: center; gap: 5px; }
    ._tm-close { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,.08); border: none; color: #aaa; cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: background .2s, color .2s; }
    ._tm-close:hover { background: rgba(255,255,255,.18); color: #fff; }
    ._tm-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(1.5rem,5vw,2.2rem); color: #fff; line-height: 1; margin: 0; }
    ._tm-thumb-wrap { position: relative; cursor: pointer; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #000; }
    ._tm-thumb { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease, filter .4s ease; }
    ._tm-thumb-wrap:hover ._tm-thumb { transform: scale(1.04); filter: brightness(.65); }
    ._tm-play-ring { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
    ._tm-play-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(229,9,20,.92); display: flex; align-items: center; justify-content: center; font-size: 26px; color: #fff; padding-left: 5px; box-shadow: 0 0 0 12px rgba(229,9,20,.22), 0 8px 32px rgba(0,0,0,.7); transition: transform .25s, box-shadow .25s; }
    ._tm-thumb-wrap:hover ._tm-play-icon { transform: scale(1.13); box-shadow: 0 0 0 18px rgba(229,9,20,.15), 0 8px 40px rgba(0,0,0,.8); }
    ._tm-hover-txt { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,.72); color: #fff; font-size: 12px; padding: 5px 16px; border-radius: 20px; white-space: nowrap; opacity: 0; transition: opacity .25s; pointer-events: none; }
    ._tm-thumb-wrap:hover ._tm-hover-txt { opacity: 1; }
    ._tm-footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px 22px; gap: 12px; flex-wrap: wrap; }
    ._tm-note { font-size: 12px; color: rgba(255,255,255,.3); display: flex; align-items: center; gap: 5px; }
    ._tm-yt-btn { display: inline-flex; align-items: center; gap: 9px; background: #e50914; color: #fff; padding: 11px 24px; border-radius: 99px; font-weight: 700; font-size: 13px; letter-spacing: .04em; text-decoration: none; transition: background .2s, transform .15s; white-space: nowrap; }
    ._tm-yt-btn:hover { background: #c0000a; transform: translateY(-1px); }
    ._tm-yt-icon { width: 18px; height: 18px; flex-shrink: 0; }
    @media (max-width: 480px) { ._tm-footer { flex-direction: column; align-items: stretch; } ._tm-yt-btn { justify-content: center; } }
  `;
  document.head.appendChild(s);
})();

function _showTrailerModal(videoId, title) {
  const old = document.getElementById('_trailerModal');
  if (old) old.remove();
  const yt = 'https://www.youtube.com/watch?v=' + videoId;
  const th = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
  const fb = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
  const modal = document.createElement('div');
  modal.id = '_trailerModal';
  modal.innerHTML = `
    <div class="_tm-backdrop" onclick="closeTrailer()"></div>
    <div class="_tm-panel">
      <div class="_tm-header">
        <div class="_tm-title-row">
          <span class="_tm-label"><i class="fas fa-film"></i>&nbsp;TRAILER</span>
          <button class="_tm-close" onclick="closeTrailer()"><i class="fas fa-times"></i></button>
        </div>
        <h2 class="_tm-title">${title}</h2>
      </div>
      <div class="_tm-thumb-wrap" onclick="window.open('${yt}','_blank')">
        <img class="_tm-thumb" src="${th}" onerror="this.src='${fb}'" alt="${title}">
        <div class="_tm-play-ring"><div class="_tm-play-icon"><i class="fas fa-play"></i></div></div>
        <div class="_tm-hover-txt">Click to watch on YouTube</div>
      </div>
      <div class="_tm-footer">
        <p class="_tm-note"><i class="fas fa-info-circle"></i>&nbsp;Opens in YouTube</p>
        <a class="_tm-yt-btn" href="${yt}" target="_blank" rel="noopener">
          <svg class="_tm-yt-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/>
            <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
          </svg>
          Watch Trailer on YouTube
        </a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('_tm-open'));
}

/* Main entry: respects free-user limit */
function openTrailer(videoId, title) {
  if (!videoId) return;
  if (!isPaidUser()) {
    if (trailerWatchCount >= FREE_TRAILER_LIMIT) {
      openUpgradeModal();
      return;
    }
    trailerWatchCount++;
    sessionStorage.setItem('filmHorizon_trailer_count', trailerWatchCount);
  }
  _showTrailerModal(videoId, title || 'Trailer');
}

/* Alias used by card play button */
function openTrailerFullscreen(v, t) { openTrailer(v, t); }

function closeTrailer() {
  const m = document.getElementById('_trailerModal');
  if (!m) return;
  m.classList.remove('_tm-open');
  setTimeout(() => { m.remove(); }, 300);
  document.body.style.overflow = '';
}

/* ════════════════════════════════════════════════
   UPGRADE MODAL
════════════════════════════════════════════════ */
function openUpgradeModal() {
  document.getElementById('upgradeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeUpgradeModal() {
  document.getElementById('upgradeModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('upgradeModal').addEventListener('click', function(e) {
  if (e.target === this) closeUpgradeModal();
});

/* ════════════════════════════════════════════════
   DETAIL MODAL
════════════════════════════════════════════════ */
function openDetail(idOrObj) {
  /* Accept either a movie object or a numeric id */
  const item = (typeof idOrObj === 'object') ? idOrObj : MOVIES.find(m => m.id === idOrObj);
  if (!item) return;

  /* Remove any existing instance */
  const old = document.getElementById('_detailModal');
  if (old) old.remove();

  const rc = item.rating >= 9 ? '#21d07a' : item.rating >= 7.5 ? '#d2d531' : '#e50914';
  const rp = (item.rating / 10 * 100).toFixed(0);
  const stars = '★'.repeat(Math.round(item.rating / 2)) + '☆'.repeat(5 - Math.round(item.rating / 2));

  const modal = document.createElement('div');
  modal.id = '_detailModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:80000;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .25s;';

  modal.innerHTML = `
    <div style="position:absolute;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);" onclick="closeDetail()"></div>
    <div id="_detailBox" style="position:relative;z-index:2;width:100%;max-width:860px;background:#0d0d0f;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 40px 100px rgba(0,0,0,.95);max-height:92vh;overflow-y:auto;transform:scale(.93) translateY(20px);transition:transform .3s cubic-bezier(.22,1,.36,1);">

      <!-- Backdrop -->
      <div style="position:relative;height:240px;overflow:hidden;flex-shrink:0;">
        <div style="position:absolute;inset:0;background-image:url('${item.backdrop || item.poster}');background-size:cover;background-position:center 20%;filter:brightness(.45);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,#0d0d0f 100%);"></div>
        <button onclick="closeDetail()" style="position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:.85rem;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:5;" onmouseover="this.style.background='#e50914'" onmouseout="this.style.background='rgba(0,0,0,.6)'"><i class="fas fa-times"></i></button>
        <span style="position:absolute;top:14px;left:14px;background:rgba(229,9,20,.9);color:#fff;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:6px;">MOVIE</span>
      </div>

      <!-- Content -->
      <div style="display:flex;gap:24px;padding:0 28px 32px;margin-top:-80px;position:relative;z-index:2;flex-wrap:wrap;">
        <div style="flex-shrink:0;width:130px;">
          <img src="${item.poster}" alt="${item.title}"
            style="width:100%;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.7);border:2px solid rgba(255,255,255,.1);"
            onerror="this.src='https://placehold.co/130x195/111118/e50914?text=${encodeURIComponent(item.title)}'">
        </div>
        <div style="flex:1;min-width:220px;padding-top:84px;">
          <!-- Genres -->
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
            ${item.genres.map(g => `<span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(229,9,20,.12);border:1px solid rgba(229,9,20,.3);color:#e50914;padding:3px 9px;border-radius:4px;">${g}</span>`).join('')}
          </div>
          <!-- Title -->
          <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(1.6rem,5vw,2.6rem);line-height:1;color:#fff;margin-bottom:10px;">${item.title}</h2>
          <!-- Meta -->
          <div style="display:flex;align-items:center;gap:12px;font-size:.8rem;color:rgba(255,255,255,.6);margin-bottom:14px;flex-wrap:wrap;">
            <span style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:3px 10px;border-radius:6px;font-weight:700;color:#fff;">${item.year}</span>
            <span style="color:rgba(255,255,255,.4)">·</span>
            <span>${item.runtime || '—'}</span>
            <span style="color:rgba(255,255,255,.4)">·</span>
            <span style="color:${rc};font-weight:700;">${stars}</span>
            <span style="font-weight:700;color:#fff;">${item.rating}/10</span>
          </div>
          <!-- Score circle -->
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
            <div style="width:54px;height:54px;border-radius:50%;background:conic-gradient(${rc} ${rp}%,rgba(255,255,255,.06) 0);position:relative;flex-shrink:0;">
              <div style="position:absolute;inset:5px;border-radius:50%;background:#0d0d0f;display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:800;color:#fff;">${rp}</div>
            </div>
            <div style="font-size:.75rem;color:rgba(255,255,255,.5);line-height:1.5;">
              <strong style="display:block;color:rgba(255,255,255,.8);font-size:.82rem;">Audience Score</strong>Based on user ratings
            </div>
          </div>
          <!-- Desc -->
          <p style="font-size:.86rem;line-height:1.7;color:rgba(255,255,255,.65);margin-bottom:16px;">${item.desc}</p>
          <!-- Credits -->
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:22px;font-size:.8rem;">
            ${item.director ? `<div><span style="color:rgba(255,255,255,.4)">Director:</span> <span style="color:rgba(255,255,255,.75)">${item.director}</span></div>` : ''}
            ${item.cast    ? `<div><span style="color:rgba(255,255,255,.4)">Cast:</span> <span style="color:rgba(255,255,255,.75)">${item.cast}</span></div>` : ''}
          </div>
          <!-- Actions -->
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button onclick="openTrailer('${item.trailer}','${item.title.replace(/'/g,"\\'")}');closeDetail();"
              style="display:inline-flex;align-items:center;gap:8px;background:#e50914;border:none;color:#fff;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:11px 22px;border-radius:99px;cursor:pointer;transition:background .2s,transform .15s;"
              onmouseover="this.style.background='#c0000a';this.style.transform='translateY(-2px)'"
              onmouseout="this.style.background='#e50914';this.style.transform=''">
              <i class="fas fa-play"></i> Watch Trailer
            </button>
            <button onclick="addToWatchlist(MOVIES.find(m=>m.id===${item.id}))"
              style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:#fff;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;padding:11px 22px;border-radius:99px;cursor:pointer;transition:background .2s;"
              onmouseover="this.style.background='rgba(255,255,255,.14)'"
              onmouseout="this.style.background='rgba(255,255,255,.08)'">
              <i class="fas fa-bookmark"></i> Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  _recordHistory(item);
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    const b = document.getElementById('_detailBox');
    if (b) b.style.transform = 'scale(1) translateY(0)';
  });
}

function closeDetail() {
  const modal = document.getElementById('_detailModal');
  if (!modal) return;
  modal.style.opacity = '0';
  setTimeout(() => { modal.remove(); }, 250);
  document.body.style.overflow = '';
}

/* Record view history for profile page */
function _recordHistory(item) {
  let h = [];
  try { h = JSON.parse(localStorage.getItem('filmHorizon_history') || '[]'); } catch(e) {}
  h = h.filter(x => x.id !== item.id);
  h.unshift({ id: item.id, title: item.title, poster: item.poster, type: 'movie', year: item.year, genres: item.genres, viewedAt: new Date().toISOString() });
  localStorage.setItem('filmHorizon_history', JSON.stringify(h.slice(0, 30)));
}

/* ════════════════════════════════════════════════
   WATCHLIST
════════════════════════════════════════════════ */
/* ── Scoped watchlist helpers (same keys as apps.js / home page) ── */
function _wlUid() {
  try { return JSON.parse(sessionStorage.getItem('filmHorizon_user') || '{}').id || 'guest'; } catch(e) { return 'guest'; }
}
function _wlKey() { return 'filmHorizon_watchlist_' + _wlUid(); }
function _loadWatchlist() {
  try {
    const scoped = localStorage.getItem(_wlKey());
    if (scoped) return JSON.parse(scoped);
    return JSON.parse(localStorage.getItem('filmHorizon_watchlist') || '[]');
  } catch(e) { return []; }
}
let watchlist = _loadWatchlist();

function saveWatchlist() {
  localStorage.setItem(_wlKey(), JSON.stringify(watchlist));
  localStorage.setItem('filmHorizon_watchlist', JSON.stringify(watchlist));
}

function toggleWatchlist(e) {
  e.stopPropagation();
  document.getElementById('watchlistDropdown').classList.toggle('open');
}

/* Close watchlist when clicking outside */
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('watchlistWrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('watchlistDropdown').classList.remove('open');
  }
});

function addToWatchlist(item) {
  if (!item) return;
  if (watchlist.find(w => w.id === item.id)) {
    showToast('Already in Watchlist', 'fa-bookmark'); return;
  }
  watchlist.push({
    id: item.id, title: item.title, year: item.year,
    poster: item.poster, trailer: item.trailer, genres: item.genres
  });
  saveWatchlist();
  renderWatchlist();
  showToast('Added to Watchlist ✓', 'fa-bookmark');
}

function removeFromWatchlist(id) {
  watchlist = watchlist.filter(w => w.id !== id);
  saveWatchlist();
  renderWatchlist();
  showToast('Removed from Watchlist', 'fa-bookmark');
}

function renderWatchlist() {
  const list    = document.getElementById('wlList');
  const empty   = document.getElementById('wlEmpty');
  const badge   = document.getElementById('watchlistCount');
  const label   = document.getElementById('wlCountLabel');
  const n = watchlist.length;

  if (label) label.textContent = n + ' saved';
  if (badge) { badge.style.display = n > 0 ? 'flex' : 'none'; badge.textContent = n; }

  if (n === 0) {
    if (empty) empty.style.display = 'flex';
    if (list)  list.innerHTML = '';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (list) list.innerHTML = watchlist.map(item => `
    <div class="wl-item" onclick="openDetail(${item.id})">
      <img class="wl-item-poster" src="${item.poster}" alt="${item.title}"
        onerror="this.src='https://placehold.co/38x56/111118/e50914?text=${encodeURIComponent(item.title || '')}'">
      <div class="wl-item-info">
        <div class="wl-item-title">${item.title}</div>
        <div class="wl-item-meta">${item.year || ''} · ${(item.genres || []).slice(0, 2).join(', ')}</div>
      </div>
      <button class="wl-remove" title="Remove" onclick="event.stopPropagation();removeFromWatchlist(${item.id})">
        <i class="fas fa-times"></i>
      </button>
    </div>`).join('');
}

/* ════════════════════════════════════════════════
   CARD BUILDER
════════════════════════════════════════════════ */
function buildCard(movie, rank) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  const badgeHtml = movie.badge ? `<span class="card-badge">${movie.badge}</span>` : '';
  const rankHtml  = (activeSort === "rating" && activeGenre === "All" && !searchQuery && rank <= 10)
    ? `<div class="card-rank">${rank}</div>` : '';
  const genreTagsHtml = movie.genres.slice(0, 2).map(g => `<span class="card-genre-tag">${g}</span>`).join('');
  const safeTitle = movie.title.replace(/'/g, "\\'");

  if (isListView) {
    card.innerHTML = `
      ${rankHtml}
      <div class="card-thumb">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/80x120/111111/6c63ff?text=${encodeURIComponent(movie.title)}'">
        ${badgeHtml}
      </div>
      <div class="card-body">
        <div style="flex:1">
          <div class="card-title">${movie.title}</div>
          <div class="card-meta-row">
            <span class="card-rating"><i class="fas fa-star"></i> ${movie.rating}</span>
            <span style="color:var(--text2)">${movie.year} · ${movie.runtime}</span>
          </div>
          <div class="card-genre-tags">${genreTagsHtml}</div>
        </div>
        <button class="list-play-btn" onclick="event.stopPropagation();openTrailer('${movie.trailer}','${safeTitle}')">
          <i class="fas fa-play"></i>
        </button>
      </div>`;
  } else {
    card.innerHTML = `
      ${rankHtml}
      <div class="card-thumb">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/210x315/111111/6c63ff?text=${encodeURIComponent(movie.title)}'">
        ${badgeHtml}
        <div class="card-overlay">
          <div class="co-actions">
            <button class="co-btn play-btn" onclick="event.stopPropagation();openTrailer('${movie.trailer}','${safeTitle}')">
              <i class="fas fa-play"></i>
            </button>
            <button class="co-btn" title="Add to Watchlist" onclick="event.stopPropagation();addToWatchlist(MOVIES.find(m=>m.id===${movie.id}))">
              <i class="fas fa-plus"></i>
            </button>
            <button class="co-btn" title="Like" onclick="event.stopPropagation();showToast('Liked! ♥','fa-heart')">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <p class="co-desc">${movie.desc}</p>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${movie.title}</div>
        <div class="card-meta-row">
          <span class="card-rating"><i class="fas fa-star"></i> ${movie.rating}</span>
          <span>${movie.year}</span>
        </div>
        <div class="card-genre-tags">${genreTagsHtml}</div>
      </div>`;
  }

  card.addEventListener('click', e => {
    if (e.target.closest('button')) return;
    openDetail(movie);
  });
  return card;
}

/* ════════════════════════════════════════════════
   SPOTLIGHT
════════════════════════════════════════════════ */
function renderSpotlight() {
  const top = [...MOVIES].sort((a, b) => b.rating - a.rating)[0];
  if (!top) return;
  document.getElementById('spotlightImg').src = top.poster;
  document.getElementById('spotlightImg').alt = top.title;
  document.getElementById('spotlightTitle').textContent = top.title;
  document.getElementById('spotlightDesc').textContent = top.desc;
  document.getElementById('spotlightMeta').innerHTML =
    `<span class="spotlight-rating"><i class="fas fa-star"></i> ${top.rating}</span>
     <span>${top.year}</span><span>${top.runtime}</span><span>By ${top.director}</span>`;
  document.getElementById('spotlightGenres').innerHTML =
    top.genres.slice(0, 3).map(g => `<span class="spotlight-genre-tag">${g}</span>`).join('');
  document.getElementById('spotlightPlay').onclick    = () => openTrailer(top.trailer, top.title);
  document.getElementById('spotlightWatchlist').onclick = () => addToWatchlist(top);
}

/* ════════════════════════════════════════════════
   STATS
════════════════════════════════════════════════ */
function renderStats() {
  const years = MOVIES.map(m => m.year);
  document.getElementById('totalCount').textContent = MOVIES.length;
  document.getElementById('genreCount').textContent = new Set(MOVIES.flatMap(m => m.genres)).size;
  document.getElementById('yearRange').textContent  = `${Math.min(...years)}–${Math.max(...years)}`;
}

/* ════════════════════════════════════════════════
   RENDER / FILTER / SORT
════════════════════════════════════════════════ */
function getFiltered() {
  let list = [...MOVIES];
  if (activeGenre !== "All") list = list.filter(m => m.genres.includes(activeGenre));
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q)) ||
      (m.director && m.director.toLowerCase().includes(q)) ||
      String(m.year).includes(q)
    );
  }
  switch (activeSort) {
    case "rating":    list.sort((a, b) => b.rating - a.rating); break;
    case "year-desc": list.sort((a, b) => b.year   - a.year);   break;
    case "year-asc":  list.sort((a, b) => a.year   - b.year);   break;
    case "title":     list.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "title-z":   list.sort((a, b) => b.title.localeCompare(a.title)); break;
  }
  return list;
}

function render() {
  const filtered = getFiltered();
  const grid     = document.getElementById('moviesGrid');
  const empty    = document.getElementById('emptyState');
  const loadWrap = document.getElementById('loadMoreWrap');
  const countEl  = document.getElementById('resultsCount');
  const clearBtn = document.getElementById('clearFilters');

  grid.innerHTML = '';

  if (filtered.length === 0) {
    empty.style.display  = 'block';
    loadWrap.style.display = 'none';
    countEl.textContent  = 'No movies found';
    clearBtn.style.display = 'inline-flex';
    return;
  }

  empty.style.display = 'none';
  filtered.slice(0, visibleCount).forEach((item, i) => {
    const card = buildCard(item, i + 1);
    card.style.animationDelay = `${(i % PAGE_SIZE) * 0.04}s`;
    grid.appendChild(card);
  });

  countEl.textContent    = `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} movies`;
  clearBtn.style.display = (activeGenre !== "All" || searchQuery) ? 'inline-flex' : 'none';
  loadWrap.style.display = filtered.length > visibleCount ? 'block' : 'none';
}

/* ════════════════════════════════════════════════
   EVENT LISTENERS — filters / search / sort / view
════════════════════════════════════════════════ */
document.getElementById('genreScroll').addEventListener('click', e => {
  const pill = e.target.closest('.genre-pill');
  if (!pill) return;
  document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  activeGenre = pill.dataset.genre;
  visibleCount = 15;
  render();
  showToast(`Genre: ${activeGenre}`, 'fa-film');
});

document.getElementById('sortSelect').addEventListener('change', e => {
  activeSort = e.target.value; visibleCount = 15; render();
});

document.getElementById('gridViewBtn').addEventListener('click', () => {
  isListView = false;
  document.getElementById('moviesGrid').classList.remove('list-view');
  document.getElementById('gridViewBtn').classList.add('active');
  document.getElementById('listViewBtn').classList.remove('active');
  render();
});

document.getElementById('listViewBtn').addEventListener('click', () => {
  isListView = true;
  document.getElementById('moviesGrid').classList.add('list-view');
  document.getElementById('listViewBtn').classList.add('active');
  document.getElementById('gridViewBtn').classList.remove('active');
  render();
});

/* Search */
function doSearch(q) {
  searchQuery = q.trim(); visibleCount = 15; render();
  if (searchQuery) document.getElementById('moviesGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('searchBtn').addEventListener('click', () => doSearch(document.getElementById('searchInput').value));
document.getElementById('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(e.target.value); });
document.getElementById('searchInput').addEventListener('input', e => { if (!e.target.value.trim()) { searchQuery = ''; render(); } });

/* Load more / clear */
function loadMore() { visibleCount += PAGE_SIZE; render(); }

function clearAllFilters() {
  activeGenre = "All"; searchQuery = ""; activeSort = "rating"; visibleCount = 15;
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value  = 'rating';
  document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.genre-pill[data-genre="All"]').classList.add('active');
  render();
}

/* ESC to close modals */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDetail(); closeTrailer(); closeUpgradeModal(); }
});

/* ════════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════ */
function showToast(msg, icon = 'fa-info-circle') {
  const wrap  = document.getElementById('toastWrap');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`;
  wrap.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3000);
}

/* ════════════════════════════════════════════════
   THEME TOGGLE
════════════════════════════════════════════════ */
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  showToast(isDark ? 'Dark mode on' : 'Light mode on', isDark ? 'fa-moon' : 'fa-sun');
});

/* ════════════════════════════════════════════════
   NAVBAR SCROLL
════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════ */
function openProfile() { window.location.href = 'profilenew.html'; }

/* ════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════ */
renderStats();
renderSpotlight();
render();
renderWatchlist();