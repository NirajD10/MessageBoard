import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../context/modal-context";
import { MessageBoardContext } from "../../context/messageboard-context";
import Modal from "../Modal";

function ModalLeaveMessageBoard() {
  const { board_id } = useParams();
  const modalContext = useContext(ModalContext);
  const messageBoardContext = useContext(MessageBoardContext);

  function responseLeavegroupHandler() {
    messageBoardContext.leaveMessagegroup(board_id);
  }
  return (
    <Modal ModalType="leave-board">
      <div className="text-center sm:max-w-[525px]">
        <h3 className="text-xl font-bold my-2">Confirm to leave</h3>
        <div className="mx-auto my-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to leave message board? Once the action is
            used,it cannot rejoin or invite again.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="mt-6 w-full flex flex-row-reverse">
            <div className="w-fit flex gap-2">
              <button
                type="submit"
                onClick={responseLeavegroupHandler}
                className="block w-full rounded-lg bg-primaryColor px-5 py-3 text-sm font-medium text-white"
              >
                Submit
              </button>
              <button
                type="button"
                className="block w-full rounded-lg hover:bg-secondaryForeground px-5 py-3 text-sm font-medium"
                onClick={() => modalContext.closeModal("leave-board")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalLeaveMessageBoard;
