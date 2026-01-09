const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const minDateObj = new Date();
minDateObj.setFullYear(today.getFullYear() - 100);
const minDate = minDateObj.toISOString().split("T")[0];

const nameInput = document.getElementById("name");
const birthDateInput = document.getElementById("birthDate");
const birthDateRequiredFeedback = document.getElementById(
  "birthDateRequiredFeedback"
);
const birthDateInvalidFeedback = document.getElementById(
  "birthDateInvalidFeedback"
);
birthDateInput.max = maxDate;
birthDateInput.min = minDate;


function addValid(ele) {
  ele.classList.add("is-valid");
}
function addInvalid(ele) {
  ele.classList.add("is-invalid");
}
function removeValid(ele) {
  ele.classList.remove("is-valid");
}
function removeInvalid(ele) {
  ele.classList.remove("is-invalid");
}
function addHidden(ele) {
  ele.classList.add("d-none");
}
function removeHidden(ele) {
  ele.classList.remove("d-none");
}

function validateName() {
  if (nameInput.value.length >= 1) {
    addValid(nameInput);
    removeInvalid(nameInput);
  }else{
    addInvalid(nameInput);
    removeValid(nameInput);
  }
}

nameInput.addEventListener("blur", validateName);
nameInput.addEventListener("input", validateName);
nameInput.addEventListener("change", validateName);

function validateBirthDate() {
  const inputDate = birthDateInput.value;

  addHidden(birthDateRequiredFeedback);
  addHidden(birthDateInvalidFeedback);

  if (!inputDate) {
    removeValid(birthDateInput);
    removeInvalid(birthDateInput);
    birthDateInput.setCustomValidity("");
    return;
  }

  const selectedDate = new Date(inputDate);
  const min = new Date(minDate);
  const max = new Date(maxDate);

  if (selectedDate >= min && selectedDate <= max) {
    addValid(birthDateInput);
    removeInvalid(birthDateInput);
    birthDateInput.setCustomValidity("");
  } else {
    addInvalid(birthDateInput);
    removeValid(birthDateInput);
    removeHidden(birthDateInvalidFeedback);
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
let phoneNumberFocusCount = 0;

phoneNumberInput.addEventListener("focus", function () {
  phoneNumberFocusCount++;

  if (phoneNumberFocusCount >= 2) {
    setPhoneError("none");
    removeValid(this);
    removeInvalid(this);
    addHidden(phoneNumberWarning);
    addHidden(phoneNumberInvalidFeedback);
    addHidden(phoneDuplicateWarning);
  }
});

function setPhoneError(errorType) {
  addHidden(phoneNumberWarning);
  addHidden(phoneNumberInvalidFeedback);
  addHidden(phoneDuplicateWarning);

  switch (errorType) {
    case "notStartWith0":
      removeHidden(phoneNumberWarning);
      phoneNumberInput.setCustomValidity("電話番号は0から始まる必要があります");
      break;
    case "invalidLength":
      removeHidden(phoneNumberInvalidFeedback);
      phoneNumberInput.setCustomValidity(
        "0から始まる10桁または11桁の電話番号を入力してください"
      );
      break;
    case "duplicate":
      removeHidden(phoneDuplicateWarning);
      phoneNumberInput.setCustomValidity(
        "この電話番号は既に申し込み頂いております"
      );
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

  if (phoneNumber.length < 10) {
    setPhoneError("invalidLength");
    addInvalid(this);
  } else if (
    phoneNumber &&
    phoneNumber.length >= 10 &&
    phoneNumber.length <= 11 &&
    phoneNumber.startsWith("0")
  ) {
    addValid(this);
    removeInvalid(this);

    try {
      const response = await fetch(`/api/check-phone/${phoneNumber}`);
      const data = response.json();

      if (data.exists) {
        setPhoneError("duplicate");
        addInvalid(this);
        removeValid(this);
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
    removeValid(this);
    removeInvalid(this);


    if (value.length > 0 && !value.startsWith("0")) {
      setPhoneError("notStartWith0");
      value = "";
      addInvalid(this);
    } else if (value.length > 11) {
      setPhoneError("invalidLength");
      value = value.slice(0, 11);
      addInvalid(this);
    } else if (value.length === 10 || value.length === 11) {
      setPhoneError("none");
      addValid(this);
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
          removeHidden(birthDateRequiredFeedback);
          addInvalid(birthDateInput);
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
            addHidden(phoneNumberWarning);
            addHidden(phoneNumberInvalidFeedback);
            addHidden(phoneDuplicateWarning);
            addHidden(birthDateRequiredFeedback);
            addHidden(birthDateInvalidFeedback);
          }, 0);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
