import { Presentation } from "@phosphor-icons/react";
import React from "react";

function AuthWrapper(props) {
  return (
    <React.Fragment>
      <header className="flex flex-col justify-center items-center w-full py-6">
        <Presentation size={72} color="#121212" />
        {/* <p className="text-tPrimary font-bold my-2 text-lg uppercase">MessageBoard</p> */}
      </header>
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-lg flex flex-col  items-center justify-center">
          <h1 className="text-center text-xl font-bold text-tPrimary sm:text-3xl">
            {props.title}
          </h1>
          {props.children}
        </div>
      </main>
    </React.Fragment>
  );
}

export default AuthWrapper;
