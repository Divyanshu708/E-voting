import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Slide, Flip } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Campaign from "./pages/Campaign/Campaign";

import Vote from "./pages/Vote/Vote";
import VoteDetails from "./pages/Vote/VoteDetails";
import VoteLayout from "./pages/Vote/VoteLayout";

import Results from "./pages/Results/Results";
import ResultDetails from "./pages/Results/ResultDetails";
import ResultsLayout from "./pages/Results/ResultsLayout";

import Blockchain from "./pages/Blockchain/Blockchain";
import BlockchainLayout from "./pages/Blockchain/BlockchainLayout";
import BlockchainDetails from "./pages/Blockchain/BlockchainDetails";
import AppInit from "./AppInit";

import github from "./assets/github.svg";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppInit />
        <a
          className="group fixed left-11 bottom-11 cursor-pointer z-10 "
          href="https://github.com/"
        >
          <img
            className="fixed left-11 bottom-11 scale-210 hover:scale-230 transition-all z-10"
            src={github}
          />

          <div className="fixed left-1 bottom-9 h-12 w-1 pl-10 ml-10  flex items-center bg-slate-100 text-black/80 rounded-r-2xl shadow-md  overflow-hidden whitespace-nowrap *:text-opacity-0 group-hover:w-130 group-hover:text-opacity-60 z-9 text-lg transition-all duration-200 ease-out border-3 border-black/20">
            <span className="ml-6">
              Click here to see github guide on how the project works
            </span>
          </div>
        </a>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="vote" element={<VoteLayout />}>
              <Route index element={<Vote />} />
              <Route path=":id" element={<VoteDetails />} />
            </Route>

            <Route path="results" element={<ResultsLayout />}>
              <Route index element={<Results />} />
              <Route path=":id" element={<ResultDetails />} />
            </Route>

            <Route path="campaign" element={<Campaign />} />

            <Route path="blockchain" element={<BlockchainLayout />}>
              <Route index element={<Blockchain />} />
              <Route path=":id" element={<BlockchainDetails />} />
            </Route>

            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools
          initialIsOpen={true}
          buttonPosition={"bottom-right"}
        />
        <ToastContainer
          transition={Flip}
          limit={1}
          newestOnTop={true}
          closeOnClick={true}
          position={"top-center"}
          autoClose={2000}
          pauseOnFocusLoss={false}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
