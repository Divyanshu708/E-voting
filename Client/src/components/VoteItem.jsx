import BlueButton from "../components/Ui/BlueButton";

function VoteItem({ campaign, onVote }) {
  return (
    <div className="campaign-list rounded-xl bg-blue-950/5 border-1 border-black/10 p-2 flex justify-around flex-col gap-2 h-52">
      <div className="w-full h-40 border-black/8 bg-white  border-1 rounded-lg flex justify-center items-center text-2xl">
        <p className="font-normal text-black/50">{campaign.campaignName}</p>
      </div>

      <BlueButton
        className="w-full h-15 text-xl from-violet-800 to-blue-800"
        onClick={onVote}
      >
        Vote Now
      </BlueButton>
    </div>
  );
}

export default VoteItem;
