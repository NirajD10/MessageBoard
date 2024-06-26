import { createContext, useContext, useEffect, useState } from "react";
import { ModalContext } from "./modal-context";
import { toast } from "sonner";

export const MessageBoardContext = createContext();

function MessageBoardProvider({ children }) {
  const modalContext = useContext(ModalContext);

  /* State for invite modal error message */
  const [errorInvitation, setErrorInvitation] = useState(null);

  /* State for message board list */
  const [messageboardlists, setMessageboardlists] = useState();

  /* State for single message board detail */
  const [yourrole, setYourRole] = useState();
  const [messageboarddetail, setmessageboarddetail] = useState(null);

  const token = sessionStorage.getItem("token");

  const updateUserRoles = (board_id, subsriber_id, data) => {
    if (!token) {
      toast.error("Token Missing. Couldn't process it");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${board_id}/subscribers/${subsriber_id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message, { duration: 3000 });
          getMessageBoardDetail(board_id);
          modalContext.closeModal("promote-user");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }


  /* To leave Message Board API Call */
  const leaveMessagegroup = (board_id) => {
    if (!token) {
      toast.error("Token Missing. Couldn't process it");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${board_id}/leave`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message, { duration: 3000 });
          getMessageBoardList();
          modalContext.closeModal("leave-board");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  /* To Invite Member in Message Board API Call */
  const postInvitationMember = (data) => {
    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}boards/${data.id}/invite`, {
      method: "POST",
      body: JSON.stringify({ receipt_email: data.receipt_email }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          console.log(resData);
          toast.success(resData.message, { duration: 3000 });
          getMessageBoardList();
          getMessageBoardDetail(data.id);
          modalContext.closeModal("invite-member");
        }
      })
      .catch((error) => {
        setErrorInvitation(error.message);
        toast.error(error.message);
      });
  };

  /* To create Message Board title API call */
  const postMessageBoardTitle = (data) => {
    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}boards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message, { duration: 3000 });
          getMessageBoardList();
          modalContext.closeModal("create-board");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  /* Refactor function for Message Board API Call */
  function APIcallMessageBoardHandler(mode, mboard_id) {
    const token1 = sessionStorage.getItem("token");
    if (!token1) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}${
        mode === "list" ? "boards" : "boards/" + mboard_id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token1,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 422) {
          throw new Error(resData.message);
        } else {
          if (mode === "list") {
            setMessageboardlists(resData);
          } else {
            setmessageboarddetail(resData.detail);
            setYourRole(resData.your_role);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  /* API Call for message board lists */
  function getMessageBoardList() {
    APIcallMessageBoardHandler("list");
  }

  /* API Call for single message board detail */
  function getMessageBoardDetail(mboard_id) {
    APIcallMessageBoardHandler("detail", mboard_id);
  }

  return (
    <MessageBoardContext.Provider
      value={{
        yourrole,
        messageboardlists,
        messageboarddetail,
        errorInvitation,
        postMessageBoardTitle,
        getMessageBoardList,
        getMessageBoardDetail,
        postInvitationMember,
        leaveMessagegroup,
        updateUserRoles
      }}
    >
      {children}
    </MessageBoardContext.Provider>
  );
}

export default MessageBoardProvider;
