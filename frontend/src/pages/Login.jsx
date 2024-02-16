import { Link, useNavigate } from "react-router-dom";
import LargeText from "../components/LargeText";
import SmallText from "../components/SmallText";
import CustomForm from "../components/CustomForm";
import FormInput from "../components/FormInput";
import Backdrop from "../components/Backdrop";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import axios from "axios";
import toast from "react-hot-toast";
import SpinnerText from "../components/SpinnerText";
import BgButton from "../components/BgButton";
import FormErrorItem from "../components/FormErrorItem";
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await axios.post("/api/v1/user/login", data);
      localStorage.setItem("loggedin", true);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data.message ?? "Server Error!");
      localStorage.removeItem("loggedin");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      navigate("/");
    }
  }, []);

  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div className="light flex flex-col justify-center gap-3">
          <LargeText>Login</LargeText>
          <SmallText>Enter your credentials to access your account</SmallText>
          <div className="flex flex-col gap-1">
            <FormInput
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
            />
            <FormError
              elementList={[
                {
                  condition: errors.email?.type == "required",
                  message: "Email is required.",
                },
                {
                  condition: errors.email?.type == "pattern",
                  message: "Please enter a valid email.",
                },
              ]}
              errorComponent={FormErrorItem}
            />
          </div>
          <div className="flex flex-col gap-1">
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
              })}
            />
            <FormError
              elementList={[
                {
                  condition: errors.password?.type == "required",
                  message: "Password is required.",
                },
              ]}
              errorComponent={FormErrorItem}
            />
          </div>
          <BgButton type="submit" disabled={isSubmitting}>
            <SpinnerText loading={isSubmitting}>Login</SpinnerText>
          </BgButton>
          <div className="flex dark:text-neutral-300 justify-center gap-1">
            Dont have an account ?
            <Link
              to={isSubmitting ? "#" : "/signup"}
              aria-disabled={isSubmitting}
              className="aria-disabled:cursor-not-allowed underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </CustomForm>
    </Backdrop>
  );
}

export default Login;
