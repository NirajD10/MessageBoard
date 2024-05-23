import React from "react";

function IconButton({ children, clickFunctionHandler }) {
  return (
    <button className="h-10 rounded-lg px-2.5 focus-visible:outline-0 hover:bg-secondary hover:bg-opacity-10 focus-visible:bg-secondary focus-visible:bg-opacity-50" onClick={clickFunctionHandler}>
      {children}
    </button>
  );
}

export default IconButton;
