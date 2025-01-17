import { IPost, IResponse } from "../../helpers/types";
import { useHttpQuery, useHttpMutation, METHODS } from "../../helpers/useHttp";
import { BASE_URL } from "../../helpers/constants";
import { useState } from "react";
import Modal from "react-modal";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    background: "gray",
    borderRadius: "0.5rem", 
    padding: "1rem",
  },
};

Modal.setAppElement("#root");

export const Gallery = () => {
  const { data, loading, error, refetch } = useHttpQuery<IResponse>("/posts");
  const posts: IPost[] | null = data?.payload
    ? (data.payload as IPost[])
    : null;

  const [deletePost] = useHttpMutation<IResponse>(() => {refetch()});

  const handleDelete = (id: number) => {
    deletePost(`/posts/${id}`, METHODS.DELETE);
    setIsOpen(false);
  };

  const [open, setIsOpen] = useState(false);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!posts || !posts.length) {
    return (
      <p className="text-center text-gray-400">
        No posts available. Create a post to get started!
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">Gallery</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={BASE_URL + post.picture}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-300 text-sm truncate">{post.title}</p>
            </div>
            <div className="flex justify-end px-4 pb-4">
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-400 hover:text-red-500 transition duration-200"
              >
                <img
                  src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/trash-can-64.png"
                  alt="delete-icon"
                  className="w-6 h-6"
                />
              </button>
              <Modal
                isOpen={open}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
              >
                <div className="bg-gray-800 text-white rounded-lg p-6 space-y-4 text-center">
                  <h2 className="text-xl font-bold">
                    Are you sure you want to delete this post?
                  </h2>
                  <div className="flex justify-around space-x-4">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
