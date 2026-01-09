import headerStyle from "../assets/headerStyle.svg";

import homeImg1_1 from "../assets/images/homeImg1.1.png";
import homeImg2 from "../assets/images/homeImg2.jpg";
import AboutTheProject from "../assets/AboutTheProject.svg";
import aboutPage from "../assets/aboutPage.svg";
import objectives from "../assets/objectives.svg";
import footStyle from "../assets/footStyle.svg";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate("/vote");
  }

  return (
    <>
      <div className="">
        <img src={headerStyle} className="headerStyle z-0"></img>
        <NavBar />
      </div>

      <div className="h-[24rem] flex mt-35 p-10 pl-30">
        <div className="w-1/2 mt-7 ml-5">
          <p className="text-[#2A4F96] text-2xl">Blockchain-Inspired</p>
          <p className="text-[#2A4F96] text-6xl font-extrabold">
            E-Voting System
          </p>
          <div className="text-[#FF9232] w-[30rem] font-normal mt-6">
            Secure. Transparent. Trustworth.{" "}
            <p>
              Reimagine the way organizations, institutions, and communities
              conduct elections — powered by blockchain principles of
              transparency and integrity.
            </p>
          </div>

          <div className="flex gap-10 mt-10">
            <button
              className="cursor-pointer hover:scale-102 transition-all bg-[#FF9232] text-slate-50 rounded-full px-10 py-1.5"
              onClick={handleNavigation}
            >
              Vote Now
            </button>
            <button className="cursor-pointer hover:scale-102 transition-all bg-[#2A4F96] text-slate-50 rounded-full px-10 py-1.5 ">
              Learn more
            </button>
          </div>
        </div>
        <img src={homeImg1_1} className="homeImg1"></img>
      </div>

      <div>
        <img src={aboutPage} className="aboutPage w-full z-0"></img>
        <div className="flex justify-center bg-slate-200">
          <img src={AboutTheProject} className="AboutTheProject" />
        </div>
        <div className=" z-1 aboutPara flex justify-center items-center gap-60">
          <p className="tracking-wider leading-9 w-100 font-thin text-2xl text-right text-slate-50 ">
            This project aims to demonstrate how blockchain concepts can enhance
            the security and transparency of electronic voting systems. By
            applying decentralization, encryption, and immutable recordkeeping,
            it ensures that every vote is counted accurately and cannot be
            altered once submitted.
          </p>
          <img src={homeImg2} className="h-auto w-90 rounded-2xl "></img>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-300"></div>

      <div>
        <div className="flex justify-center items-center h-[40rem] -mt-10">
          <img src={objectives} className="h-auto w-[70rem]"></img>
        </div>
        <img src={footStyle} className="w-full"></img>
        <div className="footText flex flex-col justify-center items-center ">
          <p className="foot1 mb-42 text-lg font-semibold">
            © 2025 E-Voting System. All rights reserved.{" "}
          </p>
          <p className="foot2 mb-25 text-lg font-light">
            Developed as a Minor Project using MERN and Simulated Blockchain
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
