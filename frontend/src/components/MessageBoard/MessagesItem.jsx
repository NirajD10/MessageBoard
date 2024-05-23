import { PencilSimple, Trash, User } from "@phosphor-icons/react";
import React, { useContext, useState } from "react";
import IconButton from "../IconButton";
import { MessageBoardContext } from "../../context/messageboard-context";
import { MessageContext } from "../../context/message-context";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "../InputField";

let edit_html_content;

function MessagesItem({ message_detail }) {
  const { board_id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const messageboardContext = useContext(MessageBoardContext);
  const messageContext = useContext(MessageContext);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(input) {
    messageContext.editMessage(board_id, message_detail._id, input);
    setIsEdit((prevState) => !prevState);
  }

  const editFunctionalityHandler = (data) => {
    setIsEdit((prevState) => !prevState);
    setValue("new_content", data);
  };

  if (isEdit) {
    edit_html_content = (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-row gap-2"
      >
        <div className="w-full">
          <div className="w-full">
            <InputField
              {...register("new_content", {
                required: "Cannot be empty",
              })}
              type="text"
              value={getValues("new_content")}
              error={errors.new_content}
            />
          </div>
        </div>
        <div className="w-fit flex flex-row-reverse">
          <div className="w-fit flex gap-2">
            <button
              type="submit"
              className="block w-full rounded-lg bg-primaryColor px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
            <button
              type="button"
              className="block w-full rounded-lg hover:bg-secondaryForeground px-5 py-3 text-sm font-medium"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    edit_html_content = null;
  }

  return (
    <React.Fragment>
      <div className="group flex h-auto items-center gap-2 rounded-lg bg-white px-2 font-medium juice:gap-2.5 juice:font-normal hover:bg-secondaryForeground">
        <div className="flex w-full h-full py-3">
          {/* picture */}
          <div className="flex justify-center items-center w-20">
            <div className="w-fit rounded-full border-2 p-1 group:border-white">
              <User size={36} color="#121212" />
            </div>
          </div>
          {/* message */}

          <div className="grow">
            <div className="flex flex-col justify-center">
              <div className="px-2 space-x-3">
                <p className="inline-block font-bold">
                  {message_detail.author.name}
                </p>
                <p className="inline-block text-secondary text-opacity-70">
                  {message_detail.createdAt}
                </p>
              </div>
              {edit_html_content}
              {!isEdit && (
                <React.Fragment>
                  <div className="px-2">
                    <p className="text-tPrimary">{message_detail.content}</p>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          {/* operations */}
          {!isEdit && (
            <div className="flex w-[5rem]">
              <div className="flex gap-1">
                {/* add this functionality with id */}
                {messageboardContext.yourrole === "creator" ||
                messageboardContext.yourrole === "editor" ? (
                  <IconButton
                    clickFunctionHandler={() =>
                      editFunctionalityHandler(message_detail.content)
                    }
                  >
                    <PencilSimple size={18} color="#121212" />
                  </IconButton>
                ) : null}
                {messageboardContext.yourrole === "creator" ? (
                  <IconButton
                    clickFunctionHandler={() =>
                      messageContext.deleteMessage(board_id, message_detail._id)
                    }
                  >
                    <Trash size={18} color="#FF0000" />
                  </IconButton>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      
    </React.Fragment>
  );
}

export default MessagesItem;
