const STORAGE_KEY = "domesticTravelPlanner_v2";

const state = {
  data: {
    trips: [],
    selectedTripId: null,
    settings: { darkMode:false }
  },
  currentScreen: "home",
  selectedDate: null,
  currentSubtab: "timeline",
  countdownTimer: null,
  confirmAction: null,
  customTransportReminders: []
};


const KOREAN_AIRPORTS = [
  "광주공항",
  "군산공항",
  "김포국제공항",
  "김해국제공항",
  "대구국제공항",
  "무안국제공항",
  "사천공항",
  "양양국제공항",
  "여수공항",
  "울산공항",
  "원주공항",
  "인천국제공항",
  "제주국제공항",
  "청주국제공항",
  "포항경주공항"
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function makeId(){
  return (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function escapeHtml(v=""){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); }
function loadData(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved && Array.isArray(saved.trips)){
      state.data = {
        trips:saved.trips,
        selectedTripId:saved.selectedTripId || saved.trips[0]?.id || null,
        settings:saved.settings || {darkMode:false}
      };
    }
  }catch(e){ console.warn("저장 데이터를 불러오지 못했습니다.", e); }
}

function formatDate(dateStr){
  if(!dateStr) return "";
  const [y,m,d] = dateStr.split("-").map(Number);
  return `${y}.${String(m).padStart(2,"0")}.${String(d).padStart(2,"0")}`;
}
function formatKoreanDate(dateStr){
  if(!dateStr) return "";
  const [y,m,d] = dateStr.split("-").map(Number);
  return `${m}월 ${d}일`;
}
function toDateStart(dateStr){
  const [y,m,d] = dateStr.split("-").map(Number);
  return new Date(y,m-1,d,0,0,0,0);
}
function combineDateTime(dateStr,timeStr){
  if(!dateStr || !timeStr) return null;
  const [y,m,d] = dateStr.split("-").map(Number);
  const [hh,mm] = timeStr.split(":").map(Number);
  return new Date(y,m-1,d,hh,mm,0,0);
}
function getSelectedTrip(){
  return state.data.trips.find(t => t.id === state.data.selectedTripId) || null;
}
function ensureTripShape(trip){
  if(!trip.schedules) trip.schedules = [];
  if(!trip.transports) trip.transports = [];
  if(!trip.checklist) trip.checklist = [];
  return trip;
}
function getTripDates(trip){
  if(!trip?.startDate || !trip?.endDate) return [];
  const start = toDateStart(trip.startDate);
  const end = toDateStart(trip.endDate);
  if(end < start) return [];
  const result = [];
  const cur = new Date(start);
  let guard = 0;
  while(cur <= end && guard < 90){
    result.push(`${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,"0")}-${String(cur.getDate()).padStart(2,"0")}`);
    cur.setDate(cur.getDate()+1);
    guard++;
  }
  return result;
}
function todayString(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatDuration(totalMinutes){
  totalMinutes = Math.max(0, Math.floor(totalMinutes));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const parts = [];
  if(days) parts.push(`${days}일`);
  if(hours) parts.push(`${hours}시간`);
  if(minutes || !parts.length) parts.push(`${minutes}분`);
  return parts.join(" ");
}
function getDdayText(trip){
  const now = new Date();
  const start = toDateStart(trip.startDate);
  const end = toDateStart(trip.endDate); end.setHours(23,59,59,999);
  if(now >= start && now <= end) return "여행 중";
  if(now > end) return "여행 완료";
  const days = Math.ceil((start-now)/86400000);
  return days <= 0 ? "D-DAY" : `D-${days}`;
}

function showScreen(screen){
  state.currentScreen = screen;
  $$(".screen").forEach(el => el.classList.toggle("active", el.dataset.screen === screen));
  $$(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.target === screen));

  const names = {home:"홈",trips:"여행목록",add:"여행 추가",mytrip:"내 여행",settings:"설정"};
  $("#pageTitle").textContent = names[screen] || "여행 플래너";

  if(screen === "home") renderHome();
  if(screen === "trips") renderTripList();
  if(screen === "add") prepareTripForm();
  if(screen === "mytrip") renderMyTrip();

  window.scrollTo({top:0,behavior:"smooth"});
}

function applyTheme(){
  const dark = !!state.data.settings.darkMode;
  document.body.classList.toggle("dark", dark);
  $("#darkModeToggle").checked = dark;
  $("#quickThemeBtn").textContent = dark ? "☀️" : "🌙";
}
function toggleTheme(){
  state.data.settings.darkMode = !state.data.settings.darkMode;
  saveData();
  applyTheme();
}

function getNearestTrip(){
  if(!state.data.trips.length) return null;
  const now = new Date();
  return state.data.trips.slice().sort((a,b) => {
    const aEnd = toDateStart(a.endDate); aEnd.setHours(23,59,59,999);
    const bEnd = toDateStart(b.endDate); bEnd.setHours(23,59,59,999);
    const aStart = toDateStart(a.startDate);
    const bStart = toDateStart(b.startDate);

    const aRank = aEnd >= now ? 0 : 1;
    const bRank = bEnd >= now ? 0 : 1;
    if(aRank !== bRank) return aRank-bRank;
    return aRank === 0 ? aStart-bStart : bStart-aStart;
  })[0];
}

function renderHome(){
  const trip = getNearestTrip();
  $("#homeEmpty").classList.toggle("hidden", !!trip);
  $("#homeContent").classList.toggle("hidden", !trip);
  if(!trip) return;

  ensureTripShape(trip);
  $("#homeTripImage").src = trip.imageData || "./images/travel-default.jpg";
  $("#homeTripRegion").textContent = trip.region || "국내여행";
  $("#homeTripName").textContent = trip.name;
  $("#homeTripPeriod").textContent = `${formatDate(trip.startDate)} ~ ${formatDate(trip.endDate)}`;

  $("#homeTripCard").dataset.tripId = trip.id;
  $("#homeTripEditBtn").dataset.tripId = trip.id;

  startHomeCountdown(trip);
  renderHomeNextAlert(trip);
}

