import { API_ROUTES } from "@/utils/constants";
import React from "react";
import { useParams } from "react-router-dom";

type PaymentProps = {
  alternative?: boolean;
};

const PaymentForm: React.FC<PaymentProps> = ({ alternative }) => {
  const params = useParams();
  const chosenPlan = params["*"];
  const createCheckoutSession = async (type: string) => {
    const response = await fetch(API_ROUTES.createCheckoutSession, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });
    const { url } = await response.json();
    if (url) window.location.href = url;
  };
  return (
    <>
      <div data-aos="fade-left">
        <div
          className={`space-y-1 ${!alternative && "text-black"} my-3 ${
            (chosenPlan == "5" || chosenPlan == "15") && "hidden"
          }`}
        >
          <h3 className="text-sm">Purchase 1 Credit for $5:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("one")}
              className="btn mt-3 btn-sm"
            >
              Purchase
            </button>
          </div>
        </div>
        <div
          className={`border-t-2 space-y-1 ${
            !alternative && "text-black"
          } py-3 ${(chosenPlan == "1" || chosenPlan == "15") && "hidden"}`}
        >
          <h3 className="text-sm">Purchase 5 Credits for $20:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("five")}
              className="btn btn-sm btn-primary mt-3"
            >
              Purchase
            </button>
          </div>
        </div>{" "}
        <div
          className={`border-t-2 space-y-1 ${
            !alternative && "text-black"
          } py-3 ${(chosenPlan == "1" || chosenPlan == "5") && "hidden"}`}
        >
          <h3 className="text-sm">Purchase 15 Credit for $50:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("fifteen")}
              className="btn btn-sm border-0 mt-3"
            >
              Purchase
            </button>
          </div>
        </div>
        <div
          className={`text-sm text-gray-500 ${
            !alternative && "w-[200px]"
          } mt-6`}
        >
          You will be redirected to Stripe to complete payment.
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
