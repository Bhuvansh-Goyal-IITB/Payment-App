import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CustomForm from "../components/CustomForm";
import Backdrop from "../components/Backdrop";
import SmallText from "../components/SmallText";
import LargeText from "../components/LargeText";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import axios from "axios";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, formState },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await axios.post("/api/v1/user/signup", data);
      localStorage.setItem("loggedin", true);
      navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.removeItem("loggedin");
    }
  }

  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <LargeText>Sign Up</LargeText>
          <SmallText>Enter your information to create an account</SmallText>
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
              autoComplete="new-password"
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
          <div className="flex flex-col gap-1">
            <FormInput
              type="text"
              id="firstName"
              placeholder="First name"
              {...register("firstName", {
                required: true,
                minLength: 3,
                maxLength: 30,
                pattern: /^[a-zA-z]*$/,
              })}
            />
            <FormError
              elementList={[
                {
                  condition: errors.firstName?.type == "required",
                  message: "First name is required.",
                },
                {
                  condition: errors.firstName?.type == "minLength",
                  message: "First name must be between 3 and 30 characters.",
                },
                {
                  condition: errors.firstName?.type == "maxLength",
                  message: "First name must be between 3 and 30 characters.",
                },
                {
                  condition: errors.password?.type == "pattern",
                  message: "First name can only contain alphabets.",
                },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <FormInput
              type="text"
              id="lastName"
              placeholder="Last name"
              {...register("lastName", {
                required: true,
                minLength: 3,
                maxLength: 30,
                pattern: /^[a-zA-z]*$/,
              })}
            />
            <FormError
              elementList={[
                {
                  condition: errors.firstName?.type == "required",
                  message: "Last name is required.",
                },
                {
                  condition: errors.firstName?.type == "minLength",
                  message: "Last name must be between 3 and 30 characters.",
                },
                {
                  condition: errors.firstName?.type == "maxLength",
                  message: "Last name must be between 3 and 30 characters.",
                },
                {
                  condition: errors.password?.type == "pattern",
                  message: "Last name can only contain alphabets.",
                },
              ]}
            />
          </div>
          <Button type="submit">Sign Up</Button>
          <div className="flex justify-center gap-1">
            Already have an account ?
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </CustomForm>
    </Backdrop>
  );
}

export default SignUp;
