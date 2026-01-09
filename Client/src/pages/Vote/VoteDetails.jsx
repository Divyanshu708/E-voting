import { useParams } from "react-router-dom";
import VotePage from "../../components/VotePage";
import { useCampaignById } from "../../services/useCampaignHooks";
import { useState } from "react";

function VoteDetails() {
  const paramsId = useParams().id;
  const { isLoading, data } = useCampaignById(paramsId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return;

  return (
    <div className="w-full h-auto max-h-[72dvh] rounded-lg shadow-md/10 border-1 border-black/5 ">
      <div className="p-4 text-2xl text-black/60 ml-6">Candidates:</div>
      <div className="votePageList grid h-auto max-h-[63dvh]  grid-cols-4 gap-4 px-7 pb-10 overflow-auto">
        {data.candidates?.map((e) => (
          <VotePage
            key={e.id}
            campaignId={paramsId}
            candidate={e}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        ))}
      </div>
    </div>
  );
}

export default VoteDetails;
