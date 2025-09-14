const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center">
        <p className="text-base font-semibold text-red-600">404</p>
        <h1 className="mt-4 text-3xl font-bold text-red-600">
          Page not found
        </h1>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
