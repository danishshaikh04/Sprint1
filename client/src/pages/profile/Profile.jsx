import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  // Fetch user info
  const { isLoading, error, data } = useQuery(["user", userId], () =>
    makeRequest.get("/users/find/" + userId).then((res) => res.data)
  );

  // Fetch relationship data (followers)
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest
        .get("/relationships?followedUserId=" + userId)
        .then((res) => res.data)
  );

  const queryClient = useQueryClient();

  // Follow/Unfollow mutation
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["relationship", userId]),
    }
  );

  const handleFollow = () => {
    if (!relationshipData) return;
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await makeRequest.post("/auth/logout");
      logout(); // clear auth context
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div className="profile">
      <div className="images">
        <img
          src={"/upload/" + data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={"/upload/" + data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <div className="buttons">
                <button onClick={() => setOpenUpdate(true)}>Update</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : rIsLoading ? (
              "Loading..."
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
