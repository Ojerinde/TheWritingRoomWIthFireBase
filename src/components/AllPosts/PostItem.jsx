import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const PostItem = ({ id, title, userId, body }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const fullPostHandler = () => {
    navigate(`${pathname}/` + id);
  };
  return (
    <li>
      <div className="post__list--left">
        <h2 className="post-title">{title}</h2>
        <p className="post-author">User Id: {userId}</p>
        <p className="post-body">{`${body}`.split(".")[0]}.</p>
      </div>
      <p>
        <Button className="post-button" onClick={fullPostHandler}>
          See full post
        </Button>
      </p>
    </li>
  );
};
export default PostItem;
