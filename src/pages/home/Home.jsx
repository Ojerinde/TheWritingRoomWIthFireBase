import Navigation from "../../components/Navigation/Navigation";
import AllPosts from "../../components/AllPosts";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../store/AppContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config";

const postsPerPage = 10;
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { allPosts, updateAllPostState } = useContext(AppContext);
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
      updateAllPostState(docs);
      setIsLoading(false);
    })();
  }, [updateAllPostState]);
  return (
    <>
      <Navigation />
      <AllPosts
        isLoading={isLoading}
        title="All Posts"
        allPosts={allPosts}
        postsPerPage={postsPerPage}
      />
    </>
  );
};
export default Home;
