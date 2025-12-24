const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const minDateObj = new Date();
minDateObj.setFullYear(today.getFullYear() - 100);
const minDate = minDateObj.toISOString().split("T")[0];

const nameInput = document.getElementById("name");
const birthDateInput = document.getElementById("birthDate");
const birthDateRequiredFeedback = document.getElementById("birthDateRequiredFeedback");
const birthDateInvalidFeedback = document.getElementById("birthDateInvalidFeedback");
birthDateInput.max = maxDate;
birthDateInput.min = minDate;

function validateName() {
  if (nameInput.value.length >= 1) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
  }
}

nameInput.addEventListener("blur", validateName);
nameInput.addEventListener("input", validateName);
nameInput.addEventListener("change", validateName);


function validateBirthDate() {
  const inputDate = birthDateInput.value;

  birthDateRequiredFeedback.classList.add("d-none");
  birthDateInvalidFeedback.classList.add("d-none");

  if (!inputDate) {
    birthDateInput.classList.remove("is-valid");
    birthDateInput.classList.remove("is-invalid");
    birthDateInput.setCustomValidity("");
    return;
  }

  const selectedDate = new Date(inputDate);
  const min = new Date(minDate);
  const max = new Date(maxDate);

  if (selectedDate >= min && selectedDate <= max) {
    birthDateInput.classList.add("is-valid");
    birthDateInput.classList.remove("is-invalid");
    birthDateInput.setCustomValidity("");
  } else {
    birthDateInput.classList.add("is-invalid");
    birthDateInput.classList.remove("is-valid");
    birthDateInvalidFeedback.classList.remove("d-none");
    birthDateInput.setCustomValidity("正式な生年月日を入力して下さい");
  }
}

birthDateInput.addEventListener("blur", validateBirthDate);
birthDateInput.addEventListener("input", validateBirthDate);
birthDateInput.addEventListener("change", validateBirthDate);

birthDateInput.addEventListener(
  "focus",
  function () {
    if (!this.value) {
      this.value = "2000-01-01";
    }
  },
  { once: true }
);



const phoneNumberInput = document.getElementById("phoneNumber");
const phoneNumberWarning = document.getElementById("phoneNumberWarning");
const phoneNumberInvalidFeedback = document.getElementById(
  "phoneNumberInvalidFeedback"
);
const phoneDuplicateWarning = document.getElementById("phoneDuplicateWarning");
let isDuplicate = false;

function setPhoneError(errorType) {
  phoneNumberWarning.classList.add("d-none");
  phoneNumberInvalidFeedback.classList.add("d-none");
  phoneDuplicateWarning.classList.add("d-none");

  switch (errorType) {
    case "notStartWith0":
      phoneNumberWarning.classList.remove("d-none");
      phoneNumberInput.setCustomValidity("電話番号は0から始まる必要があります");
      break;
    case "invalidLength":
      phoneNumberInvalidFeedback.classList.remove("d-none");
      phoneNumberInput.setCustomValidity("0から始まる10桁または11桁の電話番号を入力してください");
      break;
    case "duplicate":
      phoneDuplicateWarning.classList.remove("d-none");
      phoneNumberInput.setCustomValidity("この電話番号は既に申し込み頂いております");
      isDuplicate = true;
      break;
    case "none":
    default:
      phoneNumberInput.setCustomValidity("");
      isDuplicate = false;
      break;
  }
}

phoneNumberInput.addEventListener("blur", async function () {
  const phoneNumber = this.value;

  if (
    phoneNumber &&
    phoneNumber.length >= 10 &&
    phoneNumber.length <= 11 &&
    phoneNumber.startsWith("0")
  ) {
    this.classList.add("is-valid");
    this.classList.remove("is-invalid");

    try {
      const response = await fetch(`/api/check-phone/${phoneNumber}`);
      const data = await response.json();

      if (data.exists) {
        setPhoneError("duplicate");
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
      } else {
        setPhoneError("none");
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
    }
  }
});






const requirementsTextarea = document.getElementById("requirements");
function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
requirementsTextarea.addEventListener("input", autoResize);
autoResize.call(requirementsTextarea);



(() => {
  "use strict";


phoneNumberInput.addEventListener("input", function () {
  let value = this.value.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  value = value.replace(/[^0-9]/g, "");

  if (value.length > 0 && !value.startsWith("0")) {
    setPhoneError("notStartWith0");
    value = "";
  } else if (value.length > 11) {
    setPhoneError("invalidLength");
    value = value.slice(0, 11);
  } else if (value.length === 10 || value.length === 11) {
    setPhoneError("none");
  } else {
    setPhoneError("none");
  }

  this.value = value;
});


  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        const phoneNumber = phoneNumberInput.value;
        const birthDate = birthDateInput.value;

        if (!birthDate) {
          birthDateRequiredFeedback.classList.remove("d-none");
          birthDateInput.classList.add("is-invalid");
        }

        if (!phoneNumber || phoneNumber.length < 10) {
          setPhoneError("invalidLength");
        } else if (phoneNumber.length > 11) {
          setPhoneError("invalidLength");
        } else if (!phoneNumber.startsWith("0")) {
          setPhoneError("notStartWith0");
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          setTimeout(() => {
            form.reset();
            form.classList.remove("was-validated");
            phoneNumberWarning.classList.add("d-none");
            phoneNumberInvalidFeedback.classList.add("d-none");
            phoneDuplicateWarning.classList.add("d-none");
            birthDateRequiredFeedback.classList.add("d-none");
            birthDateInvalidFeedback.classList.add("d-none");
          }, 0);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
