import React from "react";
import { NavLink } from "react-router-dom";

function HomeCard({ children, title, description, linkurl }) {
  return (
    <NavLink
      className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
      to={linkurl}
    >
      <span className="inline-block rounded-lg bg-gray-50 p-3">{children}</span>

      <h2 className="mt-2 font-bold">{title}</h2>

      <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
        {description}
      </p>
    </NavLink>
  );
}

export default HomeCard;
