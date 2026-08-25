/* =========================================
    STORAGE
========================================= */

const STORAGE_KEY =
    "todoAppTodos";


/* =========================================
    STATE
========================================= */

let todos = [];

let currentScreen =
    "home";

let currentFilter =
    "all";

let searchKeyword =
    "";

let selectedDate =
    "";

let selectedTodoId =
    null;

let calendarYear =
    0;

let calendarMonth =
    0;

let openedHistoryCategory =
    null;

let importantSlideIndex =
    0;


/* =========================================
    CATEGORY
========================================= */

const categoryNames = {

    work:
        "업무",

    study:
        "공부",

    personal:
        "개인"

};


/* =========================================
    REMINDER
========================================= */

const reminderNames = {

    none:
        "알림 없음",

    10:
        "10분 전",

    30:
        "30분 전",

    60:
        "1시간 전",

    180:
        "3시간 전",

    1440:
        "하루 전"

};


/* =========================================
    DATE
========================================= */

function getDateString(date){

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        `${year}-${month}-${day}`
    );

}


function getTodayString(){

    return getDateString(
        new Date()
    );

}


/* =========================================
    DATE FORMAT
========================================= */

function formatKoreanDate(dateString){

    if(!dateString){

        return "";

    }


    const [
        year,
        month,
        day
    ] =
        dateString.split("-");


    return (
        `${year}년 ` +
        `${month}월 ` +
        `${day}일`
    );

}


function formatShortDate(dateString){

    if(!dateString){

        return "";

    }


    const [
        year,
        month,
        day
    ] =
        dateString.split("-");


    return (
        `${Number(month)}월 ` +
        `${Number(day)}일`
    );

}


/* =========================================
    TIME FORMAT
========================================= */

function formatTime(time){

    if(!time){

        return "시간 미정";

    }


    const [
        hourString,
        minute
    ] =
        time.split(":");


    const hour =
        Number(
            hourString
        );


    let displayHour =
        hour;


    let period =
        "오전";


    if(
        hour === 0
    ){

        displayHour =
            12;

    }
    else if(
        hour === 12
    ){

        period =
            "오후";

        displayHour =
            12;

    }
    else if(
        hour > 12
    ){

        period =
            "오후";

        displayHour =
            hour - 12;

    }


    return (
        `${period} ` +
        `${displayHour}:${minute}`
    );

}


/* =========================================
    COMPLETED TIME
========================================= */

function formatCompletedAt(completedAt){

    if(!completedAt){

        return "완료 시간 기록 없음";

    }


    const date =
        new Date(
            completedAt
        );


    if(
        Number.isNaN(
            date.getTime()
        )
    ){

        return "완료 시간 기록 없음";

    }


    const month =
        date.getMonth() + 1;


    const day =
        date.getDate();


    const hour =
        date.getHours();


    const minute =
        String(
            date.getMinutes()
        ).padStart(
            2,
            "0"
        );


    let period =
        "오전";


    let displayHour =
        hour;


    if(
        hour === 0
    ){

        displayHour =
            12;

    }
    else if(
        hour === 12
    ){

        period =
            "오후";

        displayHour =
            12;

    }
    else if(
        hour > 12
    ){

        period =
            "오후";

        displayHour =
            hour - 12;

    }


    return (
        `${month}월 ${day}일` +
        ` · ` +
        `${period} ${displayHour}:${minute}`
    );

}


/* =========================================
    TODO SORT

    1. 미완료 먼저
    2. 완료 일정 아래
    3. 날짜순
    4. 시간순
    5. 시간 없는 일정은 아래
========================================= */

function sortTodos(todoArray){

    return [...todoArray]
        .sort(
            function(a,b){

                if(
                    a.completed !==
                    b.completed
                ){

                    return (
                        a.completed
                            ? 1
                            : -1
                    );

                }


                if(
                    a.date !==
                    b.date
                ){

                    return (
                        a.date.localeCompare(
                            b.date
                        )
                    );

                }


                const aTime =
                    a.time ||
                    "99:99";


                const bTime =
                    b.time ||
                    "99:99";


                if(
                    aTime !==
                    bTime
                ){

                    return (
                        aTime.localeCompare(
                            bTime
                        )
                    );

                }


                return (
                    String(
                        a.createdAt ||
                        ""
                    ).localeCompare(
                        String(
                            b.createdAt ||
                            ""
                        )
                    )
                );

            }
        );

}


/* =========================================
    SAMPLE DATA
========================================= */

