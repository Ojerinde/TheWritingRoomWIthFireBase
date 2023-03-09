import Navigation from "../../components/Navigation/Navigation";
import AllPosts from "../../components/AllPosts";
import Button from "../../components/UI/Button";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/AppContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config";

const postsPerPage = 5;
const MyPosts = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/posts");
  };
  const addNewPostHandler = () => {
    navigate("/myposts/addpost");
  };

  const [isLoading, setIsLoading] = useState(false);
  const { userPosts, updateUserPostState, users, isLoggedIn } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const colRef = collection(db, "posts");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      const user = users.find((usr) => usr.email === isLoggedIn.email);
      const userposts = docs.filter((pst) => pst.userId === user.id);
      updateUserPostState(userposts);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserPostState]);

  return (
    <>
      <Navigation />
      <div className="my__posts">
        <BsArrow90DegLeft className="my__posts--icon" onClick={backHandler} />
        <Button className="my__posts--button" onClick={addNewPostHandler}>
          Add New
        </Button>
      </div>
      <AllPosts
        isLoading={isLoading}
        title="User Posts"
        allPosts={userPosts}
        postsPerPage={postsPerPage}
      />
    </>
  );
};
export default MyPosts;
