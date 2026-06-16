import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const { name } = useParams();
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    setListings(res.data);
  };

  const filtered = listings.filter(
    (item) => item.category.toLowerCase() === name?.toLowerCase()
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Category: {name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((item: any) => (
          <div key={item._id} className="bg-white p-4 shadow rounded">
            <img src={item.images?.[0]} className="h-40 w-full object-cover" />
            <h2 className="font-bold">{item.title}</h2>
            <p>LKR {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;