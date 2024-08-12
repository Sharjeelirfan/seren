import { auth, createUserWithEmailAndPassword } from "./firebase.js";

const signup_form = document.querySelector("#signup-form");
const signup_email = document.querySelector("#email");
const signup_password = document.querySelector("#pass");
const confirmPass = document.querySelector("#confirm-pass");
const singup = document.querySelector("#singup");
const first_name = document.querySelector("#firstname");
const last_name = document.querySelector("#lastname");

// export {first_name , last_name}
// console.log(first_name.value);
// createUserWithEmailAndPassword(auth, "sharjeel@gmail.com", "12345678");
// form.addEventListener("submit" , createUserAccount)

signup_form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await createUserWithEmailAndPassword(
    auth,
    signup_email.value,
    signup_password.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // console.log(user);

      window.location.href = "../pages/login-page.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
