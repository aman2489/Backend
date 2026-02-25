import { useRef, useState } from "react"
import "../style/createPost.scss"
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";


const CreatePost = () => {

  const [caption, setCaption] = useState("");
  const postImageInputRef = useRef(null);
  const navigate = useNavigate()
  const {loading, handleCreatePost} = usePost();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputRef.current.files[0];
    
    await handleCreatePost(file, caption);

    navigate("/");
  }

  if(loading){
    return(
      <main>
        <h1>Creating Post</h1>
      </main>
    )
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
        <label className="post-image-label" htmlFor="image">Select Image</label>
          <input ref={postImageInputRef} hidden type="file" name="image" id="image" />
          <input
          value={caption}
          onChange={(e) => {setCaption(e.target.value)}}  
          type="caption" name="caption" id="caption" placeholder="Enter Caption..." />
          <button className="button primary-button">Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost
