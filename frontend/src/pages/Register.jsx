import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthWrapper from "../components/AuthWrapper";
import InputField from "../components/InputField";

import { AuthContext } from "../context/auth-context";

function Register() {
  const navigate = useNavigate();
  const registerContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
   /* navigate page to home when login is sucess */
   useEffect(() => {
    if (registerContext.isSuccess) {
      navigate("/");
    }
  }, [registerContext.isSuccess, registerContext.user]);

  function onSubmit(data) {
    registerContext.registerAccount(data);
  }

  return (
    <AuthWrapper title="Create an account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-0 mt-6 space-y-4 w-full"
      >
        <div>
          <InputField
            {...register("name", {
              required: "Name is required.",
              maxLength: 80,
            })}
            placeholder="Jane Doe"
            label="Name"
            type="text"
            error={errors.name}
          />
          {errors.name && (
            <p role="alert" className="text-red-700 pt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <InputField
            {...register("email", { required: "Email Address is required" })}
            placeholder="jane@example.com"
            label="Email"
            type="email"
            error={errors.email}
          />
          {errors.email && (
            <p role="alert" className="text-red-700 pt-1">
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
            <p role="alert" className="text-red-700 pt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          className="block w-full rounded-lg bg-primaryColor px-5 py-3 text-sm font-medium text-white"
        />
        <p className="text-center text-base text-gray-500 mt-2">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-primaryColor underline underline-offset-2"
            href="#"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
}

export default Register;
