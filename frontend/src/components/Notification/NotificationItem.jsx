import React, { useContext } from "react";
import { InvitationContext } from "../../context/invitation-context";
import { User } from "@phosphor-icons/react";

function NotificationItem({ item }) {
  const invitationContext = useContext(InvitationContext);
  const respondHandler = (input, id) => {
    invitationContext.postInvitationRespond(input, id);
  };

  return (
    <li className="group flex h-[4.5rem] items-center gap-2 rounded-lg bg-white px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondaryForeground ">
      <div className="flex w-full h-full py-3 px-2">
        <div className="flex justify-center items-center w-20">
          <div className="w-fit rounded-full border-2 p-1 group:border-white">
            <User size={36} color="#121212" />
          </div>
        </div>
        <div className="grow">
          <div className="flex flex-col justify-center">
            <div className="px-2 space-x-3">
              <p className="inline-block font-bold">
                {item?.message_board.creator.name}
              </p>
              <p className="inline-block text-secondary text-opacity-70">
                {item?.message_board.creator.email}
              </p>
            </div>
            <div className="px-2">
              <p className="text-tPrimary">
                Congratulations!{" "}
                <span className="font-bold">
                  {item?.message_board.creator.name}
                </span>{" "}
                has invited to you join{" "}
                <span className="font-bold">{item?.message_board.title}</span>.
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-[18rem] items-center justify-center">
          <div className="flex flex-row gap-2">
            <button
              onClick={() => respondHandler("accepted", item?._id)}
              className="block w-full rounded-lg bg-primaryColor px-5 py-3 text-sm font-medium text-white"
            >
              Accept
            </button>
            <button
              onClick={() => respondHandler("declined", item?._id)}
              className="block w-full rounded-lg bg-red-700 px-5 py-3 text-sm font-medium text-white"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default NotificationItem;
