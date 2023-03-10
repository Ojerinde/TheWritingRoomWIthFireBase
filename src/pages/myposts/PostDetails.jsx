import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from "../../components/Comments";
import CommentBox from "../../components/Comments/CommentBox";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillEdit, AiFillDelete, AiOutlineComment } from "react-icons/ai";
import { BsArrow90DegLeft } from "react-icons/bs";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { AppContext } from "../../store/AppContext";
import { SetItemToLocalStorage } from "../../lib/Validations";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config";

const PostDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;

  const {
    allPosts,
    isLoggedIn,
    users,
    updateAllPostState,
    updateUserPostState,
  } = useContext(AppContext);

  // Animation managing state
  const [comment, setComment] = useState(false);
  const [remove, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const [showCommentBox, setShowCommentBox] = useState(false);

  const lastIndex = pathname?.lastIndexOf("/");
  const path = pathname?.slice(0, lastIndex);

  const post = allPosts?.find((pos) => {
    return pos.id === postId;
  });
  const user = users?.find((usr) => usr.email === isLoggedIn.email);
  const canDelete = post?.userId === user?.id;
  const [comments, setComments] = useState(post?.comments);
  const [isLoading, setIsLoading] = useState(false);

  const backHandler = () => {
    navigate(path);
  };

  const closeCommentBox = () => {
    setShowCommentBox(false);
  };

  const editHandler = () => {
    if (!canDelete) return;
    navigate(`${pathname}/edit`);
    SetItemToLocalStorage("edit", post);
  };

  const deleteHandler = async () => {
    if (!canDelete) return;
    // eslint-disable-next-line no-restricted-globals
    const areYouSure = confirm("Are you sure?");
    if (!areYouSure) return;
    const ref = doc(db, "posts", postId);
    try {
      await deleteDoc(ref);
      const colRef = collection(db, "posts");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      // Refetching all post
      updateAllPostState(docs);
      // Refecthing signedin user post
      const user = users.find((usr) => usr.email === isLoggedIn.email);
      const userposts = docs.filter((pst) => pst.userId === user.id);
      updateUserPostState(userposts);
      backHandler();
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const addCommentHandler = async (body) => {
    setIsLoading(false);
    const comment = {
      body: body,
      email: isLoggedIn.email,
      postId: postId,
    };

    const ref = doc(db, "posts", postId);
    setIsLoading(true);
    try {
      await updateDoc(ref, {
        ...post,
        comments: [comment, ...post.comments],
      });
      const colRef = collection(db, "posts");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      // Refetching all post
      updateAllPostState(docs);
      // Refecthing signedin user post
      const user = users?.find((usr) => usr.email === isLoggedIn.email);
      const userposts = docs.filter((pst) => pst.userId === user.id);
      updateUserPostState(userposts);
      // Refetching all comments
      const latestPost = docs?.find((pos) => {
        return pos.id === postId;
      });
      setComments((prev) => latestPost.comments);
      setIsLoading(false);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Navigation />
      <section className="post__details">
        <div className="post__details--backiconbox">
          <BsArrow90DegLeft
            className="post__details--backicon"
            onClick={backHandler}
          />
        </div>
        <div className="post__body">
          <div className="post__details--header">
            <BsPersonCircle className="post__details--img" />
            <h3 className="post__details--h3">
              <div>User Id: {post?.userId}</div>
              <div> Post Id: {postId}</div>
            </h3>
          </div>
          <h1 className="post__details--h1">{post?.title}</h1>
          <article className="post__details--article">{post?.body}</article>
          <div className="post__details--footer">
            <div
              onClick={() => setShowCommentBox(true)}
              className="post__details--iconbox"
            >
              {comment && <p className="post__details--iconname">Comment</p>}
              <AiOutlineComment
                className="post__details--icon post__details--icon__1"
                onMouseEnter={() => setComment(true)}
                onMouseLeave={() => setComment(false)}
              />
            </div>
            <div className="post__details--iconbox">
              {" "}
              {edit && <p className="post__details--iconname">Edit</p>}
              <AiFillEdit
                className={`post__details--icon ${
                  !canDelete ? "post__details--icon__3" : ""
                }`}
                onMouseEnter={() => setEdit(true)}
                onMouseLeave={() => setEdit(false)}
                onClick={editHandler}
              />
            </div>
            <div className="post__details--iconbox">
              {remove && <p className="post__details--iconname">Delete</p>}
              <AiFillDelete
                className={`post__details--icon ${
                  !canDelete ? "post__details--icon__3" : ""
                }`}
                onMouseEnter={() => setDelete(true)}
                onMouseLeave={() => setDelete(false)}
                onClick={deleteHandler}
              />
            </div>
          </div>
        </div>
        {showCommentBox && (
          <div className="post__comment--box">
            <CommentBox
              onClose={closeCommentBox}
              onAdd={addCommentHandler}
              isLoading={isLoading}
            />
          </div>
        )}
        <div className="post__comment--list">
          {comments?.length > 0 ? (
            <Comments comments={comments} />
          ) : (
            <p className="no__item">Nobody has commented yet!</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};
export default PostDetails;
