import { IUser, IResponse } from "../../../../helpers/types";
import { useHttpQuery } from "../../../../helpers/useHttp";
import { BASE_URL } from "../../../../helpers/constants";
import { useHttpMutation, METHODS } from "../../../../helpers/useHttp";

export const Followers = () => {
  const { data, loading, refetch } = useHttpQuery<IResponse>("/followers");
  const followers: IUser[] | null = data ? (data.payload as IUser[]) : null;

  const [makeRequest] = useHttpMutation<IResponse>(refetch);

  const handleRequest = (id: number) => {
    makeRequest(`account/follow/${id}`, METHODS.POST);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Loading followers list...
      </p>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-400 mb-8">Followers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {followers &&
          followers.map((follower) => (
            <div
              key={follower.id}
              className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700"
            >
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-700"
                src={BASE_URL + follower.picture}
              />

              <p className="mt-4 text-xl font-bold text-gray-100">
                {follower.name}
              </p>
              <p className="text-md text-gray-400">{follower.surname}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleRequest(follower.id)}
                  className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Follow Back
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
