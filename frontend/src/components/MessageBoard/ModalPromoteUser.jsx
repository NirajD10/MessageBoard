import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { ModalContext } from "../../context/modal-context";
import { MessageBoardContext } from "../../context/messageboard-context";

import Modal from "../Modal";

function ModalPromoteUser({ user_id, role }) {
  const { board_id } = useParams();
  const modalContext = useContext(ModalContext);
  const messageBoardContext = useContext(MessageBoardContext);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    messageBoardContext.updateUserRoles(board_id, user_id, data);
  }
  return (
    <Modal ModalType="promote-roles">
      <div className="text-center sm:max-w-[525px]">
        <h3 className="text-xl font-bold my-2">Update User roles </h3>
        <div className="mx-auto my-4">
          <p className="text-sm text-gray-500">
            Choose user roles where you want change to.
          </p>
        </div>
        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 w-full"
          >
            <div>
              <label
                htmlFor="HeadlineAct"
                className="block text-sm font-medium text-gray-900"
              >
                Select Roles
              </label>

              <select
                {...register("roles", {
                  required: "Select at least roles",
                })}
                placeholder="Choose Roles"
                error={errors.roles}
                defaultValue={() => setValue(role)}
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            {errors.roles && (
              <p role="alert" className="w-full text-red-700 text-center py-1">
                {errors.roles.message}
              </p>
            )}

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
                  onClick={() => modalContext.closeModal("promote-roles")}
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

export default ModalPromoteUser;
