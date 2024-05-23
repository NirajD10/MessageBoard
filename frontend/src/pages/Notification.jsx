import { Bell } from "@phosphor-icons/react";
import React, { useContext, useEffect } from "react";
import NotificationItem from "../components/Notification/NotificationItem";
import { InvitationContext } from "../context/invitation-context";
import { AuthContext } from "../context/auth-context";

function Notification() {
  const authContext = useContext(AuthContext);
  const invitationContext = useContext(InvitationContext);

  useEffect(() => {
    if(authContext.isSuccess === true) {
      const fetchnotificationlist = () => {
        invitationContext.getNotificationInvitationList()
      }
      fetchnotificationlist();
    }
  }, [])
  return (
    <React.Fragment>
      <div className="h-12 bg-[#f5f5f5] py-2 px-3">
        <div className="h-full flex items-center gap-2">
          <Bell size={28} color="#121212" />
          <p className="text-base font-bold h-fit">Notification</p>
        </div>
      </div>
      <div className="h-full py-8 px-3">
        <p className="text-secondary text-sm font-bold">Invitation</p>
        <ul className="flex flex-col gap-2 my-3">
          {(invitationContext.notificationlist?.length === 0 ||
            invitationContext.notificationlist === undefined) && (
            <li className="w-full text-center">No invitation at the moment.</li>
          )}
          {invitationContext.notificationlist?.map((item) => (
            <NotificationItem key={item._id} item={item} />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Notification;