function createSampleTodos(){

    const today =
        getTodayString();


    const now =
        new Date()
            .toISOString();


    return [

        {
            id:
                "todo-001",

            title:
                "아침 명상 10분",

            date:
                today,

            time:
                "07:30",

            category:
                "personal",

            important:
                true,

            completed:
                false,

            completedAt:
                null,

            reminder:
                "none",

            memo:
                "",

            createdAt:
                now,

            updatedAt:
                now
        },


        {
            id:
                "todo-002",

            title:
                "팀 스탠드업 미팅",

            date:
                today,

            time:
                "10:00",

            category:
                "work",

            important:
                false,

            completed:
                true,

            completedAt:
                now,

            reminder:
                "10",

            memo:
                "",

            createdAt:
                now,

            updatedAt:
                now
        },


        {
            id:
                "todo-003",

            title:
                "디자인 검토",

            date:
                today,

            time:
                "13:00",

            category:
                "work",

            important:
                false,

            completed:
                true,

            completedAt:
                now,

            reminder:
                "30",

            memo:
                "",

            createdAt:
                now,

            updatedAt:
                now
        },


        {
            id:
                "todo-004",

            title:
                "완료시간 확인하기",

            date:
                today,

            time:
                "13:15",

            category:
                "work",

            important:
                true,

            completed:
                false,

            completedAt:
                null,

            reminder:
                "none",

            memo:
                "",

            createdAt:
                now,

            updatedAt:
                now
        },


        {
            id:
                "todo-005",

            title:
                "UX 리서치 보고서 제출",

            date:
                today,

            time:
                "16:00",

            category:
                "work",

            important:
                true,

            completed:
                false,

            completedAt:
                null,

            reminder:
                "60",

            memo:
                "최종 검토 후 제출",

            createdAt:
                now,

            updatedAt:
                now
        },


        {
            id:
                "todo-006",

            title:
                "저녁 산책",

            date:
                today,

            time:
                "20:00",

            category:
                "personal",

            important:
                true,

            completed:
                false,

            completedAt:
                null,

            reminder:
                "none",

            memo:
                "",

            createdAt:
                now,

            updatedAt:
                now
        }

    ];

}


/* =========================================
    LOAD
========================================= */

function loadTodos(){

    try{

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if(!saved){

            todos =
                createSampleTodos();


            saveTodos();


            return;

        }


        const parsed =
            JSON.parse(
                saved
            );


        if(
            !Array.isArray(
                parsed
            )
        ){

            todos =
                [];

            return;

        }


        /* 기존 데이터 호환 */
        todos =
            parsed.map(
                function(todo){

                    return {

                        ...todo,

                        title:
                            todo.title ||
                            "",

                        date:
                            todo.date ||
                            getTodayString(),

                        time:
                            todo.time ||
                            "",

                        category:
                            todo.category ||
                            "personal",

                        important:
                            Boolean(
                                todo.important
                            ),

                        completed:
                            Boolean(
                                todo.completed
                            ),

                        completedAt:
                            todo.completed
                                ? (
                                    todo.completedAt ||
                                    null
                                )
                                : null,

                        reminder:
                            todo.reminder ||
                            "none",

                        memo:
                            todo.memo ||
                            "",

                        createdAt:
                            todo.createdAt ||
                            "",

                        updatedAt:
                            todo.updatedAt ||
                            ""

                    };

                }
            );

    }
    catch(error){

        console.error(
            "데이터 불러오기 오류",
            error
        );


        todos =
            [];

    }

}


/* =========================================
    SAVE
========================================= */

function saveTodos(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            todos
        )
    );

}


/* =========================================
    HERO DATE
========================================= */

function renderTodayDate(){

    const today =
        new Date();


    const weekNames = [

        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"

    ];


    document.querySelector(
        "#hero-date"
    ).textContent =

        `${today.getMonth() + 1}월 ` +
        `${today.getDate()}일 ` +
        `${weekNames[today.getDay()]}`;


    document.querySelector(
        "#todo-date"
    ).value =
        getTodayString();

}


/* =========================================
    SCREEN
========================================= */

function changeScreen(screenName){

    currentScreen =
        screenName;


    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            function(screen){

                screen.classList.remove(
                    "is-active"
                );

            }
        );


    const target =
        document.querySelector(
            `#${screenName}-screen`
        );


    if(target){

        target.classList.add(
            "is-active"
        );

    }


    updateNavigation(
        screenName
    );


    const addButton =
        document.querySelector(
            "#floating-add"
        );


    addButton.classList.toggle(

        "is-hidden",

        screenName ===
        "add" ||

        screenName ===
        "detail"

    );


    if(
        screenName ===
        "home"
    ){

        renderHome();

    }


    if(
        screenName ===
        "calendar"
    ){

        renderCalendar();

        renderSelectedDateTodos();

    }


    if(
        screenName ===
        "history"
    ){

        renderHistory();

        renderStatistics();

    }


    window.scrollTo({
        top:
            0
    });

}


/* =========================================
    NAVIGATION
========================================= */

function updateNavigation(screenName){

    document
        .querySelectorAll(
            ".nav-button, .desktop-nav-button"
        )
        .forEach(
            function(button){

                button.classList.toggle(

                    "is-active",

                    button.dataset.go ===
                    screenName

                );

            }
        );

}


function bindNavigation(){

    document
        .querySelectorAll(
            "[data-go]"
        )
        .forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(){

                        changeScreen(
                            button.dataset.go
                        );

                    }
                );

            }
        );

}


/* =========================================
    ADD TODO
========================================= */

