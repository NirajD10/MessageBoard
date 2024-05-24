import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MessageContext } from "../../context/message-context";
import { useParams } from "react-router-dom";
import { MessageBoardContext } from "../../context/messageboard-context";

function TextArea() {
  const { board_id } = useParams();
  const messageContext = useContext(MessageContext);
  const messageBoardContext = useContext(MessageBoardContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    messageContext.postMessage(data, board_id);
    messageBoardContext.getMessageBoardDetail(board_id);
    reset();
  }
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-primaryColor focus-within:ring-1 focus-within:ring-primaryColor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("message", {
            required: "Message Board Content is required",
            minLength: 1,
          })}
          className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
          rows="4"
          placeholder="enter a message..."
        ></textarea>

        <div className="flex items-center justify-end gap-2 bg-white p-3">
          <button
            type="submit"
            className="rounded bg-primaryColor px-3 py-1.5 text-sm font-medium text-white hover:bg-primaryColor"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TextArea;
