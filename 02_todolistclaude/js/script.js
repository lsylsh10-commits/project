/* ============================================================
   TODAY — script.js
   Vanilla JS 로 동작하는 Todo 앱의 전체 로직
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. 상수
  --------------------------------------------------------- */
  var TODO_STORAGE_KEY = 'todoAppTodos';
  var THEME_STORAGE_KEY = 'todoAppTheme';

  var CATEGORY_LABEL = { work: '업무', study: '공부', personal: '개인' };
  var CATEGORY_ORDER = ['work', 'study', 'personal'];
  var REMINDER_LABEL = { none: '알림 없음', '10': '10분 전', '30': '30분 전', '60': '1시간 전', '180': '3시간 전', '1440': '하루 전' };
  var WEEKDAY_LABEL_KR = ['일', '월', '화', '수', '목', '금', '토'];
  /* 월요일 시작 요일 배열 (통계용) */
  var WEEK_ORDER_MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
  var WEEK_ORDER_LABEL = ['월', '화', '수', '목', '금', '토', '일'];

  /* ---------------------------------------------------------
     2. 전역 상태
  --------------------------------------------------------- */
  var state = {
    todos: [],
    currentScreen: 'home',
    filter: 'all',
    searchQuery: '',
    sliderIndex: 0,
    calYear: null,
    calMonth: null, /* 0-11 */
    selectedDate: null, /* YYYY-MM-DD */
    historyOpenCategory: null,
    editingId: null /* null = 추가 모드, 문자열 = 수정 모드 */
  };

  /* ---------------------------------------------------------
     3. 유틸리티
  --------------------------------------------------------- */
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function dateStrFromISO(iso) {
    if (!iso) return null;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function uid() {
    return 'todo-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function formatDateKorean(dateStr) {
    /* YYYY-MM-DD -> YYYY년 MM월 DD일 */
    var parts = dateStr.split('-');
    return parts[0] + '년 ' + parseInt(parts[1], 10) + '월 ' + parseInt(parts[2], 10) + '일';
  }

  function formatDateShort(dateStr) {
    var parts = dateStr.split('-');
    return parseInt(parts[1], 10) + '.' + parseInt(parts[2], 10) + '.';
  }

  function formatTimeShort(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var h = d.getHours(), m = d.getMinutes();
    var period = h < 12 ? '오전' : '오후';
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    return period + ' ' + h12 + ':' + pad2(m);
  }

  function getMondayOfWeek(dateObj) {
    var d = new Date(dateObj);
    var day = d.getDay(); /* 0=Sun..6=Sat */
    var diff = (day === 0 ? -6 : 1 - day); /* Monday as start */
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function toDateStr(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function getCurrentWeekRange() {
    var monday = getMondayOfWeek(new Date());
    var sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);
    return { start: toDateStr(monday), end: toDateStr(sunday), mondayObj: monday };
  }

  function isDateInRange(dateStr, start, end) {
    return dateStr >= start && dateStr <= end;
  }

  /* ---------------------------------------------------------
     4. 정렬 규칙 (Home 리스트 / 캘린더 선택일 리스트 공용)
     1) 미완료 우선  2) 완료 나중  3) 날짜 오름차순
     4) 시간 오름차순  5) 시간 없는 항목은 그룹 내 마지막
  --------------------------------------------------------- */
  function compareTodos(a, b) {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    var at = a.time || '', bt = b.time || '';
    if (at && bt) return at < bt ? -1 : (at > bt ? 1 : 0);
    if (at && !bt) return -1;
    if (!at && bt) return 1;
    return 0;
  }

  function sortTodos(list) {
    return list.slice().sort(compareTodos);
  }

  /* ---------------------------------------------------------
     5. localStorage: 불러오기 / 저장 / 정규화
  --------------------------------------------------------- */
  function normalizeTodo(raw) {
    return {
      id: raw.id || uid(),
      title: raw.title || '',
      date: raw.date || todayStr(),
      time: raw.time || '',
      category: CATEGORY_LABEL[raw.category] ? raw.category : 'work',
      important: !!raw.important,
      completed: !!raw.completed,
      completedAt: raw.completed ? (raw.completedAt || null) : null,
      reminder: REMINDER_LABEL[raw.reminder] !== undefined ? raw.reminder : 'none',
      memo: raw.memo || '',
      createdAt: raw.createdAt || new Date().toISOString(),
      updatedAt: raw.updatedAt || new Date().toISOString()
    };
  }

  function loadTodos() {
    var raw;
    try {
      raw = localStorage.getItem(TODO_STORAGE_KEY);
    } catch (e) {
      raw = null;
    }
    if (!raw) { state.todos = []; return; }
    var parsed;
    try {
      parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('not array');
    } catch (e) {
      /* 잘못된 localStorage JSON */
      state.todos = [];
      return;
    }
    state.todos = parsed.map(normalizeTodo);
  }

  function saveTodos() {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state.todos));
    } catch (e) { /* 저장 실패는 조용히 무시 */ }
  }

  function loadThemeIntoState() {
    var t;
    try { t = localStorage.getItem(THEME_STORAGE_KEY); } catch (e) { t = null; }
    if (t !== 'light' && t !== 'dark') t = 'light';
    return t;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (e) { /* ignore */ }
    var sw = document.getElementById('theme-switch');
    var desc = document.getElementById('theme-desc');
    if (sw) sw.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
    if (desc) desc.textContent = theme === 'dark' ? '다크 모드 사용 중' : '라이트 모드 사용 중';
  }

  /* ---------------------------------------------------------
     6. DOM 참조
  --------------------------------------------------------- */
  var el = {};
  function cacheDom() {
    el.heroDate = document.getElementById('hero-date');
    el.statTotal = document.getElementById('stat-total');
    el.statDone = document.getElementById('stat-done');
    el.statRemain = document.getElementById('stat-remain');
    el.progressRing = document.getElementById('progress-ring');
    el.progressPct = document.getElementById('progress-pct');

    el.sliderViewport = document.getElementById('slider-viewport');
    el.sliderEmpty = document.getElementById('slider-empty');
    el.sliderPrev = document.getElementById('slider-prev');
    el.sliderNext = document.getElementById('slider-next');
    el.sliderDots = document.getElementById('slider-dots');

    el.searchInput = document.getElementById('search-input');
    el.filterBar = document.getElementById('filter-bar');

    el.todoList = document.getElementById('todo-list');
    el.todoListEmpty = document.getElementById('todo-list-empty');
    el.todoListNoSearch = document.getElementById('todo-list-no-search');

    el.calTitle = document.getElementById('cal-title');
    el.calGrid = document.getElementById('calendar-grid');
    el.calPrev = document.getElementById('cal-prev');
    el.calNext = document.getElementById('cal-next');
    el.selectedDateTitle = document.getElementById('selected-date-title');
    el.selectedDateList = document.getElementById('selected-date-list');
    el.selectedDateEmpty = document.getElementById('selected-date-empty');

    el.historyWeekRange = document.getElementById('history-week-range');
    el.categoryCards = document.getElementById('category-cards');
    el.historyDetail = document.getElementById('history-detail');
    el.historyDetailTitle = document.getElementById('history-detail-title');
    el.historyDetailClose = document.getElementById('history-detail-close');
    el.historyList = document.getElementById('history-list');
    el.historyListEmpty = document.getElementById('history-list-empty');

    el.statWeekRate = document.getElementById('stat-week-rate');
    el.statTodayDone = document.getElementById('stat-today-done');
    el.statTopCategory = document.getElementById('stat-top-category');
    el.weekdayChart = document.getElementById('weekday-chart');
    el.categoryChart = document.getElementById('category-chart');
    el.statsEmpty = document.getElementById('stats-empty');

    el.themeSwitch = document.getElementById('theme-switch');
    el.themeDesc = document.getElementById('theme-desc');
    el.resetDataBtn = document.getElementById('reset-data-btn');

    el.fabAdd = document.getElementById('fab-add');
    el.modal = document.getElementById('modal-todo');
    el.modalTitle = document.getElementById('modal-title');
    el.todoForm = document.getElementById('todo-form');
    el.fieldId = document.getElementById('field-id');
    el.fieldTitle = document.getElementById('field-title');
    el.fieldDate = document.getElementById('field-date');
    el.fieldTime = document.getElementById('field-time');
    el.fieldCategory = document.getElementById('field-category');
    el.fieldReminder = document.getElementById('field-reminder');
    el.fieldImportant = document.getElementById('field-important');
    el.fieldCompletedWrap = document.getElementById('field-completed-wrap');
    el.fieldCompleted = document.getElementById('field-completed');
    el.fieldMemo = document.getElementById('field-memo');
    el.deleteTodoBtn = document.getElementById('delete-todo-btn');
    el.submitTodoBtn = document.getElementById('submit-todo-btn');
  }

  /* ---------------------------------------------------------
     7. 화면 전환 / 내비게이션
  --------------------------------------------------------- */
  function goToScreen(name) {
    state.currentScreen = name;
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.toggle('is-active', screens[i].getAttribute('data-screen') === name);
    }
    var navBtns = document.querySelectorAll('[data-nav]');
    for (var j = 0; j < navBtns.length; j++) {
      var isActive = navBtns[j].getAttribute('data-nav') === name;
      navBtns[j].classList.toggle('is-active', isActive);
      if (navBtns[j].classList.contains('desktop-nav__item')) {
        navBtns[j].setAttribute('aria-current', isActive ? 'page' : 'false');
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (name === 'calendar') renderCalendar();
    if (name === 'history') renderHistory();
  }

  function bindNav() {
    var navBtns = document.querySelectorAll('[data-nav]');
    for (var i = 0; i < navBtns.length; i++) {
      navBtns[i].addEventListener('click', function () {
        goToScreen(this.getAttribute('data-nav'));
      });
    }
  }

  /* ---------------------------------------------------------
     8. Hero
  --------------------------------------------------------- */
  function renderHero() {
    var d = new Date();
    var text = (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' + WEEKDAY_LABEL_KR[d.getDay()] + '요일';
    el.heroDate.textContent = text;
  }

  /* ---------------------------------------------------------
     9. 오늘 진행 상황
  --------------------------------------------------------- */
  function renderProgress() {
    var today = todayStr();
    var todays = state.todos.filter(function (t) { return t.date === today; });
    var total = todays.length;
    var done = todays.filter(function (t) { return t.completed; }).length;
    var remain = total - done;
    var pct = total === 0 ? 0 : Math.round((done / total) * 100);

    el.statTotal.textContent = total;
    el.statDone.textContent = done;
    el.statRemain.textContent = remain;
    el.progressPct.textContent = pct + '%';
    el.progressRing.style.setProperty('--pct', pct);
  }

  /* ---------------------------------------------------------
     10. 중요 할 일 슬라이더 (수동, 무한 루프, 자동재생 없음)
  --------------------------------------------------------- */
  function getImportantTodos() {
    var today = todayStr();
    return sortTodos(state.todos.filter(function (t) {
      return t.date === today && t.important === true && t.completed === false;
    }));
  }

  function renderSlider() {
    var items = getImportantTodos();
    if (state.sliderIndex >= items.length) state.sliderIndex = 0;

    if (items.length === 0) {
      el.sliderViewport.innerHTML = '';
      el.sliderEmpty.hidden = false;
      el.sliderViewport.appendChild(el.sliderEmpty);
      el.sliderPrev.hidden = true;
      el.sliderNext.hidden = true;
      el.sliderDots.hidden = true;
      el.sliderDots.innerHTML = '';
      return;
    }

    el.sliderEmpty.hidden = true;
    var todo = items[state.sliderIndex];
    el.sliderViewport.innerHTML =
      '<div class="important-card" data-id="' + escapeHtml(todo.id) + '" tabindex="0" role="button" aria-label="중요 할 일 상세 열기">' +
        '<div class="important-card__top">' +
          '<span class="important-card__star" aria-hidden="true">★</span>' +
          '<span class="important-card__cat">' + escapeHtml(CATEGORY_LABEL[todo.category]) + '</span>' +
        '</div>' +
        '<p class="important-card__title">' + escapeHtml(todo.title) + '</p>' +
        '<p class="important-card__meta">' + escapeHtml(formatDateShort(todo.date)) + (todo.time ? (' · ' + escapeHtml(todo.time)) : '') + '</p>' +
      '</div>';

    var card = el.sliderViewport.querySelector('.important-card');
    card.addEventListener('click', function () { openEditModal(todo.id); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEditModal(todo.id); }
    });

    var multi = items.length > 1;
    el.sliderPrev.hidden = !multi;
    el.sliderNext.hidden = !multi;
    el.sliderDots.hidden = !multi;

    if (multi) {
      var dotsHtml = '';
      for (var i = 0; i < items.length; i++) {
        dotsHtml += '<span class="slider-dots__dot' + (i === state.sliderIndex ? ' is-active' : '') + '"></span>';
      }
      el.sliderDots.innerHTML = dotsHtml;
    } else {
      el.sliderDots.innerHTML = '';
    }
  }

  function sliderMove(dir) {
    var items = getImportantTodos();
    if (items.length <= 1) return;
    state.sliderIndex = (state.sliderIndex + dir + items.length) % items.length;
    renderSlider();
  }

  /* ---------------------------------------------------------
     11. 검색 / 필터 / Todo 카드 리스트
  --------------------------------------------------------- */
  function applyFilters(list) {
    var today = todayStr();
    var q = state.searchQuery.trim().toLowerCase();

    var filtered = list.filter(function (t) {
      switch (state.filter) {
        case 'today': return t.date === today;
        case 'upcoming': return t.date > today && !t.completed;
        case 'important': return t.important === true;
        case 'done': return t.completed === true;
        default: return true;
      }
    });

    if (q) {
      filtered = filtered.filter(function (t) {
        var title = (t.title || '').toLowerCase();
        var memo = (t.memo || '').toLowerCase();
        return title.indexOf(q) !== -1 || memo.indexOf(q) !== -1;
      });
    }
    return filtered;
  }

  function buildReminderChip(todo) {
    if (!todo.reminder || todo.reminder === 'none') return '';
    return '<span class="chip chip--reminder">🔔 ' + escapeHtml(REMINDER_LABEL[todo.reminder]) + '</span>';
  }

  function buildTodoCardHtml(todo) {
    var chips = '<span class="chip chip--category">' + escapeHtml(CATEGORY_LABEL[todo.category]) + '</span>';
    chips += '<span class="chip">' + escapeHtml(formatDateShort(todo.date)) + '</span>';
    if (todo.time) chips += '<span class="chip">' + escapeHtml(todo.time) + '</span>';
    chips += buildReminderChip(todo);
    if (todo.completed && todo.completedAt) {
      chips += '<span class="chip chip--done-at">완료 ' + escapeHtml(formatTimeShort(todo.completedAt)) + '</span>';
    }

    return (
      '<li class="todo-card' + (todo.completed ? ' is-completed' : '') + '" data-id="' + escapeHtml(todo.id) + '">' +
        '<button type="button" class="todo-card__check" data-action="toggle" aria-label="' + (todo.completed ? '완료 취소' : '완료로 표시') + '">' + (todo.completed ? '✓' : '') + '</button>' +
        '<div class="todo-card__body">' +
          '<div class="todo-card__top">' +
            (todo.important ? '<span class="todo-card__star" aria-hidden="true">★</span>' : '') +
            '<span class="todo-card__title">' + escapeHtml(todo.title) + '</span>' +
          '</div>' +
          '<div class="todo-card__meta">' + chips + '</div>' +
          (todo.memo ? '<p class="todo-card__memo">' + escapeHtml(todo.memo) + '</p>' : '') +
          '<div class="todo-card__actions">' +
            '<button type="button" data-action="edit">수정하기</button>' +
            '<button type="button" data-action="delete" class="is-danger">삭제하기</button>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
  }

  function bindTodoCardEvents(container) {
    var cards = container.querySelectorAll('.todo-card');
    cards.forEach(function (card) {
      var id = card.getAttribute('data-id');
      var checkBtn = card.querySelector('[data-action="toggle"]');
      var editBtn = card.querySelector('[data-action="edit"]');
      var deleteBtn = card.querySelector('[data-action="delete"]');
      if (checkBtn) checkBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleComplete(id); });
      if (editBtn) editBtn.addEventListener('click', function (e) { e.stopPropagation(); openEditModal(id); });
      if (deleteBtn) deleteBtn.addEventListener('click', function (e) { e.stopPropagation(); deleteTodo(id); });
    });
  }

  function renderTodoList() {
    var today = todayStr();
    var all = state.todos;
    var filtered = sortTodos(applyFilters(all));

    el.todoList.innerHTML = filtered.map(buildTodoCardHtml).join('');
    bindTodoCardEvents(el.todoList);

    var hasAnyTodo = all.length > 0;
    var hasSearch = state.searchQuery.trim().length > 0;

    if (filtered.length > 0) {
      el.todoListEmpty.hidden = true;
      el.todoListNoSearch.hidden = true;
    } else if (hasSearch) {
      el.todoListEmpty.hidden = true;
      el.todoListNoSearch.hidden = false;
    } else if (!hasAnyTodo) {
      el.todoListEmpty.hidden = false;
      el.todoListNoSearch.hidden = true;
    } else {
      /* 필터 결과가 없을 때도 동일한 빈 상태 문구 사용 */
      el.todoListEmpty.hidden = false;
      el.todoListNoSearch.hidden = true;
    }
    void today;
  }

  function bindSearchFilter() {
    el.searchInput.addEventListener('input', function () {
      state.searchQuery = this.value;
      renderTodoList();
    });
    el.filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state.filter = btn.getAttribute('data-filter');
      var btns = el.filterBar.querySelectorAll('.filter-btn');
      btns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderTodoList();
    });
  }

  /* ---------------------------------------------------------
     12. 캘린더
  --------------------------------------------------------- */
  function renderCalendar() {
    var y = state.calYear, m = state.calMonth;
    el.calTitle.textContent = y + '년 ' + (m + 1) + '월';

    var firstDay = new Date(y, m, 1);
    var startWeekday = firstDay.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var today = todayStr();

    var datesWithTodo = {};
    state.todos.forEach(function (t) { datesWithTodo[t.date] = true; });

    var html = '';
    for (var i = 0; i < startWeekday; i++) {
      html += '<div class="calendar-day is-empty"></div>';
    }
    for (var day = 1; day <= daysInMonth; day++) {
      var dateStr = y + '-' + pad2(m + 1) + '-' + pad2(day);
      var classes = 'calendar-day';
      if (dateStr === today) classes += ' is-today';
      if (dateStr === state.selectedDate) classes += ' is-selected';
      var hasDot = !!datesWithTodo[dateStr];
      html += '<button type="button" class="' + classes + '" data-date="' + dateStr + '">' +
        '<span>' + day + '</span>' +
        '<span class="calendar-day__dot' + (hasDot ? '' : ' is-hidden') + '"></span>' +
      '</button>';
    }
    el.calGrid.innerHTML = html;

    var dayBtns = el.calGrid.querySelectorAll('.calendar-day:not(.is-empty)');
    dayBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.selectedDate = this.getAttribute('data-date');
        renderCalendar();
        renderSelectedDateList();
      });
    });

    renderSelectedDateList();
  }

  function renderSelectedDateList() {
    var dateStr = state.selectedDate;
    el.selectedDateTitle.textContent = formatDateKorean(dateStr);
    var list = sortTodos(state.todos.filter(function (t) { return t.date === dateStr; }));
    el.selectedDateList.innerHTML = list.map(buildTodoCardHtml).join('');
    bindTodoCardEvents(el.selectedDateList);
    el.selectedDateEmpty.hidden = list.length > 0;
  }

  function bindCalendarNav() {
    el.calPrev.addEventListener('click', function () {
      state.calMonth--;
      if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
      renderCalendar();
    });
    el.calNext.addEventListener('click', function () {
      state.calMonth++;
      if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
      renderCalendar();
    });
  }

  /* ---------------------------------------------------------
     13. History + Statistics 데이터 계산
  --------------------------------------------------------- */
  function getWeekCompletedTodos() {
    var range = getCurrentWeekRange();
    return state.todos.filter(function (t) {
      if (!t.completed || !t.completedAt) return false;
      var ds = dateStrFromISO(t.completedAt);
      return ds && isDateInRange(ds, range.start, range.end);
    });
  }

  function getWeekScheduledTodos() {
    var range = getCurrentWeekRange();
    return state.todos.filter(function (t) { return isDateInRange(t.date, range.start, range.end); });
  }

  function renderHistory() {
    var range = getCurrentWeekRange();
    el.historyWeekRange.textContent = formatDateShort(range.start) + ' ~ ' + formatDateShort(range.end);

    var weekCompleted = getWeekCompletedTodos();

    var counts = { work: 0, study: 0, personal: 0 };
    weekCompleted.forEach(function (t) { if (counts[t.category] !== undefined) counts[t.category]++; });

    CATEGORY_ORDER.forEach(function (cat) {
      var countEl = el.categoryCards.querySelector('[data-count="' + cat + '"]');
      if (countEl) countEl.textContent = counts[cat];
    });

    var cardBtns = el.categoryCards.querySelectorAll('.category-card');
    cardBtns.forEach(function (btn) {
      var cat = btn.getAttribute('data-category');
      btn.classList.toggle('is-active', state.historyOpenCategory === cat);
    });

    renderHistoryDetail(weekCompleted);
    renderStatistics(weekCompleted);
  }

  function renderHistoryDetail(weekCompleted) {
    if (!state.historyOpenCategory) {
      el.historyDetail.hidden = true;
      return;
    }
    el.historyDetail.hidden = false;
    el.historyDetailTitle.textContent = CATEGORY_LABEL[state.historyOpenCategory] + ' 완료 기록';

    var rows = weekCompleted
      .filter(function (t) { return t.category === state.historyOpenCategory; })
      .sort(function (a, b) { return new Date(b.completedAt) - new Date(a.completedAt); });

    el.historyListEmpty.hidden = rows.length > 0;
    el.historyList.innerHTML = rows.map(function (t) {
      var scheduled = formatDateShort(t.date) + (t.time ? (' ' + t.time) : '');
      var completed = formatDateShort(dateStrFromISO(t.completedAt) || t.date) + ' ' + formatTimeShort(t.completedAt);
      return (
        '<li class="history-row">' +
          '<p class="history-row__title">' + escapeHtml(t.title) + '</p>' +
          '<div class="history-row__meta">' +
            '<span>예정: <strong>' + escapeHtml(scheduled) + '</strong></span>' +
            '<span>완료: <strong>' + escapeHtml(completed) + '</strong></span>' +
          '</div>' +
        '</li>'
      );
    }).join('');
  }

  function bindHistoryEvents() {
    el.categoryCards.addEventListener('click', function (e) {
      var btn = e.target.closest('.category-card');
      if (!btn) return;
      var cat = btn.getAttribute('data-category');
      state.historyOpenCategory = (state.historyOpenCategory === cat) ? null : cat;
      renderHistory();
    });
    el.historyDetailClose.addEventListener('click', function () {
      state.historyOpenCategory = null;
      renderHistory();
    });
  }

  /* ---------------------------------------------------------
     14. 통계
  --------------------------------------------------------- */
  function renderStatistics(weekCompleted) {
    var range = getCurrentWeekRange();
    var weekScheduled = getWeekScheduledTodos();
    var rate = weekScheduled.length === 0 ? 0 : Math.round((weekCompleted.length / weekScheduled.length) * 100);
    el.statWeekRate.textContent = rate + '%';

    var today = todayStr();
    var todayDone = state.todos.filter(function (t) {
      return t.completed && t.completedAt && dateStrFromISO(t.completedAt) === today;
    }).length;
    el.statTodayDone.textContent = todayDone;

    var counts = { work: 0, study: 0, personal: 0 };
    weekCompleted.forEach(function (t) { if (counts[t.category] !== undefined) counts[t.category]++; });
    var topCat = null, topCount = 0;
    CATEGORY_ORDER.forEach(function (cat) {
      if (counts[cat] > topCount) { topCount = counts[cat]; topCat = cat; }
    });
    el.statTopCategory.textContent = topCat ? CATEGORY_LABEL[topCat] : '없음';

    /* 요일별 완료 (월~일), 완료 0건이어도 0-state 렌더링 */
    var weekdayCounts = [0, 0, 0, 0, 0, 0, 0]; /* index: 월..일 */
    weekCompleted.forEach(function (t) {
      var d = new Date(t.completedAt);
      if (isNaN(d.getTime())) return;
      var jsDay = d.getDay(); /* 0=Sun..6=Sat */
      var idx = WEEK_ORDER_MON_FIRST.indexOf(jsDay);
      if (idx !== -1) weekdayCounts[idx]++;
    });
    var maxWeekday = Math.max.apply(null, weekdayCounts.concat([1]));
    var todayIdx = WEEK_ORDER_MON_FIRST.indexOf(new Date().getDay());

    var weekdayHtml = '';
    for (var i = 0; i < 7; i++) {
      var h = Math.round((weekdayCounts[i] / maxWeekday) * 100);
      if (weekdayCounts[i] > 0 && h < 6) h = 6;
      weekdayHtml +=
        '<div class="weekday-chart__col' + (i === todayIdx ? ' is-today' : '') + '">' +
          '<span class="weekday-chart__value">' + weekdayCounts[i] + '</span>' +
          '<div class="weekday-chart__track"><div class="weekday-chart__fill" style="height:' + h + '%"></div></div>' +
          '<span class="weekday-chart__label">' + WEEK_ORDER_LABEL[i] + '</span>' +
        '</div>';
    }
    el.weekdayChart.innerHTML = weekdayHtml;

    /* 카테고리별 완료 (수평 막대) */
    var maxCat = Math.max(counts.work, counts.study, counts.personal, 1);
    var catHtml = '';
    CATEGORY_ORDER.forEach(function (cat) {
      var w = Math.round((counts[cat] / maxCat) * 100);
      if (counts[cat] > 0 && w < 4) w = 4;
      catHtml +=
        '<div class="category-chart__row">' +
          '<span class="category-chart__label">' + CATEGORY_LABEL[cat] + '</span>' +
          '<div class="category-chart__track"><div class="category-chart__fill" style="width:' + w + '%"></div></div>' +
          '<span class="category-chart__value">' + counts[cat] + '</span>' +
        '</div>';
    });
    el.categoryChart.innerHTML = catHtml;

    el.statsEmpty.hidden = weekCompleted.length > 0 || weekScheduled.length > 0;
    void range;
  }

  /* ---------------------------------------------------------
     15. Todo CRUD
  --------------------------------------------------------- */
  function toggleComplete(id) {
    var todo = state.todos.find(function (t) { return t.id === id; });
    if (!todo) return;
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date().toISOString() : null;
    todo.updatedAt = new Date().toISOString();
    saveTodos();
    renderAll();
  }

  function deleteTodo(id) {
    var todo = state.todos.find(function (t) { return t.id === id; });
    if (!todo) return;
    var ok = window.confirm('"' + todo.title + '" 할 일을 삭제할까요?');
    if (!ok) return;
    state.todos = state.todos.filter(function (t) { return t.id !== id; });
    saveTodos();
    renderAll();
  }

  function addOrUpdateTodo(data) {
    if (state.editingId) {
      var todo = state.todos.find(function (t) { return t.id === state.editingId; });
      if (!todo) return;
      var wasCompleted = todo.completed;
      todo.title = data.title;
      todo.date = data.date;
      todo.time = data.time;
      todo.category = data.category;
      todo.reminder = data.reminder;
      todo.important = data.important;
      todo.memo = data.memo;
      todo.completed = data.completed;
      if (!wasCompleted && data.completed) {
        todo.completedAt = new Date().toISOString();
      } else if (wasCompleted && !data.completed) {
        todo.completedAt = null;
      }
      /* wasCompleted && data.completed: 기존 completedAt 유지 */
      todo.updatedAt = new Date().toISOString();
    } else {
      var now = new Date().toISOString();
      state.todos.push({
        id: uid(),
        title: data.title,
        date: data.date,
        time: data.time,
        category: data.category,
        important: data.important,
        completed: false,
        completedAt: null,
        reminder: data.reminder,
        memo: data.memo,
        createdAt: now,
        updatedAt: now
      });
    }
    saveTodos();
    renderAll();
  }

  /* ---------------------------------------------------------
     16. 모달 (추가 / 수정)
  --------------------------------------------------------- */
  function openAddModal() {
    state.editingId = null;
    el.modalTitle.textContent = '할 일 추가';
    el.todoForm.reset();
    el.fieldId.value = '';
    el.fieldDate.value = (state.currentScreen === 'calendar' && state.selectedDate) ? state.selectedDate : todayStr();
    el.fieldCategory.value = 'work';
    el.fieldReminder.value = 'none';
    el.fieldCompletedWrap.hidden = true;
    el.fieldCompleted.checked = false;
    el.deleteTodoBtn.hidden = true;
    el.submitTodoBtn.textContent = '추가하기';
    openModal();
  }

  function openEditModal(id) {
    var todo = state.todos.find(function (t) { return t.id === id; });
    if (!todo) return;
    state.editingId = id;
    el.modalTitle.textContent = '할 일 수정';
    el.fieldId.value = todo.id;
    el.fieldTitle.value = todo.title;
    el.fieldDate.value = todo.date;
    el.fieldTime.value = todo.time || '';
    el.fieldCategory.value = todo.category;
    el.fieldReminder.value = todo.reminder;
    el.fieldImportant.checked = todo.important;
    el.fieldMemo.value = todo.memo || '';
    el.fieldCompletedWrap.hidden = false;
    el.fieldCompleted.checked = todo.completed;
    el.deleteTodoBtn.hidden = false;
    el.submitTodoBtn.textContent = '수정하기';
    openModal();
  }

  function openModal() {
    el.modal.classList.add('is-open');
    el.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { el.fieldTitle.focus(); }, 50);
  }

  function closeModal() {
    el.modal.classList.remove('is-open');
    el.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.editingId = null;
  }

  function bindModalEvents() {
    el.fabAdd.addEventListener('click', openAddModal);

    var closers = el.modal.querySelectorAll('[data-close-modal]');
    closers.forEach(function (btn) { btn.addEventListener('click', closeModal); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.modal.classList.contains('is-open')) closeModal();
    });

    el.todoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = el.fieldTitle.value.trim();
      var date = el.fieldDate.value;
      if (!title || !date) {
        if (!title) el.fieldTitle.focus();
        else el.fieldDate.focus();
        return;
      }
      var data = {
        title: title,
        date: date,
        time: el.fieldTime.value || '',
        category: el.fieldCategory.value,
        reminder: el.fieldReminder.value,
        important: el.fieldImportant.checked,
        memo: el.fieldMemo.value.trim(),
        completed: state.editingId ? el.fieldCompleted.checked : false
      };
      addOrUpdateTodo(data);
      closeModal();
    });

    el.deleteTodoBtn.addEventListener('click', function () {
      if (!state.editingId) return;
      var id = state.editingId;
      closeModal();
      deleteTodo(id);
    });
  }

  /* ---------------------------------------------------------
     17. 설정
  --------------------------------------------------------- */
  function bindSettingsEvents() {
    el.themeSwitch.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
    el.themeSwitch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    el.resetDataBtn.addEventListener('click', function () {
      var ok = window.confirm('저장된 모든 할 일 데이터를 초기화할까요? 이 작업은 되돌릴 수 없어요.');
      if (!ok) return;
      state.todos = [];
      saveTodos();
      /* 테마는 유지한 채 데이터만 초기화 */
      renderAll();
    });
  }

  /* ---------------------------------------------------------
     18. 전체 렌더
  --------------------------------------------------------- */
  function renderAll() {
    renderHero();
    renderProgress();
    renderSlider();
    renderTodoList();
    if (state.currentScreen === 'calendar') renderCalendar();
    if (state.currentScreen === 'history') renderHistory();
  }

  /* ---------------------------------------------------------
     19. 초기화
  --------------------------------------------------------- */
  function init() {
    cacheDom();

    var theme = loadThemeIntoState();
    applyTheme(theme);

    loadTodos();

    var now = new Date();
    state.calYear = now.getFullYear();
    state.calMonth = now.getMonth();
    state.selectedDate = todayStr();

    bindNav();
    bindSearchFilter();
    bindCalendarNav();
    bindHistoryEvents();
    bindModalEvents();
    bindSettingsEvents();

    el.sliderPrev.addEventListener('click', function () { sliderMove(-1); });
    el.sliderNext.addEventListener('click', function () { sliderMove(1); });

    goToScreen('home');
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
