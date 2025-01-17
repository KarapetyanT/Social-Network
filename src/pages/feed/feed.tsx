import { AddPost } from "./addpost";
import { Gallery } from "./gallery";

export const Feed = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl">
        <Gallery />
      </div>
      <div className="w-full max-w-md">
        <AddPost />
      </div>
    </div>
  );
};
