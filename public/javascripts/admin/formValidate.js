(() => {
  "use strict";
  const form = document.querySelector(".needs-validation");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  function validateName() {
    if (nameInput.value.length >= 1) {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
    }
  }

  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("input", validateName);
  nameInput.addEventListener("change", validateName);

  passwordInput.addEventListener("blur", function () {
    if (this.value.length >= 8) {
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
    }
  });

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
