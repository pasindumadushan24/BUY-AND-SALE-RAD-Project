import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-2xl">
        QuickMarket
      </h1>

      <div className="space-x-5">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;