function bindAddForm(){

    const form =
        document.querySelector(
            "#todo-form"
        );


    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const title =
                document
                    .querySelector(
                        "#todo-title"
                    )
                    .value
                    .trim();


            const date =
                document
                    .querySelector(
                        "#todo-date"
                    )
                    .value;


            const message =
                document.querySelector(
                    "#add-form-message"
                );


            if(
                !title ||
                !date
            ){

                message.textContent =
                    "할 일 제목과 날짜를 입력해주세요.";


                return;

            }


            message.textContent =
                "";


            const now =
                new Date()
                    .toISOString();


            todos.push({

                id:
                    `todo-${Date.now()}`,

                title:
                    title,

                date:
                    date,

                time:
                    document.querySelector(
                        "#todo-time"
                    ).value,

                category:
                    document.querySelector(
                        "#todo-category"
                    ).value,

                reminder:
                    document.querySelector(
                        "#todo-reminder"
                    ).value,

                important:
                    document.querySelector(
                        "#todo-important"
                    ).checked,

                completed:
                    false,

                completedAt:
                    null,

                memo:
                    document
                        .querySelector(
                            "#todo-memo"
                        )
                        .value
                        .trim(),

                createdAt:
                    now,

                updatedAt:
                    now

            });


            saveTodos();


            form.reset();


            document.querySelector(
                "#todo-date"
            ).value =
                getTodayString();


            importantSlideIndex =
                0;


            changeScreen(
                "home"
            );

        }
    );

}


/* =========================================
    SEARCH
========================================= */

function bindSearch(){

    document
        .querySelector(
            "#todo-search"
        )
        .addEventListener(
            "input",
            function(event){

                searchKeyword =
                    event.target
                        .value
                        .trim()
                        .toLowerCase();


                renderTodoList();

            }
        );

}


/* =========================================
    FILTER
========================================= */

function bindFilters(){

    document
        .querySelectorAll(
            ".filter-button"
        )
        .forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(){

                        currentFilter =
                            button.dataset.filter;


                        document
                            .querySelectorAll(
                                ".filter-button"
                            )
                            .forEach(
                                function(item){

                                    item.classList.toggle(

                                        "is-active",

                                        item ===
                                        button

                                    );

                                }
                            );


                        renderTodoList();

                    }
                );

            }
        );

}


/* =========================================
    FILTER RESULT
========================================= */

function getFilteredTodos(){

    const today =
        getTodayString();


    let result =
        [...todos];


    if(
        currentFilter ===
        "today"
    ){

        result =
            result.filter(
                todo =>
                    todo.date ===
                    today
            );

    }


    if(
        currentFilter ===
        "upcoming"
    ){

        result =
            result.filter(
                todo =>
                    todo.date >
                    today
                    &&
                    !todo.completed
            );

    }


    if(
        currentFilter ===
        "important"
    ){

        result =
            result.filter(
                todo =>
                    todo.important
            );

    }


    if(
        currentFilter ===
        "completed"
    ){

        result =
            result.filter(
                todo =>
                    todo.completed
            );

    }


    if(
        searchKeyword !==
        ""
    ){

        result =
            result.filter(
                function(todo){

                    const title =
                        (
                            todo.title ||
                            ""
                        ).toLowerCase();


                    const memo =
                        (
                            todo.memo ||
                            ""
                        ).toLowerCase();


                    return (

                        title.includes(
                            searchKeyword
                        )
                        ||
                        memo.includes(
                            searchKeyword
                        )

                    );

                }
            );

    }


    return sortTodos(
        result
    );

}


/* =========================================
    TODAY TODOS
========================================= */

function getTodayTodos(){

    const today =
        getTodayString();


    return todos.filter(
        todo =>
            todo.date ===
            today
    );

}


/* =========================================
    PROGRESS
========================================= */

function renderProgress(){

    const todayTodos =
        getTodayTodos();


    const total =
        todayTodos.length;


    const completed =
        todayTodos.filter(
            todo =>
                todo.completed
        ).length;


    const left =
        total -
        completed;


    const percent =
        total === 0
            ? 0
            : Math.round(
                completed /
                total *
                100
            );


    document.querySelector(
        "#stat-total"
    ).textContent =
        total;


    document.querySelector(
        "#stat-done"
    ).textContent =
        completed;


    document.querySelector(
        "#stat-left"
    ).textContent =
        left;


    document.querySelector(
        "#progress-ring-text"
    ).textContent =
        `${percent}%`;


    document.querySelector(
        "#progress-ring"
    ).style.setProperty(
        "--progress",
        percent
    );

}


/* =========================================
    TODO CARD
========================================= */

