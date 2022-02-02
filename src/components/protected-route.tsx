import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { getRefreshToken } from "../services/auth";
import { TProtectedRoute } from "../services/types/types"

const ProtectedRoute: FC<TProtectedRoute> = ({ children, path }) => {
    const loggedIn = !!getRefreshToken();
    return (<>
        { loggedIn ? children
        : <Redirect
            to={{
                pathname: "/login",
                state: { from: path },
            }}
        /> }</>);
  };

export default ProtectedRoute;
