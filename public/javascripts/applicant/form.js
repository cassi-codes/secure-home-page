const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const minDateObj = new Date();
minDateObj.setFullYear(today.getFullYear() - 100);
const minDate = minDateObj.toISOString().split("T")[0];

const birthDateInput = document.getElementById("birthDate");
birthDateInput.max = maxDate;
birthDateInput.min = minDate;

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
let isMaxLength = false;

function setPhoneError(errorType) {
  phoneNumberWarning.style.display = "none";
  phoneNumberInvalidFeedback.style.display = "none";
  phoneDuplicateWarning.style.display = "none";

  switch (errorType) {
    case "notStartWith0":
      phoneNumberWarning.style.display = "block";
      phoneNumberInput.setCustomValidity("電話番号は0から始まる必要があります");
      break;
    case "invalidLength":
      phoneNumberInvalidFeedback.style.display = "block";
      phoneNumberInput.setCustomValidity("0から始まる10桁または11桁の電話番号を入力してください");
      break;
    case "duplicate":
      phoneDuplicateWarning.style.display = "block";
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

phoneNumberInput.addEventListener("input", function () {
  let value = this.value.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  value = value.replace(/[^0-9]/g, "");




  if (value.length > 0 && !value.startsWith("0")) {
    setPhoneError("notStartWith0");
    value = "";
    isMaxLength = false;
  } else if (value.length > 11) {
    setPhoneError("invalidLength");
    value = value.slice(0, 11);
    isMaxLength = true;
  } else if (isMaxLength && value.length === 11) {
    setPhoneError("invalidLength");
  } else if (value.length === 10) {
    setPhoneError("none");
    isMaxLength = false;
  } else {
    setPhoneError("none");
    isMaxLength = false;
  }

  this.value = value;
});

phoneNumberInput.addEventListener("blur", async function () {
  const phoneNumber = this.value;

  if (
    phoneNumber &&
    phoneNumber.length >= 10 &&
    phoneNumber.length <= 11 &&
    phoneNumber.startsWith("0")
  ) {
    try {
      const response = await fetch(`/api/check-phone/${phoneNumber}`);
      const data = await response.json();

      if (data.exists) {
        setPhoneError("duplicate");
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
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        const phoneNumber = phoneNumberInput.value;

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
            phoneNumberWarning.style.display = "none";
            phoneNumberInvalidFeedback.style.display = "none";
            phoneDuplicateWarning.style.display = "none";
          }, 0);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
