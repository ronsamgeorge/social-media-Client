import {
  FacebookTwoTone,
  LinkedIn,
  Instagram,
  Pinterest,
  Twitter,
  Place,
  Language,
  EmailOutlined,
  MoreVert,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";

import "./profile.scss";

const Profile = () => {
  const userId = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  // create react query for relationships
  const { data: relationshipData } = useQuery(["relationship"], () =>
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);

      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  console.log(relationshipData);

  return (
    <div className="profile">
      <div className="images">
        <img src={data?.coverPic} alt="" className="cover" />
        <img src={data?.profilePic} alt="" className="profile" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoTone fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Instagram fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Twitter fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedIn fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <Pinterest fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <Place />
                <span>USA</span>
              </div>

              <div className="item">
                <Language />
                <span>example.dev</span>
              </div>
            </div>
            {currentUser.id.toString() === userId ? (
              <button>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData && relationshipData.includes(currentUser.id)
                  ? "FOllowing"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
    </div>
  );
};

export default Profile;
