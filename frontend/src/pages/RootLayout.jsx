import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import Sidebar from "../components/Sidebar";

function RootLayout() {
  const userAuthContext = useContext(AuthContext);

  return (
    <React.Fragment>
      {userAuthContext?.isSuccess ? (
        <div className="sm:flex sm:flex-row sm:h-screen">
          <div className="w-0 sm:w-1/6">
            <Sidebar />
          </div>
          <div className="flex-1 lg:px-0">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </React.Fragment>
  );
}

export default RootLayout;
