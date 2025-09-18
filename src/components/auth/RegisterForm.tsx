import { EyeInvisibleOutlined, EyeTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Radio, Upload } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import FormInput from "../form/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router";
import { axiosInstance } from "../../config/axios.config";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "seller" | null;
  gender: "male" | "female" | "other" | null;
  phone: string | null;
  address?: {
    billingAddress: string;
    shippingAddress: string;
  };
  dob?: Date | null;
  image?: any;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_])[a-zA-Z\d!@#$%^&*()_]{8,25}$/;

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().matches(passwordRegex, "Password must be 8-25 characters long and include uppercase, lowercase, number, and special characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
  role: yup.string().matches(/^(customer|seller)$/).nullable(),
  gender: yup.string().matches(/^(male|female|other)$/).nullable(),
  phone: yup.string().matches(/^(?:\+977[- ]?)?(?:\d{1,3}[- ]?)?\d{6,10}$/, "Phone number is not valid").nullable(),
  dob: yup.date().nullable(),
  image: yup.mixed(),
});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors},
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      gender: "male",
      phone: "",
      image: null,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      // console.log("Form Data:", data);

      const response = await axiosInstance.post("/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration successful:", response.data);
      
    } catch (exception: any) {
      if (exception.error) {
        Object.keys(exception.error).map((field) => {
          console.log(`Error message: ${exception.error[field]}`);
          setError(field as keyof IFormInput, { message: exception.error[field] });
        })
      }
    }
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

        {/* Image */}
        <div className="flex items-center">
          <label className="w-1/4 text-sm font-medium">Profile Image</label>
          <div className="w-3/4">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={({ file }) => field.onChange(file)}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              )}
            />
            {/* {errors?.image && <p className="text-red-500 text-sm italic">{errors?.image?.message}</p>} */}
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
