import { useState } from "react";
import BlockchainListItem from "../../components/BlockchainListItem";
import ReEvalutaion from "../../components/ReEvalutaion";
import { useBlockchainById } from "../../services/useBlockchainHooks";
import { useParams } from "react-router-dom";

function BlockchainDetails() {
  const [showEvalutaion, setShowEvalutaion] = useState(false);
  const param = useParams().id;
  const { isLoading, data } = useBlockchainById(param);

  if (isLoading) return;

  function handleReValidate() {
    setShowEvalutaion(true);
  }

  return (
    <>
      {showEvalutaion ? (
        <ReEvalutaion setShowEvalutaion={setShowEvalutaion} />
      ) : (
        ""
      )}

      <div className="w-full p-10">
        <div className="flex justify-between mb-5">
          <h1 className="text-blue-900/90 text-2xl tracking-wide font-medium pl-3 mb-3">
            Blockchain Explorer
          </h1>
          <button
            className="bg-blue-800 w-40 h-12 text-white/90 flex justify-center items-center cursor-pointer mr-10 rounded-md hover:scale-102 transition-all"
            onClick={handleReValidate}
          >
            Re-Validate
          </button>
        </div>

        <div className=" w-full h-[66dvh]  overflow-auto bkc-container">
          {data?.map((e) => (
            <BlockchainListItem key={e._id} block={e} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BlockchainDetails;
