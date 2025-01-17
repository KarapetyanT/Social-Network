import { useContext } from "react";
import { AccountContext } from "./context";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IResponse } from "../../../../helpers/types";

export const ActionButton: React.FC = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("Out of provider...");

  const { account, refetch } = context;
  const { following, followsMe, requested } = account.connection;

  const [makeRequest] = useHttpMutation<IResponse>(refetch);

  const handleRequest = () => {
    makeRequest("/account/follow/" + account.id, METHODS.POST);
  };

  return (
    <button
      onClick={handleRequest}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
        following
          ? "bg-red-500 hover:bg-red-600 text-white"
          : followsMe
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : requested
          ? "bg-gray-400 hover:bg-gray-500 text-black"
          : "bg-pink-500 hover:bg-pink-600 text-white"
      }`}
    >
      {following
        ? "Unfollow"
        : followsMe
        ? "Follow back"
        : requested
        ? "Cancel"
        : "Follow"}
    </button>
  );
};
