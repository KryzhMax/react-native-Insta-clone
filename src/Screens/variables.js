export const background = require("../assets/img/background.jpeg");

export const regInitState = {
  name: "",
  email: "",
  password: "",
};

export const loginInitState = {
  email: "",
  password: "",
};

export const registrationInputs = [
  {
    type: "name",
    name: "name",
    placeholder: "Username",
    placeholderTextColor: "#BDBDBD",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email address",
    placeholderTextColor: "#BDBDBD",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    placeholderTextColor: "#BDBDBD",
  },
];
