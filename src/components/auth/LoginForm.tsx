import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { Controller, useForm} from 'react-hook-form';
import FormInput from '../form/FormInput';


  interface ICredentials {
    email: string;
    password: string;
  }


const LoginForm = () => {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICredentials>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (credentials: ICredentials) => {
    console.log("Form Submitted: ", credentials);
  }

  // console.log(errors);
  

  return (
    <div>
        <h2 className="text-2xl font-bold text-teal-900 shadow-2xl text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
              <div className='w-3/4 flex flex-col'>
                <FormInput control={control} name="email" />
                {errors.email && (
                  <p className="text-red-500 text-sm ml-4 italic">
                    {errors.email.message}
                  </p>
                )}
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium mb-1 w-1/4">Password</label>
            <div className='w-3/4 flex flex-col'>
              <Controller 
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <div>
                    <Input.Password
                    id='password'
                    placeholder="input password"
                    className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 "
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    {...field}   // <-- use field here
                  />  
                  {errors.password && (<div className="text-red-500 text-sm ml-4 italic">{errors.password.message}</div>)}
                  </div>
                )}
              />  
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-between space-x-2">
            <Button type="primary"  htmlType="submit"  className="flex-1! bg-red-900! text-white! py-4! rounded-lg! hover:bg-red-950!">
                Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="flex-1! bg-teal-900! text-white! py-4! rounded-lg! hover:bg-teal-950!">
                Login
            </Button>
          </div>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
        </div>
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

    </div>
  )
}

export default LoginForm