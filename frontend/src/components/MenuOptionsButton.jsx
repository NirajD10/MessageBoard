import React from "react";


function MenuOptionsButton({ children, clickfunction }) {
  return (
    <div onClick={clickfunction} className="group flex h-10 items-center gap-2 rounded-lg bg-secondaryForeground px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondary hover:bg-opacity-20 hover:cursor-pointer">
      {children}
    </div>
  );
}

export default MenuOptionsButton;
