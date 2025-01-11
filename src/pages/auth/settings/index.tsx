import { UpdateLogin } from "./update-login";
import { UpdatePassword } from "./update-password";

export const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <UpdateLogin />
        <UpdatePassword />
      </div>
    </div>
  );
};
