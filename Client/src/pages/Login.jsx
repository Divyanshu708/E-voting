import loginImg from "../assets/images/loginImage.jpg";
import loginLogo from "../assets/loginLogo.svg";
import voterIdLogo from "../assets/voterIdLogo.svg";
import lockLogo from "../assets/lockLogo.svg";
import Vote from "../assets/VOTE.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { sendData } from "../utils/axiosMethods";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
function Login() {
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body) => {
      const res = await axios.post(
        "http://localhost:8000/api/user/login/",
        body,
        {
          withCredentials: true,
        }
      );

      return res.data.user;
    },
    onSuccess: (data) => {
      dispatch(login(data));
      navigate(`/`);
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.dismiss(undefined, { delay: 0 });
      toast.error(error.response.data.message, { toastId: "single" });
      console.log(error);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      voterId,
      password,
    };

    mutation.mutate(body);
  }

  return (
    <div
      className="bg-linear-to-tl from-[#002C83] via-[#5C92FF] to-[#460071] w-full h-[100dvh] flex justify-around items-center 
    "
    >
      <img src={Vote} className="logo2" onClick={() => navigate("/")}></img>
      <div className="flex">
        <div className="w-[27rem] h-[30rem] bg-linear-to-tl from-[#0b0084] to-[#7164FF] rounded-l-2xl shadow-md/40 flex justify-center items-center">
          <form
            className=" w-[18rem] h-[17rem] flex flex-col justify-center items-center gap-4 mb-6"
            onSubmit={handleSubmit}
          >
            <img src={loginLogo} className=" "></img>

            <div className="w-full flex flex-col gap-4">
              <div className="border-2 h-12 flex justify-center items-center gap-4 pr-5 rounded-full border-white">
                <input
                  className="text-white/70 rounded-full w-full h-full mt-0.5  pl-5 text-lg outline-none"
                  placeholder="Voter ID"
                  onChange={(e) => setVoterId(e.target.value)}
                  value={voterId}
                ></input>
                <img src={voterIdLogo} className="h-auto w-5"></img>
              </div>

              <div className="border-2  h-12 w-full rounded-full  border-white/90 flex justify-center items-center gap-4 pr-5 ">
                <input
                  className=" text-white/70 rounded-full w-full h-full mt-0.5  pl-5 text-lg outline-none"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
                <img src={lockLogo} className="h-auto w-5"></img>
              </div>
            </div>

            {/* <div className="w-full">
              <div className="w-full h-5 flex items-center gap-1 text-white/90 ml-3 mb-2">
                <input
                  type="checkbox"
                  id="myCheckbox"
                  name="option1"
                  value="value1"
                  class=""
                ></input>
                <p className="font-normal text-sm">Remember Me</p>
              </div>
            </div> */}

            <button
              className="h-12 mt-2 w-full bg-white/90 rounded-full text-2xl font-semibold text-blue-900  shadow-md/30 cursor-pointer hover:bg-linear-to-t from-blue-900/20 to-white"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>

        <div className="w-[27rem] h-[30rem] bg-white rounded-r-2xl flex justify-center items-center shadow-md/40">
          <img src={loginImg} className="loginImg "></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
