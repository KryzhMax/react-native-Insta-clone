import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/authSelectors";
import { onAuthStateChange } from "../redux/auth/authOperations";
import useRoute from "../hooks/useRoute";

export default function Routing() {
  const dispatch = useDispatch();
  const userIsAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(onAuthStateChange());
  }, []);

  const routing = useRoute(userIsAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
