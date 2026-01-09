(() => {
  "use strict";
  const form = document.querySelector(".needs-validation");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  let nameFocusCount = 0;
  let passwordFocusCount = 0;

  function validateName() {
    if (nameInput.value.length >= 1) {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
    } else {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  }

  function validatePassword() {
    if (passwordInput.value.length >= 8) {
      passwordInput.classList.add("is-valid");
      passwordInput.classList.remove("is-invalid");
    } else {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
    }
  }

  nameInput.addEventListener("focus", function () {
    nameFocusCount++;
    if (nameFocusCount >= 2) {
      nameInput.classList.remove("is-valid", "is-invalid");
    }
  });

  passwordInput.addEventListener("focus", function () {
    passwordFocusCount++;
    if (passwordFocusCount >= 2) {
      passwordInput.classList.remove("is-valid", "is-invalid");
    }
  });

  nameInput.addEventListener("blur", validateName);
  passwordInput.addEventListener("blur", validatePassword);

  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );
})();
