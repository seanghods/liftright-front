import React, { useEffect, useState } from "react";
import { LoadingIcon, Xmark } from "./Icons";
import { ApiResponse } from "../VideoUploader";
import { useNavigate } from "react-router-dom";

type LoadingAnalysisProps = {
  apiResponse?: ApiResponse;
  error?: boolean;
};

const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  apiResponse,
  error,
}) => {
  const [progress, setProgress] = useState(0);
  const [finalizeAnimation, setFinalizeAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // React to changes in apiResponse.message to potentially finalize the animation.
    if (apiResponse?.message && !finalizeAnimation) {
      setFinalizeAnimation(true);
    }
  }, [apiResponse?.message, finalizeAnimation]);

  useEffect(() => {
    // Start the animation only once, and manage progression and finalization within.
    let animationFrameId: number;
    let start: DOMHighResTimeStamp | null = null;
    const duration = 45000; // Total for the initial animation
    let finalizingStart: DOMHighResTimeStamp | null = null; // Track start of finalization

    const animateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (!start) start = timestamp;

      const runtime = timestamp - start;
      let progressRate = runtime / duration;
      let currentProgress = Math.min(progressRate * 100, 100);

      // Check if it's time to finalize the animation within 1 second.
      if (finalizeAnimation && !finalizingStart) {
        finalizingStart = timestamp; // Mark the start time of the finalization phase
      }

      if (finalizingStart) {
        const finalizingTime = timestamp - finalizingStart;
        progressRate = finalizingTime / 1000; // Complete within 1 second
        currentProgress = Math.min(progressRate * 100 + progress, 100); // Ensure it adds to the current progress but caps at 100
      }

      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameId = window.requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [finalizeAnimation]);
  useEffect(() => {
    if (progress >= 100 && apiResponse?.message)
      setTimeout(
        () =>
          navigate(`/response/${apiResponse.id}`, {
            state: { apiResponse: apiResponse },
          }),
        250
      );
  }, [progress]);
  return (
    <>
      {error ? (
        <div
          data-aos="fade-left"
          className="w-full flex flex-col items-center justify-center my-12 gap-20"
        >
          <h1 className="font-bold text-2xl">Error!</h1>
          <Xmark />
          <div className="flex flex-col w-3/4 md:w-1/2 text-center gap-12">
            <p>
              Unfortunately, LiftRight AI hit a snag in processing your video.
            </p>
            <p>
              The error has been reported and your credit has been refunded to
              you. Please try again soon.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            data-aos="fade-left"
            className="w-full flex flex-col items-center justify-center my-12 gap-20"
          >
            <h1 className="font-bold text-2xl">Processing</h1>
            <LoadingIcon width={"100px"} height={"100px"} />
            <div className="flex flex-col w-3/4 md:w-1/2 text-center gap-5">
              <p>
                Your video is currently processing and being analyzed by
                LiftRight.
              </p>
              <p>Please allow up to 45 seconds for a complete response.</p>
            </div>
            <progress
              id="progressBar"
              className="progress progress-primary w-96"
              value={progress}
              max="100"
            ></progress>
          </div>
        </>
      )}
    </>
  );
};

export default LoadingAnalysis;
