import BlockchainItem from "../../components/BlockchainItem";
import { useCampaigns } from "../../services/useCampaignHooks";
import { useNavigate } from "react-router-dom";
function Blockchain() {
  const navigate = useNavigate();
  const { isLoading, data } = useCampaigns();

  if (isLoading) return;

  return (
    <>
      <div className="flex justify-between ">
        <p className="text-blue-900/90 text-2xl tracking-wide font-medium pl-3 mb-3">
          Ongoing Campains
        </p>
      </div>

      <div className="w-full h-[72dvh] grid grid-cols-4 gap-4 p-3 bkc-container overflow-auto">
        {data?.map((e) => (
          <BlockchainItem
            key={e._id}
            campaign={e}
            onVote={() => navigate(`/blockchain/${e._id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default Blockchain;
