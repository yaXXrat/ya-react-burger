import { Redirect } from "react-router";
import { getRefreshToken } from "../services/auth";

const ProtectedRoute = (props) => {
    const loggedIn = !!getRefreshToken();
    return (<>
        { loggedIn ? props.children
        : <Redirect
            to={{
            pathname: "/login",
            state: { from: props.path },
        }}
  /> }</>);
}

export default ProtectedRoute;