import { Link } from "react-router-dom";
import Button from "../components/Button";
import LargeText from "../components/LargeText";
import SmallText from "../components/SmallText";
import CustomForm from "../components/CustomForm";
import FormInput from "../components/FormInput";
import Backdrop from "../components/Backdrop";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
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
              label="email"
              placeholder="Email"
              aria-invalid={errors.email ? "true" : "false"}
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
              label="password"
              placeholder="Password"
              autoComplete="current-password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
              })}
            />
            <FormError
              elementList={[
                {
                  condition: errors.password?.type == "required",
                  message: "Password is required.",
                },
                {
                  condition: errors.password?.type == "minLength",
                  message: "Password must be at least 8 characters long.",
                },
                {
                  condition: errors.password?.type == "pattern",
                  message:
                    "Please choose a stronger password. Try a mix of letter, numbers, and symbols.",
                },
              ]}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Login
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
