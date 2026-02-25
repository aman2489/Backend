import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../style/feed.scss";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {

    const {feed, handleGetFeed, loading, handleLike, handleUnLike} = usePost();

    useEffect(() => {
        handleGetFeed();
    }, [])

    console.log(feed);

    if(loading || !feed){
        return (
            <main>
                <h1>Feed is Loading.....</h1>
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
