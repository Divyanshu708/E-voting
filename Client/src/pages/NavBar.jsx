import { NavLink, useNavigate } from "react-router-dom";
import Vote from "../assets/VOTE.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import userLogo from "../assets/userLogo.svg";
import logoutLogo from "../assets/logoutLogo.svg";
import { useState } from "react";
import { useGetMe } from "../services/useUserHook";

function NavBar() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const { isLoading, data } = useGetMe();
  if (isLoading) return;

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
      withCredentials: true,
    });
    dispatch(logout());
    navigate("/");
    toast.success("successfully Logged out!");
  }

  return (
    <div className="w-full h-20 flex items-center">
      <nav className="navBar w-full z-1 flex flex-row justify-between mr-20 ml-12">
        <img src={Vote} className="logo cursor-pointer"></img>

        <div className="navButtons flex z-1 gap-15">
          <NavLink className="navBtn" to="/">
            Home
          </NavLink>

          <NavLink
            className="navBtn"
            to={`${authState.isAuthenticated ? "/vote" : "/login"}`}
          >
            Vote
          </NavLink>
          <NavLink className="navBtn" to="/results">
            Results
          </NavLink>
          {authState.role === "admin" ? (
            <>
              <NavLink className="navBtn" to="/campaign">
                Campaign
              </NavLink>
              <NavLink className="navBtn" to="/blockchain">
                Blockchain
              </NavLink>
            </>
          ) : (
            ""
          )}
          {authState.isAuthenticated ? (
            // <button
            //   className="border-2 border-white/90 rounded-full w-auto px-6 h-10 flex justify-center items-center cursor-pointer hover:scale-105 transition-all text-md"
            //   onClick={handleLogout}
            // >
            //   Logout
            // </button>
            <div>
              <img
                src={userLogo}
                className="w-12 hover:scale-110 cursor-pointer transition-all"
                onClick={() => setShowModel(!showModel)}
              />
              {showModel ? (
                <div className=" absolute right-1 top-13 w-42 h-28 border-2 border-black/10 px-2 py-1  bg-slate-50 rounded-xl text-black/50 text-sm flex flex-col justify-around items-start ">
                  <div>
                    <div className="ml-2">
                      Role:
                      <span className="text-blue-950 ml-1">
                        {data?.data?.role}
                      </span>
                    </div>
                    <div className="ml-2">
                      Voter ID:
                      <span className="text-blue-950 ml-1">
                        {data?.data?.voterId}
                      </span>
                    </div>
                    <div className="overflow-auto ml-2">
                      Name:
                      <span className="text-wrap text-blue-950 ml-1">
                        {data?.data?.name}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex bg-blue-900 text-white h-8  w-full justify-center items-center gap-2 rounded-xl cursor-pointer hover:scale-103 transition-all"
                    onClick={handleLogout}
                  >
                    Logout <img src={logoutLogo} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <NavLink
              className="border-2 w-28 flex justify-center items-center rounded-full text-lg "
              to="/login"
            >
              Sign up
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
