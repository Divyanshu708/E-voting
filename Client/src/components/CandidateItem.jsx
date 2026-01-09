import { useState } from "react";
import del from "../assets/delete.svg";

function CandidateItem({ candidate, handleChange, handleDelete }) {
  return (
    <div className="flex gap-2 ">
      <img
        src={del}
        className="scale-110 ml-1 cursor-pointer hover:scale-115 transition-all"
        onClick={() => handleDelete(candidate.id)}
      />
      <input
        type="text"
        className="w-full p-3 outline-none placeholder:text-[hsl(0_0_80)] pl-5 bg-white  rounded shadow "
        placeholder="Candidate Name"
        onChange={(e) => handleChange(candidate.id, "name", e.target.value)}
      />
    </div>
  );
}

export default CandidateItem;
