import { useForm } from "react-hook-form";
import { useHttpMutation, METHODS } from "../../../helpers/useHttp";
import { ILogin, IResponse } from "../../../helpers/types";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const UpdateLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const navigate = useNavigate();

  const [patchLogin, error] = useHttpMutation<IResponse, ILogin>(() => {
    toast.success("Your login has been updated successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  const onUpdate = (data: ILogin) => {
    patchLogin("/update/login", METHODS.PATCH, data);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">Update Login</h2>
      <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Provide password to change your Login
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            {...register("password", { required: "Please provide your old login" })}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-300"
          >
            New Login
          </label>
          <input
            id="login"
            type="text"
            className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            {
              ...register("login", {
                required: "Please provide a new login",
                minLength: {
                  value: 8,
                  message: "Login must contain at least 8 characters"
                } 
              })
            }            
          />
          {errors.login && (
            <p className="text-red-400 text-xs mt-1">{errors.login.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-sm font-medium text-gray-900 bg-blue-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Update Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
