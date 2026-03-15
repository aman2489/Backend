import { useAuth } from "../../auth/hooks/useAuth";
import "../styles/profile.scss";


const Profile = () => {

  const { user } = useAuth();

  console.log(user);

  return (
    <main className="profile-page">
        <div className="info">
          <div className="image-div">
          <img src="" alt="" />  
          </div>
          <div className="user-info">
            <h2>Aman Vishnoi</h2>
            <h5>Software Engineer</h5>
            <div className="matrics">
              <p>Posts: 10</p>
            <p>Followers: 100</p>
            <p>Following: 50</p>
            </div>
          </div>
          <div className="posts">
          <h3>Posts</h3>
            <div className="post">
              <img src="" alt="" />
            </div>
          </div>
        </div>
    </main>
  )
}

export default Profile
