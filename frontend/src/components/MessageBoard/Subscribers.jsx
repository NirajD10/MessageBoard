import { User, Users } from "@phosphor-icons/react";
import React from "react";
import SubscriberItem from "./SubscriberItem";

function Subscribers({ members_data, creator_data }) {
  return (
    <div className="flex flex-col ">
      {/* header */}
      <div className="flex items-center justify-between gap-2 bg-secondary p-3">
        <div className="flex flex-row gap-4 items-center">
          <Users size={24} color="#ffffff" />
          <p className="text-base font-bold h-fit text-white">Members</p>
        </div>
      </div>
      {/* creator card */}
        <ul className="flex flex-col gap-2 my-3 overflow-auto">
          <div className="group flex h-14 items-center gap-2 rounded-lg bg-secondaryForeground px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondary hover:bg-opacity-20 hover:cursor-pointer">
            <div className="flex justify-center items-center w-12">
              <div className="w-fit rounded-full border-2 p-1 group:border-white">
                <User size={22} color="#121212" />
              </div>
            </div>
            <div className="flex flex-col justify-center px-2">
              <p className="font-bold text-sm truncate">
                {creator_data?.name} (Creator)
              </p>
              <p className="text-xs text-secondary text-opacity-70">
                {creator_data?.email}
              </p>
            </div>
          </div>
        </ul>

      {/* members list */}
      <ul className="flex flex-col gap-2 mt-2 h-[85svh] overflow-auto">
        {members_data?.map((member) => (
          <SubscriberItem key={member?.user._id} detail={member} />
        ))}
      </ul>
    </div>
  );
}

export default Subscribers;
