import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";
import PostItem from "./PostItem";

const AllPosts = ({ title, isLoading, allPosts, postsPerPage }) => {
  const [start, setStart] = useState(0);
  const end = start + postsPerPage;
  // This function receives the updated page number from the pagination component and set it to start which is used to slice the list of posts
  const changePageHandler = (newPage) => {
    setStart((pag) => newPage * postsPerPage - postsPerPage);
  };
  return (
    <div>
      {isLoading && !allPosts && <LoadingSpinner />}
      <h3 className="post-list-title">{title}</h3>
      {allPosts?.length > 0 ? (
        <ul className="post-list">
          {allPosts.slice(start, end).map((post, index) => (
            <PostItem
              key={index}
              id={post.id}
              userId={post.userId}
              title={post.title}
              body={post.body}
            />
          ))}
        </ul>
      ) : (
        <p className="no__item">No article to display!</p>
      )}
      {allPosts?.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allPosts.length}
          onChange={changePageHandler}
        />
      )}
    </div>
  );
};
export default AllPosts;
