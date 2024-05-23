import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthContext } from "../context/auth-context";

import AuthWrapper from "../components/AuthWrapper";
import InputField from "../components/InputField";

function Login() {
  const navigate = useNavigate();
  const loginContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* navigate page to home when login is sucess */
  useEffect(() => {
    if (loginContext.isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 100)
    }
  }, [loginContext.isSuccess, loginContext.user]);

  function onSubmit(data) {
    loginContext.loginAccount(data);
  }

  return (
    <AuthWrapper title="Welcome back">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-0 mt-6 space-y-4 w-full"
      >
        <div>
          <InputField
            {...register("email", { required: "Email Address is required" })}
            placeholder="jane@example.com"
            label="Email"
            type="email"
            error={errors.email}
          />
          {errors.email && (
            <p role="alert" className="text-red-700 py-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <InputField
            {...register("password", { required: "Password required" })}
            placeholder="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          {errors.password && (
            <p role="alert" className="text-red-700 py-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          className="block w-full rounded-lg bg-primaryColor px-5 py-3 text-sm font-medium text-white"
          value="Submit"
        />
        <p className="text-center text-base text-gray-500 mt-2">
          No account?
          <Link
            to="/register"
            className="ml-1 text-primaryColor underline underline-offset-2"
            href="#"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
}

export default Login;
