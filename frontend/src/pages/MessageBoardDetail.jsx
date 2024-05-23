import React, { useContext, useEffect } from "react";
import { MessageBoardContext } from "../context/messageboard-context";
import MessageSection from "../components/MessageBoard/MessageSection";
import Subscribers from "../components/MessageBoard/Subscribers";
import { useParams } from "react-router-dom";

function MessageBoardDetail() {
  const { board_id } = useParams();
  const messageboardContext = useContext(MessageBoardContext);

  useEffect(() => {
    const getMessageBoardD = () => {
      messageboardContext.getMessageBoardDetail(board_id);
    };
    getMessageBoardD();
  }, [board_id]);

  return (
    <div className="sm:flex sm:flex-row sm:h-full">
      <div className="flex-1 mb-10 px-5 lg:px-0">
        {messageboardContext?.messageboarddetail && (
          <MessageSection
            detail={messageboardContext?.messageboarddetail}
            your_role={messageboardContext?.yourrole}
          />
        )}
      </div>
      {messageboardContext?.messageboarddetail !== null ? (
        <div className="w-0 sm:w-1/6 bg-secondaryForeground">
          {messageboardContext?.messageboarddetail && (
            <Subscribers
              members_data={
                messageboardContext?.messageboarddetail[0]?.subscribers
              }
              creator_data={
                messageboardContext?.messageboarddetail[0]?.creator_detail
              }
            />
          )}
        </div>
      ) : (
        <div className="w-0 sm:w-1/6 bg-secondaryForeground">Loading...</div>
      )}
    </div>
  );
}

export default MessageBoardDetail;
