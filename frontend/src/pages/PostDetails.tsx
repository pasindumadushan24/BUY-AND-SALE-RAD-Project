import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts`
      );

      const found = res.data.find(
        (p: any) => p._id === id
      );

      setPost(found);
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Images */}
      <div className="grid grid-cols-2 gap-3">
        {post.images?.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            className="h-60 w-full object-cover rounded-lg"
          />
        ))}
      </div>


      {/* Details */}
      <h1 className="text-3xl font-bold mt-5">
        {post.title}
      </h1>

      <p className="text-green-600 text-xl mt-2">
        LKR {post.price}
      </p>

      <p className="mt-2 text-gray-600">
        {post.description}
      </p>

      <div className="mt-3 text-sm text-gray-500">
        Category: {post.category}
      </div>

      <div className="text-sm text-gray-500">
        Sub Category: {post.subCategory}
      </div>

    </div>
  );
}


export default PostDetails;