/**
 * PK Cabinet — Client-side Search Overlay
 *
 * Product data source priority:
 *  1. window.PK_PRODUCTS  — injected by header.html via Handlebars at render time
 *                           (loops over the live store's product catalogue)
 *  2. STATIC_PRODUCTS below — fallback used in development / offline
 *
 * Trigger: any element with the attribute  data-pk-search-open  opens the overlay.
 */

(function () {
  'use strict';

 
(function () {
  'use strict';
 
  /* ─────────────────────────────────────────────────────────────
     STATIC FALLBACK PRODUCT DATA
     Represents PK Cabinet's catalogue. Replace / extend as needed.
  ───────────────────────────────────────────────────────────── */
  var STATIC_PRODUCTS = [
    {
      id: 'mallorca-white-shaker-base-30',
      name: 'Mallorca White Shaker Base Cabinet 30"',
      category: 'Base Cabinets',
      description: 'Classic white shaker base cabinet with soft-close hinges, adjustable shelves, and dovetail drawer box construction.',
      price: 189.99, rating: 4.8, reviewCount: 124,
      url: '/products/mallorca-white-shaker-base-cabinet', image: ''
    },
    {
      id: 'mallorca-white-shaker-base-36',
      name: 'Mallorca White Shaker Base Cabinet 36"',
      category: 'Base Cabinets',
      description: 'Wide white shaker base cabinet ideal for larger kitchens. Ships flat-packed for easy assembly.',
      price: 219.99, rating: 4.9, reviewCount: 98,
      url: '/products/mallorca-white-shaker-base-cabinet-36', image: ''
    },
    {
      id: 'mallorca-white-shaker-wall-30',
      name: 'Mallorca White Shaker Wall Cabinet 30"',
      category: 'Wall Cabinets',
      description: 'Upper wall cabinet with shaker door profile, solid plywood box, and soft-close hinges. Perfect above countertops.',
      price: 149.99, rating: 4.7, reviewCount: 87,
      url: '/products/mallorca-white-shaker-wall-cabinet', image: ''
    },
    {
      id: 'mallorca-white-shaker-wall-36',
      name: 'Mallorca White Shaker Wall Cabinet 36"',
      category: 'Wall Cabinets',
      description: 'Wide upper wall cabinet in white shaker style for maximizing kitchen storage.',
      price: 179.99, rating: 4.8, reviewCount: 63,
      url: '/products/mallorca-white-shaker-wall-cabinet-36', image: ''
    },
    {
      id: 'mallorca-white-shaker-tall-84',
      name: 'Mallorca White Shaker Tall Cabinet 84"',
      category: 'Tall Cabinets',
      description: 'Floor-to-ceiling pantry cabinet with four adjustable shelves. Ideal as a pantry or utility cabinet for any kitchen.',
      price: 449.99, rating: 4.9, reviewCount: 52,
      url: '/products/mallorca-white-shaker-tall-cabinet', image: ''
    },
    {
      id: 'ridgewood-grey-base-30',
      name: 'Ridgewood Grey Shaker Base Cabinet 30"',
      category: 'Base Cabinets',
      description: 'Modern grey shaker base cabinet with full-overlay doors and dovetail drawer construction. Contemporary kitchen essential.',
      price: 199.99, rating: 4.7, reviewCount: 76,
      url: '/products/ridgewood-grey-base-cabinet', image: ''
    },
    {
      id: 'ridgewood-grey-wall-30',
      name: 'Ridgewood Grey Shaker Wall Cabinet 30"',
      category: 'Wall Cabinets',
      description: 'Contemporary grey wall cabinet from the Ridgewood collection for a cohesive kitchen look.',
      price: 159.99, rating: 4.6, reviewCount: 54,
      url: '/products/ridgewood-grey-wall-cabinet', image: ''
    },
    {
      id: 'ridgewood-grey-tall-96',
      name: 'Ridgewood Grey Tall Cabinet 96"',
      category: 'Tall Cabinets',
      description: 'Extra-tall grey shaker cabinet providing maximum vertical storage for modern kitchens.',
      price: 499.99, rating: 4.8, reviewCount: 38,
      url: '/products/ridgewood-grey-tall-cabinet', image: ''
    },
    {
      id: 'newport-natural-base-36',
      name: 'Newport Natural Wood Base Cabinet 36"',
      category: 'Base Cabinets',
      description: 'Warm natural wood finish base cabinet. Brings organic warmth and texture to any kitchen space.',
      price: 249.99, rating: 4.9, reviewCount: 41,
      url: '/products/newport-natural-base-cabinet', image: ''
    },
    {
      id: 'newport-natural-wall-30',
      name: 'Newport Natural Wood Wall Cabinet 30"',
      category: 'Wall Cabinets',
      description: 'Natural wood wall cabinet offering a warm, inviting aesthetic for kitchens and dining areas.',
      price: 189.99, rating: 4.8, reviewCount: 29,
      url: '/products/newport-natural-wall-cabinet', image: ''
    },
    {
      id: 'corner-lazy-susan-base-33',
      name: 'Lazy Susan Corner Base Cabinet 33"',
      category: 'Corner Cabinets',
      description: 'Full rotating lazy susan shelves make corner space fully accessible. Fits standard cabinet height.',
      price: 329.99, rating: 4.7, reviewCount: 67,
      url: '/products/lazy-susan-corner-cabinet', image: ''
    },
    {
      id: 'blind-corner-wall-36',
      name: 'Blind Corner Wall Cabinet 36"',
      category: 'Corner Cabinets',
      description: 'Maximize corner wall space with this blind corner wall cabinet. Easy installation and soft-close doors.',
      price: 219.99, rating: 4.5, reviewCount: 34,
      url: '/products/blind-corner-wall-cabinet', image: ''
    },
    {
      id: 'shaker-drawer-base-30',
      name: 'Shaker 3-Drawer Base Cabinet 30"',
      category: 'Drawer Sets',
      description: 'Three-drawer base cabinet with dovetail construction, soft-close undermount slides, and full-extension drawers.',
      price: 279.99, rating: 4.9, reviewCount: 112,
      url: '/products/shaker-drawer-base-cabinet', image: ''
    },
    {
      id: 'shaker-drawer-base-18',
      name: 'Shaker 3-Drawer Base Cabinet 18"',
      category: 'Drawer Sets',
      description: 'Compact three-drawer base cabinet ideal for cutlery, utensils, and small kitchen items.',
      price: 189.99, rating: 4.8, reviewCount: 88,
      url: '/products/shaker-drawer-base-18', image: ''
    },
    {
      id: 'shaker-pantry-90',
      name: 'Shaker Pantry Cabinet 90" Tall',
      category: 'Pantry',
      description: 'Large pantry cabinet with multiple adjustable shelves for organized food storage and kitchen essentials.',
      price: 549.99, rating: 4.9, reviewCount: 44,
      url: '/products/shaker-pantry-cabinet', image: ''
    },
    {
      id: 'shaker-pantry-utility-84',
      name: 'Utility Pantry Cabinet 84"',
      category: 'Pantry',
      description: 'Versatile utility pantry cabinet with broom closet configuration and interior shelves.',
      price: 479.99, rating: 4.7, reviewCount: 31,
      url: '/products/utility-pantry-cabinet', image: ''
    },
    {
      id: 'shaker-vanity-36',
      name: 'Shaker Bathroom Vanity Cabinet 36"',
      category: 'Vanity',
      description: 'Classic shaker bathroom vanity with soft-close doors and a single dovetail drawer. Fits most standard undermount sinks.',
      price: 349.99, rating: 4.8, reviewCount: 93,
      url: '/products/shaker-bathroom-vanity-36', image: ''
    },
    {
      id: 'shaker-vanity-48',
      name: 'Shaker Bathroom Vanity Cabinet 48"',
      category: 'Vanity',
      description: 'Wide bathroom vanity with double drawer and two-door storage. Perfect for master bathrooms.',
      price: 449.99, rating: 4.7, reviewCount: 71,
      url: '/products/shaker-bathroom-vanity-48', image: ''
    },
    {
      id: 'shaker-vanity-60',
      name: 'Shaker Double Sink Vanity 60"',
      category: 'Vanity',
      description: 'Double sink bathroom vanity with six drawers and two door cabinets. Elegant and spacious for shared bathrooms.',
      price: 599.99, rating: 4.9, reviewCount: 55,
      url: '/products/shaker-double-vanity-60', image: ''
    },
    {
      id: 'frameless-base-36',
      name: 'Frameless Base Cabinet 36"',
      category: 'Base Cabinets',
      description: 'European frameless construction base cabinet with full-access interior and full-overlay soft-close doors.',
      price: 229.99, rating: 4.6, reviewCount: 48,
      url: '/products/frameless-base-cabinet-36', image: ''
    },
    {
      id: 'frameless-wall-30',
      name: 'Frameless Wall Cabinet 30"',
      category: 'Wall Cabinets',
      description: 'European frameless wall cabinet for a sleek modern kitchen. Full-access interior and soft-close doors.',
      price: 169.99, rating: 4.6, reviewCount: 39,
      url: '/products/frameless-wall-cabinet-30', image: ''
    },
    {
      id: 'sink-base-33',
      name: 'Shaker Sink Base Cabinet 33"',
      category: 'Base Cabinets',
      description: 'Specially designed sink base cabinet with false drawer front and open interior for plumbing access.',
      price: 169.99, rating: 4.7, reviewCount: 61,
      url: '/products/sink-base-cabinet', image: ''
    }
  ];

 
  var CATEGORIES = [
    'Base Cabinets', 'Wall Cabinets', 'Tall Cabinets',
    'Drawer Sets', 'Corner Cabinets', 'Pantry', 'Vanity'
  ];

 
  var POPULAR_SEARCHES = [
    'Shaker', 'Base Cabinet', 'Wall Cabinet', 'Drawer Set',
    'Pantry', 'Tall Cabinet', 'Corner Cabinet', 'Vanity', 'Frameless', 'Natural Wood'
  ];

 
  var SORT_OPTIONS = [
    { label: 'Relevance',        value: 'relevance'   },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high'},
    { label: 'Rating',           value: 'rating'      }
  ];

 
  /* ── SVG icons (inline, no external dependency) ─────────────── */
  var ICON = {
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    close:  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevron:'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    star:   '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    image:  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8c0b4" stroke-width="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
  };

 
  /* ─────────────────────────────────────────────────────────────
     PKSearchOverlay Class
  ───────────────────────────────────────────────────────────── */
  function PKSearchOverlay() {
    this.products          = [];
    this.query             = '';
    this.selectedCategories = [];
    this.sortBy            = 'relevance';
    this.isSortOpen        = false;

 
    // DOM refs (set after _injectHTML)
    this.backdropEl  = null;
    this.panelEl     = null;
    this.inputEl     = null;
    this.bodyEl      = null;

 
    this._loadProducts();
    this._injectHTML();
    this._cacheDOM();
    this._bindGlobalEvents();
    this._renderInitial();
  }

  /* ── Data ──────────────────────────────────────────────────── */

 
  /* ── Data ──────────────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._loadProducts = function () {
    // Prefer live data injected by Handlebars at render time
    if (window.PK_PRODUCTS && window.PK_PRODUCTS.length > 0) {
      this.products = window.PK_PRODUCTS;
    } else {
      this.products = STATIC_PRODUCTS;
    }
  };

  /* ── DOM injection ─────────────────────────────────────────── */

 
  /* ── DOM injection ─────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._injectHTML = function () {
    var el = document.createElement('div');
    el.id = 'pk-search-root';
    el.innerHTML = [
      '<div id="pk-search-backdrop" class="pk-search-backdrop" aria-hidden="true"></div>',
      '<div id="pk-search-panel" class="pk-search-panel" role="dialog" aria-modal="true" aria-label="Search products">',
        '<div class="pk-search-bar">',
          '<span class="pk-search-bar__icon">' + ICON.search + '</span>',
          '<input',
            ' id="pk-search-input"',
            ' class="pk-search-bar__input"',
            ' type="search"',
            ' placeholder="Search products..."',
            ' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"',
          '/>',
          '<button id="pk-search-close" class="pk-search-bar__close" aria-label="Close search">',
            ICON.close,
          '</button>',
        '</div>',
        '<div id="pk-search-body" class="pk-search-body"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(el);
  };

 
  PKSearchOverlay.prototype._cacheDOM = function () {
    this.backdropEl = document.getElementById('pk-search-backdrop');
    this.panelEl    = document.getElementById('pk-search-panel');
    this.inputEl    = document.getElementById('pk-search-input');
    this.bodyEl     = document.getElementById('pk-search-body');
  };

  /* ── Rendering ─────────────────────────────────────────────── */

 
  /* ── Rendering ─────────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._renderInitial = function () {
    var self = this;
    var popularHTML = POPULAR_SEARCHES.map(function (term) {
      return '<button class="pk-search-popular__item" data-term="' + _esc(term) + '">' + _esc(term) + '</button>';
    }).join('');

    var carouselHTML = this.products.slice(0, 8).map(function (p) {
      return self._cardMini(p);
    }).join('');

 
    var carouselHTML = this.products.slice(0, 8).map(function (p) {
      return self._cardMini(p);
    }).join('');
 
    this.bodyEl.innerHTML = [
      '<div class="pk-search-sidebar">',
        '<p class="pk-search-sidebar__title">Popular searches</p>',
        '<div class="pk-search-popular">', popularHTML, '</div>',
      '</div>',
      '<div class="pk-search-recommended">',
        '<p class="pk-search-sidebar__title">Recommended products</p>',
        '<div class="pk-search-carousel">', carouselHTML, '</div>',
      '</div>'
    ].join('');

 
    // Bind popular-term clicks
    var btns = this.bodyEl.querySelectorAll('.pk-search-popular__item');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', (function (term) {
        return function () {
          self.inputEl.value = term;
          self.query = term;
          self._renderResults();
          self.inputEl.focus();
        };
      })(btns[i].dataset.term));
    }
  };

 
  PKSearchOverlay.prototype._renderResults = function () {
    var self    = this;
    var filtered = this._filter();
    var sorted   = this._sort(filtered);
    var count    = filtered.length;

 
    var activeSortLabel = 'Relevance';
    for (var s = 0; s < SORT_OPTIONS.length; s++) {
      if (SORT_OPTIONS[s].value === this.sortBy) { activeSortLabel = SORT_OPTIONS[s].label; break; }
    }

 
    /* Category checkboxes */
    var catHTML = CATEGORIES.map(function (cat) {
      var checked = self.selectedCategories.indexOf(cat) !== -1 ? ' checked' : '';
      return [
        '<label class="pk-search-category-label">',
          '<input type="checkbox" class="pk-search-category-checkbox"',
            ' data-cat="' + _esc(cat) + '"' + checked + '/>',
          '<span class="pk-search-category-text">' + _esc(cat) + '</span>',
        '</label>'
      ].join('');
    }).join('');

 
    /* Sort dropdown options */
    var sortOptHTML = SORT_OPTIONS.map(function (opt) {
      var active = opt.value === self.sortBy ? ' is-active' : '';
      return '<button class="pk-search-sort__option' + active + '" data-sort="' + opt.value + '">' + opt.label + '</button>';
    }).join('');

 
    /* Product cards or empty state */
    var resultsHTML;
    if (sorted.length > 0) {
      resultsHTML = '<div class="pk-search-results-grid">' +
        sorted.map(function (p) { return self._cardFull(p); }).join('') +
        '</div>';
    } else {
      resultsHTML = [
        '<div class="pk-search-empty">',
          '<p class="pk-search-empty__title">No results found</p>',
          '<p class="pk-search-empty__text">Try adjusting your search or filters to find what you\'re looking for.</p>',
        '</div>'
      ].join('');
    }

 
    this.bodyEl.innerHTML = [
      '<div class="pk-search-sidebar">',
        '<div class="pk-search-filters-toggle">',
          '<p class="pk-search-sidebar__title" style="margin-bottom:0">Categories</p>',
          '<button class="pk-search-toggle-btn" id="pk-cat-toggle">Toggle Filters</button>',
        '</div>',
        '<div class="pk-search-categories" id="pk-cat-list">', catHTML, '</div>',
      '</div>',
      '<div class="pk-search-main">',
        '<div class="pk-search-results-header">',
          '<p class="pk-search-results-count">' + count + ' ' + (count === 1 ? 'result' : 'results') + ' found</p>',
          '<div class="pk-search-sort" id="pk-sort-wrapper">',
            '<button class="pk-search-sort__btn" id="pk-sort-btn" aria-haspopup="true">',
              '<span>Sorted by: ' + activeSortLabel + '</span>',
              ICON.chevron,
            '</button>',
            '<div class="pk-search-sort__dropdown" id="pk-sort-dropdown">',
              sortOptHTML,
            '</div>',
          '</div>',
        '</div>',
        resultsHTML,
      '</div>'
    ].join('');

 
    /* Update panel height class */
    if (sorted.length > 0) {
      this.panelEl.classList.add('has-results');
    } else {
      this.panelEl.classList.remove('has-results');
    }
 
    this._bindResultsEvents();
  };
 
  PKSearchOverlay.prototype._bindResultsEvents = function () {
    var self = this;
 
    /* Category checkboxes */
    var checkboxes = this.bodyEl.querySelectorAll('.pk-search-category-checkbox');
    for (var c = 0; c < checkboxes.length; c++) {
      checkboxes[c].addEventListener('change', (function (cb) {
        return function () {
          var cat = cb.dataset.cat;
          if (cb.checked) {
            if (self.selectedCategories.indexOf(cat) === -1) self.selectedCategories.push(cat);
          } else {
            self.selectedCategories = self.selectedCategories.filter(function (x) { return x !== cat; });
          }
          self._renderResults();
        };
      })(checkboxes[c]));
    }

 
    /* Mobile categories toggle */
    var catToggle = document.getElementById('pk-cat-toggle');
    if (catToggle) {
      catToggle.addEventListener('click', function () {
        var list = document.getElementById('pk-cat-list');
        if (list) list.classList.toggle('is-visible');
      });
    }
 
    /* Sort button */
    var sortBtn = document.getElementById('pk-sort-btn');
    var sortDropdown = document.getElementById('pk-sort-dropdown');
    if (sortBtn && sortDropdown) {
      sortBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.isSortOpen = !self.isSortOpen;
        sortDropdown.classList.toggle('is-open', self.isSortOpen);
        sortBtn.classList.toggle('is-open', self.isSortOpen);
        sortBtn.setAttribute('aria-expanded', self.isSortOpen);
      });
    }
 
    /* Sort option selection */
    var sortOpts = this.bodyEl.querySelectorAll('.pk-search-sort__option');
    for (var s = 0; s < sortOpts.length; s++) {
      sortOpts[s].addEventListener('click', (function (opt) {
        return function () {
          self.sortBy    = opt.dataset.sort;
          self.isSortOpen = false;
          self._renderResults();
        };
      })(sortOpts[s]));
    }
 
    /* Close sort on outside click */
    function closeSortOutside(e) {
      var wrapper = document.getElementById('pk-sort-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        var dd = document.getElementById('pk-sort-dropdown');
        var btn = document.getElementById('pk-sort-btn');
        if (dd)  dd.classList.remove('is-open');
        if (btn) { btn.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
        self.isSortOpen = false;
        document.removeEventListener('click', closeSortOutside);
      }
    }
    // Defer listener so current click doesn't immediately close it
    setTimeout(function () { document.addEventListener('click', closeSortOutside); }, 0);
  };
 
  /* ── Card templates ────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._cardMini = function (product) {
    var imgHTML = product.image
      ? '<img src="' + product.image + '" alt="' + _esc(product.name) + '" loading="lazy"/>'
      : ICON.image;
    return [
      '<a class="pk-search-carousel-item" href="' + (product.url || '/collections/all') + '">',
        '<div class="pk-search-card-mini">',
          '<div class="pk-search-card-mini__image">', imgHTML, '</div>',
          '<div class="pk-search-card-mini__body">',
            '<p class="pk-search-card-mini__name">' + _esc(product.name) + '</p>',
          '</div>',
        '</div>',
      '</a>'
    ].join('');
  };
 
  PKSearchOverlay.prototype._cardFull = function (product) {
    var imgHTML = product.image
      ? '<img src="' + product.image + '" alt="' + _esc(product.name) + '" loading="lazy"/>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8c0b4" stroke-width="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
 
    var price = '';
    if (typeof product.price === 'number') {
      price = '$' + product.price.toFixed(2);
    } else if (product.price) {
      price = product.price;
    }
 
    var metaHTML = '';
    if (product.rating) {
      metaHTML = [
        '<div class="pk-search-product-card__meta">',
          '<span class="pk-search-product-card__rating">',
            ICON.star,
            '<span class="pk-search-product-card__rating-num">' + product.rating + '/5</span>',
          '</span>',
          product.reviewCount
            ? '<span class="pk-search-product-card__reviews">' + product.reviewCount + ' reviews</span>'
            : '',
        '</div>'
      ].join('');
    }
 
    return [
      '<a class="pk-search-product-card" href="' + (product.url || '/collections/all') + '">',
        '<div class="pk-search-product-card__image">', imgHTML, '</div>',
        '<div class="pk-search-product-card__body">',
          '<h3 class="pk-search-product-card__name">' + _esc(product.name) + '</h3>',
          metaHTML,
          price ? '<p class="pk-search-product-card__price">' + price + '</p>' : '',
        '</div>',
      '</a>'
    ].join('');
  };
 
  /* ── Filter & sort ─────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._filter = function () {
    var q    = this.query.toLowerCase().trim();
    var cats = this.selectedCategories;
    return this.products.filter(function (p) {
      var matchQ = !q ||
        ((p.name        || '').toLowerCase().indexOf(q) !== -1) ||
        ((p.category    || '').toLowerCase().indexOf(q) !== -1) ||
        ((p.description || '').toLowerCase().indexOf(q) !== -1);
      var matchC = cats.length === 0 || cats.indexOf(p.category) !== -1;
      return matchQ && matchC;
    });
  };
 
  PKSearchOverlay.prototype._sort = function (products) {
    var by = this.sortBy;
    return products.slice().sort(function (a, b) {
      if (by === 'price-low')  return (a.price || 0) - (b.price || 0);
      if (by === 'price-high') return (b.price || 0) - (a.price || 0);
      if (by === 'rating')     return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  };
 
  /* ── Open / Close ──────────────────────────────────────────── */
 
  PKSearchOverlay.prototype.open = function () {
    this.backdropEl.classList.add('is-open');
    this.panelEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
 
    // Reset state
    this.query              = '';
    this.selectedCategories = [];
    this.sortBy             = 'relevance';
    this.isSortOpen         = false;
    this.inputEl.value      = '';
    this.panelEl.classList.remove('has-results');
 
    this._renderInitial();
 
    var self = this;
    setTimeout(function () { self.inputEl.focus(); }, 50);
  };
 
  PKSearchOverlay.prototype.close = function () {
    this.backdropEl.classList.remove('is-open');
    this.panelEl.classList.remove('is-open');
    document.body.style.overflow = '';
  };
 
  /* ── Event wiring ──────────────────────────────────────────── */
 
  PKSearchOverlay.prototype._bindGlobalEvents = function () {
    var self = this;
 
    /* Click on backdrop → close */
    this.backdropEl.addEventListener('click', function () { self.close(); });
 
    /* Close button */
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('#pk-search-close')) self.close();
    });
 
    /* ESC key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') self.close();
    });
 
    /* Live input filtering */
    this.inputEl.addEventListener('input', function () {
      self.query = self.inputEl.value;
      if (self.query.trim() === '') {
        self.selectedCategories = [];
        self.panelEl.classList.remove('has-results');
        self._renderInitial();
      } else {
        self._renderResults();
      }
    });
 
    /* Any element with [data-pk-search-open] opens the overlay */
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest && e.target.closest('[data-pk-search-open]');
      if (trigger) {
        e.preventDefault();
        self.open();
      }
    });
  };
 
  /* ── Utility ───────────────────────────────────────────────── */
 
  function _esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
 
  /* ── Bootstrap ─────────────────────────────────────────────── */
 
  function init() {
    window.pkSearch = new PKSearchOverlay();
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
 
})();
