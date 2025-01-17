import { IResponse, IUser } from "../../../../helpers/types";
import { useHttpQuery } from "../../../../helpers/useHttp";
import { BASE_URL } from "../../../../helpers/constants";

export const Followings = () => {
  const { data, loading } = useHttpQuery<IResponse>("/following");
  const followings: IUser[] | null = data ? (data.payload as IUser[]) : null;
  if (loading) return <p className="text-center text-gray-500 mt-4">Loading followings list...</p>;
  

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Followings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {followings &&
          followings.map((following) => (
            <div
              key={following.id}
              className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700"
            >
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-700"
                src={BASE_URL + following.picture}
                alt={`${following.name} ${following.surname}`}
              />

              <p className="mt-4 text-xl font-bold text-gray-100">{following.name}</p>
              <p className="text-md text-gray-400">{following.surname}</p>
            </div>
          ))}
      </div>
    </>
  );
};





// import { IResponse, IUser } from "../../../../helpers/types";
// import { useHttpQuery } from "../../../../helpers/useHttp";
// import { BASE_URL } from "../../../../helpers/constants";


// export const Followings = () => {
//   const { data, loading, refetch } = useHttpQuery<IResponse>("/following");
//   const followings: IUser[] | null = data ? (data.payload as IUser[]) : null;
//   if (loading) return <p>Loading followings list...</p>;
//   console.log(refetch);

//   return (
//     <>
//       <h1>Followings</h1>
//       {followings &&
//         followings.map((following) => (
//           <div key={following.id}>
//             <img
//               className="w-44 h-44 rounded-full object-cover border-indigo-500 border-solid border-4"
//               src={BASE_URL + following.picture}
//             />

//             <p>{following.name}</p>
//             <p>{following.surname}</p>
//           </div>
//         ))}
//     </>
//   );
// };
