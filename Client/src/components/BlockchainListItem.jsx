function BlockchainListItem({ block }) {
  const timestamp = block.timestamp.split("T")[0];

  return (
    // <div className="border-1 border-[#170ec793]  h-18 rounded-2xl grid grid-cols-[0.9fr_2fr_2fr_2fr_2fr] gap-4 text-xl shadow-sm/10 mb-6 mt-2 mx-3">
    // <div className="bg-blue-900 rounded-l-2xl text-white/90 flex items-center justify-center">
    //   Index: {block.index}
    // </div>
    //   <div className=" text-blue-900 bkc-list flex items-center justify-center border-r-1 border-blue-800/50">
    //     Candidate: {block.candidate.name}
    //   </div>
    //   <div className=" text-blue-900 flex flex-col items-center justify-center border-r-1 border-blue-800/50 ">
    //     <div>Previous Hash:</div>{" "}
    //     <div className="overflow-y-auto">{block.previousHash}</div>
    //   </div>
    //   <div className=" text-blue-900 flex items-center justify-center border-r-1 border-blue-800/50 overflow-y-auto">
    //     <div>Hash: </div>
    //     <div className="overflow-y-auto">{block.hash}</div>
    //   </div>
    //   <div className=" text-blue-900 flex items-center justify-center ">
    //     Timestamp: {timestamp}
    //   </div>
    // </div>

    <div className="w-[98%] h-28 border-t-1 flex m-3 rounded-xl bg-black/5 border-white shadow-sm/15">
      <div className="bg-blue-900 rounded-l-xl text-white/90 flex items-center justify-center w-42">
        Index: {block.index}
      </div>
      <div className="text-blue-900/100 flex flex-col justify-center ml-4 text-base">
        <div>
          <span className="font-semibold mr-2">Candidate:</span>
          <span className="text-black/70">{block.candidate.name}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Previous Hash:</span>
          <span className="text-black/70">{block.previousHash}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Current Hash:</span>
          <span className="text-black/70">{block.hash}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Timestamp: </span>
          <span className="text-black/70">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default BlockchainListItem;
