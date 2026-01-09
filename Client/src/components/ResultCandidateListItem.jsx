import makeNameShort from "../utils/makeNameShort";

function ResultCandidateListItem({ candidate }) {
  const shortName = makeNameShort(candidate.name);

  return (
    <div className=" w-full border-t-1 border-black/4 shadow-sm/10 p-3 h-20 flex items-center justify-between rounded-lg ">
      <div className="flex">
        <div
          className=" w-12 rounded-lg h-12 bg-yellow-500 flex justify-center items-center text-white font-bold"
          style={{ backgroundColor: `${candidate.candidateColor}` }}
        >
          {shortName}
        </div>
        <div className="ml-4 text-sm flex flex-col justify-center ">
          <div className="font-bold text-base">{candidate.name}</div>
          <div className="font-normal text-sm text-black/60">
            {candidate.party}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mr-4">
        <div className="font-bold">{candidate.votes}</div>
        <div className="font-normal text-sm text-black/60 ">Votes</div>
      </div>
    </div>
  );
}

export default ResultCandidateListItem;
