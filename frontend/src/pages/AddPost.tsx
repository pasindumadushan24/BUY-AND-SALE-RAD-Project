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
  const [bedrooms, setBedrooms] = useState("");
const [bathrooms, setBathrooms] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  
  const submit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      
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






{category === "Mobiles" && (
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border p-3 w-full rounded-lg mb-3"
  >
    <option value="">Select Mobile Type</option>
    <option>Smartphone</option>
    <option>Feature Phone</option>
    <option>Tablet</option>
    <option>Accessories</option>
    <option>Smart Watch</option>
  </select>
)}




{category === "Electronics" && (
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border p-3 w-full rounded-lg mb-3"
  >
    <option value="">Select Electronics Type</option>
    <option>TV</option>
    <option>Laptop</option>
    <option>Desktop</option>
    <option>Camera</option>
    <option>Home Appliances</option>
    <option>Audio Devices</option>
  </select>
)}


{category === "Fashion" && (
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border p-3 w-full rounded-lg mb-3"
  >
    <option value="">Select Fashion Type</option>
    <option>Men Clothing</option>
    <option>Women Clothing</option>
    <option>Kids Wear</option>
    <option>Shoes</option>
    <option>Bags</option>
    <option>Accessories</option>
  </select>
)}


{category === "Food" && (
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border p-3 w-full rounded-lg mb-3"
  >
    <option value="">Select Food Type</option>
    <option>Fast Food</option>
    <option>Rice & Curry</option>
    <option>Snacks</option>
    <option>Beverages</option>
    <option>Bakery Items</option>
    <option>Vegetarian</option>
  </select>
)}







{category === "Property" && (
  <select
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    className="border p-3 w-full rounded-lg mb-3"
  >
    <option value="">Select Property Type</option>
    <option>House</option>
    <option>Apartment</option>
    <option>Land</option>
    <option>Commercial Building</option>
    <option>Room for Rent</option>
  </select>
)}
{category === "Property" && (
  <>

 <input
      type="number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="Phone Number"
      className="border p-3 w-full rounded-lg mb-3"
    />
<input
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Address"
  className="border p-3 w-full rounded-lg mb-3"
/>


    <input
      type="number"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
      placeholder="Bedrooms"
      className="border p-3 w-full rounded-lg mb-3"
    />

    <input
      type="number"
      value={bathrooms}
      onChange={(e) => setBathrooms(e.target.value)}
      placeholder="Bathrooms"
      className="border p-3 w-full rounded-lg mb-3"
    />
  </>
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