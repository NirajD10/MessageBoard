import { createContext, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [leaveboardModal, setLeaveboardModal] = useState(false);
  const [deletepostModal, setDeletepostModal] = useState(false);

  const closeModal = (mode) => {
    switch (mode) {
      case "create-board":
        setOpen(false);
        break;
      case "invite-member":
        setInviteModal(false);
        break;
      case "leave-board":
        setLeaveboardModal(false);
        break;
      case "delete-post":
        setDeletepostModal(false);
        break;
    }
  };

  const openModal = (mode) => {
    switch (mode) {
      case "create-board":
        setOpen(true);
        break;
      case "invite-member":
        setInviteModal(true);
        break;
      case "leave-board":
        setLeaveboardModal(true);
        break;
      case "delete-post":
        setDeletepostModal(true);
        break;
    }
    // setOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        inviteModal,
        deletepostModal,
        leaveboardModal,
        closeModal,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
