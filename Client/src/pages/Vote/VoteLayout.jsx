import { Outlet } from "react-router-dom";
import NavBar from ".././NavBar";

function VoteLayout() {
  return (
    <div>
      <div className="w-full h-20 bg-linear-to-tl from-[#6700cd] via- [#002C83] to-[#0b0071]">
        <NavBar />
      </div>

      <div className="w-full p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default VoteLayout;
