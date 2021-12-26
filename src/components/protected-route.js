import { Redirect } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
    const { user }  = useSelector(store => store.auth);
    return (<>
        { user.name!=="" ? props.children
        : <Redirect
            to={{
            pathname: "/login",
            state: { from: props.path },
        }}
  /> }</>);
}

export default ProtectedRoute;