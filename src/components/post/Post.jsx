import {
  MoreHoriz,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  TextsmsOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./post.scss";

const Post = ({ post }) => {
  //Temporary
  const liked = false;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHoriz />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            12 Likes
          </div>
          <div className="item">
            <TextsmsOutlined />
            Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
