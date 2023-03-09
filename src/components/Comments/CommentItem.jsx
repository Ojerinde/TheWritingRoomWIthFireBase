const CommentItem = ({ email, body }) => {
  return (
    <li className="comment__item">
      <div className="comment__author">{email}</div>
      <div className="comment__text">{body}</div>
    </li>
  );
};
export default CommentItem;
