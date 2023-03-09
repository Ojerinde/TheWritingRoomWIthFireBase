import CommentItem from "./CommentItem";

const Comments = ({ comments }) => {
  return (
    <>
      <h3 className="comment__title">Comments</h3>
      <ul className="comment__list">
        {comments?.map((comment, index) => (
          <CommentItem key={index} {...comment} />
        ))}
      </ul>
    </>
  );
};
export default Comments;
