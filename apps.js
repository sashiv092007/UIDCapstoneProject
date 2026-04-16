/* ══════════════════════════════════════════════════
   FILMHORIZON — apps.js
   ══════════════════════════════════════════════════ */

if (!sessionStorage.getItem('filmHorizon_user')) {
  window.location.href = 'signup.htm';
}

/* ══ SCOPED USER DATABASE HELPERS ══════════════════
   Every piece of user data is stored under a key
   that includes the userId so different accounts
   never bleed into each other.
══════════════════════════════════════════════════ */
function _getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem('filmHorizon_user') || '{}'); } catch(e) { return {}; }
}
function _userId() { return _getCurrentUser().id || 'guest'; }

/* Scoped key builder */
function _uKey(suffix) { return suffix + '_' + _userId(); }

/* Get/set scoped watchlist */
function _getScopedWatchlist() {
  try { return JSON.parse(localStorage.getItem(_uKey('filmHorizon_watchlist')) || '[]'); } catch(e) { return []; }
}
function _saveScopedWatchlist(list) {
  localStorage.setItem(_uKey('filmHorizon_watchlist'), JSON.stringify(list));
  localStorage.setItem('filmHorizon_watchlist', JSON.stringify(list));
}

/* Get/set scoped view history (detail modal) */
function _getScopedHistory() {
  try { return JSON.parse(localStorage.getItem(_uKey('filmHorizon_history')) || '[]'); } catch(e) { return []; }
}
function _saveScopedHistory(list) {
  localStorage.setItem(_uKey('filmHorizon_history'), JSON.stringify(list));
  localStorage.setItem('filmHorizon_history', JSON.stringify(list));
}

/* Get/set scoped trailer watch history */
function _getScopedTrailerHistory() {
  try { return JSON.parse(localStorage.getItem(_uKey('filmHorizon_trailer_history')) || '[]'); } catch(e) { return []; }
}
function _saveScopedTrailerHistory(list) {
  localStorage.setItem(_uKey('filmHorizon_trailer_history'), JSON.stringify(list));
  localStorage.setItem('filmHorizon_trailer_history', JSON.stringify(list));
}

/* Record a trailer watch for the current user — also adds to watch history */
function _recordTrailerWatch(videoId, title, itemData) {
  if (!videoId) return;
  // Save to trailer-specific history
  const list = _getScopedTrailerHistory();
  const filtered = list.filter(t => t.videoId !== videoId);
  filtered.unshift({ videoId, title: title || 'Trailer', watchedAt: new Date().toISOString() });
  _saveScopedTrailerHistory(filtered.slice(0, 100));

  // Also save to view history so it shows in Profile > Watch History
  if (itemData && itemData.id) {
    const hist = _getScopedHistory();
    const filteredHist = hist.filter(h => h.id !== itemData.id);
    filteredHist.unshift({
      id: itemData.id,
      title: itemData.title || title || 'Unknown',
      poster: itemData.poster || '',
      year: itemData.year || '',
      genres: itemData.genres || [],
      type: itemData.type || '',
      viewedAt: new Date().toISOString()
    });
    _saveScopedHistory(filteredHist.slice(0, 100));
  }
}

/* Update plan for the current user in the users DB */
function _updateCurrentUserPlan(plan, planLabel, txnId) {
  const uid = _userId();
  if (!uid || uid === 'guest') return;
  try {
    const users = JSON.parse(localStorage.getItem('filmHorizon_users') || '[]');
    const idx = users.findIndex(u => u.id === uid);
    if (idx === -1) return;
    users[idx].plan = plan;
    users[idx].profile = users[idx].profile || {};
    users[idx].profile.planLabel = planLabel;
    users[idx].profile.planSince = users[idx].profile.planSince || new Date().toISOString();
    users[idx].profile.lastTxn = txnId || users[idx].profile.lastTxn;
    localStorage.setItem('filmHorizon_users', JSON.stringify(users));
    localStorage.setItem('filmHorizon_profile', JSON.stringify(users[idx].profile));
    localStorage.setItem('filmHorizon_profile_' + uid, JSON.stringify(users[idx].profile));
    /* Also update session */
    const sess = _getCurrentUser();
    sess.plan = plan;
    sessionStorage.setItem('filmHorizon_user', JSON.stringify(sess));
  } catch(e) {}
}

