import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
// import PostAd from "./pages/PostAd";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";


function App() {
  return (
   <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/post-ad" element={<AddPost />} />
  <Route path="/category/:name" element={<CategoryPage />} />
  <Route
        path="/post-ad"
        element={
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        }
      />
  <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
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