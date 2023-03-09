import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input/Input";
import { db } from "../../config";
import {
  GetItemFromLocalStorage,
  RemoveItemFromLocalStorage,
} from "../../lib/Validations";

import { AppContext } from "../../store/AppContext";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";

const AddNewPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const {
    allPosts,
    users,
    isLoggedIn,
    updateAllPostState,
    updateUserPostState,
  } = useContext(AppContext);
  const user = users.find((usr) => usr.email === isLoggedIn.email);
  const post = allPosts.find((pst) => pst.userId === user.id);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backHandler = () => {
    const lastIndex = pathname.lastIndexOf("/");
    navigate(pathname.slice(0, lastIndex));
  };
  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const bodyOnChangeHandler = (e) => {
    setBody(e.target.value);
  };
  const addPostHandler = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const updatedComments =
      post?.comments?.length > 0 ? [...post.comments] : [];
    const newPost = {
      body: body,
      title: title,
      userId: user.id,
      comments: updatedComments,
    };
    setIsLoading(true);
    const docRef = collection(db, "posts");
    await addDoc(docRef, newPost);
    const colRef = collection(db, "posts");
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    // Refetching all post
    updateAllPostState(docs.reverse());
    // Refecthing signedin user post
    const signedInUser = users.find((usr) => usr.email === isLoggedIn.email);
    const userposts = docs.filter((pst) => pst.userId === signedInUser.id);
    updateUserPostState(userposts.reverse());
    setIsLoading(false);
    backHandler();
  };

  const updatePostHandler = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const postToUpdate = GetItemFromLocalStorage("edit");
    const ref = doc(db, "posts", postToUpdate.id);
    setIsLoading(true);
    try {
      await updateDoc(ref, {
        ...post,
        title: title,
        body: body,
      });
      const colRef = collection(db, "posts");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      // Refetching all post
      updateAllPostState(docs.reverse());
      // Refecthing signedin user post
      const user = users.find((usr) => usr.email === isLoggedIn.email);
      const userposts = docs.filter((pst) => pst.userId === user.id);
      updateUserPostState(userposts.reverse());
      setIsLoading(false);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    // After updating, clear the local storage
    RemoveItemFromLocalStorage("edit");
    // Navigate back
    backHandler();
  };

  useEffect(() => {
    const postToUpdate = GetItemFromLocalStorage("edit");
    if (postToUpdate) {
      setUpdate(true);
      setBody(postToUpdate.body);
      setTitle(postToUpdate.title);
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="new__post--iconbox">
        <BsArrow90DegLeft className="new__post--icon" onClick={backHandler} />
      </div>
      <Card className="new__post--card">
        <form>
          <Input
            label="Title"
            type="text"
            placeholder="What is your article title"
            name="title"
            onChange={titleOnChangeHandler}
            value={title}
          />
          <Input
            field="textarea"
            label="Body"
            type="text"
            placeholder="Type your post body here..."
            name="body"
            value={body}
            onChange={bodyOnChangeHandler}
          />

          <div className="new__post--box">
            {update ? (
              <Button
                type="submit"
                className="new__post--button"
                onClick={updatePostHandler}
              >
                {isLoading ? <LoadingSpinner /> : "Update"}
              </Button>
            ) : (
              <Button
                type="submit"
                className="new__post--button"
                onClick={addPostHandler}
              >
                {isLoading ? <LoadingSpinner /> : "Add"}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};
export default AddNewPost;
