import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 2,

    ...Platform.select({
      ios: {
        justifyContent: "center",
      },
      android: {
        justifyContent: "flex-start",
      },
    }),
  },
  image: {
    flex: 1,
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
    focus: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    // shadowOffset: "0px, 4px",
    // shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  form: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "15%",
    // marginHorizontal: 40,
    width: 330,
    padding: 25,
  },
  avatarBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    marginTop: -60,
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addBtn: {
    // position: "absolute",
    // bottom: 0,
    // right: 0,
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
    // position: "relative",
    marginBottom: 45,
    alignItems: "center",
  },
  signInText: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 45,
  },
});
