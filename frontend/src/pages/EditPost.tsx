import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Edit Post
      </h1>

      <p>Post ID: {id}</p>
    </div>
  );
}

export default EditPost;