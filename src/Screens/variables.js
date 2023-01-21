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

export const createPostInitState = {
  location: "",
  name: "",
};

export const createPostInputs = [
  {
    name: "name",
    placeholder: "Name your photo",
    placeholderTextColor: "#BDBDBD",
    // onChangeText: (onChangeText = (value, { setState, name }) => {
    //   setState((prevState) => ({
    //       ...prevState,
    //       [name]: value,
    //     })
    //   );
    // }),
  },
  {
    name: "location",
    placeholder: "Location...",
    placeholderTextColor: "#BDBDBD",
    // onChangeText: (onChangeText = (val, setState, state) => {
    //   setState((prevState) => ({
    //     ...prevState,
    //     [state]: val,
    //   }));
    // }),
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
