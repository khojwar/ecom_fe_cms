import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Select, DatePicker, Radio } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../form/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { Link } from "react-router";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender: string;
  phone: string;
  address: {
    billingAddress: string;
    shippingAddress: string;
  };
  dob: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup.string().required("Role is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required(),
  address: yup.object({
    billingAddress: yup.string().required("Billing address required"),
    shippingAddress: yup.string().required("Shipping address required"),
  }),
  dob: yup.string().required("Date of Birth is required"),
});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      gender: "",
      phone: "",
      address: {
        billingAddress: "",
        shippingAddress: "",
      },
      dob: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submitted:", data);
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
            {errors.name && <div className="text-red-500 text-sm ml-4 italic">{errors.name.message}</div>}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
          <div className="w-3/4">
            <FormInput control={control} name="email" />
            {errors.email && <div className="text-red-500 text-sm ml-4 italic">{errors.email.message}</div>}
          </div>
        </div>

        {/* Password */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Password</label>
          <div className="w-3/4">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Enter password"
                  id="password"
                  className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  {...field}
                />
              )}
            />
            {errors.password && <div className="text-red-500 text-sm ml-4 italic">{errors.password.message}</div>}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Confirm Password</label>
          <div className="w-3/4">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="Confirm password"
                  id="confirmPassword"
                  className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm ml-4 italic">{errors.confirmPassword.message}</div>}
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Role</label>
          <div className="w-3/4">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} className="w-3/4">
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>
              )}
            />
            {errors.role && <div className="text-red-500 text-sm ml-4 italic">{errors.role.message}</div>}
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Gender</label>
          <div className="w-3/4">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              )}
            />
            {errors.gender && <div className="text-red-500 text-sm ml-4 italic">{errors.gender.message}</div>}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Phone</label>
          <div className="w-3/4">
            <FormInput control={control} name="phone" />
            {errors.phone && <div className="text-red-500 text-sm ml-4 italic">{errors.phone.message}</div>}
          </div>
        </div>

        {/* Billing Address */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Billing Address</label>
          <div className="w-3/4">
            <FormInput control={control} name="address.billingAddress" />
            {errors.address?.billingAddress && <div className="text-red-500 text-sm ml-4 italic">{errors.address.billingAddress.message}</div>}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Shipping Address</label>
          <div className="w-3/4">
            <FormInput control={control} name="address.shippingAddress" />
            {errors.address?.shippingAddress && <div className="text-red-500 text-sm ml-4 italic">{errors.address.shippingAddress.message}</div>}
          </div>
        </div>

        {/* DOB */}
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">DOB</label>
          <div className="w-3/4">
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className="w-3/4"
                  format="YYYY-MM-DD"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date, dateString) => field.onChange(dateString)}
                />
              )}
            />
            {errors.dob && <div className="text-red-500 text-sm ml-4 italic">{errors.dob.message}</div>}
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
        <Link to="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
