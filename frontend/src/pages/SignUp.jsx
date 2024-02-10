import { Link } from "react-router-dom";
import Button from "../components/Button";
import CustomForm from "../components/CustomForm";
import Backdrop from "../components/Backdrop";
import SmallText from "../components/SmallText";
import LargeText from "../components/LargeText";
import FormInput from "../components/FormInput";

function SignUp() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Hello");
  }
  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <LargeText>Sign Up</LargeText>
          <SmallText>Enter your information to create an account</SmallText>
          <FormInput type="email" label="email" placeholder="Email" />
          <FormInput
            type="password"
            label="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <FormInput type="text" label="firstname" placeholder="First name" />
          <FormInput type="text" label="fastname" placeholder="Last name" />
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
