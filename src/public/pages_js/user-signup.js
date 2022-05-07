let myForm = document.getElementById("signup-form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let userName = document.getElementById("userName");
let passWord = document.getElementById("password");
let repeatedPass = document.getElementById("repeatedPassword");
let phone = document.getElementById("Country code");
let phoneNum = document.getElementById("phoneNum");
let city = document.getElementById("city");
let state = document.getElementById("State");
let country = document.getElementById("Country");
let zipCode = document.getElementById("zipCode");
let errorDiv = document.getElementById("error");

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      userName.value.trim() ||
      passWord.value.trim() ||
      firstName.value.trim() ||
      lastName.value.trim() ||
      email.value.trim() ||
      repeatedPass.value.trim() ||
      phone.value.trim() ||
      phoneNum.value.trim() ||
      city.value.trim() ||
      state.value.trim() ||
      country.value.trim() ||
      zipCode.value.trim()
    ) {
      error.hidden = true;
      try {
        $.post("/user/page-user-signup", {
          userName: userName.value,
          passWord: passWord.value,
          repeatedPass: repeatedPass.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          phoneNum: phoneNum.value,
          city: city.value,
          state: state.value,
          country: country.value,
          zipCode: zipCode.value,
        }).then((res) => {
          if (res.code == 400) {
            errorDiv.innerHTML = res.error;
            errorDiv.hidden = false;
            //alert(res.error);
            if (passWord !== repeatedPass) {
              errorDiv.innerHTML = res.error;
              errorDiv.hidden = false;
            }
          } else {
            location.replace("/user/private");
          }
        });
      } catch (e) {
        errorDiv.hidden = false;
        errorDiv.innerHTML = e;
      }
    } else {
      userName.value = "";
      passWord.value = "";
      repeatedPass.value = "";
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      phone.value = "";
      phoneNum.value = "";
      city.value = "";
      state.value = "";
      country.value = "";
      zipCode.value = "";
      errorDiv.hidden = false;
      errorDiv.innerHTML;
    }
  });
}
