import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext();

let userdata;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSuccess, setIsSucess] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      userdata = sessionStorage.getItem("token");
      setUser(sessionStorage.getItem("user"));
      setIsSucess(!!userdata);
    };

    checkAuthStatus();
  }, []);

  function apiCallshandler(data, type) {
    setIsSucess(false);
    fetch(`${import.meta.env.VITE_BACKEND_URL}auth/${type}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message, { duration: 3000 });
          setUser(resData.user);
          sessionStorage.setItem("token", resData.token);
          sessionStorage.setItem("user", resData.user);
          setIsSucess(true);
        }
      })
      .catch((error) => {
        toast.error(error.message, { duration: 3000 });
      });
  }

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setIsSucess(null);
    // window.location.href = "/login";
  };

  const loginAccount = (data) => {
    apiCallshandler(data, "login");
  };

  const registerAccount = (data) => {
    apiCallshandler(data, "register");
  };

  return (
    <AuthContext.Provider
      value={{ user, isSuccess, loginAccount, registerAccount, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
