import { Outlet } from "react-router-dom";
import NavBar from ".././NavBar";

function ResultsLayout() {
  return (
    <div>
      <div className="w-full h-20 bg-linear-to-tl from-[#002C83] via-[#2800ac] to-[#460071]">
        <NavBar />
      </div>

      <div className="w-full p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default ResultsLayout;
