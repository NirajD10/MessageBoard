import React, { useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { User } from "@phosphor-icons/react";
import ModalPromoteUser from "./ModalPromoteUser";
import { MessageBoardContext } from "../../context/messageboard-context";

let content;

function RolesBasedClickHandler({ children, detail }) {
  const modalCtx = useContext(ModalContext);
  const messageboardCtx = useContext(MessageBoardContext);
  if (messageboardCtx.yourrole === "creator") {
    content = (
      <div
        onClick={() => modalCtx.openModal("promote-roles")}
        className="group flex h-14 items-center gap-2 rounded-lg bg-secondaryForeground px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondary hover:bg-opacity-20 hover:cursor-pointer"
      >
        {children}
      </div>
    );
  } else {
    content = (
      <div className="group flex h-14 items-center gap-2 rounded-lg bg-secondaryForeground px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondary hover:bg-opacity-20 hover:cursor-pointer">
        {children}
      </div>
    );
  }

  return (
    <React.Fragment>
      {content}
      {modalCtx.promoteUserModal && (
        <ModalPromoteUser user_id={detail?.user._id} role={detail?.role}/>
      )}
    </React.Fragment>
  );
}

function SubscriberItem({ detail }) {
  return (
    <RolesBasedClickHandler detail={detail}>
      <div className="flex justify-center items-center w-12">
        <div className="w-fit rounded-full border-2 p-1 group:border-white">
          <User size={22} color="#121212" />
        </div>
      </div>
      <div className="flex flex-col justify-center px-2">
        <p className="font-bold text-sm truncate">
          {detail?.user.name} ({detail?.role})
        </p>
        <p className="text-xs text-secondary text-opacity-70">
          {detail?.user.email}
        </p>
      </div>
    </RolesBasedClickHandler>
  );
}

export default SubscriberItem;
