import { useNavigate } from "react-router-dom";
import ResultsItem from "../../components/ResultsItem";
import { useCampaigns } from "../../services/useCampaignHooks";

function Results() {
  const { isLoading, data } = useCampaigns();

  const navigate = useNavigate();

  if (isLoading) return;

  return (
    <>
      <div className="flex justify-between ">
        <p className="text-blue-900/90 text-2xl tracking-wide font-medium pl-3 mb-3">
          Ongoing Campaigns:
        </p>
      </div>

      <div className="w-full h-[72dvh] grid grid-cols-4 gap-4 p-3 bkc-container overflow-auto">
        {data?.map((e) => (
          <ResultsItem
            key={e._id}
            campaign={e}
            onVote={() => navigate(`/results/${e._id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default Results;
