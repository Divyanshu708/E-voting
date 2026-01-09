import BlueButton from "../../components/Ui/BlueButton";
import GreyButton from "../../components/Ui/GreyButton";
import CandidateItem from "../../components/CandidateItem";
import { useState } from "react";
import colorGenerator from "../../utils/colorGenrator";
import { sendData } from "../../utils/axiosMethods";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddCampaignModel({ setShowAddCampaign }) {
  const [candidatesList, setCandidatesList] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) =>
      sendData("http://localhost:8000/api/campaigns/", body),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);

      setShowAddCampaign(false);

      toast("Campaign added", {
        position: "top-center",
        autoClose: 2000,

        style: {
          color: "#1e1066",
        },
      });
    },
  });

  function handleAddCandidateBtn() {
    const newCandidateAdd = {
      id: crypto.randomUUID(),
      name: "",
    };

    setCandidatesList([...candidatesList, newCandidateAdd]);
  }

  function handleChange(id, field, value) {
    setCandidatesList((candidatesList) =>
      candidatesList.map((el) =>
        el.id === id ? { ...el, [field]: value } : el
      )
    );
  }

  function handleDelete(id) {
    setCandidatesList((candidatesList) =>
      candidatesList.filter((el) => el.id !== id)
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(candidatesList);

    if (candidatesList.length < 2) {
      toast("Atleast need 2 candidates!", {
        position: "top-center",
        autoClose: 2000,

        style: {
          color: "#1e1066",
        },
      });

      return;
    }

    const modifiedList = candidatesList.map((el, i) => ({
      ...el,
      party: `Party ${i + 1}`,
      candidateColor: colorGenerator(),
    }));

    mutation.mutate({
      campaignName,
      campaignColor: colorGenerator(),
      candidates: modifiedList,
    });

    // if (mutation.isError) {
    //   console.log(mutation.error.message);
    //   return;
    // }
  };

  return (
    <form
      className="add-campaign-model w-full h-[100dvh] bg-blue-950/40  flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-[hsl(0_0_100)] p-4 w-1/2 h-[30rem] rounded-md border-1 border-black/10 shadow-sm/10 flex flex-col gap-3">
        <div className="text-xl pl-5 text-blue-900 font-semibold w-full flex justify-between">
          <p>Candidates List</p>

          <p
            className="mr-5 text-2xl cursor-pointer hover:scale-110 transition-all"
            onClick={() => setShowAddCampaign(false)}
          >
            &times;
          </p>
        </div>

        <hr className="text-blue-800 h-0" />

        <label className="mt-1 ml-2 text-blue-900/95">Campain Name:</label>
        <input
          className="w-full h-12 -mt-2 bg-[hsl(0_0_96)] rounded-md outline-none p-4 px-7 placeholder:text-[hsl(0_0_80)]"
          placeholder="Campaign Name"
          onChange={(e) => setCampaignName(e.target.value)}
          value={campaignName}
        ></input>

        <label className="mt-2 ml-2 text-blue-900/95">Add Candidates:</label>

        <div className="relative -mt-2 bg-gray-100 p-4 h-56 rounded-xl ">
          <div className="candidate-list overflow-auto h-full max-h-45 space-y-3 pr-1 ">
            {candidatesList.map((candidate) => (
              <CandidateItem
                key={candidate.id}
                candidate={candidate}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            ))}
          </div>

          <button
            type="button"
            className="text-2xl w-12 h-12 rounded-full bg-blue-800 hover:bg-blue-900 text-white/95 cursor-pointer absolute bottom-4 right-4 transition shadow-lg flex items-center justify-center"
            onClick={handleAddCandidateBtn}
          >
            &#43;
          </button>
        </div>

        <div className="flex justify-between items-center gap-5">
          <BlueButton
            className={`w-full from-blue-800 to-violet-800`}
            disabled={mutation.isPending}
            type={"submit"}
          >
            {mutation.isPending ? "Saving..." : "Confirm"}
          </BlueButton>
          <GreyButton
            type={"button"}
            className={`w-full`}
            onClick={() => setShowAddCampaign(false)}
          >
            Cancel
          </GreyButton>
        </div>
      </div>
    </form>
  );
}

export default AddCampaignModel;
