import axios from "axios";
import { useForm } from "react-hook-form";
import { defer, useLoaderData, useNavigate } from "react-router-dom";
import Backdrop from "../components/Backdrop";
import CustomForm from "../components/CustomForm";
import LargeText from "../components/LargeText";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import FormErrorItem from "../components/FormErrorItem";
import SimpleButton from "../components/SimpleButton";
import toast from "react-hot-toast";
import AsyncComponent from "../components/AsyncComponent";
import SpinnerLoader from "../components/SpinnerLoader";
import AuthPageError from "../components/AuthPageError";

export async function loader() {
  const user = axios
    .get("/api/v1/user/profile")
    .then(({ data: { user } }) => user);

  return defer({ user });
}

function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useLoaderData();

  const navigate = useNavigate();

  async function onSubmit(data) {
    let update = {};

    if (data.firstName == user.firstName) {
      data.firstName = "";
    } else {
      update.firstName = data.firstName;
    }
    if (data.lastName == user.lastName) {
      data.lastName = "";
    } else {
      update.lastName = data.lastName;
    }

    if (data.firstName == "" && data.lastName == "" && data.password == "") {
      toast("Nothing to update");
      return;
    }

    if (data.password != "") update.password = data.password;

    try {
      await axios.put("/api/v1/user/", update);
      toast.success("Profile updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data.message ?? "Server Error!");
    }
  }
  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <div className="flex flex-col gap-8">
          <LargeText>Edit Profile</LargeText>
          <AsyncComponent
            resolve={user}
            fallback={<SpinnerLoader />}
            errorElement={<AuthPageError />}
          >
            {(user) => (
              <div className="flex flex-col w-full justify-center gap-2">
                <FormInput
                  type="email"
                  id="email"
                  defaultValue={user.email}
                  readOnly
                />
                <div className="flex flex-col gap-1">
                  <FormInput
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    defaultValue={user.firstName}
                    {...register("firstName", {
                      minLength: 3,
                      maxLength: 30,
                      pattern: /^[a-zA-z]*$/,
                    })}
                  />
                  <FormError
                    elementList={[
                      {
                        condition: errors.firstName?.type == "minLength",
                        message:
                          "First name must be between 3 and 30 characters.",
                      },
                      {
                        condition: errors.firstName?.type == "maxLength",
                        message:
                          "First name must be between 3 and 30 characters.",
                      },
                      {
                        condition: errors.firstName?.type == "pattern",
                        message: "First name can only contain alphabets.",
                      },
                    ]}
                    errorComponent={FormErrorItem}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <FormInput
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    defaultValue={user.lastName}
                    {...register("lastName", {
                      minLength: 3,
                      maxLength: 30,
                      pattern: /^[a-zA-z]*$/,
                    })}
                  />
                  <FormError
                    elementList={[
                      {
                        condition: errors.lastName?.type == "minLength",
                        message:
                          "Last name must be between 3 and 30 characters.",
                      },
                      {
                        condition: errors.lastName?.type == "maxLength",
                        message:
                          "Last name must be between 3 and 30 characters.",
                      },
                      {
                        condition: errors.lastName?.type == "pattern",
                        message: "Last name can only contain alphabets.",
                      },
                    ]}
                    errorComponent={FormErrorItem}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <FormInput
                    type="password"
                    id="password"
                    placeholder="New Password"
                    autoComplete="new-password"
                    {...register("password", {
                      minLength: 8,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
                    })}
                  />
                  <FormError
                    elementList={[
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
                    errorComponent={FormErrorItem}
                  />
                </div>
                <SimpleButton type="submit" disabled={isSubmitting}>
                  Edit
                </SimpleButton>
              </div>
            )}
          </AsyncComponent>
        </div>
      </CustomForm>
    </Backdrop>
  );
}

export default Edit;
