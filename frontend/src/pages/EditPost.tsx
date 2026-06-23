import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [gear, setGear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineCC, setEngineCC] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      const post = res.data.find((p: any) => p._id === id);

      if (!post) return;

      setCategory(post.category || "");
      setSubCategory(post.subCategory || "");
      setTitle(post.title || "");
      setDescription(post.description || "");
      setPrice(post.price?.toString() || "");
      setCity(post.city || "");

      setPhoneNumber(post.phoneNumber || "");
      setModel(post.model || "");
      setYear(post.year?.toString() || "");
      setMileage(post.mileage?.toString() || "");
      setGear(post.gear || "");
      setFuelType(post.fuelType || "");
      setEngineCC(post.engineCC?.toString() || "");
    } catch (err) {
      console.log(err);
    }
  };

  
  const updatePost = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        {
          category,
          subCategory,
          title,
          description,
          price,
          city,
          phoneNumber,
          model,
          year,
          mileage,
          gear,
          fuelType,
          engineCC,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Updated Successfully");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("❌ Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* CARD */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edit Post
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Update your ad details
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} md:col-span-2`}
            >
              <option value="">Select Category</option>
              <option>Vehicles</option>
              <option>Property</option>
              <option>Mobiles</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Food</option>
            </select>

            <input
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Sub Category"
              className={`${inputClass} md:col-span-2`}
            />

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className={`${inputClass} md:col-span-2`}
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className={`${inputClass} md:col-span-2`}
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className={inputClass}
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className={inputClass}
            />

            {/* VEHICLE */}
            {category === "Vehicles" && (
              <>
                <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" className={inputClass} />
                <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className={inputClass} />
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone" className={inputClass} />
                <input value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage" className={inputClass} />
                <input value={engineCC} onChange={(e) => setEngineCC(e.target.value)} placeholder="Engine CC" className={inputClass} />

                <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className={inputClass}>
                  <option value="">Fuel Type</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>

                <select value={gear} onChange={(e) => setGear(e.target.value)} className={inputClass}>
                  <option value="">Gear Type</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </>
            )}

            {/* BUTTON */}
            <button
              onClick={updatePost}
              disabled={loading}
              className="md:col-span-2 w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "🚀 Update Post"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;