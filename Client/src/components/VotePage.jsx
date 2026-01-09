import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendData } from "../utils/axiosMethods";
import makeNameShort from "../utils/makeNameShort";
import BlueButton from "./Ui/BlueButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHasVoted } from "../services/useBlockchainHooks";

function VotePage({ candidate, campaignId, isSubmitting, setIsSubmitting }) {
  const shortName = makeNameShort(candidate.name);
  const queryClient = useQueryClient();
  const authState = useSelector((state) => state.auth);

  const { isLoading, data } = useHasVoted(campaignId);

  const mutation = useMutation({
    mutationFn: (body) =>
      sendData(`http://localhost:8000/api/blockchain/castVote`, body, {
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);

      toast.success("Voted Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  if (isLoading) return;

  function handleVote() {
    try {
      mutation.mutate({
        campaignId,
        voterId: authState.voterId,
        candidate: {
          id: candidate.id,
          name: candidate.name,
        },
      });
      setIsSubmitting(true);
    } catch (err) {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="campaign-list h-32 rounded-xl bg-blue-950/5 border-1 border-black/10 py-2 px-3 flex justify-around flex-col gap-3">
      <div className="flex items-center gap-4">
        <div
          className="w-13 h-13 text-xl tracking-widest  flex items-center justify-center font-bold text-white rounded-lg"
          style={{ backgroundColor: `${candidate.candidateColor}` }}
        >
          {shortName}
        </div>
        <div className="px-1 mt-1">
          <p className="text-black/70 text-xl font-bold">{candidate.name}</p>
          <p className="text-black/50 text-base">{candidate.party}</p>
        </div>
      </div>

      <button
        className={`bg-linear-to-tl from-blue-800 to-violet-800 h-12  bg-linear-to-tl  text-white/90 border-1 rounded-lg cursor-pointer hover:from-violet-900 hover:to-blue-900  disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-500 disabled:opacity-80`}
        onClick={handleVote}
        // disabled={authState.role === "admin" ? true : false}
        disabled={
          authState.role === "admin" || data.hasVoted || isSubmitting
            ? true
            : false
        }
      >
        Vote
      </button>
    </div>
  );
}

export default VotePage;
