import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../form/FormInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object() .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().nullable().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  })



const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-2xl text-teal-900 shadow-2xl font-bold text-center mb-6">
        Register
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Name</label>
          <div className="w-3/4">
            <FormInput control={control} name="name" />
            {errors.name && (<div className="text-red-500 text-sm ml-4 italic">{errors.name?.message}</div>)}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
          <div className="w-3/4">
            <FormInput control={control} name="email" />
            {errors.email && (<div className="text-red-500 text-sm ml-4 italic">{errors.email?.message}</div>)}
          </div>
        </div>

        {/* Password */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">
            Password
          </label>
          <div className="w-3/4">
              <div className="flex flex-col">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="Enter password"
                      id="password"
                      className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      {...field}
                    />
                  )}
                />
                {errors.password && (<div className="text-red-500 text-sm ml-4 italic">{errors.password?.message}</div>)}
              </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">
            Confirm Password
          </label>
          <div className="w-3/4">
              <div className="flex flex-col">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="Confirm password"
                      id="confirmPassword"
                      className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (<div className="text-red-500 text-sm ml-4 italic">{errors.confirmPassword?.message}</div>)}
              </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-900! text-white! py-2! rounded-lg! hover:bg-teal-950!"
        >
          Register
        </Button>
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
      </div>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
