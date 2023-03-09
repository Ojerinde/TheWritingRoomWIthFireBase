import headerImg from "../../assets/landing.jpg";
import Button from "../../components/UI/Button";
import classes from "./Landing.module.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section className={classes.section}>
      <div className={classes.animate}>
        <span>Welcome to Joe's! Blog! We're thrilled to have you here!</span>
      </div>
      <header className={classes.landing}>
        <div className={classes.left}>
          <h1 className={classes.h1}>
            <span className={classes.span}>Discover</span> a world of knowledge
            and inspiration with our expertly crafted articles and stories
            <span className={classes.span}> designed</span> to expand your
            horizons and ignite your passions.
          </h1>

          <p className={classes.p}>
            Kindly select any of the options below to continue
          </p>

          <div className={classes.btn__box}>
            <Button
              className={`${classes.btn} ${classes.btn__primary}`}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className={`${classes.btn} ${classes.btn__secondary}`}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className={classes.right}>
          <img src={headerImg} alt="blog" className={classes.img} />
        </div>
      </header>
    </section>
  );
};
export default LandingPage;
