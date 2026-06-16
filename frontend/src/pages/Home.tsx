import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

// import { isLoggedIn } from "../utils/auth";


function Home() {
  const [listings, setListings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
const navigate = useNavigate();

  const categories = [
    { name: "Vehicles", icon: "🚗", color: "from-blue-500 to-blue-700" },
    { name: "Property", icon: "🏠", color: "from-green-500 to-green-700" },
    { name: "Mobiles", icon: "📱", color: "from-purple-500 to-purple-700" },
    { name: "Electronics", icon: "💻", color: "from-pink-500 to-pink-700" },
    { name: "Fashion", icon: "👕", color: "from-yellow-500 to-orange-500" },
    { name: "Food", icon: "🍔", color: "from-red-500 to-red-700" },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts"
      );

      setListings(res.data);
    } catch (error) {
      console.log(error);
    }
  };





{/* CATEGORIES */}
<div className="max-w-6xl mx-auto px-6 -mt-10">
  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

    {categories.map((cat, i) => (
      <div
        key={i}
        onClick={() => {
          const filtered = listings.filter(
            (item) => item.category === cat.name
          );

          setListings(filtered);
        }}
        className={`cursor-pointer bg-gradient-to-r ${cat.color} text-white p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300`}
      >
        <div className="text-3xl">{cat.icon}</div>
        <p className="mt-2 font-semibold">{cat.name}</p>
      </div>
    ))}

  </div>
</div>

  

  const filteredListings = listings.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">

      {/* NAVBAR */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-indigo-600">
          QuickMarket
        </h1>

        <div className="flex items-center gap-3">

          <Link to="/login">
            <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
              Register
            </button>
          </Link>
{/* 
          <Link to="/post-ad">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition shadow-md">
              + Post Ad
            </button>
          </Link> */}
          <button
  onClick={() => navigate("/login", { state: { from: "/post-ad" } })}
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition shadow-md"
>
  + Post Ad
</button>
          

           <button
    onClick={() => navigate("/profile")}
    className="text-3xl text-gray-700 hover:text-indigo-600 transition"
  >
    <FaUserCircle />
  </button>

        </div>

      </div>

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-20 text-center">

        <h1 className="text-5xl font-extrabold">
          Discover, Buy & Sell Anything
        </h1>

        <p className="mt-3 text-lg opacity-90">
          A smarter marketplace for modern Sri Lanka
        </p>

        <div className="mt-8 flex justify-center">

          <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl flex w-full max-w-xl">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search anything..."
              className="flex-1 px-4 py-3 rounded-xl outline-none text-black bg-white"
            />

            <button className="bg-black hover:bg-gray-800 transition text-white px-6 rounded-xl">
              Search
            </button>

          </div>

        </div>

      </div>

      {/* CATEGORIES */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.name.toLowerCase()}`}
            >
              <div
                className={`cursor-pointer bg-gradient-to-r ${cat.color} text-white p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300`}
              >
                <div className="text-3xl">
                  {cat.icon}
                </div>

                <p className="mt-2 font-semibold">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}

        </div>

      </div>

      {/* LISTINGS */}
      <div className="max-w-6xl mx-auto px-6 mt-14">

        <h2 className="text-2xl font-bold mb-6">
          🔥 Latest Listings
        </h2>

        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h3 className="text-2xl font-bold">
              No Ads Available
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first advertisement.
            </p>

            {/* <button
  onClick={() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/post-ad"); // logged in
    } else {
      navigate("/login"); // not logged in
    }
  }}
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
>
  + Post Ad
</button> */}

            {/* <Link to="/post-ad">
              <button className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl">
                Post Ad
              </button>
            </Link> */}
{/* <button
  onClick={() => navigate("/login", { state: { from: "/post-ad" } })}
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition shadow-md"
>
  + Post Ad
</button> */}


          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {filteredListings.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={
                      item.images?.[0] ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={item.title}
                    className="h-52 w-full object-cover hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                    {item.subCategory}
                  </span>

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-green-600 font-semibold mt-1">
                    LKR {item.price}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.category}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {item.description?.slice(0, 60)}
                    ...
                  </p>

                  <Link to={`/post/${item._id}`}>
                    <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl hover:opacity-90 transition">
                      View Details
                    </button>
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="mt-16 bg-black text-white py-10 text-center">

        <h3 className="text-xl font-bold">
          QuickMarket
        </h3>

        <p className="text-gray-400 mt-2">
          Modern marketplace experience
        </p>

      </div>

    </div>
  );
}

export default Home;