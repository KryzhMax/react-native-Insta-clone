import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    fontFamily: "Roboto-Reg",
    fontSize: 14,
  },
  form: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "15%",
    marginHorizontal: 40,

    // width: "100%",
    padding: 25,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 45,
    paddingVertical: 20,
    backgroundColor: "#000",
    borderRadius: "15%",
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
});
