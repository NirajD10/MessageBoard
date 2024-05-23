import React from "react";
import HomeCard from "../components/HomeCard";
import { BellZ, UsersFour } from "@phosphor-icons/react";

function Home() {
  return (
    <div className="sm:flex sm:flex-row sm:h-full">
      <div className="w-full flex justify-center items-center">
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <HomeCard
              title="Notification"
              description="Check Invitation regarding to join Message Board"
              linkurl="/notification"
            >
              <BellZ size={32} color="#121212" />
            </HomeCard>
            <HomeCard
              title="Create Message Group"
              description="create a new board where you can invite people"
              linkurl="/#"
            >
              <UsersFour size={32} color="#121212" />
            </HomeCard>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
