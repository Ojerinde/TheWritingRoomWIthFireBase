import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { field = "input", className, ...others } = props;

  return (
    <div className="input__group">
      <label>{props.label}</label>
      {field === "input" ? (
        <input {...others} ref={ref} className={className}></input>
      ) : (
        <textarea {...others} ref={ref} className={className}></textarea>
      )}
    </div>
  );
});
export default Input;
