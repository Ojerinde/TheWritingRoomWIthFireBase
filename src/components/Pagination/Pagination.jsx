import { useState } from "react";
import { ImPrevious, ImNext } from "react-icons/im";

const Pagination = (props) => {
  const postsPerPage = props.postsPerPage;
  const totalPosts = props.totalPosts;

  const total_pages = Math.ceil(totalPosts / postsPerPage);

  const [page, setPage] = useState(1);

  const prevHandler = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
    props.onChange(page - 1);
  };
  const nextHandler = () => {
    if (page === total_pages) return;

    setPage((page) => page + 1);
    props.onChange(page + 1);
  };
  return (
    <div className="pagination__card">
      <div className="pagination__icons--box">
        <ImPrevious
          onClick={prevHandler}
          className={`pagination__icons--prev ${
            page === 1 ? " not__allowed" : ""
          }`}
        />
        <p className="pagination__icons--paragraph">{page}</p>
        <ImNext
          onClick={nextHandler}
          className={`pagination__icons--next ${
            page === total_pages || total_pages < 1 ? " not__allowed" : ""
          }`}
        />
      </div>
      <div className="pagination__buttons">
        {Array.from({ length: total_pages }, (_, index) => index + 1).map(
          (each) => (
            <button
              key={each}
              onClick={() => {
                props.onChange(each);
                setPage((page) => each);
              }}
              className={`${
                page === each
                  ? "active__button pagination__btn"
                  : "pagination__btn"
              }`}
            >
              {`${each}`.padStart(2, 0)}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Pagination;
