// ===========================
// ELEMENT
// ===========================

const modal = document.querySelector("#leadModal");
const modalClose = document.querySelector("#modalClose");

const openButtons =
    document.querySelectorAll(".open-modal");

const leadForm =
    document.querySelector("#leadForm");

const formContent =
    document.querySelector("#formContent");

const successContent =
    document.querySelector("#successContent");

const successClose =
    document.querySelector("#successClose");

const submitButton =
    document.querySelector("#submitButton");

const purposeRadios =
    document.querySelectorAll(
        'input[name="purpose"]'
    );

const privacyToggle =
    document.querySelector("#privacyToggle");

const privacyContent =
    document.querySelector("#privacyContent");

const userName =
    document.querySelector("#userName");

const email =
    document.querySelector("#email");

const phone =
    document.querySelector("#phone");

const privacy =
    document.querySelector("#privacy");

const successTitle =
    document.querySelector("#successTitle");

const successDescription =
    document.querySelector(
        "#successDescription"
    );


// ===========================
// OPEN MODAL
// ===========================

openButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const purpose =
                button.dataset.purpose;

            openModal(purpose);

        }
    );

});


function openModal(purpose) {

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

    resetFormState();


    if (
        purpose === "consult" ||
        purpose === "guide" ||
        purpose === "program"
    ) {

        const targetRadio =
            document.querySelector(
                `input[name="purpose"][value="${purpose}"]`
            );

        targetRadio.checked = true;

    }

    updateSubmitButton();

}


// ===========================
// CLOSE MODAL
// ===========================

modalClose.addEventListener(
    "click",
    closeModal
);


successClose.addEventListener(
    "click",
    closeModal
);


function closeModal() {

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


// Overlay 클릭 시 닫기
modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


// ESC 키
document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


// ===========================
// PURPOSE
// ===========================

purposeRadios.forEach(function(radio) {

    radio.addEventListener(
        "change",
        updateSubmitButton
    );

});


function updateSubmitButton() {

    const selected =
        document.querySelector(
            'input[name="purpose"]:checked'
        );

    if (!selected) {
        return;
    }


    if (selected.value === "consult") {

        submitButton.innerHTML =
            `상담 신청하기 <span>→</span>`;

    }


    if (selected.value === "guide") {

        submitButton.innerHTML =
            `무료 가이드 받기 <span>→</span>`;

    }


    if (selected.value === "program") {

        submitButton.innerHTML =
            `프로그램 문의하기 <span>→</span>`;

    }

}


// ===========================
// PHONE FORMAT
// ===========================

phone.addEventListener(
    "input",
    function() {

        let value =
            phone.value.replace(
                /[^0-9]/g,
                ""
            );


        if (value.length < 4) {

            phone.value = value;

        }

        else if (value.length < 8) {

            phone.value =
                value.slice(0, 3) +
                "-" +
                value.slice(3);

        }

        else {

            phone.value =
                value.slice(0, 3) +
                "-" +
                value.slice(3, 7) +
                "-" +
                value.slice(7, 11);

        }

    }
);


// ===========================
// PRIVACY DETAIL
// ===========================

privacyToggle.addEventListener(
    "click",
    function() {

        privacyContent.classList.toggle(
            "active"
        );


        if (
            privacyContent.classList.contains(
                "active"
            )
        ) {

            privacyToggle.textContent =
                "접기";

        }

        else {

            privacyToggle.textContent =
                "자세히 보기";

        }

    }
);


// ===========================
// VALIDATION
// ===========================

function validateName() {

    const error =
        userName.nextElementSibling;

    if (
        userName.value.trim().length < 2
    ) {

        userName.classList.add("error");
        error.classList.add("show");

        return false;

    }

    userName.classList.remove("error");
    error.classList.remove("show");

    return true;

}


function validateEmail() {

    const error =
        email.nextElementSibling;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(
            email.value.trim()
        )
    ) {

        email.classList.add("error");
        error.classList.add("show");

        return false;

    }

    email.classList.remove("error");
    error.classList.remove("show");

    return true;

}


function validatePhone() {

    const error =
        phone.nextElementSibling;

    const phonePattern =
        /^010-\d{4}-\d{4}$/;


    if (
        !phonePattern.test(
            phone.value.trim()
        )
    ) {

        phone.classList.add("error");
        error.classList.add("show");

        return false;

    }

    phone.classList.remove("error");
    error.classList.remove("show");

    return true;

}


function validatePrivacy() {

    const error =
        document.querySelector(
            ".privacy-error"
        );


    if (!privacy.checked) {

        error.classList.add("show");

        return false;

    }

    error.classList.remove("show");

    return true;

}


// 입력 시 오류 제거

userName.addEventListener(
    "input",
    validateName
);

email.addEventListener(
    "input",
    validateEmail
);

phone.addEventListener(
    "input",
    validatePhone
);

privacy.addEventListener(
    "change",
    validatePrivacy
);


// ===========================
// FORM SUBMIT
// ===========================

leadForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nameValid =
            validateName();

        const emailValid =
            validateEmail();

        const phoneValid =
            validatePhone();

        const privacyValid =
            validatePrivacy();


        if (
            !nameValid ||
            !emailValid ||
            !phoneValid ||
            !privacyValid
        ) {

            return;

        }


        showSuccess();

    }
);


// ===========================
// SUCCESS SCREEN
// ===========================

function showSuccess() {

    const selected =
        document.querySelector(
            'input[name="purpose"]:checked'
        ).value;


    if (selected === "consult") {

        successTitle.textContent =
            "상담 신청이 완료되었습니다.";

        successDescription.innerHTML =
            `
            입력해주신 내용을 확인한 후<br>
            작성해주신 연락처를 통해
            상담 관련 내용을 안내드립니다.
            `;

    }


    if (selected === "guide") {

        successTitle.textContent =
            "AI 실무 가이드 신청이 완료되었습니다.";

        successDescription.innerHTML =
            `
            입력해주신 이메일로<br>
            실무에서 바로 활용할 수 있는
            AI 콘텐츠를 보내드립니다.
            `;

    }


    if (selected === "program") {

        successTitle.textContent =
            "프로그램 문의가 접수되었습니다.";

        successDescription.innerHTML =
            `
            남겨주신 내용을 확인한 후<br>
            강의 또는 프로그램 관련 정보를
            안내드립니다.
            `;

    }


    formContent.style.display = "none";

    successContent.classList.add(
        "active"
    );


    document.querySelector(".modal")
        .scrollTo({
            top: 0,
            behavior: "smooth"
        });

}


// ===========================
// RESET
// ===========================

function resetFormState() {

    leadForm.reset();

    formContent.style.display = "block";

    successContent.classList.remove(
        "active"
    );


    document
        .querySelectorAll(
            ".error-message"
        )
        .forEach(function(message) {

            message.classList.remove(
                "show"
            );

        });


    document
        .querySelectorAll(
            "input"
        )
        .forEach(function(input) {

            input.classList.remove(
                "error"
            );

        });


    privacyContent.classList.remove(
        "active"
    );

    privacyToggle.textContent =
        "자세히 보기";


    const firstPurpose =
        document.querySelector(
            'input[name="purpose"][value="consult"]'
        );

    firstPurpose.checked = true;

}