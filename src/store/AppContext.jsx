import React, { useCallback, useState } from "react";

export const AppContext = React.createContext({
  isLoggedIn: false,
  users: [],
  allPosts: [],
  userPosts: [],
  updateLoggedInState: (data) => {},
  updateUsersState: (users) => {},
  updateAllPostState: (posts) => {},
  updateUserPostState: (posts) => {},
});

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLogggedIn] = useState({
    isLoggedIn: false,
    email: "",
  });
  const [users, setUsers] = useState([]);
  //
  const [allPosts, setAllPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const updateLoggedInState = useCallback((data) => {
    setIsLogggedIn(data);
  }, []);
  const updateUsersState = useCallback((data) => {
    setUsers(data);
  }, []);

  const updateUserPostState = useCallback((data) => {
    setUserPosts(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAllPostState = useCallback((posts) => {
    setAllPost(posts);
  }, []);

  const data = {
    isLoggedIn,
    users,
    allPosts,
    userPosts,
    updateLoggedInState,
    updateUsersState,
    updateAllPostState,
    updateUserPostState,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
