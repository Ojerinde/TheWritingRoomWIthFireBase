import { Outlet } from "react-router-dom";

const PostsHome = () => {
  return (
    <>
      {/* This enables nested route */}
      <Outlet />
    </>
  );
};
export default PostsHome;
