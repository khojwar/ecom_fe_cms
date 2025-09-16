import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";

const RegisterForm = () => {
  return (
    <div>
      <h2 className="text-2xl text-teal-900 shadow-2xl font-bold text-center mb-6">Register</h2>

      <form className="space-y-4">
        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Name</label>
          {/* antd Input component for name */}
          <Input 
            type="text"
            className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Email</label>
          {/* antd Input component for email */}
          <Input
            type="email"
            className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Password</label>
          {/* antd Input component for password */}
          <Input.Password
            placeholder="input password"
            required
            className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>

        <div className="flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Confirm Password</label>
          {/* antd Input component for confirm password */}
          <Input.Password
            placeholder="input password"
            required
            className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>

        {/* antd submit button */}
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
  )
}

export default RegisterForm;
