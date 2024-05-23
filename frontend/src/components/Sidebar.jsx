import React, { useContext } from "react";
import IconButton from "./IconButton";
import {
  Bell,
  PencilSimpleLine,
  Presentation,
  SignOut,
} from "@phosphor-icons/react";
import MenuOptionsButton from "./MenuOptionsButton";
import { NavLink, useNavigate } from "react-router-dom";
import MessageList from "./MessageList";
import { ModalContext } from "../context/modal-context";
import ModalCreateMessageBoard from "./MessageBoard/ModalCreateMessageBoard";
import { AuthContext } from "../context/auth-context";

function Sidebar() {
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const messageboardModalhandler = () => {
    modalContext.openModal("create-board");
  };
  const logoutHandler = () => {
    authContext.logout();
    window.location.href = "/login";
  };
  return (
    <React.Fragment>
      <nav className="fixed bg-secondaryForeground w-3/5 md:w-[40%] lg:w-1/6 lg:border-r-[1px] lg:border-r-[#121212]/10 h-[100svh] px-3 block">
        <div className="flex flex-row justify-between items-center mt-2">
          <NavLink to="/">
            <h2 className="text-2xl font-bold">MessageBoard</h2>
          </NavLink>
          <IconButton clickFunctionHandler={messageboardModalhandler}>
            <PencilSimpleLine size={28} color="#7d7d7d" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-2 my-6">
          <MenuOptionsButton clickfunction={messageboardModalhandler}>
            <div className="h-6 w-6 flex-shrink-0">
              <Presentation size={24} color="#121212" />
            </div>
            <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-tPrimary">
              New Message Board
            </div>
          </MenuOptionsButton>
          <MenuOptionsButton clickfunction={() => navigate("/notification")}>
            <div className="h-6 w-6 flex-shrink-0">
              <Bell size={24} color="#121212" />
            </div>
            <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-tPrimary">
              Notification
            </div>
          </MenuOptionsButton>
        </div>
        {authContext.user && <MessageList />}
        
        <MenuOptionsButton clickfunction={logoutHandler}>
          <div className="h-6 w-6 flex-shrink-0">
            <SignOut size={24} color="#121212" />
          </div>
          <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-tPrimary">
            Logout
          </div>
        </MenuOptionsButton>
      </nav>
      {modalContext.open && <ModalCreateMessageBoard />}
    </React.Fragment>
  );
}

export default Sidebar;
