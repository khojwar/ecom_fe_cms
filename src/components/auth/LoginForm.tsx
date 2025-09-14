

const LoginForm = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-teal-900 shadow-2xl text-center mb-6">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="flex-1 bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-950"
            >
              Login
            </button>

            <button
              type="button"
              className="flex-1 bg-red-900 text-white py-2 rounded-lg hover:bg-red-950"
            >
              Cancel
            </button>
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