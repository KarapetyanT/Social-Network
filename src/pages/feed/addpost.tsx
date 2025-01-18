import { useState, useRef } from "react";
import { useHttpMutation, METHODS } from "../../helpers/useHttp";
import { IPost, IContext } from "../../helpers/types";
import { useOutletContext } from "react-router-dom";

export const AddPost = () => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const photo = useRef<null | HTMLInputElement>(null);
  const { refetch } = useOutletContext<IContext>();

  const [createPost, error, loading] = useHttpMutation<IPost>(() => {
    refetch();
  });

  const handleChange = () => {
    const upload = photo.current?.files?.[0];
    if (!upload) return;

    const reader = new FileReader();
    reader.readAsDataURL(upload);
    reader.onload = () => {
      setPreview(reader.result as string);
    };
  };

  const handlePostSubmit = () => {
    const file = photo.current?.files?.[0];
    if (!file || !content) return;

    const form = new FormData();
    form.append("photo", file);
    form.append("content", content);

    createPost("/posts", METHODS.POST, form as any);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          {showForm ? "Cancel" : "Create Post"}
        </button>

        {showForm && (
          <div className="mt-4 space-y-4">
            <input
              type="file"
              ref={photo}
              onChange={handleChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            />
            {preview && (
              <div className="flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-600 shadow-md"
                />
              </div>
            )}
            <textarea
              placeholder="What is on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={handlePostSubmit}
                className={`px-4 py-2 text-white rounded-md shadow-md transition ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
              <button
                onClick={() => {
                  setPreview("");
                  setContent("");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md shadow-md transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
