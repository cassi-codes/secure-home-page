(() => {
  "use strict";
  const form = document.querySelector(".needs-validation");
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");

  nameInput.addEventListener("blur", function () {
    if (this.value.length >= 1) {
      this.classList.add("is-valid");
      this.classList.remove("is-invalid");
    }
  });

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
