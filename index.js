const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const username = document.getElementById("username");
const password = document.getElementById("password");

function generateOTP(length) {
  const characters = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += characters[Math.floor(Math.random() * characters.length)];
  }
  return OTP;
}

function sendMail() {
  const params = {
    from_name: document.getElementById("fullname").value,
    email_id: document.getElementById("email").value,
    otp: generateOTP(6),
  };

  console.log("Sending email with params:", params.email_id);

  emailjs
    .send("service_v1gpe8o", "template_67kzauk", params)
    .then(function (res) {
      alert("Success! OTP has been sent to your email. Status: " + res.status);
      console.log(res);
    })
    .catch(function (error) {
      console.error("Email send error:", error);
      alert("Failed to send OTP. Please try again later.");
    });
}

function handleSubmit(event) {
  event.preventDefault();

  // const isFormValid = Array.from(form.elements).every((element) => {
  //   return element.classList.contains("success");
  // });

  // if (isFormValid) {
  //   sendMail();
  // }
}

form.addEventListener("submit", handleSubmit);

form.addEventListener("submit", handleSubmit);

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidFullname = (fullname) => {
  const RegEx = /^[A-Za-z\s]+$/;
  return RegEx.test(fullname);
};

const isValidEmail = (email) => {
  const RegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return RegEx.test(email);
};

const isValidNumber = (mobile) => {
  const RegEx = /^[789]\d{9}$/;
  return RegEx.test(mobile);
};

const isValidUsername = (username) => {
  const RegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/;
  return RegEx.test(username);
};

const isValidPassword = (password) => {
  const RegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/;
  return RegEx.test(password);
};

const validate = () => {
  const fullnameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const mobileValue = mobile.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (fullnameValue === "") {
    setError(fullname, "Fullname is required");
  } else if (!isValidFullname(fullnameValue)) {
    setError(fullname, "Fullname contains only letters");
  } else if (fullnameValue.length < 5) {
    setError(fullname, "Fullname must contain at least 5 characters");
  } else {
    setSuccess(fullname);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Enter a valid email address");
  } else {
    setSuccess(email);
  }

  if (mobileValue === "") {
    setError(mobile, "Mobile number is required");
  } else if (!isValidNumber(mobileValue)) {
    setError(mobile, "Mobile number starts with 7,8,9 ");
  } else if (mobileValue.length !== 10) {
    setError(mobile, "Enter a valid 10-digit mobile number");
  } else {
    setSuccess(mobile);
  }

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else if (!isValidUsername(usernameValue)) {
    setError(
      username,
      "Username must contain at least one special character, one uppercase letter, one lowercase letter, and be at least 10 characters long"
    );
  } else {
    setSuccess(username);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (!isValidPassword(passwordValue)) {
    setError(
      password,
      "Password must contain at least one special character, one uppercase letter, one lowercase letter, and be at least 10 characters long"
    );
  } else {
    setSuccess(password);
  }
};
