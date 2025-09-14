const RegisterForm = () => {
  return (
    <div>
      <h2 className="text-2xl text-teal-900 shadow-2xl font-bold text-center mb-6">Register</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your name"
            required
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-950"
        >
          Register
        </button>
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
