import { useHttpMutation, useHttpQuery, METHODS } from "../../../helpers/useHttp";
import { IResponse, IAccount } from "../../../helpers/types";
import { useState } from "react";

export const PrivatePublic = () => {
  const { data, refetch } = useHttpQuery<IResponse>("/followers");

  const [switchAccount] = useHttpMutation<IResponse>(() => refetch());

  const account: IAccount[] | null = data ? (data.payload as IAccount[]) : null;
  const isPrivate = account && account[0]?.isPrivate;

  const [localPrivate, setLocalPrivate] = useState(isPrivate);

  const handleSwitch = () => {
    setLocalPrivate(localPrivate === 0 ? 1 : 0);
    switchAccount("/account/set", METHODS.PATCH);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-blue-400 mb-6">Privacy Settings</h2>
      <button
        onClick={handleSwitch}
        className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full hover:bg-gray-600 transition-all duration-200"
      >
        <img
          src={
            localPrivate === 0
              ? "https://cdn1.iconfinder.com/data/icons/material-core/23/lock-outline-256.png"
              : "https://cdn1.iconfinder.com/data/icons/material-core/23/lock-open-256.png"
          }
          alt={localPrivate === 0 ? "Private-Icon" : "Public-Icon"}
          className="w-8 h-8"
        />
      </button>
      <p className="mt-4 text-gray-300 text-sm">
        {localPrivate === 0 ? "Your account is private" : "Your account is public"}
      </p>
    </div>
  );
};
