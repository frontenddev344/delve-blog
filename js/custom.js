$(document).ready(function(){
    $(".menu-toggle").click(function(){
      $("body").addClass("toggle");
      $(".closed-menu").click(function(){
        $("body").removeClass("toggle");
      });
    });

    // $(".price-card").click(function(){
    //   $(this).addClass("active").siblings().removeClass("active")
    // });

})
  

 AOS.init();


function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

if (elementExists(".solution-content")) {
    gsap.from(".solution-content", {
        y: 100,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
            trigger: ".solution-content",
            start: "top 85%",
            end: "top 40%",
            scrub: true
        }
    });
}

if (elementExists(".mind-img img")) {
    gsap.from(".mind-img img", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".mind-img",
            start: "top 80%",
            end: "top 30%",
            scrub: true
        }
    });
}


// devle navigation popup start 

if (document.getElementById("dvbModal")) {

(function () {
  const WHO = [
    ['<i class="ri-user-3-line"></i>','New Visitor'], ['<i class="ri-robot-2-line"></i>','AI Beginner'], 
    ['<i class="ri-focus-2-line"></i>','AI Familiar'],
    ['<i class="ri-star-fill"></i>','Free Member'], ['<i class="ri-vip-diamond-line"></i>','Premium Member'], ['<i class="ri-trophy-fill"></i>','Patron']
  ];
  const WHAT = [
    ['<i class="ri-brain-line"></i>','Learn About AI'], ['<i class="ri-book-line"></i>','Browse Content'], ['<i class="ri-lightbulb-line"></i>','Improve My Thinking'],
    ['<i class="ri-medal-line"></i>','Become a Member'], ['<i class="ri-shake-hands-line"></i>','Support DelveBlog']
  ];

  const TAG_CLASS = { delvette: 'dvb-tag-delvette', delve: 'dvb-tag-delve', deeper: 'dvb-tag-deeper' };
  const TAG_LABEL = { delvette: 'DELVETTE', delve: 'DELVE', deeper: 'DEEPER DELVE' };
  const THUMB_CLASS = { brain: 'dvb-thumb-brain', hands: 'dvb-thumb-hands', city: 'dvb-thumb-city' };
  const THUMB_EMOJI = { brain: '<i class="ri-brain-line"></i>', hands: '<i class="ri-shake-hands-line"></i>', city: '<i class="ri-building-line"></i>' };

  const DEFAULT_CARDS = [
    { tag: 'delvette', title: 'What is AI?', desc: 'A quick introduction to Artificial Intelligence for beginners.', read: '5 min read', thumb: 'brain' },
    { tag: 'delve',    title: 'How AI Works', desc: 'Understand the basics behind how AI systems learn and think.', read: '8 min read', thumb: 'hands' },
    { tag: 'deeper',   title: 'The Future of Human + AI', desc: 'Exploring possibilities and ethical questions.', read: '15 min read', thumb: 'city' }
  ];
  // One content set per "What" choice; falls back to DEFAULT_CARDS if missing.
  const CONTENT = {
    'Learn About AI': DEFAULT_CARDS,
    'Browse Content': [
      { tag: 'delvette', title: 'AI Terms You Should Know', desc: 'Key terms every beginner should understand.', read: '5 min read', thumb: 'brain' },
      { tag: 'delve',    title: 'Why AI Matters Today', desc: 'The real-world impact of AI in our daily lives.', read: '8 min read', thumb: 'hands' },
      { tag: 'deeper',   title: 'AI and the Future of Humanity', desc: 'Deep dive into how AI could shape our future.', read: '15 min read', thumb: 'city' }
    ],
    'Improve My Thinking': [
      { tag: 'delvette', title: 'Mental Models for the AI Age', desc: 'Frameworks that help you think more clearly.', read: '6 min read', thumb: 'brain' },
      { tag: 'delve',    title: 'Critical Thinking in a Noisy World', desc: 'How to evaluate information when AI creates content at scale.', read: '10 min read', thumb: 'hands' },
      { tag: 'deeper',   title: 'The Philosophy of Machine Reasoning', desc: 'What AI logic reveals about human thought.', read: '18 min read', thumb: 'city' }
    ],
    'Become a Member': [
      { tag: 'delvette', title: 'Free vs Premium: What You Get', desc: 'A clear comparison of DelveBlog membership tiers.', read: '3 min read', thumb: 'brain' },
      { tag: 'delve',    title: 'Why Members Think Deeper', desc: 'How access to Delves changes the way you learn.', read: '5 min read', thumb: 'hands' },
      { tag: 'deeper',   title: 'The DelveBlog Manifesto', desc: 'What we believe about AI, humans, and the future.', read: '7 min read', thumb: 'city' }
    ],
    'Support DelveBlog': [
      { tag: 'delvette', title: 'Why Patron Support Matters', desc: 'What your support actually enables.', read: '4 min read', thumb: 'brain' },
      { tag: 'delve',    title: 'Behind DelveBlog', desc: 'The story of how DelveBlog was built.', read: '6 min read', thumb: 'hands' },
      { tag: 'deeper',   title: 'The Road Ahead for DelveBlog', desc: 'Our vision for the next two years.', read: '10 min read', thumb: 'city' }
    ]
  };

  const state = { who: null, what: null, panel: 1 };
  const $ = id => document.getElementById(id);

  function cardHTML(c) {
    return `<span class="dvb-tag ${TAG_CLASS[c.tag]}">${TAG_LABEL[c.tag]}</span>
      <p class="dvb-result-card-title">${c.title}</p>
      <p class="dvb-result-card-desc">${c.desc}</p>
      <button class="dvb-result-card-link">Read More →</button>`;
  }

  function listItemHTML(c) {
    return `<div class="dvb-content-thumb ${THUMB_CLASS[c.thumb]}">${THUMB_EMOJI[c.thumb]}</div>
      <div class="dvb-content-info">
        <div class="dvb-content-item-tag"><span class="dvb-tag ${TAG_CLASS[c.tag]}">${TAG_LABEL[c.tag]}</span></div>
        <p class="dvb-content-item-title">${c.title}</p>
        <p class="dvb-content-item-desc">${c.desc}</p>
        <p class="dvb-content-item-read">${c.read}</p>
      </div>`;
  }

  // Build a radio-list panel from an [emoji, label] array, wiring selection to a state key.
  function buildRadioList(containerId, items, stateKey, onSelect) {
    const el = $(containerId);
    el.innerHTML = items.map(([icon, label]) => `
      <div class="dvb-radio-item" data-value="${label}">
        <span class="dvb-radio-icon">${icon}</span>
        <span class="dvb-radio-text">${label}</span>
        <div class="dvb-radio-dot"></div>
      </div>`).join('');
    el.querySelectorAll('.dvb-radio-item').forEach(item => {
      item.addEventListener('click', () => {
        el.querySelectorAll('.dvb-radio-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        state[stateKey] = item.dataset.value;
        onSelect();
      });
    });
  }

  const FOOTERS = {
    1: () => `<span></span><button class="dvb-btn-primary" id="dvbNext1" ${state.who ? '' : 'disabled'}>Next &rarr;</button>`,
    2: () => `<button class="dvb-btn-back" id="dvbBack2">Back</button><button class="dvb-btn-primary" id="dvbDelve2" ${state.what ? '' : 'disabled'}>DELVE &rarr;</button>`,
    3: () => '',
    4: () => `<button class="dvb-btn-back" id="dvbBack4">Back</button><span style="font-size:0.78rem;color:var(--dvb-muted)">DelveBurt Results</span>`,
    5: () => `<button class="dvb-btn-back" id="dvbBack5">Back to Results</button>`
  };

  function wireFooter(n) {
    if (n === 1) $('dvbNext1') && $('dvbNext1').addEventListener('click', () => state.who && dvb.goToStep(2));
    if (n === 2) {
      $('dvbBack2') && $('dvbBack2').addEventListener('click', () => dvb.goToStep(1));
      $('dvbDelve2') && $('dvbDelve2').addEventListener('click', () => state.what && dvb.goToStep(3));
    }
    if (n === 4) $('dvbBack4') && $('dvbBack4').addEventListener('click', () => dvb.goToStep(2));
    if (n === 5) $('dvbBack5') && $('dvbBack5').addEventListener('click', () => dvb.goToStep(4));
  }

  function render(n) {
    document.querySelectorAll('.dvb-panel').forEach(p => p.classList.remove('active'));
    $('dvbPanel-' + n).classList.add('active');
    state.panel = n;

    // Stepper (panel 3 still counts as step 2; panels 4/5 count as step 3)
    const stepOf = { 1: 1, 2: 2, 3: 2, 4: 3, 5: 3 }[n];
    $('dvbStepper').style.display = n <= 3 ? 'flex' : 'none';
    [1, 2, 3].forEach(s => {
      const el = $('dvbStep-' + s);
      el.classList.remove('active', 'done');
      if (s < stepOf) el.classList.add('done');
      else if (s === stepOf) el.classList.add('active');
    });
    $('dvbConn-1').classList.toggle('done', stepOf > 1);
    $('dvbConn-2').classList.toggle('done', stepOf > 2);

    // Footer
    const footer = $('dvbFooter');
    const html = FOOTERS[n] ? FOOTERS[n]() : '';
    footer.innerHTML = html;
    footer.classList.toggle('visible', html.trim() !== '');
    wireFooter(n);
  }

  const dvb = {
    goToStep(n) { render(n); },

    goToResults() {
      $('dvbMetaWho').textContent = state.who || '—';
      $('dvbMetaWhat').textContent = state.what || '—';
      const cards = CONTENT[state.what] || DEFAULT_CARDS;
      $('dvbResultsCards').innerHTML = cards.map(c => `<div class="dvb-result-card">${cardHTML(c)}</div>`).join('');
      render(4);
    },

    goToContentBrowse() {
      const key = state.what || 'Learn About AI';
      $('dvbBrowseTitle').textContent = key;
      const items = (CONTENT[key] || DEFAULT_CARDS).concat(DEFAULT_CARDS);
      $('dvbContentList').innerHTML = items.map(c => `<div class="dvb-content-list-item">${listItemHTML(c)}</div>`).join('');
      render(5);
    }
  };

  window.dvb = dvb;

  // Build the two radio panels once
  buildRadioList('dvbWhoList', WHO, 'who', () => render(1));
  buildRadioList('dvbWhatList', WHAT, 'what', () => render(2));

  // Reset wizard to step 1 every time the Bootstrap modal opens
  document.getElementById('dvbModal').addEventListener('shown.bs.modal', () => {
    render(1);
  });
})();

}
// devle navigation popup end 

$(document).ready(function () {

    const audio = $("#musicPlayer")[0];

    if (!audio || $("#playMusic").length === 0) return;

    const FADE_TIME = 2;

    $("#playMusic").on("click", function () {

        // If already playing -> Pause
        if (!audio.paused) {
            audio.pause();
            $(".play-btn i")
                .removeClass("ri-pause-fill")
                .addClass("ri-play-fill");
            return;
        }

        // Otherwise play
        audio.volume = 1;
        audio.play();

        $(".play-btn i")
            .removeClass("ri-play-fill")
            .addClass("ri-pause-fill");
    });

    $(audio).on("timeupdate", function () {

        if (!audio.duration) return;

        const remaining = audio.duration - audio.currentTime;

        if (remaining <= FADE_TIME) {
            audio.volume = Math.max(remaining / FADE_TIME, 0);
        } else {
            audio.volume = 1;
        }

    });

    $(audio).on("ended", function () {

        audio.volume = 1;

        $(".play-btn i")
            .removeClass("ri-pause-fill")
            .addClass("ri-play-fill");

    });

    $(audio).on("pause", function () {

        $(".play-btn i")
            .removeClass("ri-pause-fill")
            .addClass("ri-play-fill");

    });

    $(audio).on("play", function () {

        $(".play-btn i")
            .removeClass("ri-play-fill")
            .addClass("ri-pause-fill");

    });

});