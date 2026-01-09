import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import ResultCandidateListItem from "../../components/ResultCandidateListItem";
import {
  useCampaignById,
  useCampaignResults,
} from "../../services/useCampaignHooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8001");

function ResultDetails({}) {
  const paramsId = useParams().id;
  const { isLoading, data, refetch } = useCampaignResults(paramsId);

  useEffect(() => {
    socket.on("resultUpdated", (data) => {
      if (data.campaignId == paramsId) {
        refetch();
      }
    });

    return () => {
      socket.off("resultUpdated");
    };
  }, [paramsId]);

  if (isLoading) return;

  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <p className="text-blue-900/90 text-2xl tracking-wide font-medium pl-3 mb-3">
          Campain Results
        </p>
      </div>

      <div className="w-full h-[72dvh] flex flex-row p-3 bkc-container overflow-auto">
        <div className="w-full h-full flex flex-col gap-6">
          <motion.div
            style={{ width: "97%" }}
            className="h-40 gap-4 shadow-md/10 rounded-lg p-3 flex justify-around"
          >
            <div className=" w-[30%] h-full bg-black/2 shadow-sm/10 rounded-lg flex flex-col justify-center items-center gap-2">
              <div className=" text-md font-[500] text-black/50">
                Total Votes
              </div>
              <div className="text-xl font-semibold tracking-wide text-black/80">
                {data?.totalVotes}
              </div>
            </div>

            <div className=" w-[60%] h-full bg-black/2 shadow-sm/10 rounded-lg flex flex-col justify-center gap-2">
              <div className="flex justify-between mx-6">
                <div className="flex flex-col justify-center items-center ml-3">
                  <div className=" text-md font-[500] text-black/50">
                    Leading
                  </div>
                  <div className="flex items-center  gap-3">
                    <div className="bg-blue-500 w-3 h-3 rounded-[2px]"></div>
                    <div className="text-xl font-semibold text-black/80">
                      {data?.leading?.name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center w-52 ">
                  <div className=" text-md font-[500] text-black/50">
                    With votes
                  </div>

                  <div className="text-xl font-semibold text-black/80 flex items-center justify-between gap-1">
                    {data?.leading?.withVotes}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className=" w-[30%] h-full bg-black/2 shadow-sm/10 rounded-lg flex flex-col justify-center items-center gap-2">
              <div className=" text-md font-[500] text-black/50">Turnout</div>
              <div className="text-xl font-semibold tracking-wide text-black/80">
                90%
              </div>
            </div> */}
          </motion.div>

          <motion.div
            style={{
              width: "97%",
              height: "300px",
            }}
            className="barchart shadow-md/10 rounded-lg "
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.candidates}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value) => [`${value} votes`, "Votes"]} />
                <Bar
                  dataKey="votes"
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {data?.candidates?.map((entry, i) => (
                    <Cell key={i} fill={entry.candidateColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          style={{
            width: "50%",
            padding: "1rem",
          }}
          className="rounded-lg shadow-lg/10 border-t-1 border-black/4 h-full "
        >
          <div className="flex justify-between ml-3 mr-7 mb-3">
            <div>Candidates</div>
            <div className="font-normal text-md text-black/50">Live</div>
          </div>

          <div className="ResultCandidateList flex flex-col gap-3 h-[90%] overflow-auto pl-3 pr-4">
            {data?.candidates?.map((e) => (
              <ResultCandidateListItem key={e.id} candidate={e} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultDetails;
