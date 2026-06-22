import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();

  return (

   <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6">
      <h1 className="text-2xl md:text-3xl font-bold">
        Edit Post
      </h1>

      <p>Post ID: {id}</p>
    </div>
  );
}

export default EditPost;