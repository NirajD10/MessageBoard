import { User } from "@phosphor-icons/react";
import React from "react";

function SubscriberItem({ detail }) {
  return (
    <div className="group flex h-14 items-center gap-2 rounded-lg bg-secondaryForeground px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondary hover:bg-opacity-20 hover:cursor-pointer">
      <div className="flex justify-center items-center w-12">
        <div className="w-fit rounded-full border-2 p-1 group:border-white">
          <User size={22} color="#121212" />
        </div>
      </div>
      <div className="flex flex-col justify-center px-2">
        <p className="font-bold text-sm truncate">{detail?.user.name} ({detail?.role})</p>
        <p className="text-xs text-secondary text-opacity-70">
          {detail?.user.email}
        </p>
      </div>
    </div>
  );
}

export default SubscriberItem;
