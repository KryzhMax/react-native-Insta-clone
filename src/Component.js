import { StyleSheet, Platform, Dimensions } from "react-native";

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
    // width: "100%",
    marginHorizontal: 16,
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
    color: "tomato",
  },
  icons: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 70,
    paddingVertical: 5,
    borderRadius: 40,
  },
  tabBar: {
    flex: 1,
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 34,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  logout: {
    marginRight: 10,
  },
  headerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerTitleStyle: {
    fontFamily: "Roboto-Reg",
    alignItems: Platform.OS === "android" && "center",
    color: "#e5e5e5",
    fontSize: 17,
    lineHeight: 22,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 8,
    height: 240,
    // flex: 1,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  flipContainer: {
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    marginRight: 10,
    flex: 0.2,
    alignSelf: "flex-end",
  },
  flipText: {
    // fontSize: 18,
    // padding: 30,
    color: "rgba(255, 255, 255, 0.3)",
  },
  cameraButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    height: 40,
    width: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },
  photoPreviewContainer: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    top: 20,
    left: 20,
    // width: "100%",
    // height: "100%",
    width: "40%",
    height: "40%",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  reBtnContainer: {
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 32,
  },
  reBtn: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
  createPostInput: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#bdbdbd",
    paddingVertical: 15,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  createPostInputContainer: {
    marginBottom: 16,
  },
  mapStyle: {
    // flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  counter: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Reg",
    color: "#bdbdbd",
  },
});

// 1. Добавить логику на валидацию, разобраться с бокс шедоу, написать логику на показ пароля, выровнять хедер по центру на андроиде + тени на андроиде в таббаре
// 2. Написать логику на проверку пароля/имейла по базе данных
