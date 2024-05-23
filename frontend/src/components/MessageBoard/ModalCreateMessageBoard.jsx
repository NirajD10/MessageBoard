import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../context/modal-context";
import Modal from "../Modal";
import InputField from "../InputField";
import { MessageBoardContext } from "../../context/messageboard-context";

function ModalCreateMessageBoard() {
  const modalContext = useContext(ModalContext);
  const messageBoardContext = useContext(MessageBoardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    messageBoardContext.postMessageBoardTitle(data);
  }
  return (
    <Modal ModalType="create-board">
      <div className="text-center sm:max-w-[525px]">
        <h3 className="text-xl font-bold my-2">Create Message Board</h3>
        <div className="mx-auto my-4">
          <p className="text-sm text-gray-500">
            To create message board. fill message board title.
          </p>
        </div>
        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 w-full"
          >
            <div className="grid grid-cols-5 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <div className="col-span-4">
                <InputField
                  {...register("title", {
                    required: "Message Board Title is required",
                    minLength: 4,
                  })}
                  placeholder="Title"
                  type="text"
                  error={errors.title}
                />
              </div>
              {errors.title && (
                <p role="alert" className="text-red-700 py-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="mt-6 w-full flex flex-row-reverse">
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
                  onClick={() => modalContext.closeModal("create-board")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCreateMessageBoard;