function createTaskElement(todo){

    const li =
        document.createElement(
            "li"
        );


    li.className =
        "task-item";


    if(
        todo.completed
    ){

        li.classList.add(
            "completed"
        );

    }


    /* 완료 버튼 */
    const check =
        document.createElement(
            "button"
        );


    check.type =
        "button";


    check.className =
        "task-check";


    check.setAttribute(

        "aria-label",

        todo.completed
            ? "완료 취소"
            : "완료"

    );


    if(
        todo.completed
    ){

        check.classList.add(
            "is-checked"
        );


        check.textContent =
            "✓";

    }


    check.addEventListener(
        "click",
        function(){

            toggleTodo(
                todo.id
            );

        }
    );


    const content =
        document.createElement(
            "div"
        );


    content.className =
        "task-content";


    const mainRow =
        document.createElement(
            "div"
        );


    mainRow.className =
        "task-main-row";


    const title =
        document.createElement(
            "strong"
        );


    title.textContent =
        todo.title;


    mainRow.appendChild(
        title
    );


    if(
        todo.important
    ){

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "task-important";


        star.textContent =
            "★";


        mainRow.appendChild(
            star
        );

    }


    const meta =
        document.createElement(
            "p"
        );


    meta.className =
        "task-meta";


    meta.textContent =

        `${categoryNames[todo.category]} · ` +
        `${formatKoreanDate(todo.date)} · ` +
        `${formatTime(todo.time)}`;


    content.appendChild(
        mainRow
    );


    content.appendChild(
        meta
    );


    /* 알림 */
    if(
        todo.reminder &&
        todo.reminder !==
        "none"
    ){

        const reminder =
            document.createElement(
                "p"
            );


        reminder.className =
            "task-reminder";


        reminder.textContent =

            `알림 · ${
                reminderNames[
                    todo.reminder
                ]
            }`;


        content.appendChild(
            reminder
        );

    }


    /* 완료 시간 */
    if(
        todo.completed
    ){

        const completed =
            document.createElement(
                "p"
            );


        completed.className =
            "task-completed-info";


        completed.textContent =

            `완료 · ` +
            `${formatCompletedAt(
                todo.completedAt
            )}`;


        content.appendChild(
            completed
        );

    }


    /* 수정 / 삭제 */
    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "task-actions";


    const editButton =
        document.createElement(
            "button"
        );


    editButton.type =
        "button";


    editButton.className =
        "task-edit-button";


    editButton.textContent =
        "수정하기";


    editButton.addEventListener(
        "click",
        function(){

            openTodoDetail(
                todo.id
            );

        }
    );


    const deleteButton =
        document.createElement(
            "button"
        );


    deleteButton.type =
        "button";


    deleteButton.className =
        "task-delete-button";


    deleteButton.textContent =
        "삭제하기";


    deleteButton.addEventListener(
        "click",
        function(){

            selectedTodoId =
                todo.id;


            openDeleteModal();

        }
    );


    actions.appendChild(
        editButton
    );


    actions.appendChild(
        deleteButton
    );


    content.appendChild(
        actions
    );


    li.appendChild(
        check
    );


    li.appendChild(
        content
    );


    return li;

}


/* =========================================
    TODO LIST
========================================= */

function renderTodoList(){

    const list =
        document.querySelector(
            "#task-list"
        );


    const result =
        getFilteredTodos();


    list.innerHTML =
        "";


    document.querySelector(
        "#task-count"
    ).textContent =
        `${result.length}개`;


    if(
        result.length ===
        0
    ){

        const empty =
            document.createElement(
                "li"
            );


        empty.className =
            "empty-list-item";


        empty.textContent =
            "조건에 맞는 할 일이 없어요.";


        list.appendChild(
            empty
        );


        return;

    }


    result.forEach(
        function(todo){

            list.appendChild(
                createTaskElement(
                    todo
                )
            );

        }
    );

}


/* =========================================
    IMPORTANT SLIDER
========================================= */

function renderImportantTodo(){

    const track =
        document.querySelector(
            "#important-track"
        );


    const pagination =
        document.querySelector(
            "#important-pagination"
        );


    const count =
        document.querySelector(
            "#important-count"
        );


    const prevButton =
        document.querySelector(
            "#important-prev"
        );


    const nextButton =
        document.querySelector(
            "#important-next"
        );


    const importantTodos =
        sortTodos(
            getTodayTodos()
                .filter(
                    todo =>
                        todo.important &&
                        !todo.completed
                )
        );


    count.textContent =
        `${importantTodos.length}개`;


    track.innerHTML =
        "";


    pagination.innerHTML =
        "";


    if(
        importantTodos.length ===
        0
    ){

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "empty-card";


        empty.textContent =
            "오늘 중요한 일정이 없어요.";


        track.appendChild(
            empty
        );


        track.style.transform =
            "translateX(0)";


        prevButton.style.display =
            "none";


        nextButton.style.display =
            "none";


        importantSlideIndex =
            0;


        return;

    }


    if(
        importantTodos.length ===
        1
    ){

        prevButton.style.display =
            "none";


        nextButton.style.display =
            "none";

    }
    else{

        prevButton.style.display =
            "flex";


        nextButton.style.display =
            "flex";

    }


    if(
        importantSlideIndex >=
        importantTodos.length
    ){

        importantSlideIndex =
            0;

    }


    importantTodos.forEach(
        function(todo){

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "focus-card";


            card.innerHTML = `

                <div class="focus-card__top">

                    <span class="focus-badge">
                        중요
                    </span>

                    <span class="focus-star">
                        ★
                    </span>

                </div>

                <strong class="focus-title">
                    ${escapeHTML(todo.title)}
                </strong>

                <div class="focus-time">
                    ${formatTime(todo.time)}
                </div>

            `;


            card.addEventListener(
                "click",
                function(){

                    openTodoDetail(
                        todo.id
                    );

                }
            );


            track.appendChild(
                card
            );

        }
    );


    importantTodos.forEach(
        function(todo,index){

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";


            dot.className =
                "important-dot";


            dot.setAttribute(

                "aria-label",

                `${index + 1}번째 중요 일정`

            );


            dot.addEventListener(
                "click",
                function(){

                    importantSlideIndex =
                        index;


                    updateImportantSlider();

                }
            );


            pagination.appendChild(
                dot
            );

        }
    );


    updateImportantSlider();

}


/* =========================================
    IMPORTANT POSITION
========================================= */

function updateImportantSlider(){

    const track =
        document.querySelector(
            "#important-track"
        );


    const dots =
        document.querySelectorAll(
            ".important-dot"
        );


    track.style.transform =

        `translateX(-${
            importantSlideIndex *
            100
        }%)`;


    dots.forEach(
        function(dot,index){

            dot.classList.toggle(

                "is-active",

                index ===
                importantSlideIndex

            );

        }
    );

}


