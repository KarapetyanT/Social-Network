
import { useForm } from "react-hook-form";
import { useHttpMutation, METHODS } from "../../../helpers/useHttp";
import { IPassword, IResponse } from "../../../helpers/types";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const UpdatePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IPassword>();
  const navigate = useNavigate();

  const [patchPassword, error] = useHttpMutation<IResponse, IPassword>(() => {
    toast.success("Your password has been updated successfully!", {
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
      navigate("/profile");
    }, 5000);
  });

  const onUpdate = (data: IPassword) => {
    patchPassword("/update/password", METHODS.PATCH, data);
  };

  return (  
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">Update Password</h2>
      <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            {...register("oldPassword", { required: "Please provide your old password" })}
          />
          {errors.oldPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.oldPassword.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            {...register("newPassword", {
              required: "Please provide a new password",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-sm font-medium text-gray-900 bg-blue-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Update Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
