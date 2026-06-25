import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      const from = (location.state as any)?.from || "/post-ad";

      navigate(from, { replace: true });
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">

      {/* CARD */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Login to continue buying & selling
        </p>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white py-3 rounded-xl hover:opacity-90 transition shadow-md"
          >
            Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;