/* =========================================
    IMPORTANT EVENT
    수동 무한 반복
========================================= */

function bindImportantSlider(){

    const prevButton =
        document.querySelector(
            "#important-prev"
        );


    const nextButton =
        document.querySelector(
            "#important-next"
        );


    prevButton.addEventListener(
        "click",
        function(){

            const total =
                document.querySelectorAll(
                    "#important-track .focus-card"
                ).length;


            if(
                total <=
                1
            ){

                return;

            }


            importantSlideIndex--;


            if(
                importantSlideIndex <
                0
            ){

                importantSlideIndex =
                    total - 1;

            }


            updateImportantSlider();

        }
    );


    nextButton.addEventListener(
        "click",
        function(){

            const total =
                document.querySelectorAll(
                    "#important-track .focus-card"
                ).length;


            if(
                total <=
                1
            ){

                return;

            }


            importantSlideIndex++;


            if(
                importantSlideIndex >=
                total
            ){

                importantSlideIndex =
                    0;

            }


            updateImportantSlider();

        }
    );

}


/* =========================================
    TOGGLE COMPLETE
========================================= */

function toggleTodo(todoId){

    todos =
        todos.map(
            function(todo){

                if(
                    todo.id !==
                    todoId
                ){

                    return todo;

                }


                const nextCompleted =
                    !todo.completed;


                const now =
                    new Date()
                        .toISOString();


                return {

                    ...todo,

                    completed:
                        nextCompleted,

                    completedAt:
                        nextCompleted
                            ? now
                            : null,

                    updatedAt:
                        now

                };

            }
        );


    importantSlideIndex =
        0;


    saveTodos();


    renderAll();

}


/* =========================================
    OPEN DETAIL
========================================= */

function openTodoDetail(todoId){

    const todo =
        todos.find(
            item =>
                item.id ===
                todoId
        );


    if(!todo){

        return;

    }


    selectedTodoId =
        todo.id;


    document.querySelector(
        "#edit-title"
    ).value =
        todo.title;


    document.querySelector(
        "#edit-date"
    ).value =
        todo.date;


    document.querySelector(
        "#edit-time"
    ).value =
        todo.time ||
        "";


    document.querySelector(
        "#edit-category"
    ).value =
        todo.category;


    document.querySelector(
        "#edit-reminder"
    ).value =
        todo.reminder ||
        "none";


    document.querySelector(
        "#edit-important"
    ).checked =
        todo.important;


    document.querySelector(
        "#edit-completed"
    ).checked =
        todo.completed;


    document.querySelector(
        "#edit-memo"
    ).value =
        todo.memo ||
        "";


    changeScreen(
        "detail"
    );

}


/* =========================================
    EDIT
========================================= */

function bindEditForm(){

    document
        .querySelector(
            "#edit-form"
        )
        .addEventListener(
            "submit",
            function(event){

                event.preventDefault();


                const title =
                    document
                        .querySelector(
                            "#edit-title"
                        )
                        .value
                        .trim();


                const date =
                    document
                        .querySelector(
                            "#edit-date"
                        )
                        .value;


                if(
                    !title ||
                    !date
                ){

                    return;

                }


                const now =
                    new Date()
                        .toISOString();


                todos =
                    todos.map(
                        function(todo){

                            if(
                                todo.id !==
                                selectedTodoId
                            ){

                                return todo;

                            }


                            const newCompleted =
                                document.querySelector(
                                    "#edit-completed"
                                ).checked;


                            let completedAt =
                                todo.completedAt;


                            if(
                                !todo.completed &&
                                newCompleted
                            ){

                                completedAt =
                                    now;

                            }


                            if(
                                !newCompleted
                            ){

                                completedAt =
                                    null;

                            }


                            return {

                                ...todo,

                                title:
                                    title,

                                date:
                                    date,

                                time:
                                    document.querySelector(
                                        "#edit-time"
                                    ).value,

                                category:
                                    document.querySelector(
                                        "#edit-category"
                                    ).value,

                                reminder:
                                    document.querySelector(
                                        "#edit-reminder"
                                    ).value,

                                important:
                                    document.querySelector(
                                        "#edit-important"
                                    ).checked,

                                completed:
                                    newCompleted,

                                completedAt:
                                    completedAt,

                                memo:
                                    document
                                        .querySelector(
                                            "#edit-memo"
                                        )
                                        .value
                                        .trim(),

                                updatedAt:
                                    now

                            };

                        }
                    );


                saveTodos();


                selectedTodoId =
                    null;


                importantSlideIndex =
                    0;


                changeScreen(
                    "home"
                );

            }
        );

}


/* =========================================
    DELETE MODAL
========================================= */

