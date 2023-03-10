import React, { useCallback, useState } from "react";

// Creting a context
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

// Creating athe context provider
const AppContextProvider = ({ children }) => {
  // App-wide states
  const [isLoggedIn, setIsLogggedIn] = useState({
    isLoggedIn: false,
    email: "",
  });
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  // App-wide functions to update states
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

  // The data is provided  to all components
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
