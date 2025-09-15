import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';

const LoginForm = () => {

  interface ICredentials {
    email: string;
    password: string;
  }

  const [credentials, setCredentials] = useState<ICredentials>({ 
    email: '', 
    password: '' 
  });

  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    // console.log(e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  console.log(credentials);
  

  return (
    <div>
        <h2 className="text-2xl font-bold text-teal-900 shadow-2xl text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
            <Input
              type="email"
              className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-3/4"
              placeholder="Enter your email"
              required
              name='email'
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium mb-1 w-1/4">Password</label>
            <Input.Password
              placeholder="input password"
              required
              name='password'
              onChange={handleChange}
              className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-3/4"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-between space-x-2">
            <Button type="primary" className="flex-1! bg-teal-900! text-white! py-4! rounded-lg! hover:bg-teal-950!">
                Login
            </Button>

            <Button type="primary" className="flex-1! bg-red-900! text-white! py-4! rounded-lg! hover:bg-red-950!">
                Cancel
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