function openDeleteModal(){

    const modal =
        document.querySelector(
            "#delete-modal"
        );


    modal.classList.add(
        "is-open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeDeleteModal(){

    const modal =
        document.querySelector(
            "#delete-modal"
        );


    modal.classList.remove(
        "is-open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================
    DELETE
========================================= */

function bindDelete(){

    document
        .querySelector(
            "#delete-todo-button"
        )
        .addEventListener(
            "click",
            openDeleteModal
        );


    document
        .querySelector(
            "#delete-cancel"
        )
        .addEventListener(
            "click",
            closeDeleteModal
        );


    document
        .querySelector(
            ".modal-overlay"
        )
        .addEventListener(
            "click",
            closeDeleteModal
        );


    document
        .querySelector(
            "#delete-confirm"
        )
        .addEventListener(
            "click",
            function(){

                todos =
                    todos.filter(
                        todo =>
                            todo.id !==
                            selectedTodoId
                    );


                saveTodos();


                selectedTodoId =
                    null;


                importantSlideIndex =
                    0;


                closeDeleteModal();


                changeScreen(
                    "home"
                );

            }
        );

}


/* =========================================
    CALENDAR INIT
========================================= */

function initializeCalendar(){

    const today =
        new Date();


    calendarYear =
        today.getFullYear();


    calendarMonth =
        today.getMonth();


    selectedDate =
        getTodayString();

}


/* =========================================
    CALENDAR
========================================= */

function renderCalendar(){

    const area =
        document.querySelector(
            "#calendar-days"
        );


    area.innerHTML =
        "";


    document.querySelector(
        "#calendar-title"
    ).textContent =

        `${calendarYear}년 ` +
        `${calendarMonth + 1}월`;


    const firstDay =
        new Date(
            calendarYear,
            calendarMonth,
            1
        ).getDay();


    const lastDate =
        new Date(
            calendarYear,
            calendarMonth + 1,
            0
        ).getDate();


    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        const blank =
            document.createElement(
                "button"
            );


        blank.disabled =
            true;


        area.appendChild(
            blank
        );

    }


    for(
        let day = 1;
        day <= lastDate;
        day++
    ){

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.textContent =
            day;


        const date =
            getDateString(
                new Date(
                    calendarYear,
                    calendarMonth,
                    day
                )
            );


        if(
            date ===
            selectedDate
        ){

            button.classList.add(
                "is-selected"
            );

        }


        if(
            todos.some(
                todo =>
                    todo.date ===
                    date
            )
        ){

            button.classList.add(
                "has-todo"
            );

        }


        button.addEventListener(
            "click",
            function(){

                selectedDate =
                    date;


                renderCalendar();


                renderSelectedDateTodos();

            }
        );


        area.appendChild(
            button
        );

    }

}


/* =========================================
    SELECTED DATE TODOS
========================================= */

function renderSelectedDateTodos(){

    document.querySelector(
        "#selected-date-title"
    ).textContent =
        formatKoreanDate(
            selectedDate
        );


    const selected =
        sortTodos(
            todos.filter(
                todo =>
                    todo.date ===
                    selectedDate
            )
        );


    document.querySelector(
        "#selected-date-count"
    ).textContent =
        `${selected.length}개`;


    const list =
        document.querySelector(
            "#selected-date-list"
        );


    list.innerHTML =
        "";


    if(
        selected.length ===
        0
    ){

        const li =
            document.createElement(
                "li"
            );


        li.innerHTML =
            "<span>등록된 일정이 없어요.</span>";


        list.appendChild(
            li
        );


        return;

    }


    selected.forEach(
        function(todo){

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML = `

                <span>
                    ${
                        todo.completed
                            ? "✓ "
                            : ""
                    }${escapeHTML(todo.title)}
                </span>

                <small>
                    ${formatTime(todo.time)}
                </small>

            `;


            li.addEventListener(
                "click",
                function(){

                    openTodoDetail(
                        todo.id
                    );

                }
            );


            list.appendChild(
                li
            );

        }
    );

}


/* =========================================
    MONTH MOVE
========================================= */

function moveMonth(direction){

    calendarMonth +=
        direction;


    if(
        calendarMonth <
        0
    ){

        calendarMonth =
            11;


        calendarYear--;

    }


    if(
        calendarMonth >
        11
    ){

        calendarMonth =
            0;


        calendarYear++;

    }


    selectedDate =
        getDateString(
            new Date(
                calendarYear,
                calendarMonth,
                1
            )
        );


    renderCalendar();


    renderSelectedDateTodos();

}


/* =========================================
    WEEK RANGE
========================================= */

function getWeekRange(){

    const now =
        new Date();


    const start =
        new Date(
            now
        );


    const currentDay =
        now.getDay();


    const diff =
        currentDay ===
        0
            ? -6
            : 1 - currentDay;


    start.setDate(
        now.getDate() +
        diff
    );


    start.setHours(
        0,
        0,
        0,
        0
    );


    const end =
        new Date(
            start
        );


    end.setDate(
        start.getDate() +
        6
    );


    end.setHours(
        23,
        59,
        59,
        999
    );


    return {
        start,
        end
    };

}


/* =========================================
    WEEK COMPLETED
========================================= */

function getWeekCompletedTodos(){

    const {
        start,
        end
    } =
        getWeekRange();


    return todos.filter(
        function(todo){

            if(
                !todo.completed ||
                !todo.completedAt
            ){

                return false;

            }


            const completedDate =
                new Date(
                    todo.completedAt
                );


            if(
                Number.isNaN(
                    completedDate.getTime()
                )
            ){

                return false;

            }


            return (

                completedDate >=
                start

                &&

                completedDate <=
                end

            );

        }
    );

}


/* =========================================
    WEEK SCHEDULED TODOS
========================================= */

function getWeekScheduledTodos(){

    const {
        start,
        end
    } =
        getWeekRange();


    return todos.filter(
        function(todo){

            if(
                !todo.date
            ){

                return false;

            }


            const target =
                new Date(
                    `${todo.date}T12:00:00`
                );


            return (

                target >=
                start

                &&

                target <=
                end

            );

        }
    );

}


/* =========================================
    HISTORY
========================================= */

function renderHistory(){

    const completed =
        getWeekCompletedTodos();


    document.querySelector(
        "#history-total"
    ).textContent =
        completed.length;


    document.querySelector(
        "#history-work"
    ).textContent =

        completed.filter(
            todo =>
                todo.category ===
                "work"
        ).length;


    document.querySelector(
        "#history-study"
    ).textContent =

        completed.filter(
            todo =>
                todo.category ===
                "study"
        ).length;


    document.querySelector(
        "#history-personal"
    ).textContent =

        completed.filter(
            todo =>
                todo.category ===
                "personal"
        ).length;


    if(
        openedHistoryCategory
    ){

        renderHistoryDetail(
            openedHistoryCategory
        );

    }

}


/* =========================================
    HISTORY DETAIL
========================================= */

function renderHistoryDetail(category){

    openedHistoryCategory =
        category;


    document.querySelector(
        "#history-detail"
    ).classList.add(
        "is-open"
    );


    document
        .querySelectorAll(
            ".history-category-card"
        )
        .forEach(
            function(card){

                card.classList.toggle(

                    "is-active",

                    card.dataset
                        .historyCategory ===
                    category

                );

            }
        );


    document.querySelector(
        "#history-detail-title"
    ).textContent =

        `완료한 ` +
        `${categoryNames[category]} 일정`;


    const completed =
        getWeekCompletedTodos()

            .filter(
                todo =>
                    todo.category ===
                    category
            )

            .sort(
                function(a,b){

                    return (
                        new Date(
                            b.completedAt
                        )
                        -
                        new Date(
                            a.completedAt
                        )
                    );

                }
            );


    const list =
        document.querySelector(
            "#history-completed-list"
        );


    list.innerHTML =
        "";


    if(
        completed.length ===
        0
    ){

        const li =
            document.createElement(
                "li"
            );


        li.innerHTML =
            "<span class='history-task-meta'>" +
            "완료한 일정이 없어요." +
            "</span>";


        list.appendChild(
            li
        );


        return;

    }


    completed.forEach(
        function(todo){

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML = `

                <strong class="history-task-title">
                    ✓ ${escapeHTML(todo.title)}
                </strong>

                <p class="history-task-meta">
                    예정 ·
                    ${formatShortDate(todo.date)}
                    ·
                    ${formatTime(todo.time)}
                </p>

                <p class="history-completed-time">
                    완료 ·
                    ${formatCompletedAt(todo.completedAt)}
                </p>

            `;


            list.appendChild(
                li
            );

        }
    );

}


/* =========================================
    HISTORY CLICK
========================================= */

function bindHistory(){

    document
        .querySelectorAll(
            ".history-category-card"
        )
        .forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(){

                        const category =
                            button.dataset
                                .historyCategory;


                        if(
                            openedHistoryCategory ===
                            category
                        ){

                            closeHistoryDetail();

                            return;

                        }


                        renderHistoryDetail(
                            category
                        );

                    }
                );

            }
        );


    document
        .querySelector(
            "#history-detail-close"
        )
        .addEventListener(
            "click",
            closeHistoryDetail
        );

}


