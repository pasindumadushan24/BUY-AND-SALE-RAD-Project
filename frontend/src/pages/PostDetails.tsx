import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts"
      );

      const found = res.data.find(
        (p: any) => p._id === id
      );

      setPost(found);
    } catch (error) {
      console.log(error);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!post) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <div className="bg-white shadow-md px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl font-bold text-indigo-600">
          Post Details
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

                 <button
              onClick={() => navigate("/profile")}
              className="text-3xl text-gray-700 hover:text-indigo-600 transition"
            >
              <FaUserCircle />
            </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {post.images?.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`Post ${i + 1}`}
              className="h-60 md:h-72 w-full object-cover rounded-lg shadow"
            />
          ))}
        </div>


        {/* Details */}
        <div className="bg-white rounded-xl shadow-md p-5 mt-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {post.title}
          </h1>

          <p className="text-green-600 text-xl md:text-2xl font-semibold mt-3">
            LKR {post.price}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {post.description}
          </p>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">
                Category:
              </span>{" "}
              {post.category}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">
                Sub Category:
              </span>{" "}
              {post.subCategory}
            </p>

            {post.createdAt && (
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">Posted On:</span>{" "}
    {new Date(post.createdAt).toLocaleString()}
  </p>
)}


{post.category === "Vehicles" && post.year && (
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Year:
    </span>{" "}
    {post.year}
  </p>
)}

{post.category === "Vehicles" && post.model && ( 
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Model:
    </span>{" "}
    {post.model}
  </p>

  
)}

{post.category === "Vehicles" && post.mileage && ( 
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Mileage:
    </span>{" "}
    {post.mileage}
  </p>
)}

{post.category === "Vehicles" && post.engineCC && ( 
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Engine CC:
    </span>{" "}
    {post.engineCC}
  </p>

  
)}

{post.category === "Vehicles" && post.gear && (
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Gear:
    </span>{" "}
    {post.gear}
  </p>
)}
{post.category === "Vehicles" && post.fuelType && (
  <p className="text-sm text-gray-500 mt-1">
    <span className="font-semibold">
      Fuel Type:
    </span>{" "}
    {post.fuelType}
  </p>
)}


   {post.phoneNumber && (
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold">
                  Phone Number:
                </span>{" "}
                {post.phoneNumber}
              </p>
            )}




            {post.city && (
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold">
                  City:
                </span>{" "}
                {post.city}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;