/* ─── INIT USER PROFILE IN NAVBAR ───────────────── */
(function initUserProfile(){
  try {
    const u = _getCurrentUser();
    const name = u.name || 'User';
    const plan = (u.plan||'free').toLowerCase();

    // Set name
    const nameEl = document.querySelector('.profile-name');
    if(nameEl) nameEl.textContent = name;

    // Set avatar initial
    const avatarEl = document.querySelector('.profile-avatar');
    if(avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();

    // Set plan label with color per plan
    const planEl = document.getElementById('userPlanDisplay');
    if(planEl){
      const planConfig = {
        free:     { label:'FREE PLAN',     color:'#7070a0' },
        basic:    { label:'BASIC PLAN',    color:'#4fc3f7' },
        students: { label:'STUDENT PLAN',  color:'#81c784' },
        premium:  { label:'PREMIUM PLAN',  color:'#f5c518' }
      };
      const cfg = planConfig[plan] || planConfig.free;
      planEl.textContent  = cfg.label;
      planEl.style.color  = cfg.color;
      planEl.style.fontWeight = 'bold';
    }

    // Show plan banner at top of page
    _showPlanBanner(plan, name);

    // Restore scoped data into legacy keys so the rest of apps.js works
    localStorage.setItem('filmHorizon_watchlist', JSON.stringify(_getScopedWatchlist()));
    localStorage.setItem('filmHorizon_history', JSON.stringify(_getScopedHistory()));

  } catch(e){}
})();

/* ─── PLAN BANNER ────────────────────────────────── */
function _showPlanBanner(plan, name){
  const existing = document.getElementById('_planBanner');
  if(existing) existing.remove();

  const configs = {
    free: {
      bg:'linear-gradient(90deg,#1a1a2e,#16213e)',
      border:'rgba(112,112,160,0.3)',
      icon:'fa-lock',
      iconColor:'#7070a0',
      msg:`You're on the <strong>Free Plan</strong> — 2 trailers per session, SD quality only.`,
      btn:'Upgrade Now',
      btnColor:'#e50914',
      show: true
    },
    basic: {
      bg:'linear-gradient(90deg,#0d1b2a,#1b2838)',
      border:'rgba(79,195,247,0.3)',
      icon:'fa-check-circle',
      iconColor:'#4fc3f7',
      msg:`Welcome back, <strong>${name}</strong>! You have <strong>Basic Plan</strong> — Full HD, unlimited trailers.`,
      btn:null,
      show: true
    },
    students: {
      bg:'linear-gradient(90deg,#0a1f0a,#0d2b0d)',
      border:'rgba(129,199,132,0.3)',
      icon:'fa-graduation-cap',
      iconColor:'#81c784',
      msg:`Welcome, <strong>${name}</strong>! Student Plan active — Full HD, unlimited access.`,
      btn:null,
      show: true
    },
    premium: {
      bg:'linear-gradient(90deg,#1a1200,#2a1f00)',
      border:'rgba(245,197,24,0.3)',
      icon:'fa-crown',
      iconColor:'#f5c518',
      msg:`Welcome back, <strong>${name}</strong>! You have <strong>Premium Plan</strong> — 4K, unlimited everything.`,
      btn:null,
      show: true
    }
  };

  const cfg = configs[plan] || configs.free;
  if(!cfg.show) return;

  const banner = document.createElement('div');
  banner.id = '_planBanner';
  banner.style.cssText = `
    position:fixed; top:70px; left:50%; transform:translateX(-50%);
    z-index:99999; width:min(680px,92vw);
    background:${cfg.bg};
    border:1px solid ${cfg.border};
    border-radius:12px;
    padding:12px 18px;
    display:flex; align-items:center; gap:12px;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    animation:_bannerIn .4s cubic-bezier(.22,1,.36,1);
    font-family:'DM Sans',sans-serif;
    font-size:13px; color:rgba(255,255,255,0.85);
  `;

  banner.innerHTML = `
    <style>
      @keyframes _bannerIn { from{opacity:0;transform:translateX(-50%) translateY(-16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    </style>
    <i class="fas ${cfg.icon}" style="color:${cfg.iconColor};font-size:16px;flex-shrink:0;"></i>
    <span style="flex:1;">${cfg.msg}</span>
    ${cfg.btn ? `<button onclick="openPricing();document.getElementById('_planBanner').remove()" style="background:${cfg.btnColor};border:none;color:#fff;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">${cfg.btn}</button>` : ''}
    <button onclick="this.closest('#_planBanner').remove()" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:16px;padding:0 4px;line-height:1;">✕</button>
  `;

  document.body.appendChild(banner);
  setTimeout(()=>{ if(banner.parentNode){ banner.style.transition='opacity .4s'; banner.style.opacity='0'; setTimeout(()=>banner.remove(),400); } }, 6000);
}

/* ─── CONTENT DATABASE ──────────────────────────── */
const ALL_CONTENT = [
  { id:99, title:"The Office", year:2005, rating:9.0, genres:["Comedy","Drama"],
    poster:"https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg",
    trailer:"LHOtME2DL4g", cast:"Steve Carell, John Krasinski, Jenna Fischer, Rainn Wilson, Ed Helms",
    director:"Greg Daniels", runtime:"22 min/ep",
    desc:"A mockumentary sitcom following the everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
    badge:"Top Rated", type:"series" },
  { id:1, title:"Breaking Bad", year:2008, rating:9.5, genres:["Drama","Thriller","Crime"],
    poster:"https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    trailer:"HhesaQXLuRY", cast:"Bryan Cranston, Aaron Paul, Anna Gunn",
    director:"Vince Gilligan", runtime:"47 min/ep",
    desc:"A chemistry teacher diagnosed with cancer turns to manufacturing methamphetamine to secure his family's future.",
    badge:"Top Rated", type:"series" },
  { id:2, title:"The Shawshank Redemption", year:1994, rating:9.3, genres:["Drama","Crime"],
    poster:"https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    trailer:"6hB3S9bIaco", cast:"Tim Robbins, Morgan Freeman, Bob Gunton",
    director:"Frank Darabont", runtime:"2h 22min",
    desc:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    badge:"Classic", type:"movie" },
  { id:3, title:"Game of Thrones", year:2011, rating:9.2, genres:["Drama","Action","Fantasy"],
    poster:"https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/suopoADq0k8YZr4dQXcU6aLJ3rE.jpg",
    trailer:"KPLWWIOCOOQ", cast:"Emilia Clarke, Kit Harington, Peter Dinklage",
    director:"David Benioff, D.B. Weiss", runtime:"55 min/ep",
    desc:"Nine noble families fight for control over the lands of Westeros while an ancient enemy awakens.",
    badge:"Epic", type:"series" },
  { id:4, title:"Fullmetal Alchemist: Brotherhood", year:2009, rating:9.1, genres:["Animation","Action","Adventure"],
    poster:"https://image.tmdb.org/t/p/w500/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/70GxMqJC4iNlDQhF6Q1EHMJFYjN.jpg",
    trailer:"--IcmZkvL0Q", cast:"Vic Mignogna, Aaron Dismuke, Romi Park",
    director:"Yasuhiro Irie", runtime:"24 min/ep",
    desc:"Two alchemist brothers search for the Philosopher's Stone after a failed attempt to resurrect their mother.",
    badge:"Top Rated", type:"anime" },
  { id:5, title:"The Dark Knight", year:2008, rating:9.0, genres:["Action","Drama","Thriller"],
    poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    trailer:"EXeTwQWrcwY", cast:"Christian Bale, Heath Ledger, Aaron Eckhart",
    director:"Christopher Nolan", runtime:"2h 32min",
    desc:"When the Joker wreaks havoc on Gotham, Batman must confront one of the greatest psychological tests of his ability to fight injustice.",
    badge:"Top Rated", type:"movie" },
  { id:6, title:"Inception", year:2010, rating:8.8, genres:["Action","Sci-Fi","Thriller"],
    poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer:"YoHD9XEInc0", cast:"Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    director:"Christopher Nolan", runtime:"2h 28min",
    desc:"A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    badge:"Classic", type:"movie" },
  { id:7, title:"Stranger Things", year:2016, rating:8.7, genres:["Drama","Sci-Fi","Horror"],
    poster:"https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    trailer:"b9EkMc79ZSU", cast:"Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
    director:"The Duffer Brothers", runtime:"50 min/ep",
    desc:"When a young boy disappears, his mother and friends must confront terrifying supernatural forces to get him back.",
    badge:null, type:"series" },
  { id:8, title:"Interstellar", year:2014, rating:8.6, genres:["Sci-Fi","Drama","Adventure"],
    poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XMTSj.jpg",
    trailer:"zSWdZVtXT7E", cast:"Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    director:"Christopher Nolan", runtime:"2h 49min",
    desc:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    badge:null, type:"movie" },
  { id:9, title:"Attack on Titan", year:2013, rating:8.9, genres:["Animation","Action","Drama"],
    poster:"https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/bIlYH4l2AZfSBQoZdB8OlMFHBKL.jpg",
    trailer:"LHtdKWJdif4", cast:"Yuki Kaji, Marina Inoue, Yui Ishikawa",
    director:"Tetsuro Araki", runtime:"24 min/ep",
    desc:"Humanity hides behind gigantic walls to escape the Titans — colossal beings that devour humans seemingly without reason.",
    badge:"New", type:"anime" },
  { id:10, title:"The Crown", year:2016, rating:8.7, genres:["Drama","Biography"],
    poster:"https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/99TPGtSEfKdAoAhMCJEHlPbkpOT.jpg",
    trailer:"JWtnJjn6ng0", cast:"Olivia Colman, Tobias Menzies, Helena Bonham Carter",
    director:"Peter Morgan", runtime:"58 min/ep",
    desc:"This drama follows the political rivalries and romance of Queen Elizabeth II's reign.",
    badge:null, type:"series" },
  { id:11, title:"Parasite", year:2019, rating:8.5, genres:["Drama","Thriller","Comedy"],
    poster:"https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    trailer:"5xH0HfJHsaY", cast:"Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    director:"Bong Joon-ho", runtime:"2h 12min",
    desc:"Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    badge:"Oscar Winner", type:"movie" },
  { id:12, title:"Dune", year:2021, rating:8.0, genres:["Sci-Fi","Action","Drama"],
    poster:"dune.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    trailer:"8g18jFHCLXk", cast:"Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
    director:"Denis Villeneuve", runtime:"2h 35min",
    desc:"The son of a noble family entrusted with the protection of the most valuable asset in the galaxy faces a treacherous desert world.",
    badge:null, type:"movie" },
  { id:13, title:"Everything Everywhere All at Once", year:2022, rating:7.8, genres:["Sci-Fi","Comedy","Drama","Action"],
    poster:"https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/fF5hJZbJKPJHSHfOmfGBPQ5JV6V.jpg",
    trailer:"wxN1T1uxQ2g", cast:"Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
    director:"Daniel Kwan, Daniel Scheinert", runtime:"2h 19min",
    desc:"A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes.",
    badge:"Oscar Winner", type:"movie" },
  { id:14, title:"Death Note", year:2006, rating:8.9, genres:["Animation","Crime","Thriller"],
    poster:"deathnote.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/cQECBqDmqKX3qiV7Lj4lBPWBnjS.jpg",
    trailer:"NlJZ1ZgkHpk", cast:"Mamoru Miyano, Brad Swaile, Vincent Tong",
    director:"Tetsuro Araki", runtime:"23 min/ep",
    desc:"A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name in it.",
    badge:"Classic", type:"anime" },
  { id:15, title:"The Witcher", year:2019, rating:8.2, genres:["Action","Drama","Fantasy"],
    poster:"https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
    trailer:"ndl8GNi4dNQ", cast:"Henry Cavill, Freya Allan, Anya Chalotra",
    director:"Lauren Schmidt Hissrich", runtime:"60 min/ep",
    desc:"Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    badge:null, type:"series" },
  { id:16, title:"Oppenheimer", year:2023, rating:8.3, genres:["Drama","Thriller","Biography"],
    poster:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailer:"uYPbbksJxIg", cast:"Cillian Murphy, Emily Blunt, Matt Damon",
    director:"Christopher Nolan", runtime:"3h",
    desc:"The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    badge:"New", type:"movie" },
  { id:17, title:"The Bear", year:2022, rating:8.7, genres:["Drama","Comedy"],
    poster:"https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/tFxjhCEDzl3uV0EXdcYR7XCB01N.jpg",
    trailer:"dM4SUGPePa0", cast:"Jeremy Allen White, Ebon Moss-Bachrach, Ayo Edebiri",
    director:"Christopher Storer", runtime:"30 min/ep",
    desc:"A young chef from the fine dining world comes to run his family's sandwich shop in Chicago.",
    badge:"New", type:"series" },
  { id:18, title:"Demon Slayer", year:2019, rating:8.7, genres:["Animation","Action","Fantasy"],
    poster:"https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/qEjHO9AALDFcMExJb5sHETHONXB.jpg",
    trailer:"VQGCKyvzIM4", cast:"Natsuki Hanae, Zach Aguilar, Abby Trott",
    director:"Haruo Sotozaki", runtime:"24 min/ep",
    desc:"A young boy becomes a demon slayer to avenge his family and cure his demon-turned sister.",
    badge:"Hot", type:"anime" },
  { id:19, title:"The Last of Us", year:2023, rating:8.8, genres:["Drama","Sci-Fi","Thriller"],
    poster:"https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/uDgy6hyPd7SjqUYNFUTwCGAhwI5.jpg",
    trailer:"uLtkt8BonwM", cast:"Pedro Pascal, Bella Ramsey, Gabriel Luna",
    director:"Craig Mazin, Neil Druckmann", runtime:"50 min/ep",
    desc:"After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    badge:"New", type:"series" },
  { id:20, title:"Your Name", year:2016, rating:8.4, genres:["Animation","Drama","Romance"],
    poster:"https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
    trailer:"xU47nhruN-Q", cast:"Ryunosuke Kamiki, Mone Kamishiraishi",
    director:"Makoto Shinkai", runtime:"1h 52min",
    desc:"Two strangers find themselves linked in a bizarre way, waking up as each other.",
    badge:"Classic", type:"anime" },
  { id:21, title:"Severance", year:2022, rating:8.7, genres:["Sci-Fi","Thriller","Drama"],
    poster:"severance.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/Azuze7F6lzJaQWj8hGrAkHWPqrq.jpg",
    trailer:"xEQP4VVuyrY", cast:"Adam Scott, Zach Cherry, Britt Lower",
    director:"Ben Stiller", runtime:"50 min/ep",
    desc:"Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.",
    badge:"Hot", type:"series" },
  { id:22, title:"Avengers: Endgame", year:2019, rating:8.4, genres:["Action","Sci-Fi","Adventure"],
    poster:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailer:"TcMBFSGVi1c", cast:"Robert Downey Jr., Chris Evans, Mark Ruffalo",
    director:"Anthony & Joe Russo", runtime:"3h 1min",
    desc:"The Avengers assemble once more to reverse the actions of Thanos and restore order to the universe.",
    badge:"Epic", type:"movie" },
  { id:23, title:"Squid Game", year:2021, rating:8.0, genres:["Drama","Thriller","Action"],
    poster:"https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
    trailer:"oqxAJKy0ii4", cast:"Lee Jung-jae, Park Hae-soo, Wi Ha-joon",
    director:"Hwang Dong-hyuk", runtime:"55 min/ep",
    desc:"Hundreds of cash-strapped players accept a strange invitation to compete in children's games with deadly high stakes.",
    badge:"Hot", type:"series" },
  { id:24, title:"Spider-Man: Into the Spider-Verse", year:2018, rating:8.4, genres:["Animation","Action","Sci-Fi"],
    poster:"https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    backdrop:"https://image.tmdb.org/t/p/w1280/67NlGTricEbpBeNJcHJ7yRRGX1V.jpg",
    trailer:"tg52up16eq0", cast:"Shameik Moore, Jake Johnson, Hailee Steinfeld",
    director:"Bob Persichetti, Peter Ramsey", runtime:"1h 57min",
    desc:"Teen Miles Morales becomes Spider-Man of his reality, crossing paths with counterparts from other dimensions.",
    badge:"Oscar Winner", type:"movie" },
];

/* ─── Continue Watching Data ────────────────────── */
const CONTINUE_DATA = [
  { title:"Breaking Bad", episode:"S3 · E4 — Green Light", progress:65,
    poster:"https://image.tmdb.org/t/p/w780/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg", trailer:"HhesaQXLuRY" },
  { title:"Stranger Things", episode:"S4 · E7 — The Massacre at Hawkins Lab", progress:40,
    poster:"https://image.tmdb.org/t/p/w780/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", trailer:"b9EkMc79ZSU" },
  { title:"Attack on Titan", episode:"S4 · E28 — The Dawn of Humanity", progress:80,
    poster:"aot.jpg", trailer:"LHtdKWJdif4" },
  { title:"Interstellar", episode:"1h 45m remaining", progress:30,
    poster:"interstellar.jpg", trailer:"zSWdZVtXT7E" },
  { title:"The Crown", episode:"S5 · E2 — The System", progress:55,
    poster:"crown.jpg", trailer:"JWtnJjn6ng0" },
];

/* ══════════════════════════════════════════════════
   CARD BUILDER
   ══════════════════════════════════════════════════ */
function buildCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  const badgeHtml = item.badge ? `<span class="card-badge">${item.badge}</span>` : '';
  const genreTagsHtml = (item.genres||[]).slice(0,2).map(g=>`<span class="card-genre-tag">${g}</span>`).join('');
  card.innerHTML = `
    <div class="card-thumb">
      <img src="${item.poster}" alt="${item.title}" loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/180x270/111118/e50914?text=${encodeURIComponent(item.title)}'">
      ${badgeHtml}
      <div class="card-overlay">
        <div class="co-actions">
          <button class="co-btn play-btn" onclick="event.stopPropagation();openTrailer('${item.trailer}','${item.title.replace(/'/g,"\\'")}')"><i class="fas fa-play"></i></button>
          <button class="co-btn co-plus-btn" onclick="event.stopPropagation();addToWatchlistById(${item.id})"><i class="fas fa-plus"></i></button>
          <button class="co-btn" onclick="event.stopPropagation();openDetail(${item.id})"><i class="fas fa-info"></i></button>
        </div>
        <p class="co-desc">${item.desc||''}</p>
      </div>
    </div>
    <div class="card-body">
      <div class="card-title">${item.title}</div>
      <div class="card-meta-row"><span class="card-rating"><i class="fas fa-star"></i> ${item.rating}</span><span>${item.year}</span></div>
      <div class="card-genre-tags">${genreTagsHtml}</div>
    </div>
  `;
  card.addEventListener('click', e => { if (e.target.closest('button')) return; openDetail(item.id); });
  return card;
}

/* ─── CONTINUE WATCHING CARD ────────────────────── */
function buildContinueCard(item) {
  const card = document.createElement('div');
  card.className = 'continue-card';
  card.innerHTML = `
    <div class="continue-overlay"><div class="play-icon-lg"><i class="fas fa-play"></i></div></div>
    <img class="continue-thumb" src="${item.poster}" alt="${item.title}" loading="lazy"
      onerror="this.onerror=null;this.src='https://placehold.co/280x158/111118/e50914?text=${encodeURIComponent(item.title)}'">
    <div class="continue-info">
      <div class="continue-title">${item.title}</div>
      <div class="continue-ep">${item.episode}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${item.progress}%"></div></div>
    </div>
  `;
  card.addEventListener('click', () => openTrailer(item.trailer, item.title));
  return card;
}

/* ─── TOP 10 CARD ───────────────────────────────── */
function buildTop10Card(item, rank) {
  const card = document.createElement('div');
  card.className = 'top10-card';
  card.innerHTML = `
    <div class="top10-num">${rank}</div>
    <div class="top10-img-wrap">
      <img src="${item.poster}" alt="${item.title}" loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/130x195/111118/e50914?text=${encodeURIComponent(item.title)}'">
    </div>
  `;
  card.addEventListener('click', () => openDetail(item.id));
  return card;
}

/* ─── RENDER ALL ROWS ───────────────────────────── */
function renderAllRows() {
  const continueRow = document.getElementById('continueRow');
  if (continueRow) { continueRow.innerHTML = ''; CONTINUE_DATA.forEach(i=>continueRow.appendChild(buildContinueCard(i))); }
  const newRow = document.getElementById('newRow');
  if (newRow) { newRow.innerHTML = ''; [...ALL_CONTENT].sort((a,b)=>b.year-a.year).slice(0,12).forEach(i=>newRow.appendChild(buildCard(i))); }
  const top10Row = document.getElementById('top10Row');
  if (top10Row) { top10Row.innerHTML = ''; [...ALL_CONTENT].sort((a,b)=>b.rating-a.rating).slice(0,10).forEach((i,idx)=>top10Row.appendChild(buildTop10Card(i,idx+1))); }
  const trendRow = document.getElementById('trendRow');
  if (trendRow) { trendRow.innerHTML = ''; [...ALL_CONTENT].sort(()=>Math.random()-.5).slice(0,12).forEach(i=>trendRow.appendChild(buildCard(i))); }
}

/* ─── SCROLL ROW ────────────────────────────────── */
function scrollRow(rowId, dir) {
  const row = document.getElementById(rowId);
  if (row) row.scrollBy({ left: dir * 600, behavior: 'smooth' });
}

/* ─── GENRE FILTER ──────────────────────────────── */
function filterGenre(btn) {
  document.querySelectorAll('.genre-pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  const sel = btn.textContent.trim();
  const newRow = document.getElementById('newRow');
  const trendRow = document.getElementById('trendRow');
  newRow.innerHTML = ''; trendRow.innerHTML = '';
  const sorted = [...ALL_CONTENT].sort((a,b)=>b.year-a.year);
  const shuffled = [...ALL_CONTENT].sort(()=>Math.random()-.5);
  const f = sel==='All' ? sorted : sorted.filter(i=>i.genres.some(g=>g.toLowerCase()===sel.toLowerCase()));
  const ft = sel==='All' ? shuffled : shuffled.filter(i=>i.genres.some(g=>g.toLowerCase()===sel.toLowerCase()));
  if(f.length===0) newRow.innerHTML='<p style="color:#888;font-size:.85rem;padding:10px 0">No titles found.</p>';
  else f.slice(0,12).forEach(i=>newRow.appendChild(buildCard(i)));
  if(ft.length===0) trendRow.innerHTML='<p style="color:#888;font-size:.85rem;padding:10px 0">No titles found.</p>';
  else ft.slice(0,12).forEach(i=>trendRow.appendChild(buildCard(i)));
  showToast(`Genre: ${sel}`, 'fa-film');
}

/* ══════════════════════════════════════════════════
   LIVE SEARCH DROPDOWN
   ══════════════════════════════════════════════════ */
const searchInput    = document.getElementById('searchInput');
const searchBtn      = document.getElementById('searchBtn');
const searchResults  = document.getElementById('searchResults');
const searchResultsRow = document.getElementById('searchResultsRow');
const searchQueryEl  = document.getElementById('searchQuery');
let _searchDrop = null;

function _buildDrop() {
  if (_searchDrop) return;
  _searchDrop = document.createElement('div');
  _searchDrop.id = '_liveSearchDrop';
  _searchDrop.style.cssText = 'position:absolute;top:calc(100% + 6px);left:0;right:0;background:#111118;border:1px solid rgba(255,255,255,.1);border-radius:12px;max-height:380px;overflow-y:auto;z-index:50000;box-shadow:0 20px 60px rgba(0,0,0,.85);display:none;';
  const wrap = searchInput ? searchInput.closest('.search-wrap') : null;
  if (wrap) { wrap.style.position='relative'; wrap.appendChild(_searchDrop); }
}

function _renderDrop(q) {
  _buildDrop();
  if (!q.trim()) { _searchDrop.style.display='none'; return; }
  const lower = q.toLowerCase();
  const hits = ALL_CONTENT.filter(m=>
    m.title.toLowerCase().includes(lower)||
    m.genres.some(g=>g.toLowerCase().includes(lower))||
    String(m.year).includes(lower)||
    (m.director||'').toLowerCase().includes(lower)||
    (m.cast||'').toLowerCase().includes(lower)
  ).slice(0,7);
  if (hits.length===0) {
    _searchDrop.innerHTML=`<div style="padding:18px 16px;color:#555;font-size:13px;text-align:center;">No results for "<strong style='color:#888'>${q}</strong>"</div>`;
  } else {
    _searchDrop.innerHTML = hits.map(item=>`
      <div onclick="openDetail(${item.id});_closeDrop()" style="display:flex;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;transition:background .15s;border-bottom:1px solid rgba(255,255,255,.04);"
        onmouseover="this.style.background='rgba(255,255,255,.05)'" onmouseout="this.style.background=''">
        <img src="${item.poster}" alt="${item.title}" style="width:36px;height:54px;object-fit:cover;border-radius:6px;flex-shrink:0;"
          onerror="this.src='https://placehold.co/36x54/111118/e50914?text=?'">
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.title}</div>
          <div style="font-size:11px;color:#666;margin-top:2px;">${item.year} · ${item.genres.slice(0,2).join(', ')}</div>
        </div>
        <span style="font-size:11px;color:#e50914;font-weight:700;text-transform:uppercase;flex-shrink:0;">${item.type}</span>
      </div>`).join('');
  }
  _searchDrop.style.display='block';
}

function _closeDrop() {
  if (_searchDrop) _searchDrop.style.display='none';
  if (searchInput) searchInput.value='';
}

function doSearch(q) {
  q=q.trim();
  if (!q) { if(searchResults) searchResults.classList.remove('open'); return; }
  const lower=q.toLowerCase();
  const hits=ALL_CONTENT.filter(m=>m.title.toLowerCase().includes(lower)||m.genres.some(g=>g.toLowerCase().includes(lower))||String(m.year).includes(lower));
  if(searchQueryEl) searchQueryEl.textContent=q;
  if(searchResultsRow){ searchResultsRow.innerHTML='';
    if(hits.length===0) searchResultsRow.innerHTML='<p style="color:var(--muted);font-size:.85rem;padding:10px 0">No results found.</p>';
    else hits.slice(0,12).forEach(i=>searchResultsRow.appendChild(buildCard(i)));
  }
  if(searchResults) searchResults.classList.add('open');
  _closeDrop();
}

if(searchBtn) searchBtn.addEventListener('click',()=>doSearch(searchInput.value));
if(searchInput){
  searchInput.addEventListener('keydown',e=>{ if(e.key==='Enter') doSearch(e.target.value); if(e.key==='Escape') _closeDrop(); });
  searchInput.addEventListener('input',e=>{ const v=e.target.value; if(!v.trim()){if(searchResults)searchResults.classList.remove('open');_closeDrop();return;} _renderDrop(v); });
  searchInput.addEventListener('focus',e=>{ if(e.target.value.trim()) _renderDrop(e.target.value); });
}
document.addEventListener('click',e=>{ if(searchInput&&!searchInput.closest('.search-wrap').contains(e.target)) _closeDrop(); });

/* ══════════════════════════════════════════════════
   SHOW DETAIL MODAL
   ══════════════════════════════════════════════════ */
function openDetail(idOrObj) {
  const item = typeof idOrObj==='object' ? idOrObj : ALL_CONTENT.find(c=>c.id===idOrObj);
  if (!item) return;
  const old = document.getElementById('_detailModal');
  if (old) old.remove();
  const rc = item.rating>=9?'#21d07a':item.rating>=7.5?'#d2d531':'#e50914';
  const rp = (item.rating/10*100).toFixed(0);
  const stars = '★'.repeat(Math.round(item.rating/2))+'☆'.repeat(5-Math.round(item.rating/2));
  const modal = document.createElement('div');
  modal.id = '_detailModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:80000;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .25s;';
  modal.innerHTML = `
    <div style="position:absolute;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);" onclick="closeDetail()"></div>
    <div id="_detailBox" style="position:relative;z-index:2;width:100%;max-width:860px;background:#0d0d0f;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 40px 100px rgba(0,0,0,.95);max-height:92vh;overflow-y:auto;transform:scale(.93) translateY(20px);transition:transform .3s cubic-bezier(.22,1,.36,1);">
      <div style="position:relative;height:240px;overflow:hidden;flex-shrink:0;">
        <div style="position:absolute;inset:0;background-image:url('${item.backdrop||item.poster}');background-size:cover;background-position:center 20%;filter:brightness(.45);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,#0d0d0f 100%);"></div>
        <button onclick="closeDetail()" style="position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:.85rem;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:5;" onmouseover="this.style.background='#e50914'" onmouseout="this.style.background='rgba(0,0,0,.6)'"><i class="fas fa-times"></i></button>
        <span style="position:absolute;top:14px;left:14px;background:rgba(229,9,20,.9);color:#fff;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:6px;">${item.type.toUpperCase()}</span>
      </div>
      <div style="display:flex;gap:24px;padding:0 28px 32px;margin-top:-80px;position:relative;z-index:2;flex-wrap:wrap;">
        <div style="flex-shrink:0;width:130px;">
          <img src="${item.poster}" alt="${item.title}" style="width:100%;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.7);border:2px solid rgba(255,255,255,.1);"
            onerror="this.src='https://placehold.co/130x195/111118/e50914?text=${encodeURIComponent(item.title)}'">
        </div>
        <div style="flex:1;min-width:220px;padding-top:84px;">
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
            ${item.genres.map(g=>`<span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(229,9,20,.12);border:1px solid rgba(229,9,20,.3);color:#e50914;padding:3px 9px;border-radius:4px;">${g}</span>`).join('')}
          </div>
          <h2 style="font-family:'Bebas Neue',sans-serif;font-size:clamp(1.6rem,5vw,2.6rem);line-height:1;color:#fff;margin-bottom:10px;">${item.title}</h2>
          <div style="display:flex;align-items:center;gap:12px;font-size:.8rem;color:rgba(255,255,255,.6);margin-bottom:14px;flex-wrap:wrap;">
            <span style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:3px 10px;border-radius:6px;font-weight:700;color:#fff;">${item.year}</span>
            <span style="color:rgba(255,255,255,.4)">·</span><span>${item.runtime||'—'}</span>
            <span style="color:rgba(255,255,255,.4)">·</span>
            <span style="color:${rc};font-weight:700;">${stars}</span>
            <span style="font-weight:700;color:#fff;">${item.rating}/10</span>
          </div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
            <div style="width:54px;height:54px;border-radius:50%;background:conic-gradient(${rc} ${rp}%,rgba(255,255,255,.06) 0);position:relative;flex-shrink:0;">
              <div style="position:absolute;inset:5px;border-radius:50%;background:#0d0d0f;display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:800;color:#fff;">${rp}</div>
            </div>
            <div style="font-size:.75rem;color:rgba(255,255,255,.5);line-height:1.5;">
              <strong style="display:block;color:rgba(255,255,255,.8);font-size:.82rem;">Audience Score</strong>Based on user ratings
            </div>
          </div>
          <p style="font-size:.86rem;line-height:1.7;color:rgba(255,255,255,.65);margin-bottom:16px;">${item.desc}</p>
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:22px;font-size:.8rem;">
            ${item.director?`<div><span style="color:rgba(255,255,255,.4)">Director:</span> <span style="color:rgba(255,255,255,.75)">${item.director}</span></div>`:''}
            ${item.cast?`<div><span style="color:rgba(255,255,255,.4)">Cast:</span> <span style="color:rgba(255,255,255,.75)">${item.cast}</span></div>`:''}
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button onclick="openTrailer('${item.trailer}','${item.title.replace(/'/g,"\\'")}');closeDetail();" style="display:inline-flex;align-items:center;gap:8px;background:#e50914;border:none;color:#fff;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:11px 22px;border-radius:99px;cursor:pointer;transition:background .2s,transform .15s;" onmouseover="this.style.background='#c0000a';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#e50914';this.style.transform=''"><i class="fas fa-play"></i> Watch Trailer</button>
            <button onclick="addToWatchlistById(${item.id})" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:#fff;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;padding:11px 22px;border-radius:99px;cursor:pointer;transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,.14)'" onmouseout="this.style.background='rgba(255,255,255,.08)'"><i class="fas fa-plus"></i> Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow='hidden';
  _recordHistory(item);
  requestAnimationFrame(()=>{ modal.style.opacity='1'; const b=document.getElementById('_detailBox'); if(b) b.style.transform='scale(1) translateY(0)'; });
}

function closeDetail() {
  const modal=document.getElementById('_detailModal');
  if(!modal) return;
  modal.style.opacity='0';
  setTimeout(()=>{ modal.remove(); },250);
  document.body.style.overflow='';
}

function _recordHistory(item) {
  let h = _getScopedHistory();
  h = h.filter(x => x.id !== item.id);
  h.unshift({ id:item.id, title:item.title, poster:item.poster, type:item.type, year:item.year, genres:item.genres, viewedAt:new Date().toISOString() });
  _saveScopedHistory(h.slice(0, 30));
}

/* ══════════════════════════════════════════════════
   TRAILER MODAL — YouTube new tab
   ══════════════════════════════════════════════════ */
const PLAN_TRAILER_LIMITS = { free:2, basic:999, students:999, premium:999 };

function getUserPlan() {
  try {
    const u=JSON.parse(sessionStorage.getItem('filmHorizon_user')||'{}');
    return (u.plan||'free').toLowerCase();
  } catch(e){ return 'free'; }
}
function isPaidUser() { const p=getUserPlan(); return p!=='free'&&p!==''; }
function getTrailerLimit() { return PLAN_TRAILER_LIMITS[getUserPlan()] || 2; }

let trailerWatchCount = isPaidUser()?0:parseInt(sessionStorage.getItem('filmHorizon_trailer_count')||'0');

function openTrailer(videoId, title) {
  if(!videoId) return;
  const plan = getUserPlan();
  const limit = getTrailerLimit();
  if(plan === 'free'){
    if(trailerWatchCount >= limit){
      _showPlanLimitModal();
      return;
    }
    trailerWatchCount++;
    sessionStorage.setItem('filmHorizon_trailer_count', trailerWatchCount);
    // Show remaining count toast
    const remaining = limit - trailerWatchCount;
    if(remaining === 1) showToast('⚠️ Last free trailer! Upgrade for unlimited.','fa-exclamation-triangle');
    else if(remaining === 0) showToast('⚠️ That was your last free trailer!','fa-exclamation-triangle');
  }
  /* ── Look up the full item data by trailer videoId ── */
  const itemData = ALL_CONTENT.find(c => c.trailer === videoId) || null;
  /* ── Record to per-user trailer watch history + view history ── */
  _recordTrailerWatch(videoId, title, itemData);
  _showTrailerModal(videoId, title||'Trailer');
}

/* ─── PLAN LIMIT MODAL ───────────────────────────── */
function _showPlanLimitModal(){
  const old = document.getElementById('_planLimitModal');
  if(old) old.remove();

  const plan = getUserPlan();
  const modal = document.createElement('div');
  modal.id = '_planLimitModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);';
  modal.innerHTML = `
    <div style="background:#0d0d0f;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:36px 32px;max-width:420px;width:100%;text-align:center;animation:_bannerIn .35s cubic-bezier(.22,1,.36,1);">
      <div style="width:64px;height:64px;border-radius:50%;background:rgba(229,9,20,0.12);border:2px solid rgba(229,9,20,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
        <i class="fas fa-film" style="color:#e50914;font-size:24px;"></i>
      </div>
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:#fff;margin-bottom:8px;">Free Trailer Limit Reached</h2>
      <p style="color:rgba(255,255,255,0.6);font-size:0.88rem;line-height:1.6;margin-bottom:24px;">
        Free users can watch <strong style="color:#fff">2 trailers per session</strong>.<br>
        Upgrade to unlock <strong style="color:#f5c518">unlimited trailers</strong>, ad-free streaming, and more.
      </p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
          <div style="background:rgba(79,195,247,0.08);border:1px solid rgba(79,195,247,0.2);border-radius:10px;padding:12px 8px;text-align:center;">
            <div style="color:#4fc3f7;font-weight:800;font-size:1rem;">Basic</div>
            <div style="color:#fff;font-size:1.1rem;font-weight:700;">₹199</div>
            <div style="color:rgba(255,255,255,0.4);font-size:10px;">/month</div>
          </div>
          <div style="background:rgba(245,197,24,0.08);border:2px solid rgba(245,197,24,0.4);border-radius:10px;padding:12px 8px;text-align:center;position:relative;">
            <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:#f5c518;color:#000;font-size:9px;font-weight:800;padding:2px 8px;border-radius:4px;">POPULAR</div>
            <div style="color:#f5c518;font-weight:800;font-size:1rem;">Premium</div>
            <div style="color:#fff;font-size:1.1rem;font-weight:700;">₹499</div>
            <div style="color:rgba(255,255,255,0.4);font-size:10px;">/month</div>
          </div>
          <div style="background:rgba(129,199,132,0.08);border:1px solid rgba(129,199,132,0.2);border-radius:10px;padding:12px 8px;text-align:center;">
            <div style="color:#81c784;font-weight:800;font-size:1rem;">Student</div>
            <div style="color:#fff;font-size:1.1rem;font-weight:700;">₹99</div>
            <div style="color:rgba(255,255,255,0.4);font-size:10px;">/month</div>
          </div>
        </div>
        <button onclick="document.getElementById('_planLimitModal').remove();openPricing();" style="background:linear-gradient(135deg,#e50914,#c0000a);border:none;color:#fff;padding:14px;border-radius:10px;font-weight:700;font-size:0.95rem;cursor:pointer;letter-spacing:0.04em;">
          <i class="fas fa-bolt"></i> Upgrade Now
        </button>
        <button onclick="document.getElementById('_planLimitModal').remove();" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);padding:12px;border-radius:10px;font-size:0.85rem;cursor:pointer;">
          Maybe Later
        </button>
      </div>
    </div>
  `;
  modal.addEventListener('click', e => { if(e.target===modal) modal.remove(); });
  document.body.appendChild(modal);
}
function openTrailerFullscreen(v,t){ openTrailer(v,t); }
function closeFullscreenTrailer(){ closeTrailer(); }

function _showTrailerModal(videoId, title) {
  const old=document.getElementById('_trailerModal'); if(old) old.remove();
  const yt='https://www.youtube.com/watch?v='+videoId;
  const th='https://img.youtube.com/vi/'+videoId+'/maxresdefault.jpg';
  const fb='https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg';
  const modal=document.createElement('div');
  modal.id='_trailerModal';
  modal.innerHTML=`
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
          <svg class="_tm-yt-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          Watch Trailer on YouTube
        </a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow='hidden';
  requestAnimationFrame(()=>modal.classList.add('_tm-open'));
}

function closeTrailer() {
  const m=document.getElementById('_trailerModal'); if(!m) return;
  m.classList.remove('_tm-open');
  setTimeout(()=>{ m.remove(); },300);
  document.body.style.overflow='';
}

(function _injectTMStyles(){
  if(document.getElementById('_tmStyles')) return;
  const s=document.createElement('style'); s.id='_tmStyles';
  s.textContent=`
    #_trailerModal{position:fixed;inset:0;z-index:999999;display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .3s ease;}
    #_trailerModal._tm-open{opacity:1;}
    ._tm-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(7px);cursor:pointer;}
    ._tm-panel{position:relative;z-index:2;width:100%;max-width:700px;background:#0d0d0f;border:1px solid rgba(255,255,255,.08);border-radius:22px 22px 0 0;overflow:hidden;transform:translateY(100%);transition:transform .38s cubic-bezier(.22,1,.36,1);box-shadow:0 -20px 60px rgba(0,0,0,.85);}
    #_trailerModal._tm-open ._tm-panel{transform:translateY(0);}
    ._tm-header{padding:18px 20px 12px;}
    ._tm-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
    ._tm-label{font-size:10px;font-weight:700;letter-spacing:2px;color:#e50914;text-transform:uppercase;display:flex;align-items:center;gap:5px;}
    ._tm-close{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:#aaa;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s;}
    ._tm-close:hover{background:rgba(255,255,255,.18);color:#fff;}
    ._tm-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.5rem,5vw,2.2rem);color:#fff;line-height:1;margin:0;}
    ._tm-thumb-wrap{position:relative;cursor:pointer;width:100%;aspect-ratio:16/9;overflow:hidden;background:#000;}
    ._tm-thumb{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease,filter .4s ease;}
    ._tm-thumb-wrap:hover ._tm-thumb{transform:scale(1.04);filter:brightness(.65);}
    ._tm-play-ring{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
    ._tm-play-icon{width:72px;height:72px;border-radius:50%;background:rgba(229,9,20,.92);display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;padding-left:5px;box-shadow:0 0 0 12px rgba(229,9,20,.22),0 8px 32px rgba(0,0,0,.7);transition:transform .25s,box-shadow .25s;}
    ._tm-thumb-wrap:hover ._tm-play-icon{transform:scale(1.13);box-shadow:0 0 0 18px rgba(229,9,20,.15),0 8px 40px rgba(0,0,0,.8);}
    ._tm-hover-txt{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.72);color:#fff;font-size:12px;padding:5px 16px;border-radius:20px;white-space:nowrap;opacity:0;transition:opacity .25s;pointer-events:none;}
    ._tm-thumb-wrap:hover ._tm-hover-txt{opacity:1;}
    ._tm-footer{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 22px;gap:12px;flex-wrap:wrap;}
    ._tm-note{font-size:12px;color:rgba(255,255,255,.3);display:flex;align-items:center;gap:5px;}
    ._tm-yt-btn{display:inline-flex;align-items:center;gap:9px;background:#e50914;color:#fff;padding:11px 24px;border-radius:99px;font-weight:700;font-size:13px;letter-spacing:.04em;text-decoration:none;transition:background .2s,transform .15s;white-space:nowrap;}
    ._tm-yt-btn:hover{background:#c0000a;transform:translateY(-1px);}
    ._tm-yt-icon{width:18px;height:18px;flex-shrink:0;}
    @media(max-width:480px){._tm-footer{flex-direction:column;align-items:stretch;}._tm-yt-btn{justify-content:center;}}
  `;
  document.head.appendChild(s);
})();

/* ─── UPGRADE MODAL ─────────────────────────────── */
function openUpgradeModal() {
  document.getElementById('upgradeModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeUpgradeModal() {
  document.getElementById('upgradeModal').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('upgradeModal').addEventListener('click',function(e){ if(e.target===this) closeUpgradeModal(); });

/* ─── WATCHLIST ──────────────────────────────────── */
let watchlist = _getScopedWatchlist();
function saveWatchlist(){ _saveScopedWatchlist(watchlist); }
function addToWatchlistById(id){ const i=ALL_CONTENT.find(c=>c.id===id); if(i) addToWatchlist(i); }
function toggleWatchlist(e){ e.stopPropagation(); document.getElementById('watchlistDropdown').classList.toggle('open'); }
document.addEventListener('click',function(e){ const w=document.getElementById('watchlistWrap'); if(w&&!w.contains(e.target)) document.getElementById('watchlistDropdown').classList.remove('open'); });

function addToWatchlist(item) {
  if(watchlist.find(w=>w.id===item.id)){ showToast('Already in Watchlist','fa-bookmark'); return; }
  watchlist.push({ id:item.id, title:item.title, year:item.year, poster:item.poster, trailer:item.trailer, genres:item.genres });
  saveWatchlist(); renderWatchlist();
  showToast('Added to Watchlist ✓','fa-bookmark');
}
function removeFromWatchlist(id){ watchlist=watchlist.filter(w=>w.id!==id); saveWatchlist(); renderWatchlist(); showToast('Removed from Watchlist','fa-bookmark'); }

function renderWatchlist() {
  const list=document.getElementById('wlList');
  const empty=document.getElementById('wlEmpty');
  const cb=document.getElementById('watchlistCount');
  const cl=document.getElementById('wlCountLabel');
  const n=watchlist.length;
  if(cl) cl.textContent=n+' saved';
  if(cb){ cb.style.display=n>0?'flex':'none'; cb.textContent=n; }
  if(n===0){ if(empty) empty.style.display='flex'; if(list) list.innerHTML=''; return; }
  if(empty) empty.style.display='none';
  if(list) list.innerHTML=watchlist.map(item=>`
    <div class="wl-item" onclick="openDetail(${item.id})">
      <img class="wl-item-poster" src="${item.poster}" alt="${item.title}"
        onerror="this.src='https://placehold.co/38x56/111118/e50914?text=${encodeURIComponent(item.title||'')}'">
      <div class="wl-item-info">
        <div class="wl-item-title">${item.title}</div>
        <div class="wl-item-meta">${item.year||''} · ${(item.genres||[]).slice(0,2).join(', ')}</div>
      </div>
      <button class="wl-remove" title="Remove" onclick="event.stopPropagation();removeFromWatchlist(${item.id})"><i class="fas fa-times"></i></button>
    </div>`).join('');
}
renderWatchlist();

/* ─── TOAST ─────────────────────────────────────── */
function showToast(msg, icon='fa-info-circle') {
  const wrap=document.getElementById('toastWrap'); if(!wrap) return;
  const toast=document.createElement('div'); toast.className='toast';
  toast.innerHTML=`<i class="fas ${icon}"></i><span>${msg}</span>`;
  wrap.appendChild(toast);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>toast.classList.add('show')); });
  setTimeout(()=>{ toast.classList.remove('show'); setTimeout(()=>toast.remove(),400); },3000);
}

function logout() {
  sessionStorage.removeItem('filmHorizon_user');
  showToast('Logged out successfully','fa-sign-out-alt');
  setTimeout(()=>{ window.location.href='signup.htm'; },1000);
}

/* ─── THEME TOGGLE ──────────────────────────────── */
const themeToggle=document.getElementById('themeToggle');
if(themeToggle){ themeToggle.addEventListener('click',()=>{ document.body.classList.toggle('dark'); document.body.classList.toggle('light'); const d=document.body.classList.contains('dark'); themeToggle.innerHTML=d?'<i class="fas fa-moon"></i>':'<i class="fas fa-sun"></i>'; showToast(d?'Dark mode on':'Light mode on',d?'fa-moon':'fa-sun'); }); }

/* ─── NAVBAR SCROLL ─────────────────────────────── */
window.addEventListener('scroll',()=>{ const n=document.getElementById('navbar'); if(n) n.classList.toggle('scrolled',window.scrollY>40); });

/* ─── INIT ──────────────────────────────────────── */
renderAllRows();

(function initPlanFromStorage(){
  if(!sessionStorage.getItem('filmHorizon_user')) return;
  const s=localStorage.getItem('filmHorizon_plan');
  if(s){
    const u=JSON.parse(sessionStorage.getItem('filmHorizon_user')||'{}');
    u.plan=s;
    sessionStorage.setItem('filmHorizon_user',JSON.stringify(u));
    if(s.toLowerCase()!=='free'){ trailerWatchCount=0; sessionStorage.setItem('filmHorizon_trailer_count','0'); }
  }
})();

/* ══════════════════════════════════════════════════
   UPI PAYMENT SYSTEM
   ══════════════════════════════════════════════════ */
const UPI_PRICES={basic:199,premium:499,students:99};
let _upiCurrentPlan='premium',_upiVerified=false,_upiCurrentTab='qr',_upiQrInterval=null;

function openPricing(){ document.getElementById('pricingModal').classList.add('open'); document.body.style.overflow='hidden'; }
function closePricing(){ document.getElementById('pricingModal').classList.remove('open'); document.body.style.overflow=''; }

function selectPlan(name){
  closePricing(); _upiCurrentPlan=name.toLowerCase(); _upiVerified=false; _upiCurrentTab='qr';
  const price=UPI_PRICES[_upiCurrentPlan]||499;
  document.getElementById('upiPlanName').textContent=name+' Plan';
  document.getElementById('upiAmtVal').textContent='₹'+price;
  document.getElementById('upiPayBtnTxt').textContent='Pay ₹'+price+' Securely';
  document.getElementById('upiSuccAmt').textContent='₹'+price;
  document.getElementById('upiMain').style.display='';
  document.getElementById('upiProc').classList.remove('active');
  document.getElementById('upiSucc').classList.remove('active');
  upiSwitchTab('qr');
  const vb=document.getElementById('upiVerifyBtn');
  vb.className='upi-verify-btn';
  vb.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verify UPI ID`;
  document.getElementById('upiStep1').className='upi-step act';
  document.getElementById('upiStep2').className='upi-step';
  document.getElementById('upiStep3').className='upi-step';
  document.getElementById('upiSuffix').textContent='@upi';
  document.getElementById('upiIDInput').value='';
  if(_upiQrInterval) clearInterval(_upiQrInterval);
  let secs=299; const timerEl=document.getElementById('upiQrTimer');
  _upiQrInterval=setInterval(()=>{ secs--; if(secs<0) secs=299; const m=Math.floor(secs/60),s=secs%60; if(timerEl) timerEl.textContent=m+':'+String(s).padStart(2,'0'); },1000);
  document.getElementById('upiPayModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function upiSwitchTab(t){ _upiCurrentTab=t; document.getElementById('upiTabQR').classList.toggle('active',t==='qr'); document.getElementById('upiTabID').classList.toggle('active',t==='id'); document.getElementById('upiPanelQR').style.display=t==='qr'?'':'none'; document.getElementById('upiPanelID').style.display=t==='id'?'':'none'; }
function upiSetSuffix(s){ document.getElementById('upiSuffix').textContent='@'+s; document.getElementById('upiIDInput').focus(); _upiVerified=false; const vb=document.getElementById('upiVerifyBtn'); vb.className='upi-verify-btn'; vb.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verify UPI ID`; }
function upiOnInput(){ _upiVerified=false; const vb=document.getElementById('upiVerifyBtn'); vb.className='upi-verify-btn'; vb.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verify UPI ID`; }
function upiVerify(){ const v=document.getElementById('upiIDInput').value.trim(); if(!v){ const iw=document.getElementById('upiIW'); iw.style.borderColor='#e50914'; iw.style.boxShadow='0 0 0 3px rgba(229,9,20,.18)'; setTimeout(()=>{ iw.style.borderColor=''; iw.style.boxShadow=''; },1500); return; } const vb=document.getElementById('upiVerifyBtn'); vb.innerHTML='⏳ Verifying…'; setTimeout(()=>{ _upiVerified=true; vb.className='upi-verify-btn ok'; vb.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> UPI Verified ✓`; },1200); }
function upiStartPayment(){ if(_upiCurrentTab==='id'){ const v=document.getElementById('upiIDInput').value.trim(); if(!v){upiVerify();return;} if(!_upiVerified){upiVerify();setTimeout(upiStartPayment,1500);return;} } document.getElementById('upiMain').style.display='none'; document.getElementById('upiProc').classList.add('active'); setTimeout(()=>{document.getElementById('upiStep1').className='upi-step done';document.getElementById('upiStep2').className='upi-step act';},900); setTimeout(()=>{document.getElementById('upiStep2').className='upi-step done';document.getElementById('upiStep3').className='upi-step act';},1900); setTimeout(()=>{document.getElementById('upiStep3').className='upi-step done';},2800); setTimeout(upiShowSuccess,3300); }
function upiShowSuccess(){ if(_upiQrInterval){clearInterval(_upiQrInterval);_upiQrInterval=null;} document.getElementById('upiProc').classList.remove('active'); document.getElementById('upiSucc').classList.add('active'); const txn='TXN'+Date.now().toString().slice(-9).toUpperCase(); document.getElementById('upiTxnId').textContent=txn; const pl=_upiCurrentPlan.charAt(0).toUpperCase()+_upiCurrentPlan.slice(1); document.getElementById('upiSuccPlan').textContent=pl; const dl=pl.toUpperCase()+' PLAN'; localStorage.setItem('filmHorizon_active_plan',dl); localStorage.setItem('filmHorizon_plan',_upiCurrentPlan); let prof={}; try{prof=JSON.parse(localStorage.getItem('filmHorizon_profile')||'{}');}catch(e){} prof.plan=_upiCurrentPlan; prof.planLabel=dl; prof.planSince=new Date().toISOString(); prof.lastTxn=txn; localStorage.setItem('filmHorizon_profile',JSON.stringify(prof)); /* Save to scoped profile key too */ const uid=_userId(); if(uid&&uid!=='guest'){localStorage.setItem('filmHorizon_profile_'+uid,JSON.stringify(prof));} /* Update persistent user DB */ _updateCurrentUserPlan(_upiCurrentPlan, dl, txn); try{const u=JSON.parse(sessionStorage.getItem('filmHorizon_user')||'{}');u.plan=_upiCurrentPlan;sessionStorage.setItem('filmHorizon_user',JSON.stringify(u));}catch(e){} trailerWatchCount=0; sessionStorage.setItem('filmHorizon_trailer_count','0'); const lbl=document.getElementById('userPlanDisplay'); if(lbl){lbl.textContent=dl;lbl.style.color='#f5c518';lbl.style.fontWeight='900';} showToast('🎉 Upgraded to '+dl+'!','fa-crown'); }
function upiFinish(){ document.getElementById('upiPayModal').classList.remove('open'); document.body.style.overflow=''; }

(function restorePlanOnLoad(){
  if(!sessionStorage.getItem('filmHorizon_user')) return;
  const uid = _userId();
  let plan='';
  try{
    const scopedKey = 'filmHorizon_profile_' + uid;
    const p=JSON.parse(localStorage.getItem(scopedKey)||localStorage.getItem('filmHorizon_profile')||'{}');
    plan=p.planLabel||'';
  }catch(e){}
  if(!plan) plan=localStorage.getItem('filmHorizon_active_plan')||'';
  if(!plan){const r=localStorage.getItem('filmHorizon_plan')||'';if(r&&r!=='free') plan=r.charAt(0).toUpperCase()+r.slice(1)+' PLAN';}
  if(plan&&plan.toLowerCase()!=='free plan'){
    const lbl=document.getElementById('userPlanDisplay');
    if(lbl){lbl.textContent=plan;lbl.style.color='#f5c518';lbl.style.fontWeight='900';}
    try{const pk=plan.replace(' PLAN','').toLowerCase();const u=JSON.parse(sessionStorage.getItem('filmHorizon_user')||'{}');u.plan=pk;sessionStorage.setItem('filmHorizon_user',JSON.stringify(u));trailerWatchCount=0;sessionStorage.setItem('filmHorizon_trailer_count','0');}catch(e){}
  }
})();

// Navigate to profile page
function openProfile(){ window.location.href='profilenew.html'; }
/* ─── HERO FRIENDS MY LIST ──────────────────────── */
function heroAddToMyList() {
  addToWatchlistById(99);
  const btn = document.getElementById('heroMyListBtn');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check"></i> In My List';
    btn.style.background = 'rgba(46,204,113,.15)';
    btn.style.borderColor = 'rgba(46,204,113,.5)';
    btn.style.color = '#2ecc71';
  }
}