import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyPosts();
  }, []);






  //delete post
  const deletePost = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMyPosts(myPosts.filter((p) => p._id !== id));

    alert("Post deleted");
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};






  const loadMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/posts/my-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          My Profile
        </h1>
        

        <div className="flex gap-3">
          <button
            onClick={goHome}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-center mb-8">
          My Ads
        </h2>
        

        {myPosts.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold">No Ads Yet</h2>
            <p className="text-gray-500 mt-2">
              You haven't posted any ads yet.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={
                    post.images?.[0] ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>

                  <h2 className="font-bold text-xl mt-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {post.description}
                  </p>

                  <p className="text-green-600 font-bold text-lg mt-3">
                    LKR {post.price}
                  </p>

                  <div className="flex gap-2 mt-4">
                  <button
  onClick={() => navigate(`/post/${post._id}`)}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
>
  View
</button>

                 <button
  onClick={() => navigate(`/edit-post/${post._id}`)}
  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
>
  Edit
</button>

                 <button
  onClick={() => deletePost(post._id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  Delete
</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;