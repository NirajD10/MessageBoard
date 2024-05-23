import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageBoardContext } from "./messageboard-context";

export const InvitationContext = createContext();

function InvitationProvider({ children }) {
  const messageboardContext = useContext(MessageBoardContext);  

  const [notificationlist, setNotificationlist] = useState();
  const [refreshquery, setRefreshquery] = useState();
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   getNotificationInvitationList();
  // }, [refreshquery]);

  function getNotificationInvitationList() {
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
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else {
          setNotificationlist(resData);
        }
      })
      .catch((error) => toast.error(error.message));
  }

  function postInvitationRespond(response, invitation_id) {
    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}invitations/${invitation_id}/respond`, {
      method: "POST",
      body: JSON.stringify({invitation_response: response}),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status === 500 || resData.status === 401) {
          throw new Error(resData.message);
        } else {
          setRefreshquery(true);
          toast.success(resData.message);
          messageboardContext.getMessageBoardList()
        }
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <InvitationContext.Provider
      value={{ notificationlist, refreshquery, postInvitationRespond, getNotificationInvitationList }}
    >
      {children}
    </InvitationContext.Provider>
  );
}

export default InvitationProvider;
