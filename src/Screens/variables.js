export const background = require("../assets/img/background.jpeg");

export const regInitState = {
  name: "",
  email: "",
  password: "",
  avatar: null,
};

export const loginInitState = {
  email: "",
  password: "",
};

export const createPostInitState = {
  name: "",
  location: "",
};

export const createPostInputs = [
  {
    name: "name",
    placeholder: "Name your photo",
    placeholderTextColor: "#BDBDBD",
  },
  {
    name: "location",
    placeholder: "Location...",
    placeholderTextColor: "#BDBDBD",
  },
];

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

export const switchToNextInput = (ref) => {
  ref.current.focus();
};
