import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import logo from "../../assets/favicon-2.png";
import { AppContext } from "../../store/AppContext";
import { auth, signOut } from "../../config";

const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn, updateLoggedInState } = useContext(AppContext);

  useEffect(() => {
    // Sticky navigation logic
    const nav = document.querySelector("#nav");
    const header = document.querySelector(".navigation__container");

    const stickyNav = function (entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) nav.classList.add(`sticky`);
      else nav.classList.remove(`sticky`);
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
    });

    headerObserver.observe(header);
  }, []);

  const logOutHandler = async () => {
    await signOut(auth);
    updateLoggedInState((prev) => ({
      isLoggedIn: false,
      email: "",
    }));
  };

  return (
    <header className="navigation__container" id="header">
      <nav className="main__header" id="nav">
        <div
          className="logo"
          onClick={() => {
            navigate("/posts");
          }}
        >
          <img src={logo} alt="Joe's Blog" />
          <h3>Joe's Blog</h3>
        </div>
        <ul>
          <li>
            <NavLink
              to="/myposts"
              className={({ isActive }) => (isActive ? "header__active" : "")}
            >
              My Posts
            </NavLink>
          </li>
          <li>
            {isLoggedIn.isLoggedIn ? (
              <Link to="/" onClick={logOutHandler}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
