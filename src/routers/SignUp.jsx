import React, { useState } from "react";
import { z } from "zod";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import User from "../utils/userValidation";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { register } from "../redux/user/actions";

const NewUser = User.extend({
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleSignUp() {
    const user = NewUser.safeParse({
      email,
      password,
      repeatPassword,
    });

    if (!user.success) {
      setErrors(user.error.format());
      return;
    }

    setErrors(null);

    dispatch(register(email, password)).then(() => {
      navigate("/");
    });
  }

  return (
    <div className=" items-center mt-10 mb-10 w-3/4 ml-auto mr-auto">
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:black text-center">
          Sign Up
        </h1>
        <div className="mb-6">
          <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-center">
            Email address
          </div>
          <Input
            type="email"
            placeholder="dasha@gmail.com"
            onDataChange={setEmail}
          />
          {errors?.email && (
            <div className="text-red-400 text-center">
              {errors?.email?._errors}
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="block mb-2  text-center text-sm font-medium text-gray-900 dark:text-black">
            Password
          </div>
          <Input type="password" onDataChange={setPassword} />
          {errors?.password && (
            <div className="">
              <div className="text-red-400 text-center">
                {errors?.password?._errors}
              </div>
            </div>
          )}
        </div>
        <div className="mb-6">
          <div className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-black">
            Confirm password
          </div>
          <Input
            type="password"
            onDataChange={(value) => {
              setRepeatPassword(value);
            }}
          />
          {errors?.repeatPassword && (
            <div className="text-red-400 text-center">
              {errors?.repeatPassword?._errors}
            </div>
          )}
        </div>
      </div>
      <Button text="Sign Up" handleOnClick={handleSignUp} />
      <div>
        <Button text="Login" to="/login" />
      </div>
    </div>
  );
}
