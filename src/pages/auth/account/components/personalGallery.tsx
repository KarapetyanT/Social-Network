import { IPost } from "../../../../helpers/types";
import { BASE_URL } from "../../../../helpers/constants";
import { useHttpMutation, METHODS } from "../../../../helpers/useHttp";
import { IResponse } from "../../../../helpers/types";
import { useState } from "react";

interface IProps {
  posts: IPost[];
  isPrivate: number;
}

export const PersonalGallery = ({ posts, isPrivate}: IProps) => {
  const [personalPosts, setPersonalPosts] = useState(posts);
  
 

  if (!personalPosts?.length || isPrivate === 1) {
    return (
      <p className="text-center text-gray-1000">
        No posts available!
      </p>
    );
  }

  const [didILike] = useHttpMutation<IResponse>(() => {});

  const handleLikes = (id: number) => {
    setPersonalPosts((allposts) =>
      allposts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: !post.likes,
              likecount: post.likes
                ? (post.likecount || 0) + 1
                : (post.likecount || 0) - 1,
            }
          : post
      )
    );

    didILike(`/posts/react/${id}`, METHODS.POST);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalPosts.map((post) => (
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
              <p className="text-gray-300 text-sm">{post.title}</p>
            </div>
            <div>
              <button onClick={() => handleLikes(post.id)}>
                <img
                  src={
                    post.likes
                      ? "https://cdn4.iconfinder.com/data/icons/basic-1/64/basic_heart-64.png"
                      : "https://cdn-icons-png.freepik.com/128/833/833472.png"
                  }
                  alt={post.likes ? "Disliked" : "Liked"}
                  className="w-6 h-6 mx-4"
                />
              </button>
              <p className="text-gray-300 text-sm mx-4">
                Likes: {post.likecount || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