/* =========================================
    CLOSE HISTORY
========================================= */

function closeHistoryDetail(){

    openedHistoryCategory =
        null;


    document.querySelector(
        "#history-detail"
    ).classList.remove(
        "is-open"
    );


    document
        .querySelectorAll(
            ".history-category-card"
        )
        .forEach(
            function(card){

                card.classList.remove(
                    "is-active"
                );

            }
        );

}


/* =========================================
    STATISTICS
========================================= */

function renderStatistics(){

    const weekCompleted =
        getWeekCompletedTodos();


    const weekScheduled =
        getWeekScheduledTodos();


    /* =====================================
        이번 주 완료율
    ====================================== */

    const weekRate =
        weekScheduled.length ===
        0

            ? 0

            : Math.round(
                weekCompleted.length /
                weekScheduled.length *
                100
            );


    document.querySelector(
        "#stat-week-rate"
    ).textContent =
        `${weekRate}%`;


    /* =====================================
        오늘 완료
    ====================================== */

    const today =
        getTodayString();


    const todayCompleted =
        weekCompleted.filter(
            function(todo){

                if(
                    !todo.completedAt
                ){

                    return false;

                }


                const completedDate =
                    getDateString(
                        new Date(
                            todo.completedAt
                        )
                    );


                return (
                    completedDate ===
                    today
                );

            }
        );


    document.querySelector(
        "#stat-today-completed"
    ).textContent =
        todayCompleted.length;


    /* =====================================
        카테고리 완료 개수
    ====================================== */

    const categoryCounts = {

        work:
            weekCompleted.filter(
                todo =>
                    todo.category ===
                    "work"
            ).length,

        study:
            weekCompleted.filter(
                todo =>
                    todo.category ===
                    "study"
            ).length,

        personal:
            weekCompleted.filter(
                todo =>
                    todo.category ===
                    "personal"
            ).length

    };


    /* =====================================
        최다 완료 카테고리
    ====================================== */

    const categoryEntries =
        Object.entries(
            categoryCounts
        );


    categoryEntries.sort(
        function(a,b){

            return (
                b[1] -
                a[1]
            );

        }
    );


    let topCategory =
        "없음";


    if(
        categoryEntries.length >
        0

        &&

        categoryEntries[0][1] >
        0
    ){

        topCategory =
            categoryNames[
                categoryEntries[0][0]
            ];

    }


    document.querySelector(
        "#stat-top-category"
    ).textContent =
        topCategory;


    /* =====================================
        그래프
    ====================================== */

    renderWeekdayChart(
        weekCompleted
    );


    renderCategoryChart(
        categoryCounts
    );

}


