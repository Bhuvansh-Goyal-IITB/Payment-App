import axios from "axios";
import Backdrop from "../components/Backdrop";
import { defer, useLoaderData, useNavigate, useParams } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import FormInput from "../components/FormInput";
import SimpleButton from "../components/SimpleButton";
import LargeText from "../components/LargeText";
import FormErrorItem from "../components/FormErrorItem";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import CustomForm from "../components/CustomForm";
import toast from "react-hot-toast";
import AsyncComponent from "../components/AsyncComponent";
import SpinnerLoader from "../components/SpinnerLoader";
import AuthPageError from "../components/AuthPageError";

export async function loader({ params }) {
  const user = axios
    .get(`/api/v1/user/profile/${params.userId}`)
    .then(({ data: { user } }) => user);
  return defer({ user });
}

function Transfer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useLoaderData();

  const { userId } = useParams();
  const navigate = useNavigate();

  async function onSubmit(data) {
    data.to = userId;
    try {
      await axios.post("/api/v1/account/transfer", data);
      toast.success("Transfer successfull!");
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data.message ?? "Server Error!");
    }
  }

  return (
    <Backdrop>
      <CustomForm onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <LargeText>Send Money</LargeText>
        <AsyncComponent
          resolve={user}
          fallback={<SpinnerLoader />}
          errorElement={<AuthPageError />}
        >
          {(user) => (
            <div className="flex flex-col w-full justify-center gap-4">
              <UserInfo {...user} />
              <div className="flex flex-col gap-1">
                <FormInput
                  id="amount"
                  type="text"
                  placeholder="Amount in rs"
                  {...register("amount", {
                    required: true,
                    validate: (v) => {
                      if (parseFloat(v) && (parseFloat(v) * 100) % 1 == 0) {
                        return true;
                      }
                      return false;
                    },
                  })}
                />
                <FormError
                  errorComponent={FormErrorItem}
                  elementList={[
                    {
                      condition: errors.amount?.type == "validate",
                      message:
                        "Please enter a valid amount only upto 2 decimal places.",
                    },
                    {
                      condition: errors.amount?.type == "required",
                      message: "Amount is required.",
                    },
                  ]}
                />
                <SimpleButton type="submit" disabled={isSubmitting}>
                  Transfer
                </SimpleButton>
              </div>
            </div>
          )}
        </AsyncComponent>
      </CustomForm>
    </Backdrop>
  );
}

export default Transfer;
