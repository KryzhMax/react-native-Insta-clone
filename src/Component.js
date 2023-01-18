import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 2,

    ...Platform.select({
      ios: {
        justifyContent: "center",
      },
      android: {
        justifyContent: "center",
      },
    }),
  },
  image: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    // resizeMode: "cover",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    width: 343,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    fontFamily: "Roboto-Reg",
    fontSize: 14,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  form: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // marginHorizontal: 40,
    width: 330,
    padding: 25,
  },
  avatarBox: {
    flexDirection: "row",
    alignItems: "flex-end",

    marginTop: -60,
    marginBottom: 32,
    marginHorizontal: "auto",
  },
  avatar: {
    top: 60,
    left: 60,
    transform: [{ translateX: -45 }, { translateY: -45 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
  },
  formHeaderContainer: {
    marginBottom: 32,
  },
  formHeaderText: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // marginHorizontal: 20,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  box: {
    marginBottom: 45,
    alignItems: "center",
  },
  signInText: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 45,
  },
  linkText: {
    display: "inline-block",
  },
});