/* =========================================
    WEEKDAY CHART
========================================= */

function renderWeekdayChart(completedTodos){

    const chart =
        document.querySelector(
            "#weekday-chart"
        );


    chart.innerHTML =
        "";


    const weekNames = [

        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
        "일"

    ];


    const counts =
        [0,0,0,0,0,0,0];


    completedTodos.forEach(
        function(todo){

            if(
                !todo.completedAt
            ){

                return;

            }


            const date =
                new Date(
                    todo.completedAt
                );


            let day =
                date.getDay();


            /*
                JS
                일 = 0
                월 = 1

                배열
                월 = 0
                ...
                일 = 6
            */

            const index =
                day === 0
                    ? 6
                    : day - 1;


            counts[index]++;

        }
    );


    const max =
        Math.max(
            ...counts,
            1
        );


    counts.forEach(
        function(count,index){

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "weekday-bar-item";


            const percent =
                count === 0
                    ? 0
                    : (
                        count /
                        max *
                        100
                    );


            item.innerHTML = `

                <span class="weekday-value">
                    ${count}
                </span>

                <div class="weekday-bar-track">

                    <span
                        class="weekday-bar-fill"
                        style="height:${percent}%"
                    ></span>

                </div>

                <span class="weekday-label">
                    ${weekNames[index]}
                </span>

            `;


            chart.appendChild(
                item
            );

        }
    );

}


/* =========================================
    CATEGORY CHART
========================================= */

function renderCategoryChart(categoryCounts){

    const chart =
        document.querySelector(
            "#category-chart"
        );


    chart.innerHTML =
        "";


    const categories = [

        {
            key:
                "work",

            name:
                "업무"
        },

        {
            key:
                "study",

            name:
                "공부"
        },

        {
            key:
                "personal",

            name:
                "개인"
        }

    ];


    const values =
        categories.map(
            item =>
                categoryCounts[
                    item.key
                ]
        );


    const max =
        Math.max(
            ...values,
            1
        );


    categories.forEach(
        function(category){

            const count =
                categoryCounts[
                    category.key
                ];


            const percent =
                count === 0
                    ? 0
                    : (
                        count /
                        max *
                        100
                    );


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "category-bar-item";


            item.innerHTML = `

                <span class="category-bar-label">
                    ${category.name}
                </span>

                <div class="category-bar-track">

                    <span
                        class="category-bar-fill"
                        style="width:${percent}%"
                    ></span>

                </div>

                <span class="category-bar-value">
                    ${count}
                </span>

            `;


            chart.appendChild(
                item
            );

        }
    );

}


/* =========================================
    RESET
========================================= */

function bindReset(){

    document
        .querySelector(
            "#reset-data-button"
        )
        .addEventListener(
            "click",
            function(){

                const result =
                    confirm(
                        "모든 데이터를 초기화할까요?"
                    );


                if(
                    !result
                ){

                    return;

                }


                localStorage.removeItem(
                    STORAGE_KEY
                );


                todos =
                    createSampleTodos();


                importantSlideIndex =
                    0;


                openedHistoryCategory =
                    null;


                saveTodos();


                closeHistoryDetail();


                renderAll();


                changeScreen(
                    "home"
                );

            }
        );

}


/* =========================================
    ESCAPE HTML
========================================= */

function escapeHTML(text){

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text ||
        "";


    return div.innerHTML;

}


/* =========================================
    HOME
========================================= */

function renderHome(){

    renderProgress();


    renderImportantTodo();


    renderTodoList();

}


/* =========================================
    RENDER ALL
========================================= */

function renderAll(){

    renderHome();


    renderCalendar();


    renderSelectedDateTodos();


    renderHistory();


    renderStatistics();

}


/* =========================================
    EVENTS
========================================= */

function bindEvents(){

    bindNavigation();


    bindAddForm();


    bindEditForm();


    bindDelete();


    bindSearch();


    bindFilters();


    bindImportantSlider();


    bindHistory();


    bindReset();


    document
        .querySelector(
            "#detail-back"
        )
        .addEventListener(
            "click",
            function(){

                selectedTodoId =
                    null;


                changeScreen(
                    "home"
                );

            }
        );


    document
        .querySelector(
            "#calendar-prev"
        )
        .addEventListener(
            "click",
            function(){

                moveMonth(
                    -1
                );

            }
        );


    document
        .querySelector(
            "#calendar-next"
        )
        .addEventListener(
            "click",
            function(){

                moveMonth(
                    1
                );

            }
        );


    document.addEventListener(
        "keydown",
        function(event){

            if(
                event.key ===
                "Escape"
            ){

                closeDeleteModal();

            }

        }
    );

}


/* =========================================
    INIT
========================================= */

function init(){

    loadTodos();


    initializeCalendar();


    renderTodayDate();


    bindEvents();


    renderAll();


    changeScreen(
        "home"
    );

}


init();