function startHomeCountdown(trip){
  if(state.countdownTimer) clearInterval(state.countdownTimer);

  const tick = () => {
    const now = new Date();
    const start = toDateStart(trip.startDate);
    const end = toDateStart(trip.endDate); end.setHours(23,59,59,999);

    if(now >= start && now <= end){
      $("#homeDday").textContent = "여행 중";
      $("#homeCountdownText").textContent = "즐거운 여행 되세요!";
      return;
    }
    if(now > end){
      $("#homeDday").textContent = "여행 완료";
      $("#homeCountdownText").textContent = "다녀온 여행";
      return;
    }

    const total = Math.max(0, Math.floor((start-now)/1000));
    const days = Math.floor(total/86400);
    const hours = Math.floor((total%86400)/3600);
    const minutes = Math.floor((total%3600)/60);
    const seconds = total%60;
    $("#homeDday").textContent = days === 0 ? "D-DAY" : `D-${days}`;
    $("#homeCountdownText").textContent = `${days}일 ${String(hours).padStart(2,"0")}시간 ${String(minutes).padStart(2,"0")}분 ${String(seconds).padStart(2,"0")}초`;
  };
  tick();
  state.countdownTimer = setInterval(tick,1000);
}

function transportMeta(type){
  return {
    flight:{name:"비행기",icon:"✈️",timeLabel:"항공편 출발시간",numberLabel:"항공편명",fromLabel:"출발 공항",toLabel:"도착 공항",bufferTitle:"공항 권장 도착 여유시간",bufferHelp:"항공편 출발 전에 공항에 도착해 있어야 하는 여유시간입니다.",travelTitle:"출발 공항까지 이동시간",defaultBuffer:90},
    train:{name:"기차",icon:"🚆",timeLabel:"열차 출발시간",numberLabel:"열차번호",fromLabel:"출발역",toLabel:"도착역",bufferTitle:"역 권장 도착 여유시간",bufferHelp:"열차 출발 전에 역에 도착해 있어야 하는 여유시간입니다.",travelTitle:"출발역까지 이동시간",defaultBuffer:20},
    bus:{name:"고속/시외버스",icon:"🚌",timeLabel:"버스 출발시간",numberLabel:"버스번호",fromLabel:"승차 터미널·정류장",toLabel:"하차 터미널·정류장",bufferTitle:"승차장 권장 도착 여유시간",bufferHelp:"버스 출발 전에 승차장에 도착해 있어야 하는 여유시간입니다.",travelTitle:"승차장까지 이동시간",defaultBuffer:20},
    car:{name:"자차",icon:"🚗",timeLabel:"출발 예정시간",numberLabel:"차량 메모",fromLabel:"출발지",toLabel:"목적지",bufferTitle:"출발 전 준비 여유시간",bufferHelp:"출발 전에 준비할 시간을 입력합니다.",travelTitle:"추가 이동시간",defaultBuffer:0},
    taxi:{name:"택시",icon:"🚕",timeLabel:"택시 탑승 예정시간",numberLabel:"호출 메모",fromLabel:"출발지",toLabel:"목적지",bufferTitle:"탑승 전 준비 여유시간",bufferHelp:"택시 탑승 전에 준비할 시간을 입력합니다.",travelTitle:"추가 이동시간",defaultBuffer:0},
    walk:{name:"도보",icon:"🚶",timeLabel:"이동 시작시간",numberLabel:"이동 메모",fromLabel:"출발지",toLabel:"목적지",bufferTitle:"출발 전 준비 여유시간",bufferHelp:"도보 이동 전에 필요한 준비시간입니다.",travelTitle:"추가 이동시간",defaultBuffer:0}
  }[type];
}

