import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

const dispatch = useDispatch();

export const onLogOut = () => dispatch(authSignOutUser());
