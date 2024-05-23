import { Presentation } from "@phosphor-icons/react";
import React, { useContext, useEffect } from "react";
import TextArea from "./TextArea";
import MessagesItem from "./MessagesItem";
import { ModalContext } from "../../context/modal-context";
import ModalInviteWrapper from "./ModalInviteWrapper";
import ModalLeaveMessageBoard from "./ModalLeaveMessageBoard";

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

function MessageSection({ detail, your_role }) {
  const modalContext = useContext(ModalContext);

  const invitationModalhandler = () => {
    modalContext.openModal("invite-member");
  };

  const leaveMessageBoardModal = () => {
    modalContext.openModal("leave-board");
  };

  const hasDataAuthor = detail[0]?.message_detail?.some((mitem) => !isEmptyObject(mitem.author));

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="h-12 bg-[#f5f5f5] py-2 px-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Presentation size={28} color="#121212" />
            <p className="text-base font-bold h-fit">{detail[0]?.title}</p>
          </div>
          {your_role === "creator" ? (
            <button
              onClick={invitationModalhandler}
              className="block w-fit h-fit rounded-lg bg-primaryColor px-5 py-1 text-base font-medium text-white"
            >
              Invite
            </button>
          ) : (
            <button
              onClick={leaveMessageBoardModal}
              className="block w-fit h-fit rounded-lg bg-primaryColor px-5 py-1 text-base font-medium text-white"
            >
              Leave
            </button>
          )}
        </div>
      </div>
      {/* openup modal for invitation */}
      {modalContext.inviteModal && (
        <ModalInviteWrapper messageboard_id={detail?._id} />
      )}
      {/* openup modal for leave */}
      {modalContext.leaveboardModal && <ModalLeaveMessageBoard />}
      {/* Messages */}
      {hasDataAuthor ? (
        <div className="flex grow flex-col-reverse ">
          <div className="flex flex-col px-4 gap-2">
            {detail[0].message_detail?.map((mitem) => (
              <MessagesItem key={mitem._id} message_detail={mitem} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex grow items-center">
          <p className="w-full text-center my-5">Welcome to message board.</p>
        </div>
      )}
      {/* textarea post message */}
      {your_role !== "viewer" && (
        <div className="h-auto w-full p-4">
          <TextArea />
        </div>
      )}
    </div>
  );
}

export default MessageSection;
