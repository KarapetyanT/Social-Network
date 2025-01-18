import { useHttpQuery, useHttpMutation, METHODS } from "../../../helpers/useHttp";
import { IResponse, IUser } from "../../../helpers/types";
import { BASE_URL } from "../../../helpers/constants";

export const Requests = () => {
  const { data, loading, refetch } = useHttpQuery<IResponse>("/requests");
  const requests: IUser[] | null = data ? (data.payload as IUser[]) : null;

  const [makeRequest] = useHttpMutation<IResponse>(refetch);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-4">Loading requests...</p>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No requests available.</p>
    );
  }

  return  (
    <>
      <h1 className="text-3xl font-bold text-blue-400 mb-8">
        Current requests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700"
          > 
          
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-700"
              src={BASE_URL + request.user.picture}
              alt=""
            />
            <p className="mt-4 text-xl font-bold text-gray-100">
              {request.user.name}
            </p>
            <p className="text-md text-gray-400">{request.user.surname}</p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() =>
                  makeRequest(`requests/accept/${request.id}`, METHODS.PATCH)
                }
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  makeRequest(`requests/decline/${request.id}`, METHODS.PATCH)
                }
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};
