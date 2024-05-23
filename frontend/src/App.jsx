import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import React from "react";
import { Toaster } from "sonner";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/Notification";
import MessageBoardDetail from "./pages/MessageBoardDetail";
import AuthProvider from "./context/auth-context";
import ModalProvider from "./context/modal-context";
import MessageBoardProvider from "./context/messageboard-context";
import InvitationProvider from "./context/invitation-context";
import MessageProvider from "./context/message-context";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "notification", element: <Notification /> },
      { path: ":board_id", element: <MessageBoardDetail /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <Toaster expand={true} richColors closeButton />
      <AuthProvider>
        <ModalProvider>
          <MessageBoardProvider>
            <MessageProvider>
              <InvitationProvider>
                <RouterProvider router={router} />
              </InvitationProvider>
            </MessageProvider>
          </MessageBoardProvider>
        </ModalProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
