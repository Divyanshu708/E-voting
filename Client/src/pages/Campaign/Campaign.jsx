import { useState } from "react";
import CampaignItem from "../../components/CampaignItem";
import NavBar from ".././NavBar";
import BlueButton from "../../components/Ui/BlueButton";
import AddCampaignModel from "./AddCampaignModel";
import { useCampaigns } from "../../services/useCampaignHooks";

function Campaign() {
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  const { isLoading, data } = useCampaigns();

  if (isLoading) return;

  return (
    <div>
      <div className="w-full h-20 bg-linear-to-tl from-[#3000cd] via- [#002C83] to-[#460071]">
        <NavBar />
      </div>

      <div className="w-full p-10  ">
        {showAddCampaign ? (
          <AddCampaignModel setShowAddCampaign={setShowAddCampaign} />
        ) : (
          ""
        )}

        <div className="flex justify-between ">
          <p className="text-blue-900/90 text-2xl tracking-wide font-medium pl-3 mb-3">
            Campains List
          </p>

          <BlueButton
            className="w-40 from-blue-800 to-violet-800 mr-10"
            onClick={() => setShowAddCampaign(true)}
          >
            Add Campaign
          </BlueButton>
        </div>

        <div className=" w-full h-[72dvh] grid grid-cols-4 gap-4 p-3 bkc-container overflow-auto">
          {data?.map((e) => (
            <CampaignItem key={e._id} campaign={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaign;
