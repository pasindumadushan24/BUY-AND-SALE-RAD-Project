import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ image handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  // ✅ submit function (FIXED 401 ISSUE)
  const submit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔴 FIX: no token handling
      if (!token) {
        alert("No token found. Please login again");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      images.forEach((img) => {
        formData.append("images", img);
      });

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Post Added Successfully!");

      // reset form
      setCategory("");
      setSubCategory("");
      setTitle("");
      setDescription("");
      setPrice("");
      setImages([]);
    } catch (error) {
      console.log(error);
      alert("❌ Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create New Ad
        </h1>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 w-full rounded-lg mb-3"
        >
          <option value="">Select Category</option>
          <option>Vehicles</option>
          <option>Property</option>
          <option>Mobiles</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Food</option>
        </select>

        {/* Sub category */}
        {category === "Vehicles" && (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border p-3 w-full rounded-lg mb-3"
          >
            <option value="">Select Vehicle Type</option>
            <option>Car</option>
            <option>Motorcycle</option>
            <option>Lorry</option>
            <option>Bus</option>
            <option>Van</option>
          </select>
        )}

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-3 w-full rounded-lg mb-3"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-3 w-full rounded-lg mb-3"
        />

        {/* Price */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="border p-3 w-full rounded-lg mb-3"
        />

        {/* Images */}
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mb-3"
        />

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {loading ? "Posting..." : "Post Ad"}
        </button>

      </div>
    </div>
  );
}

export default AddPost;