import React, { useContext, useEffect } from "react";
import { MessageBoardContext } from "../context/messageboard-context";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

function MessageList() {
  const {board_id} = useParams();
  const authContext = useContext(AuthContext);
  const messageboardContext = useContext(MessageBoardContext);

  useEffect(() => {
      const fetchmessagelist = () => {
        messageboardContext.getMessageBoardList(board_id)
      }
      fetchmessagelist();
  }, [])

  // useEffect(() => {
  //   messageboardContext.getMessageBoardList(board_id);
  // }, [messageboardContext.messageboarddetail])

  return (
    <div className="my-2 ">
      <p className="text-xs font-bold text-secondary pl-3">Message Board</p>
      <ul className="space-y-1 my-2 h-[70svh] overflow-auto">
        {messageboardContext.messageboardlists?.length === 0 && (
          <React.Fragment>
            <p className="text-xs text-center my-3">No Message Board lists.</p>
          </React.Fragment>
        )}
        {messageboardContext.messageboardlists?.map((list) => (
          <li key={list._id}>
            <NavLink
              to={`/${list._id}`}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-tPrimary hover:bg-secondary hover:bg-opacity-20 hover:text-gray-700"
            >
              {list.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
