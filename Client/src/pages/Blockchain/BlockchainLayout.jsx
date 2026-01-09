import NavBar from ".././NavBar";
import { Outlet } from "react-router-dom";

function BlockchainLayout() {
  return (
    <>
      <div className="w-full h-20 bg-linear-to-tl from-[#460071] via- [#002C83] to-[#3000cd]">
        <NavBar />
      </div>

      {/* <BlockchainList /> */}

      <div className="w-full p-10">
        <Outlet />
      </div>
    </>
  );
}

export default BlockchainLayout;
