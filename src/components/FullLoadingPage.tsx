import React from "react";
import { LoadingIcon } from "../components/sub-components/Icons";

export const FullLoadingPage: React.FC = () => {
  return (
    <>
      <div className="bg-[#14181b] z-50 min-h-screen min-w-screen w-full flex flex-col absolute">
        <div className="w-full h-screen z-50 flex flex-col justify-center items-center">
          <div className="text-gradient text-2xl font-bold mb-3">
            LiftRight AI
          </div>
          <LoadingIcon width="70" height="70" />
        </div>
      </div>
    </>
  );
};
