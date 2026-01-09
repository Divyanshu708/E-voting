import { useMutation, useQueryClient } from "@tanstack/react-query";
import BlueButton from "./Ui/BlueButton";
import GreyButton from "./Ui/GreyButton";
import axios from "axios";
import { toast } from "react-toastify";

function CampaignItem({ campaign }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:8000/api/campaigns/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);

      toast(`${campaign.campaignName} Campaign  Deleted!`, {
        position: "top-center",
        autoClose: 2000,

        style: {
          color: "#1e1066",
        },
      });
    },
    onError: (error) => {
      console.error("❌ Delete failed:", error);
      toast(`Error deleting: ${error.message}`);
    },
  });

  return (
    <div className="campaign-list rounded-xl bg-blue-950/5 border-1 border-black/10 p-2 flex justify-around flex-col gap-2 h-52">
      <div
        className={`w-full h-42 border-black/8 bg-white/95  border-1 rounded-lg flex justify-center items-center text-2xl `}
      >
        <p className="font-normal text-2xl  text-black/50">
          {campaign.campaignName}
        </p>
      </div>

      {/* <GreyButton className="w-full h-11">Edit</GreyButton> */}

      <BlueButton
        className="w-full h-15 from-violet-800 to-blue-800"
        onClick={() => mutation.mutate(campaign._id)}
      >
        Delete
      </BlueButton>
    </div>
  );
}

export default CampaignItem;
