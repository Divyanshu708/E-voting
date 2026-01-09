import { useParams } from "react-router-dom";
import { useBlockchainValidate } from "../services/useBlockchainHooks";

function ReEvalutaion({ setShowEvalutaion }) {
  const id = useParams().id;
  const { isLoading, data } = useBlockchainValidate(id);

  if (isLoading) return;

  return (
    <div className="add-campaign-model w-full h-[100dvh] bg-blue-950/40  flex justify-center items-center">
      <div className="bg-[hsl(0_0_90)] p-4 w-1/2 h-[30rem] rounded-md border-1 border-black/10 shadow-sm/10 flex flex-col gap-3">
        <div className="text-xl pl-5 text-blue-900 font-semibold w-full flex justify-between">
          <p>Re-Evaluated Results:</p>

          <button
            className="mr-5 text-2xl cursor-pointer"
            onClick={() => setShowEvalutaion(false)}
          >
            &times;
          </button>
        </div>

        <hr className="text-blue-800 h-0 overflow-auto" />
        <div className="p-2  h-full flex flex-col gap-2">
          {data?.map((e, i) => (
            <div
              key={i}
              className="w-full h-20 bg-[hsl(0_0_95)] rounded-lg shadow-sm flex items-center justify-center"
            >
              <div
                className="border-2 w-[98%] h-[82%] rounded-lg flex items-center pl-5 text-lg"
                style={{ borderColor: `${e.color}`, color: `${e.color}` }}
              >
                {e.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReEvalutaion;
