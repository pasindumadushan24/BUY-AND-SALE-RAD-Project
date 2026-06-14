import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      {/* 🔥 PROTECTED ADD POST */}
      <Route
        path="/post-ad"
        element={
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        }
      />

      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;