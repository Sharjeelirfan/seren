import { auth, signInWithEmailAndPassword } from "./firebase.js";

const login_form = document.querySelector("#login-form");
const login_email = document.querySelector("#login-email");
const login_password = document.querySelector("#login-pass");
const login_btn = document.querySelector("#login-btn");
const showorhidepass = document.querySelector("#show-pass");
const passwordimg = document.querySelector("#show-pass-img");

// const error_div = document.querySelector("#error-div");

login_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await signInWithEmailAndPassword(
    auth,
    login_email.value,
    login_password.value
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem("email", login_email.value);

      window.location.href = "../pages/seren.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // error_div.innerHTML = errorMessage
    });
});

showorhidepass.addEventListener("click", () => {
  if (login_password.type === "password") {
    login_password.type = "text";
    passwordimg.src = "../images/view.png";
  } else {
    login_password.type = "password";
    passwordimg.src = "../images/hide.png";
  }
});
