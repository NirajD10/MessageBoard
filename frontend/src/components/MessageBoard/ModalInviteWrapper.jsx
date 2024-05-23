import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../context/modal-context";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import InputField from "../InputField";
import { MessageBoardContext } from "../../context/messageboard-context";
import { useParams } from "react-router-dom";

let error_message;

function ModalInviteWrapper() {
  const { board_id } = useParams();
  const modalContext = useContext(ModalContext);
  const messageBoardContext = useContext(MessageBoardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (messageBoardContext.errorInvitation !== null) {
      error_message = (
        <p role="alert" className="w-full text-red-700 text-center py-1">
          {messageBoardContext.errorInvitation}
        </p>
      );
    }
  }, [messageBoardContext.errorInvitation]);

  function onSubmit(data) {
    messageBoardContext.postInvitationMember({
      id: board_id,
      receipt_email: data,
    });
  }

  return (
    <Modal ModalType="invite-member">
      <div className="text-center sm:max-w-[525px]">
        <h3 className="text-xl font-bold my-2">Invite Member</h3>
        <div className="mx-auto my-4">
          <p className="text-sm text-gray-500">
            Enter an receipt email address to invite this Message Board. Make
            sure receipt should be registered account of this site.
          </p>
        </div>
        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 w-full"
          >
            <div className="grid grid-cols-5 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <div className="col-span-4">
                <InputField
                  {...register("email", {
                    required: "Receipt mail is required",
                  })}
                  placeholder="Receipt Email id"
                  type="email"
                  error={errors.email}
                />
              </div>
            </div>
            {errors.email && (
              <p role="alert" className="w-full text-red-700 text-center py-1">
                {errors.email.message}
              </p>
            )}
            {error_message}

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
                  onClick={() => modalContext.closeModal("invite-member")}
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

export default ModalInviteWrapper;
