import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button";

const NotFound = () => {
  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate("/");
  };
  return (
    <>
      {/* Application */}
      <div className="nopage__card">
        <h1>
          4<span>0</span>4
        </h1>
        <h2>
          You are seeing this because you are NOT in a valid url. i.e., This
          page does not exist.
        </h2>
        <h3>Kindly go back to a valid url by clicking on the button below</h3>
        <Button onClick={goHomeHandler}>Go home</Button>
      </div>
    </>
  );
};
export default NotFound;
