import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LargeText from "../components/LargeText";
import SmallText from "../components/SmallText";
import CustomForm from "../components/CustomForm";
import FormInput from "../components/FormInput";
import Backdrop from "../components/Backdrop";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import axios from "axios";

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
      navigate("/");
    } catch (error) {
      localStorage.removeItem("loggedin");
    }
  }

  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div className="flex flex-col justify-center gap-3">
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
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            <div className="flex w-full items-center justify-center gap-2">
              {isSubmitting && (
                <div className="h-4 w-4 rounded-full animate-spin border-[2px] border-t-transparent border-white" />
              )}
              Login
            </div>
          </Button>
          <div className="flex justify-center gap-1">
            Dont have an account ?
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </CustomForm>
    </Backdrop>
  );
}

export default Login;
