const ForgotPasswordForm = () => {
  return (
    <div>
      <h2 className="text-2xl text-teal-900 shadow-2xl font-bold text-center mb-6">Forgot Password</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your registered email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-950"
        >
          Send Reset Link
        </button>
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
