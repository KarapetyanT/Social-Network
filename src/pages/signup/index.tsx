import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IResponse, IUser } from "../../helpers/types";
import { METHODS, useHttpMutation } from "../../helpers/useHttp";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();
  const [postSignup, error] = useHttpMutation<IResponse, IUser>(reset);
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Join us and start your journey
        </p>
        <form
          className="mt-6"
          onSubmit={handleSubmit((data) =>
            postSignup("/signup", METHODS.POST, data)
          )}
        >
          {error && <p className="bg-red-400 p-2">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              name
            </label>
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
            <input
              {...register("name", { required: "please fill your name" })}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              surname
            </label>
            {errors.surname && (
              <p className="text-red-400">{errors.surname.message}</p>
            )}
            <input
              {...register("surname", { required: "please fill your name" })}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Login
            </label>
            {errors.login && (
              <p className="text-red-400">{errors.login.message}</p>
            )}
            <input
              {...register("login", { required: "please fill your name" })}
              placeholder="Enter your login"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
            <input
              type="password"
              {...register("password", {
                required: "please fill your name",
                minLength: {
                  value: 8,
                  message: "password must contain at least 8 characters",
                },
              })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-gray-400 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