function recommendedTimes(t){
  const departure = combineDateTime(t.date,t.time);
  if(!departure) return null;
  const buffer = Math.max(0,Number(t.arrivalBufferMinutes)||0);
  const travel = Math.max(0,Number(t.travelToDepartureMinutes)||0);
  const arriveAt = new Date(departure.getTime() - buffer*60000);
  const leaveAt = new Date(arriveAt.getTime() - travel*60000);
  return {departure,arriveAt,leaveAt};
}
function formatClock(d){
  return d.toLocaleString("ko-KR",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"});
}

function collectAllAlerts(trip){
  const alerts = [];
  ensureTripShape(trip);

  trip.transports.forEach(t => {
    const meta = transportMeta(t.type);
    const times = recommendedTimes(t);
    if(!times) return;

    (t.leaveReminders || []).forEach(min => {
      alerts.push({
        at:new Date(times.leaveAt.getTime() - Number(min)*60000),
        title:`${t.from || meta.name}으로 이동 준비`,
        desc:`권장 출발시간 ${formatClock(times.leaveAt)} · ${formatDuration(min)} 전`
      });
    });

    (t.transportReminders || []).forEach(min => {
      alerts.push({
        at:new Date(times.departure.getTime() - Number(min)*60000),
        title:`${meta.timeLabel} 알림`,
        desc:`${formatClock(times.departure)} · ${formatDuration(min)} 전`
      });
    });

    (t.customReminders || []).forEach(min => {
      alerts.push({
        at:new Date(times.departure.getTime() - Number(min)*60000),
        title:`${meta.timeLabel} 사용자 지정 알림`,
        desc:`${formatClock(times.departure)} · ${formatDuration(min)} 전`
      });
    });
  });

  trip.schedules.forEach(s => {
    if(!s.time) return;
    const scheduleAt = combineDateTime(s.date,s.time);
    (s.reminders || []).forEach(min => {
      alerts.push({
        at:new Date(scheduleAt.getTime() - Number(min)*60000),
        title:`${s.place} 방문 알림`,
        desc:`방문 예정시간 ${formatClock(scheduleAt)} · ${formatDuration(min)} 전`
      });
    });
  });

  return alerts.sort((a,b)=>a.at-b.at);
}

function renderHomeNextAlert(trip){
  const box = $("#homeNextAlert");
  const now = new Date();
  const next = collectAllAlerts(trip).find(a => a.at > now);
  if(!next){
    box.innerHTML = `<div class="alert-card"><strong>예정된 알림이 없어요.</strong><p>일정이나 교통편에서 필요한 알림을 설정할 수 있습니다.</p></div>`;
    return;
  }
  const mins = Math.max(0,Math.ceil((next.at-now)/60000));
  box.innerHTML = `<div class="alert-card"><strong>${escapeHtml(next.title)}</strong><p>${escapeHtml(next.desc)}</p><p><b>${escapeHtml(formatDuration(mins))} 후 알림</b></p></div>`;
}

function renderTripList(){
  const box = $("#tripList");
  if(!state.data.trips.length){
    box.innerHTML = `<div class="empty-state"><div class="empty-icon">🗺️</div><h2>등록된 여행이 없어요.</h2><p>새 여행을 추가해보세요.</p><button class="primary-btn" type="button" data-go="add">여행 추가</button></div>`;
    bindGoButtons();
    return;
  }

  const trips = state.data.trips.slice().sort((a,b)=>a.startDate.localeCompare(b.startDate));
  box.innerHTML = trips.map(t => `
    <article class="trip-list-card" data-trip-open="${t.id}">
      <img src="${escapeHtml(t.imageData || "./images/travel-default.jpg")}" alt="${escapeHtml(t.region || "국내 여행")}">
      <div class="trip-list-content">
        <p class="section-kicker">${escapeHtml(t.region || "국내여행")}</p>
        <h3>${escapeHtml(t.name)}</h3>
        <p class="trip-list-meta">${escapeHtml(formatDate(t.startDate))} ~ ${escapeHtml(formatDate(t.endDate))}</p>
        <span class="trip-list-dday">${escapeHtml(getDdayText(t))}</span>
      </div>
    </article>
  `).join("");

  $$("[data-trip-open]").forEach(card => card.addEventListener("click",() => selectTrip(card.dataset.tripOpen,true)));
}

function selectTrip(id,openMyTrip=false){
  const trip = state.data.trips.find(t=>t.id===id);
  if(!trip) return;
  state.data.selectedTripId = id;
  state.selectedDate = getTripDates(trip)[0] || null;
  saveData();
  if(openMyTrip) showScreen("mytrip");
}

function prepareTripForm(editId=null){
  const id = editId || $("#tripIdInput").value;
  const trip = id ? state.data.trips.find(t=>t.id===id) : null;

  $("#tripForm").reset();
  $("#tripFormError").textContent = "";
  $("#tripIdInput").value = trip?.id || "";
  $("#tripFormTitle").textContent = trip ? "여행 정보 수정" : "새 여행 만들기";

  const currentImage = trip?.imageData || "./images/travel-default.jpg";
  $("#tripPhotoPreview").src = currentImage;
  $("#tripPhotoDataInput").value = trip?.imageData || "";

  if(trip){
    $("#tripNameInput").value = trip.name || "";
    $("#tripRegionInput").value = trip.region || "";
    $("#tripStartInput").value = trip.startDate || "";
    $("#tripEndInput").value = trip.endDate || "";
    $("#tripMemoInput").value = trip.memo || "";
  }
}


function handleTripPhotoChange(file){
  if(!file) return;
  if(!file.type.startsWith("image/")){
    showToast("이미지 파일을 선택해주세요.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = 1200;
      const maxHeight = 800;
      let width = img.width;
      let height = img.height;
      const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img,0,0,width,height);

      const dataUrl = canvas.toDataURL("image/jpeg",0.82);
      $("#tripPhotoDataInput").value = dataUrl;
      $("#tripPhotoPreview").src = dataUrl;
      showToast("대표사진을 변경했습니다.");
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function handleTripSubmit(e){
  e.preventDefault();
  const name = $("#tripNameInput").value.trim();
  const startDate = $("#tripStartInput").value;
  const endDate = $("#tripEndInput").value;

  if(!name){ $("#tripFormError").textContent="여행 이름을 입력해주세요."; $("#tripNameInput").focus(); return; }
  if(!startDate){ $("#tripFormError").textContent="여행 시작일을 선택해주세요."; return; }
  if(!endDate){ $("#tripFormError").textContent="여행 종료일을 선택해주세요."; return; }
  if(endDate < startDate){ $("#tripFormError").textContent="여행 종료일은 시작일 이후로 선택해주세요."; return; }

  const id = $("#tripIdInput").value;
  let trip = id ? state.data.trips.find(t=>t.id===id) : null;

  if(trip){
    Object.assign(trip,{
      name,region:$("#tripRegionInput").value.trim(),startDate,endDate,memo:$("#tripMemoInput").value.trim(),imageData:$("#tripPhotoDataInput").value || ""
    });
  }else{
    trip = {
      id:makeId(),
      name,
      region:$("#tripRegionInput").value.trim(),
      startDate,
      endDate,
      memo:$("#tripMemoInput").value.trim(),
      imageData:$("#tripPhotoDataInput").value || "",
      schedules:[],
      transports:[],
      checklist:[]
    };
    state.data.trips.push(trip);
  }

  state.data.selectedTripId = trip.id;
  state.selectedDate = getTripDates(trip)[0] || null;
  saveData();
  showToast(id ? "여행 정보를 수정했습니다." : "여행을 만들었습니다.");
  showScreen("mytrip");
}

function renderMyTrip(){
  const trip = getSelectedTrip();
  $("#myTripEmpty").classList.toggle("hidden",!!trip);
  $("#myTripContent").classList.toggle("hidden",!trip);
  if(!trip) return;

  ensureTripShape(trip);
  $("#myTripName").textContent = trip.name;
  $("#myTripPeriod").textContent = `${formatDate(trip.startDate)} ~ ${formatDate(trip.endDate)} · ${trip.region || "국내여행"}`;

  renderSubtab();
  renderDayTabs();
  renderTimeline();
  renderChecklist();
  renderTripInfo();
}

function renderSubtab(){
  $$(".subtab").forEach(btn=>btn.classList.toggle("active",btn.dataset.subtab===state.currentSubtab));
  $$(".subscreen").forEach(el=>el.classList.toggle("active",el.dataset.subscreen===state.currentSubtab));
}
function renderDayTabs(){
  const trip = getSelectedTrip();
  if(!trip) return;
  const dates = getTripDates(trip);
  if(!state.selectedDate || !dates.includes(state.selectedDate)) state.selectedDate = dates[0] || null;

  $("#dayTabs").innerHTML = dates.map((date,i)=>`
    <button class="day-tab ${date===state.selectedDate?"active":""}" type="button" data-date="${date}">
      ${i+1}일차
    </button>
  `).join("");

  $$(".day-tab").forEach(btn=>btn.addEventListener("click",()=>{
    state.selectedDate=btn.dataset.date;
    renderDayTabs();
    renderTimeline();
  }));
}

function timelineItems(trip,date){
  const schedules = trip.schedules.filter(x=>x.date===date).map(x=>({...x,_kind:"schedule"}));
  const transports = trip.transports.filter(x=>x.date===date).map(x=>({...x,_kind:"transport"}));
  return [...schedules,...transports].sort((a,b)=>{
    if(a.completed !== b.completed) return a.completed ? 1 : -1;
    const at = a.time || "99:99";
    const bt = b.time || "99:99";
    if(at!==bt) return at.localeCompare(bt);
    return (a.createdAt||0)-(b.createdAt||0);
  });
}
function renderTimeline(){
  const trip = getSelectedTrip();
  if(!trip) return;
  const box = $("#timelineList");
  const items = timelineItems(trip,state.selectedDate);

  if(!items.length){
    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🗓️</div>
        <h2>이 날짜에는 아직 일정이 없어요.</h2>
        <p>관광 일정이나 장거리 교통편을 추가해보세요.</p>
        <div class="empty-add-actions">
          <button id="emptyAddScheduleBtn" class="primary-btn" type="button">+ 관광 일정 추가</button>
          <button id="emptyAddTransportBtn" class="secondary-btn" type="button">+ 교통편 추가</button>
        </div>
      </div>`;
    $("#emptyAddScheduleBtn").addEventListener("click",()=>openScheduleModal());
    $("#emptyAddTransportBtn").addEventListener("click",()=>openTransportModal());
    return;
  }

  box.innerHTML = items.map(item => item._kind==="schedule" ? scheduleCardHtml(item) : transportCardHtml(item)).join("");

  $$("[data-complete-schedule]").forEach(input=>input.addEventListener("change",()=>{
    const item = trip.schedules.find(x=>x.id===input.dataset.completeSchedule);
    if(item){ item.completed=input.checked; saveData(); renderTimeline(); }
  }));

  $$("[data-edit-schedule]").forEach(btn=>btn.addEventListener("click",()=>openScheduleModal(btn.dataset.editSchedule)));
  $$("[data-delete-schedule]").forEach(btn=>btn.addEventListener("click",()=>{
    openConfirm("이 일정을 삭제하시겠습니까?","삭제된 일정은 복구할 수 없습니다.",()=>{
      trip.schedules = trip.schedules.filter(x=>x.id!==btn.dataset.deleteSchedule);
      saveData(); renderTimeline(); showToast("일정을 삭제했습니다.");
    });
  }));

  $$("[data-complete-transport]").forEach(input=>input.addEventListener("change",()=>{
    const item = trip.transports.find(x=>x.id===input.dataset.completeTransport);
    if(item){
      item.completed = input.checked;
      saveData();
      renderTimeline();
      renderHome();
    }
  }));

  $$("[data-edit-transport]").forEach(btn=>btn.addEventListener("click",()=>openTransportModal(btn.dataset.editTransport)));
  $$("[data-delete-transport]").forEach(btn=>btn.addEventListener("click",()=>{
    openConfirm("이 교통편을 삭제하시겠습니까?","교통편과 연결된 알림 설정도 함께 삭제됩니다.",()=>{
      trip.transports = trip.transports.filter(x=>x.id!==btn.dataset.deleteTransport);
      saveData(); renderTimeline(); renderHome(); showToast("교통편을 삭제했습니다.");
    });
  }));
}

function scheduleCardHtml(s){
  const reminders = (s.reminders||[]).map(formatDuration).join(", ");
  return `
    <article class="timeline-card schedule ${s.completed?"completed":""}">
      <div class="timeline-top">
        <div class="timeline-title-wrap">
          <input class="complete-check" type="checkbox" data-complete-schedule="${s.id}" ${s.completed?"checked":""} aria-label="${escapeHtml(s.place)} 완료">
          <div>
            <span class="timeline-label">관광 일정</span>
            <p class="timeline-time">${escapeHtml(s.time || "시간 미정")}</p>
            <h3 class="timeline-title">${escapeHtml(s.place)}</h3>
          </div>
        </div>
        <div class="card-menu">
          <button class="card-icon-btn" type="button" data-edit-schedule="${s.id}" aria-label="일정 수정">✎</button>
          <button class="card-icon-btn" type="button" data-delete-schedule="${s.id}" aria-label="일정 삭제">🗑</button>
        </div>
      </div>
      <div class="info-chips">
        ${s.fee?`<span class="chip">입장료 ${escapeHtml(s.fee)}</span>`:""}
        <span class="chip">${escapeHtml(s.reservation||"예약 없음")}</span>
        ${reminders?`<span class="chip">알림 ${escapeHtml(reminders)}</span>`:""}
      </div>
      ${s.move ? `<div class="simple-move-summary"><strong>이동</strong> · ${escapeHtml(scheduleMoveSummary(s.move))}</div>` : ""}
      ${s.memo?`<div class="timeline-note">${escapeHtml(s.memo)}</div>`:""}
    </article>
  `;
}

function transportCardHtml(t){
  const meta = transportMeta(t.type);
  const times = recommendedTimes(t);
  const leaveReminderText = (t.leaveReminders||[]).map(formatDuration).join(", ");
  const depReminderText = [...(t.transportReminders||[]),...(t.customReminders||[])].map(formatDuration).join(", ");

  return `
    <article class="timeline-card transport ${t.completed?"completed":""}">
      <div class="timeline-top">
        <div class="transport-complete-wrap">
          <input class="complete-check" type="checkbox" data-complete-transport="${t.id}" ${t.completed?"checked":""} aria-label="${escapeHtml(meta.name)} 이동 완료">
          <div>
          <span class="timeline-label">교통편 · ${escapeHtml(meta.name)}</span>
          <p class="timeline-time">${escapeHtml(t.time || "시간 미정")}</p>
          <h3 class="timeline-title">${escapeHtml(t.from || "출발지")} → ${escapeHtml(t.to || "도착지")}</h3>
          </div>
        </div>
        <div class="card-menu">
          <button class="card-icon-btn" type="button" data-edit-transport="${t.id}" aria-label="교통편 수정">✎</button>
          <button class="card-icon-btn" type="button" data-delete-transport="${t.id}" aria-label="교통편 삭제">🗑</button>
        </div>
      </div>

      <div class="transport-detail-box">
        <dl>
          <dt>${escapeHtml(meta.timeLabel)}</dt>
          <dd>${escapeHtml(formatKoreanDate(t.date))} ${escapeHtml(t.time || "미입력")}</dd>
          ${t.number?`<dt>${escapeHtml(meta.numberLabel)}</dt><dd>${escapeHtml(t.number)}</dd>`:""}
          ${times?`<dt>권장 도착시간</dt><dd>${escapeHtml(formatClock(times.arriveAt))}</dd>`:""}
          ${times?`<dt>권장 출발시간</dt><dd>${escapeHtml(formatClock(times.leaveAt))}</dd>`:""}
        </dl>
        <div class="transport-reminder-summary">
          ${leaveReminderText?`권장 출발시간 알림: ${escapeHtml(leaveReminderText)} 전<br>`:""}
          ${depReminderText?`${escapeHtml(meta.timeLabel)} 알림: ${escapeHtml(depReminderText)} 전`:""}
        </div>
      </div>
      ${t.memo?`<div class="timeline-note">${escapeHtml(t.memo)}</div>`:""}
    </article>
  `;
}

function renderChecklist(){
  const trip = getSelectedTrip();
  if(!trip) return;
  const list = $("#checklistList");
  const items = trip.checklist.slice().sort((a,b)=>Number(a.completed)-Number(b.completed));

  if(!items.length){
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🎒</div><h2>이 여행의 준비물이 없어요.</h2><p>위 입력창에서 필요한 준비물을 추가해보세요.</p></div>`;
    return;
  }

  list.innerHTML = items.map(x=>`
    <div class="check-item ${x.completed?"completed":""}">
      <input type="checkbox" data-check-id="${x.id}" ${x.completed?"checked":""} aria-label="${escapeHtml(x.text)} 완료">
      <span class="check-text">${escapeHtml(x.text)}</span>
      <button class="delete-mini" type="button" data-check-delete="${x.id}" aria-label="준비물 삭제">🗑</button>
    </div>
  `).join("");

  $$("[data-check-id]").forEach(input=>input.addEventListener("change",()=>{
    const item=trip.checklist.find(x=>x.id===input.dataset.checkId);
    if(item){item.completed=input.checked;saveData();renderChecklist();}
  }));
  $$("[data-check-delete]").forEach(btn=>btn.addEventListener("click",()=>{
    trip.checklist=trip.checklist.filter(x=>x.id!==btn.dataset.checkDelete);
    saveData();renderChecklist();
  }));
}
function handleChecklistSubmit(e){
  e.preventDefault();
  const trip=getSelectedTrip();
  const text=$("#checklistInput").value.trim();
  if(!trip) return;
  if(!text){showToast("준비물을 입력해주세요.");return;}
  trip.checklist.push({id:makeId(),text,completed:false});
  $("#checklistInput").value="";
  saveData();renderChecklist();
}

function renderTripInfo(){
  const trip=getSelectedTrip();
  if(!trip) return;
  $("#tripInfoPanel").innerHTML = `
    <div class="section-head"><div><p class="section-kicker">TRIP INFO</p><h2>여행 기본정보</h2></div></div>
    <dl class="info-list">
      <div class="info-row"><dt>여행 이름</dt><dd>${escapeHtml(trip.name)}</dd></div>
      <div class="info-row"><dt>지역</dt><dd>${escapeHtml(trip.region||"미입력")}</dd></div>
      <div class="info-row"><dt>여행 기간</dt><dd>${escapeHtml(formatDate(trip.startDate))} ~ ${escapeHtml(formatDate(trip.endDate))}</dd></div>
      <div class="info-row"><dt>여행 메모</dt><dd>${escapeHtml(trip.memo||"없음")}</dd></div>
    </dl>
  `;
}

function populateDateSelect(select,trip){
  const dates=getTripDates(trip);
  select.innerHTML=dates.map((d,i)=>`<option value="${d}">${i+1}일차 · ${formatKoreanDate(d)}</option>`).join("");
}


function renderScheduleMoveFields(type, values={}){
  const box = $("#scheduleMoveFields");
  if(!box) return;

  if(type === "bus"){
    box.innerHTML = `
      <label class="field">
        <span>버스번호</span>
        <input id="scheduleBusNoInput" type="text" maxlength="30" placeholder="예: 101번">
      </label>
      <div class="field-row">
        <label class="field">
          <span>승차 정류장</span>
          <input id="scheduleBoardInput" type="text" maxlength="60" placeholder="예: 제주공항">
        </label>
        <label class="field">
          <span>하차 정류장</span>
          <input id="scheduleAlightInput" type="text" maxlength="60" placeholder="예: 성산일출봉입구">
        </label>
      </div>
      <label class="field">
        <span>이동 메모</span>
        <input id="scheduleMoveMemoInput" type="text" maxlength="100" placeholder="예: 하차 후 도보 5분">
      </label>
    `;
  }else if(type === "taxi"){
    box.innerHTML = `
      <div class="field-row">
        <label class="field">
          <span>출발지</span>
          <input id="scheduleBoardInput" type="text" maxlength="60" placeholder="예: 제주공항">
        </label>
        <label class="field">
          <span>목적지</span>
          <input id="scheduleAlightInput" type="text" maxlength="60" placeholder="예: 성산일출봉">
        </label>
      </div>
      <label class="field">
        <span>이동 메모</span>
        <input id="scheduleMoveMemoInput" type="text" maxlength="100" placeholder="예: 짐 있음">
      </label>
    `;
  }else if(type === "walk" || type === "car"){
    box.innerHTML = `
      <div class="field-row">
        <label class="field">
          <span>출발지</span>
          <input id="scheduleBoardInput" type="text" maxlength="60" placeholder="출발지">
        </label>
        <label class="field">
          <span>목적지</span>
          <input id="scheduleAlightInput" type="text" maxlength="60" placeholder="목적지">
        </label>
      </div>
      <label class="field">
        <span>이동 메모</span>
        <input id="scheduleMoveMemoInput" type="text" maxlength="100" placeholder="간단한 이동 메모">
      </label>
    `;
  }else{
    box.innerHTML = "";
  }

  if($("#scheduleBusNoInput")) $("#scheduleBusNoInput").value = values.busNo || "";
  if($("#scheduleBoardInput")) $("#scheduleBoardInput").value = values.board || "";
  if($("#scheduleAlightInput")) $("#scheduleAlightInput").value = values.alight || "";
  if($("#scheduleMoveMemoInput")) $("#scheduleMoveMemoInput").value = values.memo || "";
}

function getScheduleMoveData(){
  const type = $("#scheduleMoveTypeInput")?.value || "";
  if(!type) return null;

  return {
    type,
    busNo: $("#scheduleBusNoInput")?.value.trim() || "",
    board: $("#scheduleBoardInput")?.value.trim() || "",
    alight: $("#scheduleAlightInput")?.value.trim() || "",
    memo: $("#scheduleMoveMemoInput")?.value.trim() || ""
  };
}

function scheduleMoveSummary(move){
  if(!move?.type) return "";
  if(move.type === "bus"){
    const no = move.busNo || "버스번호 미입력";
    const board = move.board || "승차 정류장 미입력";
    const alight = move.alight || "하차 정류장 미입력";
    return `🚌 ${no} · ${board} → ${alight}${move.memo ? ` · ${move.memo}` : ""}`;
  }
  if(move.type === "taxi"){
    return `🚕 ${move.board || "출발지 미입력"} → ${move.alight || "목적지 미입력"}${move.memo ? ` · ${move.memo}` : ""}`;
  }
  if(move.type === "walk"){
    return `🚶 ${move.board || "출발지 미입력"} → ${move.alight || "목적지 미입력"}${move.memo ? ` · ${move.memo}` : ""}`;
  }
  if(move.type === "car"){
    return `🚗 ${move.board || "출발지 미입력"} → ${move.alight || "목적지 미입력"}${move.memo ? ` · ${move.memo}` : ""}`;
  }
  return "";
}

function openScheduleModal(id=null){
  const trip=getSelectedTrip();
  if(!trip){showToast("먼저 여행을 선택해주세요.");return;}

  $("#scheduleForm").reset();
  $("#scheduleFormError").textContent="";
  $("#scheduleIdInput").value="";
  $("#scheduleModalTitle").textContent=id?"일정 수정":"일정 추가";
  populateDateSelect($("#scheduleDateInput"),trip);
  $("#scheduleDateInput").value=state.selectedDate||getTripDates(trip)[0];
  $("#scheduleMoveTypeInput").value="";
  renderScheduleMoveFields("");

  if(id){
    const s=trip.schedules.find(x=>x.id===id);
    if(s){
      $("#scheduleIdInput").value=s.id;
      $("#scheduleDateInput").value=s.date;
      $("#schedulePlaceInput").value=s.place||"";
      $("#scheduleTimeInput").value=s.time||"";
      $("#scheduleFeeInput").value=s.fee||"";
      $("#scheduleReservationInput").value=s.reservation||"예약 없음";
      $("#scheduleMemoInput").value=s.memo||"";
      $("#scheduleMoveTypeInput").value=s.move?.type||"";
      renderScheduleMoveFields(s.move?.type||"", s.move||{});
      $$("#scheduleReminderOptions input").forEach(cb=>cb.checked=(s.reminders||[]).includes(Number(cb.value)));
    }
  }
  $("#scheduleModal").classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeScheduleModal(){ $("#scheduleModal").classList.add("hidden"); document.body.style.overflow=""; }
function handleScheduleSubmit(e){
  e.preventDefault();
  const trip=getSelectedTrip();
  const place=$("#schedulePlaceInput").value.trim();
  const date=$("#scheduleDateInput").value;
  if(!place){$("#scheduleFormError").textContent="장소명을 입력해주세요.";return;}
  if(!date){$("#scheduleFormError").textContent="날짜를 선택해주세요.";return;}

  const id=$("#scheduleIdInput").value;
  const old=id?trip.schedules.find(x=>x.id===id):null;
  const data={
    id:old?.id||makeId(),
    date,
    place,
    time:$("#scheduleTimeInput").value,
    fee:$("#scheduleFeeInput").value.trim(),
    reservation:$("#scheduleReservationInput").value,
    memo:$("#scheduleMemoInput").value.trim(),
    move:getScheduleMoveData(),
    reminders:$$("#scheduleReminderOptions input").filter(x=>x.checked).map(x=>Number(x.value)),
    completed:old?.completed||false,
    createdAt:old?.createdAt||Date.now()
  };
  if(old) Object.assign(old,data); else trip.schedules.push(data);
  state.selectedDate=date;
  saveData();closeScheduleModal();renderTimeline();renderHome();showToast(old?"일정을 수정했습니다.":"일정을 추가했습니다.");
}


function renderTransportLocationControls(type,fromValue="",toValue=""){
  const meta = transportMeta(type);

  if(type === "flight"){
    const options = ['<option value="">공항 선택</option>']
      .concat(KOREAN_AIRPORTS.map(name=>`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`))
      .join("");

    $("#transportFromControl").innerHTML = `<select id="transportFromInput">${options}</select>`;
    $("#transportToControl").innerHTML = `<select id="transportToInput">${options}</select>`;
  }else{
    $("#transportFromControl").innerHTML = `<input id="transportFromInput" type="text" maxlength="60" placeholder="${escapeHtml(meta.fromLabel)} 입력">`;
    $("#transportToControl").innerHTML = `<input id="transportToInput" type="text" maxlength="60" placeholder="${escapeHtml(meta.toLabel)} 입력">`;
  }

  $("#transportFromInput").value = fromValue || "";
  $("#transportToInput").value = toValue || "";
}

function applyTransportMetaToForm(type,resetBuffer=false){
  const meta=transportMeta(type);
  const oldFrom = $("#transportFromInput")?.value || "";
  const oldTo = $("#transportToInput")?.value || "";
  renderTransportLocationControls(type,oldFrom,oldTo);
  $("#transportTimeLabel").textContent=`${meta.timeLabel} *`;
  $("#transportNumberLabel").textContent=meta.numberLabel;
  $("#transportFromLabel").textContent=meta.fromLabel;
  $("#transportToLabel").textContent=meta.toLabel;
  $("#arrivalBufferTitle").textContent=meta.bufferTitle;
  $("#arrivalBufferHelp").textContent=meta.bufferHelp;
  $("#travelToDepartureTitle").textContent=meta.travelTitle;
  $("#transportDepartureReminderTitle").textContent=`${meta.timeLabel} 기준`;
  if(resetBuffer) $("#arrivalBufferInput").value=meta.defaultBuffer;
  updateRecommendedPreview();
}

function openTransportModal(id=null){
  const trip=getSelectedTrip();
  if(!trip){showToast("먼저 여행을 선택해주세요.");return;}

  $("#transportForm").reset();
  $("#transportFormError").textContent="";
  $("#transportIdInput").value="";
  $("#transportModalTitle").textContent=id?"장거리 교통편 수정":"장거리 교통편 추가";
  state.customTransportReminders=[];
  renderCustomReminderList();

  populateDateSelect($("#transportDateInput"),trip);
  $("#transportDateInput").value=state.selectedDate||getTripDates(trip)[0];
  $("#transportTypeInput").value="flight";
  $("#arrivalBufferInput").value=90;
  $("#travelToDepartureInput").value=50;
  $$("#leaveReminderOptions input").forEach(cb=>cb.checked=Number(cb.value)===30);
  $$("#transportReminderOptions input").forEach(cb=>cb.checked=false);
  applyTransportMetaToForm("flight");

  if(id){
    const t=trip.transports.find(x=>x.id===id);
    if(t){
      $("#transportIdInput").value=t.id;
      $("#transportTypeInput").value=t.type;
      $("#transportDateInput").value=t.date;
      $("#transportTimeInput").value=t.time||"";
      $("#transportNumberInput").value=t.number||"";
      $("#arrivalBufferInput").value=t.arrivalBufferMinutes??transportMeta(t.type).defaultBuffer;
      $("#travelToDepartureInput").value=t.travelToDepartureMinutes??0;
      $("#transportMemoInput").value=t.memo||"";
      $$("#leaveReminderOptions input").forEach(cb=>cb.checked=(t.leaveReminders||[]).includes(Number(cb.value)));
      $$("#transportReminderOptions input").forEach(cb=>cb.checked=(t.transportReminders||[]).includes(Number(cb.value)));
      state.customTransportReminders=[...(t.customReminders||[])];
      applyTransportMetaToForm(t.type);
      $("#transportFromInput").value=t.from||"";
      $("#transportToInput").value=t.to||"";
      renderCustomReminderList();
    }
  }
  updateRecommendedPreview();
  $("#transportModal").classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeTransportModal(){ $("#transportModal").classList.add("hidden"); document.body.style.overflow=""; }

function updateRecommendedPreview(){
  const type=$("#transportTypeInput").value;
  const meta=transportMeta(type);
  const date=$("#transportDateInput").value;
  const time=$("#transportTimeInput").value;
  const dep=combineDateTime(date,time);
  if(!dep){
    $("#recommendedTimePreview").innerHTML=`<strong>권장 출발시간 계산</strong><p>${meta.timeLabel}을 선택하면 자동으로 계산됩니다.</p>`;
    return;
  }
  const buffer=Math.max(0,Number($("#arrivalBufferInput").value)||0);
  const travel=Math.max(0,Number($("#travelToDepartureInput").value)||0);
  const arrive=new Date(dep.getTime()-buffer*60000);
  const leave=new Date(arrive.getTime()-travel*60000);
  $("#recommendedTimePreview").innerHTML=`
    <strong>권장 출발시간 ${escapeHtml(formatClock(leave))}</strong>
    <p>${escapeHtml(meta.timeLabel)} ${escapeHtml(formatClock(dep))} → 권장 도착 ${escapeHtml(formatClock(arrive))} → 이동 ${escapeHtml(formatDuration(travel))} 반영</p>
  `;
}

function addCustomReminder(){
  const value=Math.max(1,Number($("#customReminderValue").value)||0);
  if(!value){showToast("알림 시간을 입력해주세요.");return;}
  const unit=$("#customReminderUnit").value;
  const minutes=unit==="day"?value*1440:unit==="hour"?value*60:value;
  if(!state.customTransportReminders.includes(minutes)) state.customTransportReminders.push(minutes);
  state.customTransportReminders.sort((a,b)=>a-b);
  $("#customReminderValue").value="";
  renderCustomReminderList();
}
function renderCustomReminderList(){
  $("#customReminderList").innerHTML=state.customTransportReminders.map(min=>`
    <span class="custom-chip">${escapeHtml(formatDuration(min))} 전 <button type="button" data-remove-custom="${min}">✕</button></span>
  `).join("");
  $$("[data-remove-custom]").forEach(btn=>btn.addEventListener("click",()=>{
    state.customTransportReminders=state.customTransportReminders.filter(x=>x!==Number(btn.dataset.removeCustom));
    renderCustomReminderList();
  }));
}

function handleTransportSubmit(e){
  e.preventDefault();
  const trip=getSelectedTrip();
  const type=$("#transportTypeInput").value;
  const date=$("#transportDateInput").value;
  const time=$("#transportTimeInput").value;
  const meta=transportMeta(type);

  if(!date){$("#transportFormError").textContent="교통편 날짜를 선택해주세요.";return;}
  if(!time){$("#transportFormError").textContent=`${meta.timeLabel}을 선택해주세요.`;return;}

  const id=$("#transportIdInput").value;
  const old=id?trip.transports.find(x=>x.id===id):null;
  const data={
    id:old?.id||makeId(),
    type,
    date,
    time,
    number:$("#transportNumberInput").value.trim(),
    from:$("#transportFromInput").value.trim(),
    to:$("#transportToInput").value.trim(),
    arrivalBufferMinutes:Math.max(0,Number($("#arrivalBufferInput").value)||0),
    travelToDepartureMinutes:Math.max(0,Number($("#travelToDepartureInput").value)||0),
    memo:$("#transportMemoInput").value.trim(),
    leaveReminders:$$("#leaveReminderOptions input").filter(x=>x.checked).map(x=>Number(x.value)),
    transportReminders:$$("#transportReminderOptions input").filter(x=>x.checked).map(x=>Number(x.value)),
    customReminders:[...state.customTransportReminders],
    completed:old?.completed||false,
    createdAt:old?.createdAt||Date.now()
  };
  if(old) Object.assign(old,data); else trip.transports.push(data);
  state.selectedDate=date;
  saveData();closeTransportModal();renderTimeline();renderHome();showToast(old?"교통편을 수정했습니다.":"교통편을 추가했습니다.");
}

function openConfirm(title,message,action){
  $("#confirmTitle").textContent=title;
  $("#confirmMessage").textContent=message;
  state.confirmAction=action;
  $("#confirmModal").classList.remove("hidden");
}
function closeConfirm(){ $("#confirmModal").classList.add("hidden"); state.confirmAction=null; }

let toastTimer=null;
function showToast(message){
  const toast=$("#toast");
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),2000);
}
function resetAll(){
  state.data={trips:[],selectedTripId:null,settings:{darkMode:false}};
  state.selectedDate=null;
  saveData();applyTheme();renderAll();showScreen("home");showToast("모든 데이터를 초기화했습니다.");
}

function bindGoButtons(){
  $$("[data-go]").forEach(btn=>btn.onclick=()=>showScreen(btn.dataset.go));
}
function bindAutoClosePickers(){
  $$('input[type="date"], input[type="time"], input[type="datetime-local"]').forEach(input=>{
    input.addEventListener("change",()=>{
      // 날짜/시간을 최종 선택하면 바깥을 다시 누르지 않아도 선택을 끝냅니다.
      setTimeout(()=>input.blur(),0);
    });
  });
}

function bindImmediateTimeCommit(){
  ["scheduleTimeInput","transportTimeInput"].forEach(id=>{
    const input = $("#"+id);
    if(!input) return;
    input.addEventListener("change",()=>{
      requestAnimationFrame(()=>input.blur());
    });
  });
}

function renderAll(){
  applyTheme();
  renderHome();
  renderTripList();
  renderMyTrip();
  bindGoButtons();
}

function bindEvents(){
  $$(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.target)));
  $("#quickThemeBtn").addEventListener("click",toggleTheme);
  $("#darkModeToggle").addEventListener("change",toggleTheme);

  $("#tripForm").addEventListener("submit",handleTripSubmit);
  $("#tripPhotoBtn").addEventListener("click",()=>$("#tripPhotoInput").click());
  $("#tripPhotoInput").addEventListener("change",(e)=>handleTripPhotoChange(e.target.files?.[0]));

  $("#homeTripCard").addEventListener("click",(e)=>{
    if(e.target.closest("button")) return;
    selectTrip($("#homeTripCard").dataset.tripId,true);
  });
  $("#homeTripCard").addEventListener("keydown",(e)=>{
    if(e.key==="Enter"||e.key===" "){e.preventDefault();selectTrip($("#homeTripCard").dataset.tripId,true);}
  });
  $("#homeTripEditBtn").addEventListener("click",(e)=>{
    e.stopPropagation();
    const id=$("#homeTripEditBtn").dataset.tripId;
    prepareTripForm(id);
    showScreen("add");
    prepareTripForm(id);
  });

  $("#myTripEditBtn").addEventListener("click",()=>{
    const trip=getSelectedTrip();
    if(!trip)return;
    showScreen("add");
    prepareTripForm(trip.id);
  });

  $$(".subtab").forEach(btn=>btn.addEventListener("click",()=>{
    state.currentSubtab=btn.dataset.subtab;
    renderSubtab();
  }));

  $("#addScheduleBtn").addEventListener("click",()=>openScheduleModal());
  $("#addTransportBtn").addEventListener("click",()=>openTransportModal());

  $("#scheduleForm").addEventListener("submit",handleScheduleSubmit);
  $("#scheduleMoveTypeInput").addEventListener("change",()=>renderScheduleMoveFields($("#scheduleMoveTypeInput").value));
  $("#closeScheduleModal").addEventListener("click",closeScheduleModal);
  $("#cancelScheduleBtn").addEventListener("click",closeScheduleModal);
  $("#scheduleModal").addEventListener("click",e=>{if(e.target===$("#scheduleModal"))closeScheduleModal();});

  $("#transportForm").addEventListener("submit",handleTransportSubmit);
  $("#transportTypeInput").addEventListener("change",()=>applyTransportMetaToForm($("#transportTypeInput").value,true));
  ["transportDateInput","transportTimeInput","arrivalBufferInput","travelToDepartureInput"].forEach(id=>{
    $("#"+id).addEventListener("input",updateRecommendedPreview);
    $("#"+id).addEventListener("change",updateRecommendedPreview);
  });
  $("#addCustomReminderBtn").addEventListener("click",addCustomReminder);
  $("#closeTransportModal").addEventListener("click",closeTransportModal);
  $("#cancelTransportBtn").addEventListener("click",closeTransportModal);
  $("#transportModal").addEventListener("click",e=>{if(e.target===$("#transportModal"))closeTransportModal();});

  $("#checklistForm").addEventListener("submit",handleChecklistSubmit);

  $("#resetDataBtn").addEventListener("click",()=>openConfirm("모든 데이터를 초기화하시겠습니까?","등록한 모든 여행과 일정이 삭제됩니다.",resetAll));
  $("#confirmCancelBtn").addEventListener("click",closeConfirm);
  $("#confirmOkBtn").addEventListener("click",()=>{const action=state.confirmAction;closeConfirm();if(typeof action==="function")action();});
  $("#confirmModal").addEventListener("click",e=>{if(e.target===$("#confirmModal"))closeConfirm();});

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
      if(!$("#scheduleModal").classList.contains("hidden"))closeScheduleModal();
      if(!$("#transportModal").classList.contains("hidden"))closeTransportModal();
      if(!$("#confirmModal").classList.contains("hidden"))closeConfirm();
    }
  });
}

loadData();
bindEvents();
bindAutoClosePickers();
bindImmediateTimeCommit();
renderAll();
showScreen("home");
