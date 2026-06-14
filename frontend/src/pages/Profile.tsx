import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [myPosts, setMyPosts] = useState<any[]>([]);

  useEffect(() => {
    loadMyPosts();
  }, []);

  const loadMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/posts/my-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 FIXED HERE
          },
        }
      );

      setMyPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Ads</h1>

      {myPosts.length === 0 ? (
        <p>No ads yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {myPosts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={post.images?.[0]}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="font-bold mt-2">{post.title}</h2>
              <p>LKR {post.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;