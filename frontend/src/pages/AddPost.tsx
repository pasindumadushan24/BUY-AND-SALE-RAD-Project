import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function AddPost() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [year, setYear] = useState("");
// const [mileage, setMileage] = useState("");
// const [model, setModel] = useState("");
// const [gear, setGear] = useState("");
// const [fuelType, setFuelType] = useState("");
// const [engineCC, setEngineCC] = useState("");


  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  


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


   const goHome = () => {
    navigate("/");
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
      formData.append("city", city);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("phoneNumber", phoneNumber);
      formData.append("year", year);



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

  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-10 px-4">
    <div className="max-w-3xl mx-auto">
    {/* NAVBAR */}
<div className="bg-white shadow-md px-6 py-4 flex items-center justify-between mb-6 rounded-xl">

  <h1 className="text-2xl font-bold text-indigo-600">
    QuickMarket
  </h1>

  <div className="flex items-center gap-3">

    <button
            onClick={goHome}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium"
          >
            Home
          </button>

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
     <button
    onClick={() => navigate("/profile")}
    className="text-3xl text-gray-700 hover:text-indigo-600 transition"
  >
    <FaUserCircle />
    
  </button>
  </div>
</div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
      

        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Create New Ad
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sell anything on QuickMarket
        </p>








        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Select Category</option>
          <option>Vehicles</option>
          <option>Property</option>
          <option>Mobiles</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Food</option>
        </select>

   {category === "Vehicles" && (
  <>
    <select
      value={subCategory}
      onChange={(e) => setSubCategory(e.target.value)}
      className="w-full border border-gray-300 p-4 rounded-xl mb-4"
    >
      <option value="">Select Vehicle Type</option>
      <option>Car</option>
      <option>Motorcycle</option>
      <option>Lorry</option>
      <option>Bus</option>
      <option>Van</option>
    </select>

    <input
      type="number"
      value={year}
      onChange={(e) => setYear(e.target.value)}
      placeholder="Year"
      className="w-full border border-gray-300 p-4 rounded-xl mb-4"
    />

    <input
      type="number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="Phone Number"
      className="w-full border border-gray-300 p-4 rounded-xl mb-4"
    />
  </>
)}
        

        {/* Mobiles */}
        {category === "Mobiles" && (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Mobile Type</option>
            <option>Smartphone</option>
            <option>Feature Phone</option>
            <option>Tablet</option>
            <option>Accessories</option>
            <option>Smart Watch</option>
          </select>
        )}

        {/* Electronics */}
        {category === "Electronics" && (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
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

        {/* Fashion */}
        {category === "Fashion" && (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
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

        {/* Food */}
        {category === "Food" && (
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
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

        {/* Property */}
        {category === "Property" && (
          <>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Land</option>
              <option>Commercial Building</option>
              <option>Room for Rent</option>
            </select>

            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-4 rounded-xl mb-4"
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full border border-gray-300 p-4 rounded-xl mb-4"
            />

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="Bedrooms"
                className="border border-gray-300 p-4 rounded-xl"
              />



              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder="Bathrooms"
                className="border border-gray-300 p-4 rounded-xl"
              />
            </div>
          </>
        )}

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border border-gray-300 p-4 rounded-xl mb-4"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={5}
          className="w-full border border-gray-300 p-4 rounded-xl mb-4"
        />



        {/* Price */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full border border-gray-300 p-4 rounded-xl mb-4"
        />

      {/* Images */}
<div className="border-2 border-dashed border-indigo-300 rounded-xl p-5 mb-6 bg-indigo-50">
  <input
    type="file"
    multiple
    onChange={handleImageChange}
    className="w-full"
  />
</div>

<input
  type="text"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  placeholder="City"
    className="w-full border border-gray-300 p-4 rounded-xl mb-4"
/>


{/* Image Preview */}
{images.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {images.map((img, index) => (
      <div
        key={index}
        className="relative rounded-xl overflow-hidden shadow-md"
      >
        <img
          src={URL.createObjectURL(img)}
          alt={`preview-${index}`}
          className="w-full h-32 object-cover"
        />

        <button
          type="button"
          onClick={() => {
            const updated = images.filter(
              (_, i) => i !== index
            );
            setImages(updated);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


{/* Button */}
<button
  onClick={submit}
  disabled={loading}
  className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600"
>
  {loading ? "Posting..." : "🚀 Post Ad"}
</button>

      </div>
    </div>
  </div>
);
}
export default AddPost;