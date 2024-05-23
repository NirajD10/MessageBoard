import { X } from "@phosphor-icons/react";
import React, { useContext } from "react";
import { ModalContext } from "../context/modal-context";

function Modal({ children, ModalType }) {
  const modalContext = useContext(ModalContext);
  const openModalType =
    ModalType === "create-board"
      ? modalContext.open
      : ModalType === "invite-member"
      ? modalContext.inviteModal
      : ModalType === "delete-post"
      ? modalContext.deletepostModal
      : ModalType === "leave-post"
      ? modalContext.leaveboardModal
      : null;
  return (
    //  backdrop
    <div
      onClick={() => modalContext.closeModal(ModalType)}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${ModalType ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={() => modalContext.closeModal(ModalType)}
          className="absolute top-2 right-2 p-1 rounded-lg text-tPrimary bg-white hover:bg-secondaryForeground hover:text-gray-600"
        >
          <X size={24} color="#121212" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
