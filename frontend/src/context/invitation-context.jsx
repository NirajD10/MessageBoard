import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageBoardContext } from "./messageboard-context";

export const InvitationContext = createContext();

function InvitationProvider({ children }) {
  const [notificationlist, setNotificationlist] = useState();
  const messageboardCtx = useContext(MessageBoardContext);

  function getNotificationInvitationList() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}invitations`, {
      method: "GET",
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
          setNotificationlist(resData);
        }
      })
      .catch((error) => toast.error(error.message));
  }

  function postInvitationRespond(response, invitation_id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}invitations/${invitation_id}/respond`,
      {
        method: "POST",
        body: JSON.stringify({ invitation_response: response }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
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
          toast.success(resData.message);
          getNotificationInvitationList();
          messageboardCtx.getMessageBoardList();
        }
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <InvitationContext.Provider
      value={{
        notificationlist,
        postInvitationRespond,
        getNotificationInvitationList,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}

export default InvitationProvider;
