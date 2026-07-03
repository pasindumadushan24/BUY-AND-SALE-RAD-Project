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
    const res = await axios.get("https://gracious-liberation-production-245a.up.railway.app/api/posts");
    setListings(res.data);
  };

  const filtered = listings.filter(
    (item) => item.category.toLowerCase() === name?.toLowerCase()
  );

  return (
   <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-16 py-6">

       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Category: {name}
      </h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filtered.map((item: any) => (
          <div key={item._id}    className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
          >
            <img src={item.images?.[0]}               className="h-40 w-full object-cover rounded-md"
            />

             <h2 className="font-bold mt-3 text-lg">{item.title}</h2>
           
            <p className="text-green-600 font-semibold mt-1">
              LKR {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;