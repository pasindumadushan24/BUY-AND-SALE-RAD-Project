import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);

      alert("Registration Successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Cannot connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">

      {/* CARD */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join and start buying & selling
        </p>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={register}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white py-3 rounded-xl hover:opacity-90 transition shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </div>

        {/* LOGIN LINK */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}