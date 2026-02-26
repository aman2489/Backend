import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../style/feed.scss";
import Navbar from "../../shared/components/Navbar";
import { useNavigate } from "react-router";

const Feed = () => {

    const {feed, handleGetFeed, loading, handleLike, handleUnLike} = usePost();

    const navigate = useNavigate();

    useEffect(() => {
      handleGetFeed();
    }, [])

    console.log(feed);

    if(loading){
        return (
            <main>
                <h1>Feed is Loading.....</h1>
            </main>
        )
    }else if(!feed){
      return (
        <main>
          <h1>Not Posts Available</h1>
        </main>
      )
    }

  return (
    <main className="feed-page">
      <Navbar/>
      <div className="feed">
        <div className="posts">
          {feed.map(post => {
            return <Post user={post.user} post={post} key={post._id} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
