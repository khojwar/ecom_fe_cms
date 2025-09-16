import { Button } from "antd";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";

const schema = yup.object().shape({
    email: yup.string().email().required(),
  })

const ForgotPasswordForm = ({email} : Readonly<{email: string}>) => {

  const { control, handleSubmit, formState: { errors } } = useForm<{email: string}>({
    defaultValues: {
      email: email || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted: ", data);
  };

  return (
    <div>
      <h2 className="text-2xl text-teal-900 shadow-2xl font-bold text-center mb-6">Forgot Password</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
         <div className="w-3/4 flex flex-col">
            <FormInput control={control} name="email" />
            {errors.email && (<div className="text-red-500 text-sm ml-4 italic">{errors.email?.message}</div>)}
         </div>
        </div>

        <div className="text-center">
          {/* antd Button component for submit */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-900! text-white! py-2! rounded-lg! hover:bg-teal-950!"
          >
            Send Reset Link
          </Button>
        </div>
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
      </div>

      <p className="text-center text-sm">
        Remembered your password?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  )
}

export default ForgotPasswordForm;
