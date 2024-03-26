import { API_ROUTES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const Response: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const apiResponseFromState = location.state?.apiResponse;
  const [apiResponse, setApiResponse] = useState(apiResponseFromState);
  // useEffect(() => {
  //   if (!apiResponseFromState && id) {
  //     const fetchApiResponse = async () => {
  //       try {
  //         const response = await fetch(API_ROUTES.response, {
  //           credentials: "include",
  //         });
  //         const data = await response.json();
  //         setApiResponse(data);
  //       } catch (error) {
  //         console.error("Failed to fetch apiResponse:", error);
  //         // Handle the error appropriately
  //       }
  //     };

  //     fetchApiResponse();
  //   }
  // }, [apiResponseFromState, id]);

  useEffect(() => console.log(apiResponse), []);
  function renderFormattedText(text: string) {
    const withStrongTags = text.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    const sanitizedHtml = DOMPurify.sanitize(withStrongTags);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
  const final = apiResponse.message ? apiResponse.message.split("\n") : null;
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
  return (
    <>
      <div className="container flex flex-col items-center gap-16">
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
        <div className="w-2/3 flex flex-col gap-4 p-4 mb-10 md:p-12Z">
          {finalMessage}
        </div>
      </div>
    </>
  );
};

export default Response;
