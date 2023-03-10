import { useRef } from "react";
import LoadingSpinner from "../../pages/login/LoadingSpinner/LoadingSpinner";
import Button from "../UI/Button";
import Input from "../UI/Input/Input";

const CommentBox = ({ onClose, onAdd, isLoading }) => {
  const bodyRef = useRef("");

  const addCommentHandler = () => {
    const body = bodyRef.current.value;
    onAdd(body);
  };
  return (
    <div className="comment__box">
      <Input
        type="text"
        field="textarea"
        placeholder="What is your take on the article?"
        ref={bodyRef}
      />
      <div className="comment__box--buttonbox">
        <Button onClick={onClose} className="comment__box--button">
          Close
        </Button>
        <Button className="comment__box--button" onClick={addCommentHandler}>
          {isLoading ? <LoadingSpinner /> : "Add"}
        </Button>
      </div>
    </div>
  );
};
export default CommentBox;
