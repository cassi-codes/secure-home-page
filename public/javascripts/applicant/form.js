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

phoneNumberInput.addEventListener("input", function (e) {
  let value = this.value.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  value = value.replace(/[^0-9]/g, "");

  if (value.length > 0 && !value.startsWith("0")) {
    phoneNumberWarning.style.display = "block";
    phoneNumberInvalidFeedback.style.display = "none";
    value = "";
  } else {
    phoneNumberWarning.style.display = "none";
  }

  if (value.length > 11) {
    phoneNumberInvalidFeedback.style.display = "block";
    phoneNumberWarning.style.display = "none";
    value = value.slice(0, 11);
  } else {
    phoneNumberInvalidFeedback.style.display = "none";
  }
  this.value = value;
  isDuplicate = false;
  phoneDuplicateWarning.style.display = "none";

  if (isDuplicate) {
    this.setCustomValidity("この電話番号は既に申し込み頂いております");
  } else {
    this.setCustomValidity("");
  }
});

phoneNumberInput.addEventListener("blur", async function () {
  const phoneNumber = this.value;
  isDuplicate = false;
  phoneDuplicateWarning.style.display = "none";


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
        isDuplicate = true;
        phoneDuplicateWarning.style.display = "block";
        this.setCustomValidity("この電話番号は既に申し込み頂いております");
      } else {
        isDuplicate = false;
        this.setCustomValidity("");
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
