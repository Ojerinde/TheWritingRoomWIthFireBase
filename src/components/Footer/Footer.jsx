import { useState } from "react";
import {
  FaGithubSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaAngleDoubleUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [github, setGithub] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [linkedIn, setlinkedIn] = useState(false);
  const scrollToTopHandler = () => {
    const header = document.getElementById("header");
    header.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer__scroll--box" onClick={scrollToTopHandler}>
        <FaAngleDoubleUp className="footer__scroll" />
      </div>
      <div className="footer__icons">
        <Link
          href="https://github.com/Ojerinde"
          target="_blank"
          className="footer__icons--box"
          onMouseEnter={() => setGithub(true)}
          onMouseLeave={() => setGithub(false)}
        >
          {github && <p className="footer__title">GitHub</p>}
          <FaGithubSquare className="icon icon__1" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ojerinde/"
          target="_blank"
          className="footer__icons--box"
          onMouseEnter={() => setlinkedIn(true)}
          onMouseLeave={() => setlinkedIn(false)}
        >
          {linkedIn && <p className="footer__title">LinkedIn</p>}
          <FaLinkedin className="icon icon__2" />
        </Link>
        <Link
          href="https://twitter.com/Joel_Ojerinde"
          target="_blank"
          className="footer__icons--box"
          onMouseEnter={() => setTwitter(true)}
          onMouseLeave={() => setTwitter(false)}
        >
          {twitter && <p className="footer__title">Twitter</p>}
          <FaTwitterSquare className="icon icon__3" />
        </Link>
      </div>
      <p className="footer__name">
        Ojerinde Joel <span className="footer__name--span">©2023</span>
      </p>
    </footer>
  );
};
export default Footer;
