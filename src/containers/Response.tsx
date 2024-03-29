import { API_ROUTES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import FeedbackForm from "@/components/sub-components/FeedbackForm";
import Lottie from "react-lottie";
import lottieCheckmark from "@/assets/animations/lottie-checkmark.json";

const Response: React.FC = () => {
  useEffect(() => {
    document.title = "LiftRight - Response";
  }, []);
  const { id } = useParams();
  const location = useLocation();
  const apiResponseFromState = location.state?.apiResponse;
  const [apiResponse, setApiResponse] = useState(apiResponseFromState);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(
    apiResponse?.feedback ? true : false
  );
  useEffect(() => {
    if (!apiResponseFromState && id) {
      const fetchApiResponse = async () => {
        try {
          const response = await fetch(`${API_ROUTES.response}?id=${id}`, {
            credentials: "include",
          });
          const data = await response.json();
          setApiResponse(data);
          data.feedback && setFeedbackSubmitted(true);
        } catch (error) {
          console.error("Failed to fetch apiResponse:", error);
          // Handle the error appropriately
        }
      };

      fetchApiResponse();
    }
  }, [apiResponseFromState, id]);
  function renderFormattedText(text: string) {
    const withStrongTags = text.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    const sanitizedHtml = DOMPurify.sanitize(withStrongTags);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
  const final = apiResponse ? apiResponse.message.split("\n") : null;
  const finalMessage =
    final &&
    final.map((line: string, index: number) => {
      return (
        <div key={index}>
          {index == 0 ? (
            <div className="border-b-2 border-gray-700 p-3">
              {renderFormattedText(line)}
            </div>
          ) : index == final.length - 1 ? (
            <div className="border-t-2 border-gray-700 p-3">
              {renderFormattedText(line)}
            </div>
          ) : (
            <div key={index}>{renderFormattedText(line)}</div>
          )}
        </div>
      );
    });
  useEffect(() => {
    if (apiResponse?.s3Link) {
      const videoElement = document.querySelector("video");
      videoElement?.load();
    }
  }, [apiResponse?.s3Link]);
  return (
    <>
      <div className="container flex flex-col items-center gap-8">
        <h1
          data-aos="fade-down"
          className="text-2xl font-black tracking-tighter lg:text-4xl lg:leading-none text-center mt-12"
        >
          Analysis
        </h1>
        <div className="text-center">
          <video
            controls={true}
            width="100%"
            height="auto"
            autoPlay={true}
            className="rounded-lg h-[300px]"
            muted
            loop
          >
            <source src={apiResponse?.s3Link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="md:w-4/5 xl:w-2/3 flex flex-col gap-4 p-4 mb-10 md:p-12Z">
          {finalMessage}
        </div>
        {feedbackSubmitted ? (
          <div>
            <p className="font-bold text-center text-base">
              Thank you for submitting your feedback!
            </p>
            <Lottie
              style={{ cursor: "default" }}
              options={{
                loop: false,
                autoplay: true,
                animationData: lottieCheckmark,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={150}
              width={150}
            />
          </div>
        ) : (
          <FeedbackForm setFeedbackSubmitted={setFeedbackSubmitted} />
        )}
      </div>
    </>
  );
};

export default Response;
