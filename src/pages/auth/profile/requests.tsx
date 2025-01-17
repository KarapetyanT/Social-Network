import {useHttpQuery, useHttpMutation, METHODS} from "../../../helpers/useHttp";
import { IResponse, IUser} from "../../../helpers/types";
import { BASE_URL } from "../../../helpers/constants";


export const Requests = () => {
  const { data, loading, refetch } = useHttpQuery<IResponse>("/requests");
  const requests: IUser[] | null = data
    ? (data.payload as IUser[])
    : null;
  const [makeRequest] = useHttpMutation<IResponse>(refetch);

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Loading requests...</p>;
  }

  if (!requests || requests.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No requests available.</p>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-extrabold text-left text-gray-100 mb-6">
        All Requests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <img
              className="w-16 h-16 rounded-full object-cover border-4 border-indigo-600"
              src={BASE_URL + request.picture}
              alt={`${request.name} ${request.surname}`}
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-100">
                {request.name} {request.surname}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => makeRequest(`requests/accept/${request.id}`, METHODS.PATCH)}
                className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
              >
                Accept
              </button>
              <button
                onClick={() => makeRequest(`requests/decline/${request.id}`, METHODS.PATCH)}
                className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


