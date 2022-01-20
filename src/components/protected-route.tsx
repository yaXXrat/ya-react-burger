import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { getRefreshToken } from "../services/auth";
import { IProtectedRoute } from "../utils/types"

const ProtectedRoute: FC<IProtectedRoute> = ({ children, path }) => {
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
