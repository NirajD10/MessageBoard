import { createContext, useContext } from "react";
import { MessageBoardContext } from "./messageboard-context";
import { toast } from "sonner";

export const MessageContext = createContext();

function MessageProvider({ children }) {
  const token = sessionStorage.getItem("token");
  const messageboardContext = useContext(MessageBoardContext);

  function postMessage(data, messageboard_id) {
    if (!token) {
      toast.error("Token Missing. Couldn't process it");
      return;
    }

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}boards/${messageboard_id}/messages`,
      {
        method: "POST",
        body: JSON.stringify(data),
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
          toast.success(resData.message, { duration: 3000 });
          messageboardContext.getMessageBoardDetail(messageboard_id);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function deleteMessage(messageboard_id, message_id) {
    if (!token) {
      toast.error("Token Missing. Couldn't process it");
      return;
    }

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }boards/${messageboard_id}/messages/${message_id}`,
      {
        method: "DELETE",
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
          toast.success(resData.message, { duration: 3000 });
          messageboardContext.getMessageBoardDetail(messageboard_id);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function editMessage(messageboard_id, message_id, new_content) {
    if (!token) {
      toast.error("Token Missing. Couldn't process it");
      return;
    }
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }boards/${messageboard_id}/messages/${message_id}`,
      {
        method: "PUT",
        body: JSON.stringify(new_content),
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
          toast.success(resData.message, { duration: 3000 });
          messageboardContext.getMessageBoardDetail(messageboard_id);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <MessageContext.Provider
      value={{ postMessage, deleteMessage, editMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
